"use server"

import { DraftExpenseSchema, ErrorResponseSchema, SuccessSchema } from "@/src/schemas";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";


type BudgetAndExpenseId = {
    budgetId: number;
    expenseId: number;
}

type ActionServerFormEditExpense ={
    errors: string[];
    success: string;
}
export async function editExpenseAction({budgetId, expenseId}: BudgetAndExpenseId, prevState: ActionServerFormEditExpense, formData: FormData){

    console.log('desde EditExpenseAction');
    console.log(budgetId);
    console.log(expenseId);

    const expense = DraftExpenseSchema.safeParse({
        name: formData.get('name'),
        amount: formData.get('amount')
    });
    if(!expense.success){
        return{
            errors: expense.error.issues.map(issue => issue.message),
            success: ''
        };
    }

    //actualizar el gasto
    const url = `${process.env.BASE_URL}/api/budget/${budgetId}/expenses/updated-expense/${expenseId}`;
    const token = cookies().get('CASHTRACKR_TOKEN')?.value;
    const request = await fetch(url, {
        method: 'PUT',
        headers:{
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            name: expense.data.name,
            amount: expense.data.amount
        })
    });

    const json = await request.json();

    if(!request.ok){
        const {error} = ErrorResponseSchema.parse(json);
        return{
            errors: [error],
            success: '',
        };
    }

    revalidatePath(`/admin/budgets/${budgetId}`);
    const success = SuccessSchema.parse(json.message);

    return{
        errors: [],
        success
    }
}