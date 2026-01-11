import { useContext, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Header } from "./components/header";
import { Footer } from "./components/footer";
import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom"; // Added Outlet, useNavigate
import { Home } from "./pages/home";
import { About } from "./pages/about-page";
import { Dashboard } from "./pages/dashboard";
import ErrorPage from "./pages/error-page"; // Assuming you created this
import { ThemeProvider, ThemeContext } from "./contexts/theme-context";
import { DashbordSecretKeyContextProvider } from "./contexts/dashbord-secret-key";
import { getUser } from "./data/portfolio-data";
import "react-toastify/dist/ReactToastify.css";

// 1. Define the Layouts
// Layout for standard pages (Header + Footer)
const MainLayout = ({ userInfo }: { userInfo: any }) => (
  <>
    <Header />
    <main>
      <Outlet />
    </main>
    <Footer userInfo={userInfo} />
  </>
);

// Layout for Dashboard (Header only, No Footer)
const DashboardLayout = () => (
  <>
    <Header />
    <main>
      <Outlet />
    </main>
  </>
);

function AppContent() {
  const { theme } = useContext(ThemeContext);
  const [userInfo, setUserInfo] = useState<any>(null);

  useEffect(() => {
    getUser()
      .then((user) => setUserInfo(user))
      .catch(() => toast.error("Failed to load user data"));
  }, []);

  useEffect(() => {
    document.documentElement.className = theme;
  }, [theme]);

  return (
    <div className={theme}>
      <Routes>
        <Route element={<MainLayout userInfo={userInfo} />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<ErrorPage />} />
        </Route>

        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>

        <Route path="/error" element={<ErrorPage />} />
      </Routes>

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
  );
}

export default App;