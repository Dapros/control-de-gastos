import { useReducer, createContext, Dispatch, ReactNode, useMemo } from "react"
import { BudgetActions, budgetReducer, BudgetState, initialState } from "../reducers/budget-reducer"

type BudgetContextProps = {
  state: BudgetState
  dispatch: Dispatch<BudgetActions>
  totalExpenses: number,
  remainingBudget: number
}

type BudgetProviderProps = {
  children: ReactNode
}

// Context
export const BudgetContext = createContext<BudgetContextProps>(null!)
// otra forma tambien es:
// export const BudgetContext = createContext<BudgetContextProps>({} as BudgetContextProps)


// Provider
export const BudgetProvider = ({children}: BudgetProviderProps) => {

  const [state, dispatch] = useReducer(budgetReducer, initialState)
  
/* CODIGO TRAIDO DE BudgetTracker.tsx para que sea accedido desde toda la app */

    // Calcula la suma total de los montos (`amount`) de todos los gastos en `state.expenses`.
    // Utiliza el hook `useMemo` para memorizar el cálculo y evitar recalcularlo innecesariamente 
    // si el arreglo `state.expenses` no ha cambiado. El método `reduce` recorre cada gasto, 
    // acumulando su monto (`expense.amount`) en el total, comenzando desde 0.
    const totalExpenses = useMemo(() => state.expenses.reduce((total, expense) => expense.amount + total, 0 ) , [state.expenses] )
  
    // cuanto queda del presupuesto
    const remainingBudget = state.budget - totalExpenses

  // Conexion del context con el provider
  return (
    <BudgetContext.Provider
      value={{
        state,
        dispatch,
        totalExpenses,
        remainingBudget
      }}
    >
      {children}
    </BudgetContext.Provider>
  )
}