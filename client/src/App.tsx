import { useContext, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Header } from "./components/header";
import { Footer } from "./components/footer";
import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom"; // Added Outlet, useNavigate
import { lazy, Suspense } from "react";
const Home = lazy(() => import("./pages/home").then(module => ({ default: module.Home })));
const About = lazy(() => import("./pages/about-page").then(module => ({ default: module.About })));
const Dashboard = lazy(() => import("./pages/dashboard").then(module => ({ default: module.Dashboard })));
const ErrorPage = lazy(() => import("./pages/error-page"));
import { ThemeProvider, ThemeContext } from "./contexts/theme-context";
import { StaticModeProvider } from "./contexts/static-mode-context";
import { getUser } from "./data/portfolio-data";
import { getFromCache, removeUserData, isOwnerModeEnabled } from "./helpers/storage-helper";
import "react-toastify/dist/ReactToastify.css";
import { StaticModeContext } from "./contexts/static-mode-context";
import axios from "axios";
import { logger } from "./helpers/logger.healper";
import { NetworkBackground } from "./components/network-background";
const MainLayout = ({ userInfo }: { userInfo: any }) => (
  <>
    <Header />
    <main>
      <Outlet />
    </main>
    <Footer userInfo={userInfo} />
  </>
);

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
  const { staticMode, setStaticMode } = useContext(StaticModeContext);
  useEffect(() => {
    const testServer = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/health`);
        logger.log(res.data);
        if (res.status === 200) {
          logger.log("Server is running");
          setStaticMode(false);
        } else {
          setStaticMode(true);
        }
      } catch (error) {
        setStaticMode(true);
        return;
      }
    }
    testServer();
    logger.log("staticMode", staticMode);
  }, [staticMode]);
  useEffect(() => {
    if (isOwnerModeEnabled()) {
      removeUserData();
    }
  }, []);
  useEffect(() => {
    const user = getFromCache("user");
    if (user) {
      setUserInfo(user);
    } else {
      getUser()
        .then((user) => {
          setUserInfo(user);
        })
        .catch(() => toast.error("Failed to load user data"));
    }
  }, []);

  useEffect(() => {
    document.documentElement.className = theme;
  }, [theme]);

  return (
    <div className={theme}>
      <NetworkBackground />
      <div className="relative z-10">
        <Suspense fallback={<div className="flex h-screen w-full items-center justify-center"><span className="loading loading-spinner loading-lg text-primary"></span></div>}>
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
        </Suspense>

        <ToastContainer position="bottom-right" theme="dark" />
      </div>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <StaticModeProvider>
        <Router>
          <AppContent />
        </Router>
      </StaticModeProvider>
    </ThemeProvider>
  );
}

export default App;