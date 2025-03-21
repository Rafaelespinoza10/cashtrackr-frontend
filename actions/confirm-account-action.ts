"use server"
import { ErrorResponseSchema, SuccessSchema, TokenSchema } from './../src/schemas/index';

type ActionStateType = {
    errors: string[],
    success: string,
}

export async function confirmAccount(token:string, state: ActionStateType){
    
    const confirmToken = TokenSchema.safeParse(token);

    if(!confirmToken.success){
        return {
            errors: confirmToken.error.issues.map(issue => issue.message),
            success: '',
        }
    }


    const url = `${process.env.BASE_URL}/auth/confirm-account`;
    const request = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            token: confirmToken.data,
        })
    });

    const json = await request.json();

    if(!request.ok){
        const { error } = ErrorResponseSchema.parse(json);
        return {
            errors: [error],
            success: '',
        }
    }
    const success = SuccessSchema.parse(json)
    return{
        errors: [],
        success,
    }
}