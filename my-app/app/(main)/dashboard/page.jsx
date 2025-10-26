import { getUserAccounts ,getDashboardData} from '@/actions/dashboard'
import { CreateAccountDrawer } from '@/components/create-account-drawer'
import { Card, CardContent } from '@/components/ui/card'
import { Plus } from 'lucide-react'
import React, { Suspense } from 'react'
import { AccountCard } from './_components/account-card'
import { getCurrentBudget } from '@/actions/budget'
import {BudgetProgress}  from './_components/budget-progress'
import DashboardOverview from './_components/transaction-overview'

async function DashboardPage() {
  const accounts = await getUserAccounts()
  const defaultAccount = accounts?.find((account) => account.isDefault)

  let budgetInfo = null
  if (defaultAccount) {
    budgetInfo = await getCurrentBudget(defaultAccount.id)
  }
  const transaction= await getDashboardData();

  return (
    <div className="space-y-8">
      {/* Budget progress */}
      {defaultAccount && (
        <BudgetProgress
          initialBudget={budgetInfo?.budget}
          currentExpenses={budgetInfo?.currentExpense || 0}
        />
      )}
      {/* Overview */}
      <Suspense fallback={"Loading Overview..."}> 
        <DashboardOverview
        accounts={accounts}
        transactions={transaction ||[]}
        />

      </Suspense>


      {/* Accounts Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mt-6">
        <CreateAccountDrawer>
          <Card className="hover:shadow-md transition-shadow cursor-pointer border-dashed">
            <CardContent className="flex flex-col items-center justify-center text-muted-foreground h-full pt-5">
              <Plus className="h-10 w-10 mb-2" />
              <p className="text-sm font-medium">Add New Account</p>
            </CardContent>
          </Card>
        </CreateAccountDrawer>

        {accounts.length > 0
          ? accounts.map((account) => <AccountCard key={account.id} account={account} />)
          : <p className="col-span-full text-center text-muted-foreground">No accounts yet.</p>
        }
      </div>
    </div>
  )
}

export default DashboardPage
