import React, { useState, useEffect } from "react";
import { auth } from "../firebase";

export const AuthContext = React.createContext();

// Here children are nothing but the components which will be passed
// inside the <AuthProvider></AuthProvider> Component
// So, whatever components will be wrapped will have the access to the context.
export function AuthProvider({children}) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [isAuthenticated, setAuthenticated] = useState(false);
    async function signup (email, password) {
       const response = await auth.createUserWithEmailAndPassword(email, password);
       setAuthenticated(true);
       sessionStorage.setItem('isAuthenticated', true);
       return response;
    }

    async function login (email, password) {
        const response = await auth.signInWithEmailAndPassword(email, password);
        setAuthenticated(true);
        sessionStorage.setItem('isAuthenticated', true);
        return response;
    }

    async function logout() {
        const response = await auth.signOut();
        setAuthenticated(false);
        sessionStorage.setItem('isAuthenticated', false);
        return response;
    }

    useEffect(() => {
        const unsub = auth.onAuthStateChanged((user) => {
            setUser(user);
            setLoading(false);
        })
        return () => {
            unsub();
        }
    }, [])

    const store = {
        user, isAuthenticated, signup, login, logout
    };

    return (
        <AuthContext.Provider value={store}>
            {!loading && children}
        </AuthContext.Provider>
    )
}