"use server"

import { ErrorResponseSchema, LoginSchema } from "@/src/schemas";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
type ActionStateType = {
    errors: string[]
}

export async function authenticate(state: ActionStateType, formData: FormData){
    const loginCredentials = {
        email : formData.get('email'),
        password: formData.get('password') 
    };


    const auth = LoginSchema.safeParse(loginCredentials);
    if(!auth.success){
        return {
            errors: auth.error.errors.map(issue => issue.message)
        };
    }

    const url = `${process.env.BASE_URL}/auth/login`;
    const request = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify({
            password:  auth.data.password,
            email: auth.data.email
        })
    }); 

    const json = await request.json();

    if(!request.ok){
        const { error } = ErrorResponseSchema.parse(json)
        return {
            errors: [error]
        }
    }

    cookies().set({
        name: 'CASHTRACKR_TOKEN',
        value: json.token,
        httpOnly: true,
        path:'/'
    })


    redirect('/admin')

}