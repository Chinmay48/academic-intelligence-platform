import React from 'react'
import DashboardLayout from '../../components/layout/DashboardLayout'
import useAuth from '../../hooks/useAuth'
function StudentDashboard() {
  const {user}=useAuth();
  return (
    <DashboardLayout>
      <h1 className='text-3xl font-bold'>
        Student Dashboard {user.name}
      </h1>
    </DashboardLayout>
  )
}

export default StudentDashboard
