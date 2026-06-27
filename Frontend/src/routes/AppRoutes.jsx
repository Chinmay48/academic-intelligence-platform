import {Routes,Route} from "react-router-dom"
function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<h1>Login</h1>}/>
      <Route path="/register" element={<h1>Register</h1>}/>
      <Route path="/student" element={<h1>Student Dashboard</h1>}/>
      <Route path="/faculty" element={<h1>Faculty Dashboard</h1>}/>
      <Route path="/admin" element={<h1>Admin Dashboard</h1>}/>
      
    </Routes>
  )
}

export default AppRoutes
