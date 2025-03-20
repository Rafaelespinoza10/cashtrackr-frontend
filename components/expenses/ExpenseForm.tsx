import {  Expense } from "@/src/schemas"

type ExpenseFormProps ={
    expense?: Expense
}

export default function ExpenseForm({expense}: ExpenseFormProps) {
    console.log(expense);
    return (
        <>
            <div className="mb-5">
                <label htmlFor="name" className="text-sm uppercase font-bold">
                    Nombre Gasto
                </label>
                <input
                    id="name"
                    className="w-full p-3  border border-gray-500  bg-slate-500 text-black"
                    type="text"
                    placeholder="Nombre del Gasto"
                    name="name"
                    defaultValue={expense?.Name}
                />
            </div>

            <div className="mb-5">
                <label htmlFor="amount" className="text-sm uppercase font-bold">
                    Cantidad Gasto
                </label>
                <input
                    id="amount"
                    className="w-full p-3  border border-gray-500 bg-slate-500 text-black"
                    type="number"
                    placeholder="Cantidad Gasto"
                    name="amount"
                    defaultValue={expense?.Amount}
                />
            </div>
        </>
    )
}