"use client"

import { createBudgetAction } from "@/actions/create-budget-action"
import { useFormState } from "react-dom"
import ErrorMesage from "../ui/ErrorMesage";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import BudgetForm from "./BudgetForm";

export default function CreateBudgetForm() {

    const router = useRouter();
    const [ state, dispatch ] = useFormState(createBudgetAction, {
        errors: [],
        success: '',
    });

    useEffect(() =>{
        if(state.success){
            toast.success(state.success,{
                onClose: () =>{
                    router.push('/admin');
                },
                onClick: () =>{ 
                    router.push('/admin');
                }
            });
        }
    },[state, router])

  return (
    <form
      className="mt-10 space-y-3"
      noValidate
      action={dispatch}
    >
        {state.errors.map(error =>  <ErrorMesage key={error}>{error}</ErrorMesage>)}
     
     <BudgetForm />
      <input
        type="submit"
        className="bg-amber-500 w-full p-3 text-white uppercase font-bold hover:bg-amber-600 cursor-pointer transition-colors"
        value='Crear Presupuesto'
      />
    </form>
  )
}