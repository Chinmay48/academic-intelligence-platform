import api from "../utils/axios";

export const login= async(credentials)=>{
   const response= await api.post("/auth/login",credentiqls);
   return response.data;
    
}

export const register= async(credentials)=>{
    const response= await api.post("/auth/register",credentials);
    return response.data;
}

export const getCurrentUser=()=>{
    return api.get("/auth/accounts/me");
}

