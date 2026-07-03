import api from "../utils/axios"


export const getSubjects=async(departmentId)=>{
      const response= await api.get(`subjects/department/${departmentId}`)
      return response.data;
}