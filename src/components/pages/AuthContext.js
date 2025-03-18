import { createContext, useContext, useState, useEffect } from "react";

// Create context
const AuthContext = createContext();

// Custom hook for easy access
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [userUSN, setUserUSN] = useState(localStorage.getItem("userUSN") || null);

    // Function to log in (store USN)
    const login = (usn) => {
        setUserUSN(usn);
        localStorage.setItem("userUSN", usn);
    };

    // Function to log out
    const logout = () => {
        setUserUSN(null);
        localStorage.removeItem("userUSN");
    };

    return (
        <AuthContext.Provider value={{ userUSN, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
