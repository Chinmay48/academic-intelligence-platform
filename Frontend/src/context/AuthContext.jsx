import { createContext,useEffect,useState } from "react";
import { getCurrentUser } from "../services/authService";
import { getToken,removeToken } from "../utils/token";

const AuthContext=createContext();
export const AuthProvider=({children})=>{
    const[user,setUser]=useState(null);
    
    const[loading,setLoading]=useState(true);
    useEffect(()=>{
        loadUser();
    },[])
    const loadUser=async()=>{
        const token=getToken();
        if(!token){
            setLoading(false);
            return;
        }
        try {
            const response=await getCurrentUser();
        } catch (error) {
            removeToken();
            setUser(null);
        }
        setLoading(false);
    }
    const logout=()=>{
        removeToken();
        setUser(null);
    }
    return(<AuthContext.Provider value={{user,setUser,loading,logout}}>
        {children}
    </AuthContext.Provider>)
}

export default AuthContext;