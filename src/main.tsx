import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
// importar
import { BudgetProvider } from './context/BudgetContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* Se agrega el Provider de BudgetContext y su children debe ser App */}
    <BudgetProvider>
      <App />
    </BudgetProvider>
  </StrictMode>,
)
