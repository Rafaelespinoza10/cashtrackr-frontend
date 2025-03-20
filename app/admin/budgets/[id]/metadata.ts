import { getBudgetId } from "@/src/budgets/service";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata>{
  const budget = await getBudgetId(params.id);
  return {
    title: `CashTrackr - ${budget.Name}`,
    description: `CashTrackr - ${budget.Name}`,
  };
}
