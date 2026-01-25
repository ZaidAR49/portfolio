import { createContext, useState, useContext } from "react";

interface StaticModeContextType {
    staticMode: boolean;
    setStaticMode: (mode: boolean) => void;
}

export const StaticModeContext = createContext<StaticModeContextType>({
    staticMode: false,
    setStaticMode: () => { },
});

export const StaticModeProvider = ({ children }: { children: React.ReactNode }) => {
    const [staticMode, setStaticMode] = useState<boolean>(false);

    return (
        <StaticModeContext.Provider value={{ staticMode, setStaticMode }}>
            {children}
        </StaticModeContext.Provider>
    );
};

export const useStaticMode = () => useContext(StaticModeContext);
