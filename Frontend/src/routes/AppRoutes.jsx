import {Routes,Route} from "react-router-dom"
import Login from "../features/auth/Login"
import Register from "../features/auth/Register"
import StudentDashboard from "../features/dashboard/StudentDashboard"

import ProtectedRoute from "./ProtectedRoutes";
import RoleRoute from "./RoleRoutes";
import {ROLE} from "../utils/constants"
import FacultyDashboard from "../features/dashboard/FacultyDashboard";
import AdminDashboard from "../features/dashboard/AdminDashboard";
import { Navigate } from "react-router-dom";
function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login"/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/student/dashboard" element={<ProtectedRoute>
        <RoleRoute allowedRoles={[ROLE.STUDENT]}/>
        <StudentDashboard/>
      </ProtectedRoute>}/>
      <Route path="/faculty/dashboard" element={<ProtectedRoute>
        <RoleRoute allowedRoles={[ROLE.FACULTY]}>
              <FacultyDashboard/>
        </RoleRoute>
      </ProtectedRoute>}/>
      <Route path="/admin" element={<ProtectedRoute>
        <RoleRoute allowedRoles={[ROLE.ADMIN]}>
             <AdminDashboard/>
        </RoleRoute>
      </ProtectedRoute>}/>
      
    </Routes>
  )
}

export default AppRoutes
