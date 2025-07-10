import { Header } from "./components/header"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./pages/home";
function App() {
  
  return (
    <>
    
    <Router>
      <Header></Header>
      <Routes>
        <Route path="/" element=<Home/> />
        <Route path="/about"  />
        <Route path="/contact"  /> 
       
      </Routes>
   
   </Router>
    </>
  )
}

export default App
