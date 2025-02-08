// import { ReactNode } from "react"
// tambien se puede usar directamente el siguiente import y colocarlo en el type de las props
import { PropsWithChildren } from "react"

// type ErrorMessageProps = {
//   children: ReactNode // ReactNode permite renderizar strings y permite renderizar componentes dentro de otros componentes
// }

export default function ErrorMessage({children} : PropsWithChildren /*ErrorMessageProps*/ ) {
  return (
    <p className="p-2 text-sm font-bold text-center text-white bg-red-600">
      {children}
    </p>
  )
}
