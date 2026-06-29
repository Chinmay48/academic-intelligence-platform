import api from "../utils/axios";

export const getAllDepartments=async()=>{
    const response=await api.get("/department");
    return response.data;
}