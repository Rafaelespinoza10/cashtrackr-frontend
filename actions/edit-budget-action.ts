"use server"

import { Budget, DraftBudgetSchema, ErrorResponseSchema, SuccessSchema } from "@/src/schemas";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

type ActionEditBudget = {
    errors: string[];
    success: string;
}

export async function editBudgetAction(budgetId: Budget["Id"],  prevState: ActionEditBudget, formData: FormData){

    const budgetData = {
        name: formData.get('name'),
        amount: formData.get('amount')
    };

    const budget = DraftBudgetSchema.safeParse(budgetData);
    if(!budget.success){
        return{
            errors: budget.error.issues.map(issue => issue.message),
            success: '',
        };
    }

    const token = cookies().get('CASHTRACKR_TOKEN')?.value;
    const url = `${process.env.BASE_URL}/api/budget/updated-budget/${budgetId}`;

    const request = await fetch(url, {
        method: 'PUT',
        headers:{
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            name: budget.data.name,
            amount: budget.data.amount,
        })
    });

    const json = await request.json();
    console.log(json);

    if(!request.ok){
        const {error} = ErrorResponseSchema.parse(json);
        return{
            errors: [error],
            success: ''
        }
    }

    revalidatePath('/admin'); // limpiar el cache 

    const success = SuccessSchema.parse(json.message);

    return{
        errors: [],
        success,
    }
}