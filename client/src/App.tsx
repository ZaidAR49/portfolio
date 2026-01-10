import { useContext, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Header } from "./components/header"
import { Footer } from "./components/footer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./pages/home";
import { About } from "./pages/about-page";
import { ThemeProvider, ThemeContext } from "./contexts/theme-context";
import { DashbordSecretKeyContextProvider } from "./contexts/dashbord-secret-key";
import { Dashboard } from "./pages/dashboard";
import { useLocation } from "react-router-dom";
import { getUser } from "./data/portfolio-data";
import { useState } from "react";
import { toast } from "react-toastify";
// Separate component that uses the context
function AppContent() {
  const location = useLocation();
  const { theme } = useContext(ThemeContext);
  const isDashboard = location.pathname === '/dashboard';
  const [userInfo, setUserInfo] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  // Apply theme class to html element for proper background styling
  useEffect(() => {
    getUser().then((user) => {
      setUserInfo(user);
      setIsLoading(false);
    }).catch((error) => {
      console.log(error);
      toast.error("Failed to load user data");
      setIsLoading(false);
    })
  }, [])

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
      {!isDashboard && <Footer userInfo={userInfo} />}
      <ToastContainer position="bottom-right" theme="dark" />
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
