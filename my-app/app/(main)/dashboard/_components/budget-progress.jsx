"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";

const BudgetProgress = ({ initialBudget, currentExpenses }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newBudgetAmount, setNewBudget] = useState(
    initialBudget?.amount?.toString() || ""
  );

  const percentUsed = initialBudget
    ? (currentExpenses / initialBudget.amount) * 100
    : 0;

  const handleUpdateBudget = () => {
    // Call your updateBudget action here
    console.log("Updated budget:", newBudgetAmount);
    setIsEditing(false);
  };

  return (
    <Card>
      <CardHeader className="flex justify-between items-center">
        <CardTitle>Monthly Budget (Default Account)</CardTitle>
        <div>
          {isEditing ? (
            <div className="flex items-center space-x-2">
              <input
                type="number"
                value={newBudgetAmount}
                onChange={(e) => setNewBudget(e.target.value)}
                className="w-32 border rounded px-2 py-1"
                placeholder="Enter amount"
                autoFocus
              />
              <Button variant="ghost" size="icon" onClick={handleUpdateBudget}>
                <Check />
              </Button>
              <Button variant="ghost" size="icon" onClick={() => setIsEditing(false)}>
                <X />
              </Button>
            </div>
          ) : (
            <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
              Edit
            </Button>
          )}
        </div>
        <CardDescription>Track your monthly budget and expenses</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Total Budget: ${initialBudget?.amount || 0}</p>
        <p>Current Expenses: ${currentExpenses}</p>
        <p>Used: {percentUsed.toFixed(2)}%</p>
      </CardContent>
    </Card>
  );
};

export default BudgetProgress;
