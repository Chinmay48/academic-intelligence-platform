import api from "../utils/axios";
export const getAnalyticsDashboard=async(subjectName)=>{
    const response =await api.get(`/analytics/${encodeURIComponent(subjectName)}/dashboard`)
    return response.data;
}