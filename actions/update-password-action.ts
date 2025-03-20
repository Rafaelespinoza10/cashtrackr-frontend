"use server"

import { ErrorResponseSchema, SuccessSchema, UpdatePasswordSchema } from "@/src/schemas";
import { cookies } from "next/headers";


type ActionFormStateUpdatePassword ={
    errors: string[],
    success: string
}
export async function updatePasswordAction(prevState: ActionFormStateUpdatePassword, formData: FormData){

    const userPassword = UpdatePasswordSchema.safeParse({
        current_password : formData.get('current_password'),
        password: formData.get('password'),
        password_confirmation: formData.get('password_confirmation')
    });

    if(!userPassword.success){
        return{
            errors : userPassword.error.issues.map(error => error.message),
            success: ''
        };
    }


    const token = cookies().get('CASHTRACKR_TOKEN')?.value;

    const url = `${process.env.BASE_URL}/auth/update-password`;
    const request = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            currentPassword: userPassword.data.current_password,
            password: userPassword.data.password,
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

    const success = SuccessSchema.parse(json.message);

    console.log('desde updatePasswordAction');
    return{
        errors: [],
        success
    };
}