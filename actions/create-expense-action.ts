"use server"

import { DraftExpenseSchema, ErrorResponseSchema, SuccessSchema } from "@/src/schemas";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

type ActionStateCreateExpense = {
    errors: string[],
    success: string, 
}

export default async function createExpenseAction(budgetId: number, prevState: ActionStateCreateExpense, formData: FormData){
    const expenseData ={
        name: formData.get('name'),
        amount: formData.get('amount')
    };

    const expense = DraftExpenseSchema.safeParse(expenseData);
    if(!expense.success){
        return {
            errors: expense.error.issues.map(issue => issue.message),
            success: ''
        };
    };

    //Mandar gasto al backend
    const token = cookies().get('CASHTRACKR_TOKEN')?.value;
    const url = `${process.env.BASE_URL}/api/budget/${budgetId}/expense/create-expense`;
    const request = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            name: expense.data.name,
            amount: expense.data.amount,
        })
    });
    const json = await request.json();
    
    if(!request.ok){
        const { error} = ErrorResponseSchema.parse(json);
        return{
            errors:[error],
            sucess: ''
        };
    }


    const success = SuccessSchema.parse(json.message);
    revalidatePath(`/admin/budgets/${budgetId}`)    
    return{
        errors: [],
        success,
    }
}