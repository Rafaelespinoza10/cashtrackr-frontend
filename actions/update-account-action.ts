"use server"

import { ErrorResponseSchema, SuccessSchema, UpdateAccountUserSchema } from "@/src/schemas";
import { cookies } from "next/headers";

type ActionFormStateUpdateAccount = {
    errors: string[];
    success: string;
}

export async function updateAccountAction(prevState: ActionFormStateUpdateAccount, formData: FormData){
    const updateUser = UpdateAccountUserSchema.safeParse({
        name: formData.get('name'),
        email: formData.get('email')
    });

    if(!updateUser.success){
        return {
            errors: updateUser.error.issues.map(issue => issue.message),
            success: ''
        }
    }

    const url = `${process.env.BASE_URL}/auth/update-account`;
    const token = cookies().get('CASHTRACKR_TOKEN')?.value;
    const request = await fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type':'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify( {
            name: updateUser.data.name,
            email: updateUser.data.email,
        })
    });
    const json = await request.json();

    if(!request.ok){
        const { error } = ErrorResponseSchema.parse(json);
        return{
            errors: [error],
            success:'',
        };
    }

    const success = SuccessSchema.parse(json.message);
    return{
        errors: [],
        success,
    }
}