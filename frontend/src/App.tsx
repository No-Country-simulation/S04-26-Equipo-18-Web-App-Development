import { BrowserRouter, Routes, Route } from "react-router-dom"

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<div className="container text-center font-light mx-auto text-4xl font-bold">Welcome to NorthPay</div>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
