// import de barra circular con su constructor de estilos (para cambiar estilos, colores, etc...)
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import "react-circular-progressbar/dist/styles.css"

import { useBudget } from "../hooks/useBudget";
import AmountDisplay from "./AmountDisplay";

export default function BudgetTracker() {

  const {state, totalExpenses, remainingBudget, dispatch} = useBudget()
/* 
  const {state} = useBudget()

  // Calcula la suma total de los montos (`amount`) de todos los gastos en `state.expenses`.
  // Utiliza el hook `useMemo` para memorizar el cálculo y evitar recalcularlo innecesariamente 
  // si el arreglo `state.expenses` no ha cambiado. El método `reduce` recorre cada gasto, 
  // acumulando su monto (`expense.amount`) en el total, comenzando desde 0.
  const totalExpenses = useMemo(() => state.expenses.reduce((total, expense) => expense.amount + total, 0 ) , [state.expenses] )

  // cuanto queda del presupuesto
  const remainingBudget = state.budget - totalExpenses
*/

  // variable porcentaje que calcula el porcentaje de cuanto se gasta
  const percentage = +((totalExpenses / state.budget) * 100).toFixed(2) // toFixed(numero) son cuantos decimales se mostraran luego de la coma

  
  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
      <div className="flex justify-center">
        <CircularProgressbar 
          value={percentage}
          styles={buildStyles({
            pathColor: percentage >= 80 ? '#DC2626' : percentage >= 60 ? '#facc15' : '#3b82f6',
            trailColor: '#F5F5F5',
            textSize: 8,
            textColor: percentage >= 80 ? '#DC2626' : percentage >= 60 ? '#facc15' : '#3b82f6'
          })}
          text={`${percentage}% Gastado`}
        />
      </div>
      
      <div className="flex flex-col items-center justify-center gap-8">
        <button
          type="button"
          className="w-full p-2 font-bold text-white uppercase bg-pink-600 rounded-lg"
          onClick={() => dispatch({type: 'reset-app'})}
        > 
          Resetear App
        </button>
        
        <AmountDisplay 
          label="Presupuesto"
          amount={state.budget}
        />

        <AmountDisplay 
          label="Disponible"
          amount={remainingBudget}
        />

        <AmountDisplay 
          label="Gastado"
          amount={totalExpenses}
        />
        
      </div>
    </div>
  )
}
