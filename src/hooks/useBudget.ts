import { useContext } from "react"
import { BudgetContext } from "../context/BudgetContext"


export const useBudget = () => {
  const context = useContext(BudgetContext)
  //buena practica al crear gustom hooks con context
  if(!context){
    // asegura que tenga un provider en main.tsx - este error mostrara que falta el provider en main.tsx
    throw new Error('useBudget must be used within a BudgetProvider')
  }
  return context
}