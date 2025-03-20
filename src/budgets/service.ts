"use server"

import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { cache } from "react";
import { BudgetAPIResponseSchema } from "../schemas";

export const getBudgetId = cache(async(id: string) =>{
    const token = cookies().get('CASHTRACKR_TOKEN')?.value;
    const url = `${process.env.BASE_URL}/api/budget/${id}`;
    const request = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization':`Bearer ${token}`,
        }
    });

    const json = await request.json();
    if(!request.ok){
        notFound()
    }
    const budget = BudgetAPIResponseSchema.parse(json);
    return budget;
})