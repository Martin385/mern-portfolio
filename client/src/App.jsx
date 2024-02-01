import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import About from "./pages/About"
import SignUp from "./pages/Signup"
import SignIn from "./pages/Signin"
import Dashboard from "./pages/Dashboard"
import Projects from "./pages/Projects"


export default function App() {
  return (
    
    <BrowserRouter>
      <Routes>
        <Route path="/" element = {<Home></Home>}></Route>
        <Route path="/about" element={<About/>}></Route>
        <Route path="/sign-in" element={<SignIn/>}></Route>
        <Route path="/sign-in" element={<SignUp/>}></Route>
        <Route path="/dashboard" element={<Dashboard/>}></Route>
        <Route path="/projects" element={<Projects/>}></Route>
      </Routes>
    </BrowserRouter>
    )
}
