import React from 'react'


import { getTransaction } from "@/actions/transaction";
import { AddTransactionForm}  from './_components/transaction-form';
import { defaultCategories } from '@/data/categories';
import { getUserAccounts } from '@/actions/dashboard';


const AddTransactionPage = async ({searchParams}) => {
    const accounts=await getUserAccounts();

  const params = await searchParams;
  const editId = params.edit;

    console.log(editId);

    let initialData=null;
    if(editId){
        const transaction =await getTransaction(editId);
        initialData=transaction;
    }
    return <div className="max-w-3xl mx-auto px-5">
        <h1 className="text-5xl gradient-tittle mb-8"> {editId? "Edit":"Add"} Transaction</h1>

        <AddTransactionForm 
        accounts={accounts}
        categories={defaultCategories}
         editMode={!!editId}
        initialData={initialData}/>
    </div>

};
export default AddTransactionPage;