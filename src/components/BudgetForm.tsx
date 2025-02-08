import { useMemo, useState } from "react"
import { FormEvent } from "react"
import { useBudget } from "../hooks/useBudget"

export default function BudgetForm() {

  const [budget, setBudget] = useState(0)
  // gustom hook es una objeto {} y no un array []
  const {dispatch} = useBudget()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBudget(+e.target.value)
    // setBudget(e.target.valueAsNumber)
  }

  const isValid = useMemo(() => {
    //cada vez que budget cambie, si el valor del input butget es 0 o no hay nada en ese input, va a retornar falso para deshabilitar el input submit
    return isNaN(budget) || budget <= 0
  }, [budget])

  const handleSubmit = (e : FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch({type: 'add-budget', payload: {budget}})
  }

  return (
    <>
      <form className="space-y-5" onSubmit={handleSubmit}>
        <div className="flex flex-col space-y-5">
          <label htmlFor="budget" className="text-4xl font-bold text-center text-blue-600">
            Definir Presupuesto
          </label>
          <input 
            id="budget"
            type="number" 
            className="w-full p-2 bg-white border border-gray-200"
            placeholder="Define tu presupuesto"
            name="budget"
            value={budget}
            onChange={handleChange}
          />
        </div>

        <input 
          type="submit" 
          value='Definir Presupuesto'
          className="w-full p-2 font-black text-white uppercase bg-blue-600 cursor-pointer hover:bg-blue-700 disabled:opacity-40"
          disabled={isValid}
        />

      </form>
    </>
  )
}
