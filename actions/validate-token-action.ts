"use server"

import { ErrorResponseSchema, SuccessSchema, TokenSchema } from "@/src/schemas";

type ActionStateType ={
    errors: string[];
    success: string;
};

export async function validateTokenAction(token: string, prevState: ActionStateType) {

    const restPasswordToken = TokenSchema.safeParse(token);

    if(!restPasswordToken.success){
        return{
            errors: restPasswordToken.error.issues.map(issue => issue.message),
            success: '',
        };
    }
    
    const url = `${process.env.BASE_URL}/auth/validate-token`;
    const request = await fetch(url, {
        method: "POST",
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            token: restPasswordToken.data
        })
    });
    const json = await request.json();
    if(!request.ok){
        const { error } = ErrorResponseSchema.parse(json);
        return{
             errors: [error],
             success: ''
        };
    }

    const success = SuccessSchema.parse(json);


    return{
        errors: [],
        success,
    }

}
