import { DialogTitle } from "@headlessui/react";
import ExpenseForm from "./ExpenseForm";
import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { Expense } from "@/src/schemas";
import { useFormState } from "react-dom";
import { editExpenseAction } from "@/actions/edit-expense-action";
import ErrorMesage from "../ui/ErrorMesage";
import { toast } from "react-toastify";

export default function EditExpenseForm({ closeModal }: { closeModal: () => void }) {
  const [expense, setExpense] = useState<Expense | null>(null);
  const { id: budgetId } = useParams();
  const searchParams = useSearchParams();
  const expenseId = searchParams.get("editExpenseId");
  const editExpenseActionWithBudgetId = editExpenseAction.bind(null, {
    budgetId : Number(budgetId),
    expenseId: Number(expenseId),
  })
  const [state, dispatch] = useFormState(editExpenseActionWithBudgetId, {
    errors: [],
    success: '',
  });

  console.log("Budget ID:", budgetId);
  console.log("Expense ID:", expenseId);

  useEffect(() => {
    if (!budgetId || !expenseId) {
      console.error("No se puede obtener el gasto: budgetId o expenseId no están definidos");
      return;
    }

    const url = `${process.env.NEXT_PUBLIC_URL}/admin/api/budgets/${budgetId}/expenses/${expenseId}`;
    console.log("Fetching URL:", url);

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error en la respuesta: ${response.status} ${response.statusText}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Datos obtenidos:", data);
        setExpense(data.expense);
      })
      .catch((error) => {
        console.error("Error al obtener el gasto:", error);
      });
  }, [budgetId, expenseId]); 

  useEffect(() => {
    if(state.success){
      toast.success(state.success);
      closeModal();
    }
  },[state, closeModal])

  return (
    <>
      <DialogTitle as="h3" className="font-black text-4xl text-purple-950 my-5">
        Editar Gasto
      </DialogTitle>
      <p className="text-xl font-bold">
        Edita los detalles de un <span className="text-amber-500">gasto</span>
      </p>
      {state.errors.map(error => <ErrorMesage key={error}>{error}</ErrorMesage>)}
      <form 
      className="bg-slate-950 shadow-lg rounded-lg p-10 mt-10"
       noValidate
       action={dispatch}
       >
        <ExpenseForm expense={expense!} />
        <input
          type="submit"
          className="bg-amber-500 w-full p-3 text-white uppercase font-bold hover:bg-amber-600 cursor-pointer transition-colors"
          value="Guardar Cambios"
        />
      </form>
    </>
  );
}
