import React from 'react'
import { getUserAccounts } from '@/lib/user-accounts';
import { defaultCategories } from '@/lib/constants/categories';
import AddTransactionForm from '@/app/_components/transaction-form';
import { getTransaction } from "@/actions/transaction";


const AddTransactionPage = async ({searchParams}) => {
    const accounts=await getUserAccounts();

    const editId=searchParams.edit;

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