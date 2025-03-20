import AddExpenseButton from "@/components/expenses/AddExpenseButton";
import ModalContainer from "@/components/ui/ModalContainer";
import { getBudgetId } from "@/src/budgets/service";
import { Metadata } from "next";
import { format } from "date-fns";
import ExpenseMenu from "@/components/expenses/ExpenseMenu";
import Amount from "@/components/ui/Amount";
import { ProgressBar } from "@/components/budgets/ProgressBar";

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const budget = await getBudgetId(params.id);
  console.log(budget);
  return {
    title: `CashTrackr - ${budget.Name}`,
    description: `CashTrackr - ${budget.Name}`,
  };
}


export default async function BudgetDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  console.log(params);

  const budget = await getBudgetId(params.id);
  const totalSpents = budget.expenses.reduce(
    (total, expense) => Number(expense.Amount) + total,
    0
  );

  const percentage = ((totalSpents / +budget.Amount) * 100).toFixed(2); 
  return (
    <>
      <div className="flex justify-between items-center">
        <div>
          <h1 className="font-black text-4xl text-purple-600">{budget.Name}</h1>
          <p className="text-xl font-bold">
            Administra tus {""} <span className="text-amber-500">gastos</span>
          </p>
        </div>
        <AddExpenseButton />
      </div>

      {budget.expenses.length ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 mt-10">
            <div>
              <ProgressBar
                percentage={+percentage}
              />
            </div>
            <div className="flex flex-col gap-4 justify-center items-center md:items-start">
              <Amount label="Presupuesto" amount={+budget.Amount} />
              <Amount
                label="Disponible"
                amount={Number(budget.Amount) - totalSpents}
              />
              <Amount label="Gastado" amount={totalSpents} />
            </div>
          </div>
          <h1 className="font-black text-purple-400 text-3xl mt-10">
            {" "}
            Gastos en este presupuesto{" "}
          </h1>
          <ul
            role="list"
            className="divide-y divide-gray-700 border border-gray-700 shadow-2xl mt-10 max-w-3xl mx-auto bg-gray-900 rounded-lg gap-2"
          >
            {budget.expenses.map((expense) => (
              <li
                key={expense.Id}
                className="flex justify-between items-center gap-x-6 p-5 hover:bg-gray-800 transition-all duration-300"
              >
                <div className="flex items-center gap-x-4">
                  <div className="space-y-2">
                    <p className="text-2xl font-semibold text-white">
                      {expense.Name}
                    </p>
                    <p className="text-xl font-bold text-amber-400">
                      ${expense.Amount}
                    </p>
                    <p className="text-gray-400 text-sm">
                      {format(
                        new Date(expense.UpdatedAt),
                        "dd MMM yyyy - HH:mm"
                      )}
                    </p>
                  </div>
                </div>
                <ExpenseMenu expenseId={expense.Id} />
              </li>
            ))}
          </ul>
        </>
      ) : (
        <>
          <p className="text-center py-20 text-white">No hay gastos</p>
        </>
      )}
      <ModalContainer />
    </>
  );
}
