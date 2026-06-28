import api from "../utils/axios";

export const login=(data)=>{
    return api.post("/auth/login",data);
}

export const register=(data)=>{
    return api.post("/auth/register",data)
}

export const getCurrentUser=()=>{
    return api.get("/auth/accounts/me");
}