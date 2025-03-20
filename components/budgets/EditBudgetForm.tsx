"use client"

import { Budget } from "@/src/schemas";
import BudgetForm from "./BudgetForm";
import { useFormState } from "react-dom";
import { editBudgetAction } from "@/actions/edit-budget-action";
import ErrorMesage from "../ui/ErrorMesage";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

type EditBudgetFormProps ={
    budget: Budget
}

export default function EditBudgetForm({budget}: EditBudgetFormProps) {

    const router = useRouter();
    const editBudgetActionWithBudgetId = editBudgetAction.bind(null, budget.Id);
    const [state, dispatch] = useFormState(editBudgetActionWithBudgetId, {
        errors: [], 
        success:'',
    });

    useEffect(() =>{
        if(state.errors){
            state.errors.map(error =>{
                toast.error(error);
            });
        }
        if(state.success){
            toast.success(state.success,{
                onClick: () => {
                    router.push('/admin');
                },
                onClose: () =>{
                    router.push('/admin');
                }
            });
        }
    },[state])

return (
    <>
      <form 
      className="mt-10 space-y-3"
       noValidate
       action={dispatch}
      >
        {state.errors.map(error => <ErrorMesage key={error}>{error}</ErrorMesage>)}
        <BudgetForm 
            budget={budget}
        />
        
        <input
          type="submit"
          className="bg-amber-500 w-full p-3 text-white uppercase font-bold hover:bg-amber-600 cursor-pointer transition-colors"
          value="Guardar cambios"
        />
      </form>
    </>
  );
}
