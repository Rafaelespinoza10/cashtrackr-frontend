import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { cookies } from "next/headers";
import { BudgetsApiResponseSchema } from "@/src/schemas";
import BudgetMenu from "@/components/budgets/BudgetMenu";
import DeleteBudgetModal from "@/components/budgets/DeleteBudgetModal";

export const metadata: Metadata = {
  title: "CashTrackr - Panel Administracion",
  description: "CashTrackr - Panel Administracion",
};

async function getUserBudgets() {
  const token = cookies().get("CASHTRACKR_TOKEN")?.value;
  const url = `${process.env.BASE_URL}/api/budget/all`;
  const request = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const json = await request.json();
  console.log(json);
  const response = BudgetsApiResponseSchema.parse(json);
  return response;
}

export default async function AdminPage() {
  const response = await getUserBudgets();

  return (
    <>
      <div className="flex flex-col-reverse md:flex-row md:justify-between items-center">
        <div className="w-full md:w-auto">
          <h1 className="font-black text-4xl text-purple-950 my-5">
            Mis Presupuestos
          </h1>
          <p className="text-xl font-bold">
            Maneja y administra tus {""}
            <span className="text-amber-500">presupuestos</span>
          </p>
        </div>
        <Link
          href={"/admin/budgets/new"}
          className="bg-amber-500 p-2 rounded-lg text-white font-bold w-full md:w-auto text-center"
        >
          Crear Presupuesto
        </Link>
      </div>

      {response.length ? (
        <>
          <ul role="list" className="space-y-4 mt-10">
            {response.map((budget) => (
              <li
                key={budget.Id}
                className="bg-gray-800 shadow-xl rounded-lg p-5 hover:bg-gray-700 transition-colors duration-200"
              >
                <div className="flex justify-between items-center">
                  <div className="space-y-1">
                    <p className="text-lg font-semibold text-white">
                      {budget.Name}
                    </p>
                    <p className="text-2xl font-bold text-amber-400">
                      ${budget.Amount}
                    </p>
                    <p className="text-sm text-gray-400">
                      Creado: {new Date(budget.CreatedAt).toLocaleDateString()}
                    </p>
                  </div>
                  <BudgetMenu budgetId={budget.Id} />
                </div>
              </li>
            ))}
          <DeleteBudgetModal />
          </ul>
        </>
      ) : (
        <p className="text-white text-center py-20">
          No hay presupuestos aun {""}
          <Link
            href={"/admin/budgets/new"}
            className="text-purple-400 font-bold"
          >
            Comienza creando uno
          </Link>
        </p>
      )}
    </>
  );
}
