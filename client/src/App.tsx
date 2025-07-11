import { Header } from "./components/header"
import { Footer } from "./components/footer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./pages/home";
function App() {
  
  return (
    <>
    
    <Router>
      <Header/>
      <Routes>
        <Route path="/" element=<Home/> />
        <Route path="/about"  />
        <Route path="/contact"  /> 
       
      </Routes>
   <Footer/>
   </Router>
    </>
  )
}

export default App
