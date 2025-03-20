"use server"

import { ErrorResponseSchema, SuccessSchema } from "@/src/schemas";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

type ActionServerFormDeleteExpense ={
    errors: string[];
    success: string;
}

type ExpenseAndBudgetIdProps ={
    expenseId: number;
    budgetId: number;
}

export async function deleteExpenseAction({budgetId, expenseId}:ExpenseAndBudgetIdProps, prevState: ActionServerFormDeleteExpense){

    console.log('desde deleteExpenseAction');
    console.log(budgetId);
    console.log(expenseId);

    const token = cookies().get('CASHTRACKR_TOKEN')?.value;
    const url = `${process.env.BASE_URL}/api/budget/${budgetId}/expense/delete/${expenseId}`;
    const request = await fetch(url, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });

    const json = await request.json();

    if(!request.ok){
        const { error } = ErrorResponseSchema.parse(json.error);
        return{
            errors: [error],
            success: '',
        };
    }

    revalidatePath(`/admin/budgets/${budgetId}`);
    const success = SuccessSchema.parse(json.message);

    return{
        errors: [],
        success,
    }
}