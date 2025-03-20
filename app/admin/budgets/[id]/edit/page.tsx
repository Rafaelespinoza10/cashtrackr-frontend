import EditBudgetForm from "@/components/budgets/EditBudgetForm";
import { getBudgetId } from "@/src/budgets/service";
import { Metadata } from "next";
import Link from "next/link";



export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata>{
    const budget = await getBudgetId(params.id);
    return {
      title: `CashTrackr - ${budget.Name}`,
      description: `CashTrackr - ${budget.Name}`
    }
  }

export default async function EditBudgetPage({params}: {params: {id: string}}){
    console.log(params);
    const { id } = params;
    const budget = await getBudgetId(id);

    return(
        <>
        <div className='flex flex-col-reverse md:flex-row md:justify-between items-center'>
          <div className='w-full md:w-auto'>
            <h1 className='font-black text-4xl text-purple-500 my-5'>
              Editar Presupuesto: {budget.Name}
            </h1>
            <p className="text-xl font-bold">Llena el formulario y crea un nuevo {''}
              <span className="text-amber-500">presupuesto</span>
            </p>
          </div>
          <Link
            href={'/admin'}
            className='bg-amber-500 p-2 rounded-lg text-white font-bold w-full md:w-auto text-center'
          >
            Volver
          </Link>
        </div>
        <div className='p-10 mt-10  shadow-lg '>
            <EditBudgetForm 
                budget={budget}
            />
        </div>
      </>
    )
}