import { createContext } from "react";
import { useState } from "react";

interface secretKeyContextType {
    secretKey: string | null;
    setSecretKey: (secretKey: string | null) => void;
}

export const DashbordSecretKeyContext = createContext<secretKeyContextType>(
    { secretKey: null, setSecretKey: () => { } }
);

export const DashbordSecretKeyContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [secretKey, setSecretKey] = useState<string | null>(null);
    return (
        <DashbordSecretKeyContext.Provider value={{ secretKey, setSecretKey }}>
            {children}
        </DashbordSecretKeyContext.Provider>
    );
};