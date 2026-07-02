import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import useAuth from "../../hooks/useAuth";
import WelcomeBanner from "../../components/common/WelcomeBanner";
import DashboardCard from "../../components/common/DashboardCard";

import { BookOpen, Database, Newspaper, Building2 } from "lucide-react";
import { getStudentDashboard } from "../../services/dashboardService";
import { showError } from "../../utils/toast";

function StudentDashboard() {
  const { user } = useAuth();
  const[dashboard,setDashboard]=useState(null);
  const[loading,setLoading]=useState(false);
  useEffect(()=>{
     loadDashboard();
  },[])

  const loadDashboard=async()=>{
    setLoading(true);
    try {
      const response=await getStudentDashboard();
      setDashboard(response);

    } catch (error) {
      showError(error.message || "Error fetching dashboard details");
    }
    finally{
      setLoading(false);
    }

  }

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto pb-10">
        <WelcomeBanner />

        {/* CSS Grid handles the responsive layout beautifully */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
          <DashboardCard 
            title="Embedded Docs" 
            value={dashboard?.documents ?? 0} 
            icon={Database} 
            colorTheme="blue"
            delay={0.1}
          />

          <DashboardCard
            title="Active Subjects"
            value={dashboard?.subjects ?? 0} 
            icon={BookOpen}
            colorTheme="green"
            delay={0.2}
          />

          <DashboardCard
            title="Questions Papers"
            value={dashboard?.questionPapers ?? 0}
            icon={Newspaper} 
            colorTheme="purple"
            delay={0.3}
          />

          <DashboardCard
            title="Department"
            value={dashboard?.department.substring(0,4) ?? "CSE"} 
            icon={Building2}
            colorTheme="orange"
            delay={0.4}
          />
        </div>
      </div>
    </DashboardLayout>
  );
}

export default StudentDashboard;