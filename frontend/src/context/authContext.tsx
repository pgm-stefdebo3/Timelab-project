import React, { createContext, useContext, useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import axios, { HttpStatusCode } from "axios";
import { useNavigate } from "react-router-dom";

export type LoginProps = {
    username: string;
    password: string;
};

export interface AuthContextData {
    authenticated: boolean;
    user: object | null;
    authLoading: boolean;
    Login: ({}: LoginProps) => Promise<number | undefined>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider = ({ children }: any) => {
    const [authLoading, setAuthLoading] = useState<boolean>(true);
    const [user, setUser] = useState<object | null>(null);
    useEffect(() => {
        async function getLocalToken() {
        const jwtToken = localStorage.getItem("jwt-token"); // name needs to be put into env file
        const user = (jwtToken? jwtDecode(jwtToken): null)
        if (user && jwtToken) {
            setUser(user);
        }
        setAuthLoading(false);
    }
    
        getLocalToken();
    }, []);
    const Login = async ({ username, password }: LoginProps) => {
        const token = await axios.post('https://royalmarkt-api.herokuapp.com/login',{ // link needs to go into env
        username,
        password
        })
        if (token) {
            localStorage.setItem('jwt-token', JSON.stringify(token?.data?.access_token)) // name needs to go into env
            const jwtToken = localStorage.getItem("jwt-token"); // name needs to be put into env file
            const user = (jwtToken? jwtDecode(jwtToken): null)
            if (user && jwtToken) {
                setUser(user);
            }
            setAuthLoading(false);
            return token.status;
        }
    }

    return (
        <AuthContext.Provider value={{ authenticated: !!user, authLoading, user, Login }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    return useContext(AuthContext);
};