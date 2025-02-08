import { formatCurrency } from "../helpers"

type AmountDisplayProps = {
  label?: string, // el ? significa que puede o no puede estar este prop es decir que no es obligatorio
  amount: number
}

export default function AmountDisplay({label, amount}: AmountDisplayProps) {
  return (
    <p className="text-2xl font-bold text-blue-600">
      { label && `${label} : `}
      <span className="font-black text-black">{formatCurrency(amount)}</span>
    </p>
  )
}
