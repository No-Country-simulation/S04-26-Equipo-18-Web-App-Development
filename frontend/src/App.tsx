import AppRouter from "./app/router"
import { SnackbarProvider } from "notistack";


function App() {

  return (
    <div className="font-sans">
      <AppRouter />
      <SnackbarProvider />
    </div>
  )
}

export default App
