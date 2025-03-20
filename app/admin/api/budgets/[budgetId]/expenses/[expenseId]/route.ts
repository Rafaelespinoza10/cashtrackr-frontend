import { VerifySession } from "@/src/auth/dal";
import { cookies } from "next/headers";

export async function GET(req:Request, {params}: {params: {budgetId: string, expenseId: string}}){
    await VerifySession();

    const token = cookies().get('CASHTRACKR_TOKEN')?.value;
    const URL = `${process.env.BASE_URL}/api/budget/${params.budgetId}/expense/${params.expenseId}`;
    const request = await fetch(URL, {
        method: 'GET',
        headers: {
            'Content-Type':'application/json',
            'Authorization': `Bearer ${token}`    
        }
    });

    const json = await request.json();
    if(!request.ok){
        return Response.json(json.error);
    }
    
    return Response.json(json);
}