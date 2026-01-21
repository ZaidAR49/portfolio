import { createContext, useState } from "react";

interface secretKeyContextType {
    secretKey: string | null;
    setSecretKey: (secretKey: string | null) => void;
}

export const DashbordSecretKeyContext = createContext<secretKeyContextType>(
    { secretKey: null, setSecretKey: () => { } }
);

export const DashbordSecretKeyContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [secretKey, setSecretKeyState] = useState<string | null>(() => {
        return sessionStorage.getItem("dashboardSecretKey");
    });

    const setSecretKey = (key: string | null) => {
        setSecretKeyState(key);
        if (key) {
            sessionStorage.setItem("dashboardSecretKey", key);
        } else {
            sessionStorage.removeItem("dashboardSecretKey");
        }
    };

    return (
        <DashbordSecretKeyContext.Provider value={{ secretKey, setSecretKey }}>
            {children}
        </DashbordSecretKeyContext.Provider>
    );
};