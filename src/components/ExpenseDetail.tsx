import { useMemo } from "react"
// import para la dependencia react-swipeable-list
// import {
//   LeadingActions,
//   SwipeableList,
//   SwipeableListItem,
//   SwipeAction,
//   TrailingActions
// } from 'react-swipeable-list'
import { formatDate } from "../helpers"
import { Expense } from "../types"
import AmountDisplay from "./AmountDisplay"
import { categories } from "../data/categories"
import { useBudget } from "../hooks/useBudget"
// estilos para react-swipeable-list
import "react-swipeable-list/dist/styles.css"


type ExpenseDetailProps = {
  expense: Expense
}

export default function ExpenseDetail({expense}: ExpenseDetailProps) {

  const {dispatch} = useBudget()

  // se hace un filtro en categories (en data) y se dice que si el cat.id === a expense.category entonces trae ese elemento del objeto en un array en la posicion 0.
  const categoryInfo = useMemo(() => categories.filter(cat => cat.id === expense.category)[0], [expense])


  // funcion que ejecuta lo que ocurra al arrastrar hacia la derecha (en este caso Actualizar) - sitaxis para esta dependencia
  // const leadingActions = () => ( // parentesis ya que son componentes
  //   <LeadingActions>
  //     <SwipeAction
  //       onClick={() => dispatch({type: 'get-expense-by-id', payload: {id: expense.id}})}
  //     >
  //       Actualizar
  //     </SwipeAction>
  //   </LeadingActions>
  // )

  // funcion que ejecuta lo que ocurra al arrastrar hacia la izquierda (en este caso Eliminar) - sitaxis para esta dependencia
  // const trailingActions = () => ( // parentesis ya que son componentes
  //   <TrailingActions>
  //     <SwipeAction
  //       onClick={() => dispatch({type: 'remove-expense', payload: {id: expense.id}}) }
  //       destructive={true}
  //     >
  //       Eliminar
  //     </SwipeAction>
  //   </TrailingActions>
  // )


  // se coloca el contenido del componente dentro de SwipeableList y SwipeableListItem (ambos importados arriba)
  return (
    // <SwipeableList>
    //   <SwipeableListItem
    // // Pixeles que se van a recorrer para que se disparen las acciones
    //     maxSwipe={1}
    //     leadingActions={leadingActions()} // arrastrar al lado derecho que va a pasar? - codigo aqui 
    //     trailingActions={trailingActions()} // arrastrar al lado izquierdo que va a pasar? - codigo aqui
    //   >
        <div className="flex items-center w-full gap-5 p-10 bg-white border-b border-gray-200">

          <div>
            <img 
              src={`/icono_${categoryInfo.icon}.svg`} 
              alt="icono gasto"
              className="w-20" 
            />
          </div>

          <div className="flex-1 space-y-2">
            <p className="text-sm font-bold uppercase text-slate-500">{categoryInfo.name}</p>
            <p>{expense.expenseName}</p>
            {expense.date ? (
              <p className="text-sm text-slate-600">{formatDate(expense.date!.toString())}</p>
            ) : (
              <p>Algun tipo de error</p>
            )}
          </div>

          <div className="flex flex-col items-center gap-2">
            <AmountDisplay 
              amount={expense.amount}
            />
            <div className="space-x-2 text-sm">
              <button
                onClick={() => dispatch({type: 'get-expense-by-id', payload: {id: expense.id}})}
                className="px-2 text-blue-700 hover:underline"
              >Actualizar</button>
              <button
                onClick={() => dispatch({type: 'remove-expense', payload: {id: expense.id}})} 
                className="px-2 text-red-700 hover:underline"
              >Eliminar</button>
            </div>
          </div>

            

        </div>
    //   </SwipeableListItem>
    // </SwipeableList>
    
  )
}
