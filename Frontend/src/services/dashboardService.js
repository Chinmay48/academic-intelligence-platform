import api from "../utils/axios"


export const getStudentDashboard=async()=>{
    const response=await api.get("/dashboard/student");
    return response.data;
}

export const getFacultyDashboard=async()=>{
    const response=await api.get("/dashboard/faculty")
    return response.data;
}
export const getAdminDashboard=async()=>{
    const response=await api.get("/dashboard/admin")
    return response.data;
}