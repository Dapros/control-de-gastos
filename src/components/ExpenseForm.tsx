import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import type { DraftExpense, Value } from "../types";
import { categories } from "../data/categories";
// dependencia DatePicker
import DatePicker from 'react-date-picker';
// estilo del calendario de react
import 'react-calendar/dist/Calendar.css'
// hoja de estilos de 'react-date-picker'
import 'react-date-picker/dist/DatePicker.css'
import ErrorMessage from "./ErrorMessage";
import { useBudget } from "../hooks/useBudget";


export default function ExpenseForm() {

  const [expense, setExpense] = useState<DraftExpense>({
    expenseName: '',
    amount: 0,
    category: '',
    date: new Date()
  })

  const [error, setError] = useState('')
  const [previousAmount, setPreviousAmount] = useState(0)
  const {dispatch, state, remainingBudget} = useBudget()

  // useEfect que se ejecuta cuando state.editingId cambie es decir cuando se este actualizando
  useEffect(() => {
    // Este efecto se ejecuta cuando cambia el valor de `state.editingId`.
    if(state.editingId){
      // Busca dentro de la lista de `expenses` el objeto cuyo `id` coincida con `state.editingId`.
      // `filter` devuelve un array con los elementos que cumplen la condición.
      const editingExpnese = state.expenses.filter(currentExpense => currentExpense.id === state.editingId) [0] // Toma el primer (y único) elemento del array resultante, ya que `id` es único.
      // Actualiza el estado local `expense` con el gasto que se está editando.
      setExpense(editingExpnese)
      setPreviousAmount(editingExpnese.amount)
    }
  }, [state.editingId]) // El efecto se vuelve a ejecutar cada vez que `state.editingId` cambia.

  // escribir en inputs
  const handleChange = (e : ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
    // toma el name y el value de e.target, es decir e.target mira en donde  se esta escribiendo y obtiene el name de su respectivo input y obtiene el value de su respectivo input
    const {name, value} = e.target
    // variable constante isAmountField, incluye el name que sea igual a 'amount'
    const isAmountField = ['amount'].includes(name)
    // seteo del estado expense
    setExpense({
      // copia del state
      ...expense,
      // para el name, definido en el distructuring de la linea 23. asigna un ternario el cual dice que si isAmountField es verdadero entonces el value lo convertira a number, sino sera el mismo string (value es el tomado en la misma linea 23) 
      [name] : isAmountField ? +value : value // esto garantiza que se transforme a number el value capturado por el input con el name 'amount' y el resto de inputs que detecte seguiran siendo de tipo string
    }) 
  }

  // escribir en date
  // funcion que captura el cambio de date, toma como parametro el value obtenido en el onchange del input que tiene dentro el import Date. como se ve en parametros value es de tipo Value (importado de types/index.ts) y esta funcion setea el expense con la copia de lo que tiene el estado expense y le asigna a date el value obtenido de input
  const handleChangeDate = (value : Value) => {
    setExpense({
      ...expense,
      date: value
    })
  }

  //cuando se envie el formulario
  const handleSubmit = (e : FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    // validar - Aqui ocurre la validacion
    // Object.values(expense) : obtiene un array de los valores de todas las propiedades del objeto expense - .includes('') : verifica si alguno de estos valores es una cadena vacia. Si alguno de los valores en el objeto expense es una cadena vacia, la condicion sera verdadera y ejecutara el bloque de codigo dentro del if. 
    if(Object.values(expense).includes('')){ 
      setError('Todos los campos son obligatorios')
      return
    }

    //validar que no me pase del limite y evitar numeros negativos
    if((expense.amount - previousAmount ) > remainingBudget){
      setError('Ese gasto se sale del presupuesto')
      return
    }

    // Al no haber cadenas vacias se ejecutara esto!
    // Agregar un nuevo gasto

    //agregar o actualizar el gasto
    if(state.editingId){
      // Si existe un ID en `state.editingId`, significa que se está editando un gasto existente.
      dispatch({type: 'update-expense', payload: {expense: {id: state.editingId, ...expense}}}) // Dispara una acción para actualizar el gasto existente. id: state.editingId asegura de incluir el ID del gasto que está siendo editado. ...expense Combina las nuevas propiedades del gasto (almacenadas en `expense`) con el ID.
    } else {
      dispatch({type: 'add-expense', payload: { expense }})
    }
    
    // reiniciar el state
    setExpense({
      expenseName: '',
      amount: 0,
      category: '',
      date: new Date()
    })
    setPreviousAmount(0)
  }
  

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <legend
        className="py-2 text-2xl font-black text-center uppercase border-b-4 border-blue-500"
      >{state.editingId ? 'Guardar Cambios' : 'Nuevo Gasto' }</legend>

      {/* ATENCION AQUI! - Diferente sintaxis */}
      { error && <ErrorMessage>{error}</ErrorMessage> }
      
      <div className="flex flex-col gap-2">
        <label 
          htmlFor="expenseName"
          className="text-xl"
        >
          Nombre Gasto:</label>
        <input 
          type="text"
          id="expenseName" 
          placeholder="Añade el Nombre del gasto"
          className="p-2 bg-slate-100"
          name="expenseName"
          value={expense.expenseName}
          onChange={handleChange}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label 
          htmlFor="amount"
          className="text-xl"
        >
          Cantidad:</label>
        <input 
          type="number"
          id="amount" 
          placeholder="Añade la cantidad del gasto: ej. 300"
          className="p-2 bg-slate-100"
          name="amount"
          value={expense.amount}
          onChange={handleChange}
        />
      </div>
      
      <div className="flex flex-col gap-2">
        <label 
          htmlFor="category"
          className="text-xl"
        >
          Categoria:</label>
        <select
          id="category"
          className="p-2 bg-slate-100"
          name="category"
          value={expense.category}
          onChange={handleChange}
        >
          <option value="">-- Seleccione --</option>
          {categories.map(category => (
            <option
              key={category.id}
              value={category.id}
            >{category.name}</option>
          ))}
        </select> 
      </div>

      <div className="flex flex-col gap-2">
        <label 
          htmlFor="amount"
          className="text-xl"
        >
          Fecha Gasto:</label>
        <DatePicker 
          className="p-2 border-0 bg-slate-100"
          value={expense.date}
          onChange={handleChangeDate}
        />
      </div>

      <input 
        type="submit"
        className="w-full p-2 font-bold text-white uppercase bg-blue-600 rounded-lg cursor-pointer"
        value={state.editingId ? 'Guardar Cambios' : 'Registrar Gasto'}
        
      />
            
    </form>
  )
}
