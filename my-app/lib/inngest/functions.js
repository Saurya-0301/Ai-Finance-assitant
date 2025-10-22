import { db } from "../prisma";
import { inngest } from "./client";

export const checkBudgetAlert = inngest.createFunction(
  { name: "check budget alert" },
  { cron: "0 */6 * * *" }, // runs every 6 hours
  async ({ step }) => {
    const budgets = await step.run("fetch budgets", async () => {
      return await db.budget.findMany({
        include: {
          user: {
            include: {
              accounts: {
                where: { isDefault: true },
              },
            },
          },
        },
      });
    });

    for (const budget of budgets) {
      const defaultAccount = budget.user.accounts[0];
      if (!defaultAccount) continue;

      // ✅ fix: wrap dynamic key in backticks & quotes
      await step.run(`check-budget-${budget.id}`, async () => {
        const startDate = new Date();
        startDate.setDate(1); // first day of current month

        const expenses = await db.transaction.aggregate({
          where: {
            userId: budget.userId,
            accountId: defaultAccount.id,
            type: "EXPENSE",
            date: { gte: startDate },
          },
          _sum: { amount: true },
        });

        const totalExpenses = expenses._sum.amount || 0;
        const budgetAmount = budget.amount;
        const percentageUsed = (totalExpenses / budgetAmount) * 100;

        // ✅ send alert if 80%+ of budget is used
        if (
          percentageUsed >= 80 &&
          (!budget.lastAlertSent ||
            isNewMonth(new Date(budget.lastAlertSent), new Date()))
        ) {
          // TODO: Replace with your real email/notification logic
          console.log(
            `🚨 Budget alert for user ${budget.userId}, budget ${budget.id} – ${percentageUsed.toFixed(1)}% used`
          );

          // ✅ update lastAlertSent timestamp
          await db.budget.update({
            where: { id: budget.id },
            data: { lastAlertSent: new Date() },
          });
        }
      });
    }
  }
);

// ✅ helper function to check if a new month has started
function isNewMonth(lastAlertDate, currentDate) {
  return (
    lastAlertDate.getMonth() !== currentDate.getMonth() ||
    lastAlertDate.getFullYear() !== currentDate.getFullYear()
  );
}
