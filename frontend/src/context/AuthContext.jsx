import { createContext, useState, useEffect } from "react";
const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);

    // Check if token exists on load
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            setUser({ token }); // Setting a dummy user object to represent logged-in state
        }
    }, []);

    const login = (token) => {
        localStorage.setItem("token", token);
        setUser({ token });
    };

    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContext;