"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { DialogTitle } from "@headlessui/react";
import { useFormState } from "react-dom";
import { deleteBudgetAction } from "@/actions/delete-budget-action";
import { useEffect } from "react";
import { toast } from "react-toastify";

export default function ConfirmPasswordForm() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const budgetId = searchParams.get('deleteBudgetId');

  const deleteBudgetActionWithId = deleteBudgetAction.bind(null, Number(budgetId));

  const [state, dispatch] = useFormState(deleteBudgetActionWithId, {
    errors: [],
    success: '',
  });

  useEffect(() => {
    if (state.errors) {
      state.errors.forEach(error => toast.error(error));
    }
    if(state.success){
        toast.success(state.success);
        
        closeModal();
    }
  }, [state]);

  const closeModal = () => {
    const hideModal = new URLSearchParams(searchParams.toString());
    hideModal.delete('deleteBudgetId');
    router.replace(`${pathname}?${hideModal}`);
  };

  if (!budgetId) {
    return <p className="text-red-500">Parámetro de presupuesto no encontrado.</p>;
  }

  return (
    <>
      <DialogTitle className="font-black text-4xl text-purple-600 my-5">
        Eliminar Presupuesto
      </DialogTitle>
      <p className="text-xl font-bold">
        Ingresa tu Password para{' '}
        <span className="text-amber-500">eliminar el presupuesto</span>
      </p>
      <p className="text-gray-600 text-sm">
        (Un presupuesto eliminado y sus gastos no se pueden recuperar)
      </p>


      <form className="mt-14 space-y-5" noValidate action={dispatch}>
        <div className="flex flex-col gap-5">
          <label className="font-bold text-2xl" htmlFor="password">
            Ingresa tu Password para eliminar
          </label>
          <input
            id="password"
            type="password"
            placeholder="Password"
            className="w-full border border-gray-300 p-3 rounded-lg text-black"
            name="password"
          />
        </div>
        <div className="grid grid-cols-2 gap-5">
          <input
            type="submit"
            value="Eliminar Presupuesto"
            className="bg-purple-950 hover:bg-purple-800 w-full p-3 rounded-lg text-white font-black cursor-pointer transition-colors"
          />
          <button
            type="button"
            className="bg-amber-500 hover:bg-amber-600 w-full p-3 rounded-lg text-white font-black cursor-pointer transition-colors"
            onClick={closeModal}
          >
            Cancelar
          </button>
        </div>
      </form>
    </>
  );
}
