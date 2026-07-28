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
import UploadDocument from "../features/documents/UploadDocument";
import StudentChat from "../features/chat/StudentChat";
import UploadPYQ from "../features/pyq/UploadPYQ";
import StudentAnalytics from "../features/analytics/StudentAnalytics";
import DepartmentManagement from "../features/department/DepartmentManagement";
import SubjectManagement from "../features/subject/SubjectManagement";
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
      <Route path="/admin/dashboard" element={<ProtectedRoute>
        <RoleRoute allowedRoles={[ROLE.ADMIN]}>
             <AdminDashboard/>
        </RoleRoute>
      </ProtectedRoute>}/>
      <Route path="/faculty/upload-document" element={<ProtectedRoute>
        <RoleRoute allowedRoles={[ROLE.FACULTY]}>
             <UploadDocument/>
        </RoleRoute>
      </ProtectedRoute>}/>
       <Route path="/student/chat" element={<ProtectedRoute>
        <RoleRoute allowedRoles={[ROLE.STUDENT]}>
            <StudentChat/>
        </RoleRoute>
      </ProtectedRoute>}/>
      <Route path="/faculty/upload-pyq" element={<ProtectedRoute>
        <RoleRoute allowedRoles={[ROLE.FACULTY]}>
             <UploadPYQ/>
        </RoleRoute>
      </ProtectedRoute>}/>
      <Route path="/student/pyq-analysis" element={<ProtectedRoute>
        <RoleRoute allowedRoles={[ROLE.STUDENT]}>
            <StudentAnalytics/>
        </RoleRoute>
      </ProtectedRoute>}/>
      <Route path="/admin/departments" element={<ProtectedRoute>
        <RoleRoute allowedRoles={[ROLE.ADMIN]}>
            <DepartmentManagement/>
        </RoleRoute>
      </ProtectedRoute>}/>
      <Route path="/admin/subjects" element={<ProtectedRoute>
        <RoleRoute allowedRoles={[ROLE.ADMIN]}>
            <SubjectManagement/>
        </RoleRoute>
      </ProtectedRoute>}/>


      
    </Routes>
  )
}

export default AppRoutes
