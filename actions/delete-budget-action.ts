// delete-budget-action.ts
"use server";

import { ErrorResponseSchema, PasswordValidationSchema, SuccessSchema } from "@/src/schemas";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

type ActionFormDeleteBudget = {
  errors: string[],
  success: string,
};

export async function deleteBudgetAction(
    budgetId: number,
    prevState: ActionFormDeleteBudget,
    formData: FormData
  ): Promise<ActionFormDeleteBudget> {
    const password = formData.get('password');
    const currentPassword = PasswordValidationSchema.safeParse(password);
  
    if (!currentPassword.success) {
      return {
        errors: currentPassword.error.issues.map((issue) => issue.message),
        success: '',
      };
    }
  
    const token = cookies().get('CASHTRACKR_TOKEN')?.value;
    if (!token) {
      return { errors: ['No autenticado.'], success: '' };
    }
  
    const checkPasswordUrl = `${process.env.BASE_URL}/auth/check-password`;
    const requestCheckPassword = await fetch(checkPasswordUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ password: currentPassword.data }),
    });
  
    if (!requestCheckPassword.ok) {
      const errorJson = await requestCheckPassword.json();
      const errorMsg = errorJson.message || 'Error al validar contraseña.';
      return { errors: [errorMsg], success: '' };
    }
  
    // Eliminar presupuesto
    const deleteBudgetUrl = `${process.env.BASE_URL}/api/budget/delete/${budgetId}`;
    const requestDeleteBudget = await fetch(deleteBudgetUrl, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
  
    const deleteBudgetJson = await requestDeleteBudget.json();
  
    if (!requestDeleteBudget.ok) {
      const { error } = ErrorResponseSchema.parse(deleteBudgetJson);
      return { errors: [error], success: '' };
    }

    revalidatePath('/admin');
  
    const successMessage = SuccessSchema.parse(deleteBudgetJson.message);
  
    return { errors: [], success: successMessage };
  }
  