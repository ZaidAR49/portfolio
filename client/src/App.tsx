import { useContext, useEffect } from "react";
import { Header } from "./components/header"
import { Footer } from "./components/footer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./pages/home";
import { About } from "./pages/about-page";
import { ThemeProvider, ThemeContext } from "./contexts/theme-context";
import { DashbordSecretKeyContextProvider } from "./contexts/dashbord-secret-key";
import { Dashboard } from "./pages/dashboard";
import { useLocation } from "react-router-dom";
// Separate component that uses the context
function AppContent() {
  const location = useLocation();
  const { theme } = useContext(ThemeContext);
  const isDashboard = location.pathname === '/dashboard';

  // Apply theme class to html element for proper background styling
  useEffect(() => {
    document.documentElement.className = theme;
  }, [theme]);

  return (
    <div className={theme}>

      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
      {!isDashboard && <Footer />}

    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <DashbordSecretKeyContextProvider>
        <Router>
          <AppContent />
        </Router>
      </DashbordSecretKeyContextProvider>
    </ThemeProvider>
  )
}

export default App
