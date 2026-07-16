import api from "../utils/axios";
export const getAnalyticsDashboard=async(subjectName)=>{
    const response =await api.get(`/analytics/dashboard?subject=${encodeURIComponent(subjectName)}`);
    return response.data;
}