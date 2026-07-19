import { data } from "react-router-dom";
import api from "../utils/axios";

export const getAllDepartments=async()=>{
    const response=await api.get("/department");
    return response.data;
}

export const createDepartment=async(data)=>{
    const response=await api.post("/department",data)
    return response.data;
}
export const updateDepartment = async (id, data) => {
    const response = await api.put(`/department/${id}`, data);
    return response.data;
};

export const deleteDepartment = async (id) => {
    await api.delete(`/department/${id}`);
};