"use server"

import { DraftBudgetSchema, SuccessSchema } from "@/src/schemas";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

type CreateActionBudgetAction ={
    errors: string[],
    success: string,
}

export async function createBudgetAction(prevState: CreateActionBudgetAction, formData: FormData ){

    const budget = DraftBudgetSchema.safeParse({
        name: formData.get('name'),
        amount: formData.get('amount')
    })
    if (!budget.success) {
        return {
            errors: budget.error.issues.map(issue => issue.message),
            success: ''
        }
    }

    const token = cookies().get('CASHTRACKR_TOKEN')?.value;
    const url = `${process.env.BASE_URL}/api/budget/create-budget`;
    const request = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            name: budget.data.name,
            amount: budget.data.amount
        })
    });
    const json = await request.json();

    revalidatePath('/admin'); // limpiar el cache 
    
    const success = SuccessSchema.parse(json.message);


    return {
        errors: [],
        success
    };
}