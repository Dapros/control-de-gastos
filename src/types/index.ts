export type Expense = {
  id: string,
  expenseName: string,
  amount: number,
  category: string,
  date: Value
}

// DraftExpense es un type que va a tomar todos los tipos de Expense menos el id
export type DraftExpense = Omit<Expense, 'id'>

type ValuePiece = Date | null;
export type Value = ValuePiece | [ValuePiece, ValuePiece];

export type Category = {
  id: string,
  name: string,
  icon: string
}