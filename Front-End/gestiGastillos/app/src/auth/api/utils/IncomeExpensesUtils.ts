import { MovementItem } from "../IncomeExpensesServices";

// Función para calcular los balances
export const calculateTotals = (items: {incomes: MovementItem[], expenses: MovementItem[]}) => {
  const incomes = items.incomes;
  const expenses = items.expenses;

  const totalIncomes = incomes.reduce((acc, income) => acc + income.amount, 0);
  const totalExpenses = expenses.reduce((acc, expense) => acc + expense.amount, 0);
  const balance = totalIncomes - totalExpenses;

  const highestIncome = incomes.reduce(
    (max, income) => (income.amount > max.amount ? income : max),
    { amount: 0, concept: "" }
  );

  const highestExpense = expenses.reduce(
    (max, expense) => (expense.amount > max.amount ? expense : max),
    { amount: 0, concept: "" }
  );

  return { totalIncomes, totalExpenses, balance, highestIncome, highestExpense };
};

// Función para generar el PDF
export const generateHTMLReport = (items: {incomes: MovementItem[], expenses: MovementItem[]}, calculateTotals: Function) => {
  const { totalIncomes, totalExpenses, balance, highestIncome, highestExpense } = calculateTotals(items);

  const modifyConcept = (concept: string) => {
    if (concept === "EDUCATION") {
      return concept.replace("EDUCATION", "Educacion");
    } else if (concept === "ENTRETAIMENT") {
      return concept.replace("ENTRETAIMENT", "Entretenimiento");
    }

    return concept;
  };

  const incomeRows = items.incomes.map(
    (income) => `
    <tr>
      <td>${income.date}</td>
      <td>${income.amount}</td>
      <td>${income.concept}</td>
      <td>${modifyConcept(income.category)}</td>
    </tr>`
  ).join("");

  const expenseRows = items.expenses.map(
    (expense) => `
    <tr>
      <td>${expense.date}</td>
      <td>${expense.amount}</td>
      <td>${expense.concept}</td>
      <td>${modifyConcept(expense.category)}</td>
    </tr>`
  ).join("");

  return `
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; padding: 20px; }
          h1 { text-align: center; color: #0078FF; }
          table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
          table, th, td { border: 1px solid #ddd; }
          th, td { padding: 8px; text-align: left; }
          th { background-color: #f4f4f4; }
        </style>
      </head>
      <body>
        <h1>Reporte de gastos</h1>
        <h2>Ingresos</h2>
        <table>
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Monto</th>
              <th>Concepto</th>
              <th>Categoría</th>
            </tr>
          </thead>
          <tbody>${incomeRows}</tbody>
        </table>
        <h2>Egresos</h2>
        <table>
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Monto</th>
              <th>Concepto</th>
              <th>Categoría</th>
            </tr>
          </thead>
          <tbody>${expenseRows}</tbody>
        </table>
        <h2>Totales</h2>
        <table>
          <thead>
            <tr>
              <th>Total Ingresos</th>
              <th>Total Egresos</th>
              <th>Balance General</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>${totalIncomes}</td>
              <td>${totalExpenses}</td>
              <td>${balance}</td>
            </tr>
          </tbody>
        </table>
        <h2>Mayores Movimientos</h2>
        <table>
          <thead>
            <tr>
              <th>Ingreso Más Alto</th>
              <th>Egreso Más Alto</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>${highestIncome.concept}-${highestIncome.amount}</td>
              <td>${highestExpense.concept}-${highestExpense.amount}</td>
            </tr>
          </tbody>
        </table>
      </body>
    </html>`;
};
