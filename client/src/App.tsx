import { Header } from "./components/header"
import { Footer } from "./components/footer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./pages/home";
import { About } from "./pages/about-page";
import { ThemeProvider, ThemeContext } from "./contexts/theme-context";
import { useContext } from "react";

// Separate component that uses the context
function AppContent() {
  const {theme} = useContext(ThemeContext);
  
  return (
    <div className={theme}>
      <Router>
        <Header/>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/about" element= {<About/>} />
        </Routes>
        <Footer/>
      </Router>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  )
}

export default App
