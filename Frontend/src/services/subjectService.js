import api from "../utils/axios"


export const getSubjects=async(departmentId)=>{
      const response= await api.get(`subjects/department/${departmentId}`)
      return response.data;
}

export const getAllSubjects=async()=>{
      const response=await api.get("subjects")
      return response.data;
}

export const createSubject=async(data)=>{
      const response= await api.post("subjects",data)
      return response.data;
}

export const updateSubject=async(id,data)=>{
      const response=await api.put(`subjects/${id}`,data);
      return response.data;
}
export const deleteSubject=async(id)=>{
      const response=await api.delete(`subjects/${id}`)
      return response.data;
}