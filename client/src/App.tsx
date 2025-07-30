import { Header } from "./components/header"
import { Footer } from "./components/footer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./pages/home";
import { About } from "./pages/about-page";
function App() {
  
  return (
    <>
    <div className="dark">
    <Router>
      <Header/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/about" element= {<About/>} />
        
       
      </Routes>
   <Footer/>
   </Router>
   </div>
    </>
  )
}

export default App
