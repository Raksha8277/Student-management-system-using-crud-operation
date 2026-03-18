import { BrowserRouter, Routes, Route } from "react-router-dom"
import Students from "./components/Students"
import CreateStudent from "./components/CreateStudent"
import UpdateStudent from "./components/UpdateStudent"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Students />} />
        <Route path="/create" element={<CreateStudent />} />
        <Route path="/update/:id" element={<UpdateStudent />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
