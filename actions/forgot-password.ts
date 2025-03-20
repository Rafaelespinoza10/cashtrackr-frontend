"use server"

import { ErrorResponseSchema, ForgotPasswordSchema, SuccessSchema } from "@/src/schemas";

type ActionStateType ={
    errors: string[];
    success: string;
}

export async function forgotPassword(prevState: ActionStateType, formData: FormData){
    const forgot = ForgotPasswordSchema.safeParse({
        email: formData.get('email')
    });

    if(!forgot.success){
        return{
            errors: forgot.error.issues.map(issue => issue.message),
            success: ''
        }
    }

    const url = `${process.env.BASE_URL}/auth/forget-password`;
    const request = await fetch(url, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: forgot.data.email,
        })
    })

    const json = await request.json();
     if(!request.ok){
        const { error} = ErrorResponseSchema.parse(json);
        return{
            errors: [error],
            success: ''
        }
     }

     const success = SuccessSchema.parse(json);

    return{
        errors:[],
        success,
    };
}