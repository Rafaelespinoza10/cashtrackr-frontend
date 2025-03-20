import { DialogTitle } from "@headlessui/react";
import ExpenseForm from "./ExpenseForm";
import { useFormState } from "react-dom";
import createExpenseAction from "@/actions/create-expense-action";
import { useParams } from "next/navigation";
import ErrorMesage from "../ui/ErrorMesage";
import { useEffect } from "react";
import { toast } from "react-toastify";




export default function AddExpenseForm({closeModal}:{closeModal: () => void}) {

const { id } = useParams();
const createExpenseActionWithBudgetId = createExpenseAction.bind(null, Number(id));
const [state, dispatch] = useFormState( createExpenseActionWithBudgetId, {
    errors: [],
    success: '',
});

useEffect(()=>{
  if(state.success){
     toast.success(state.success);
     closeModal();
  }
},[state])

return (
    <>
      <DialogTitle
        as="h3"
        className="font-black text-4xl text-purple-400 my-5"
      >
        Agregar Gasto
      </DialogTitle>

      <p className="text-lg text-gray-300 mb-6">
        Llena el formulario para registrar un nuevo{' '}
        <span className="text-amber-400 font-semibold">gasto</span>
      </p>

  	{ state.errors.map(error => <ErrorMesage key={error}>{error}</ErrorMesage>)}
      <form
        className="bg-gray-800 shadow-xl rounded-xl p-8 border border-gray-700"
        noValidate
        action={dispatch}
      >

        <ExpenseForm />

        <input
          type="submit"
          className="bg-purple-600 hover:bg-purple-500 w-full p-3 text-white uppercase font-bold cursor-pointer transition-colors rounded-lg mt-6"
          value='Registrar Gasto'
        />
      </form>
    </>
  );
}