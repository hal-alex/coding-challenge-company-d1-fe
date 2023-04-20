import { BrowserRouter, Routes, Route } from "react-router-dom"
import Homepage from "./pages/Homepage"
import Elevator from "./pages/Elevator"
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage></Homepage>}></Route>
        <Route
          path="/elevator/:elevatorId"
          element={<Elevator></Elevator>}
        ></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
