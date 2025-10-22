// File: my-app/actions/update-budget.js
export async function updateBudget(amount) {
  try {
    const res = await fetch("/api/update-budget", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount }),
    });

    if (!res.ok) throw new Error("Failed to update budget");
    return await res.json();
  } catch (error) {
    console.error("Error updating budget:", error);
    throw error;
  }
}
