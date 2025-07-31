import { createContext, useState } from "react";

interface ThemeContextType {
  theme: string;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType>({
  theme: "light",
  toggleTheme: () => {},
});

export const ThemeProvider = ({children}: {children: React.ReactNode}) => {
    
  const [theme, setTheme] = useState("dark");
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };
  
  return <ThemeContext.Provider value={{theme, toggleTheme}}>{children}</ThemeContext.Provider>;
};

