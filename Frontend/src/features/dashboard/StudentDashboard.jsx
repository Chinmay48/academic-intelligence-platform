import React from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import useAuth from "../../hooks/useAuth";
import WelcomeBanner from "../../components/common/WelcomeBanner";
import DashboardCard from "../../components/common/DashboardCard";

import { BookOpen, Database, Sparkles, Building2 } from "lucide-react";

function StudentDashboard() {
  const { user } = useAuth();

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto pb-10">
        <WelcomeBanner />

        {/* CSS Grid handles the responsive layout beautifully */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
          <DashboardCard 
            title="Embedded Docs" 
            value="52" 
            icon={Database} 
            colorTheme="blue"
            delay={0.1}
          />

          <DashboardCard
            title="Active Subjects"
            value="8"
            icon={BookOpen}
            colorTheme="green"
            delay={0.2}
          />

          <DashboardCard
            title="AI Answers"
            value="24"
            icon={Sparkles} // Sparkles fits the "AI-generated" vibe perfectly
            colorTheme="purple"
            delay={0.3}
          />

          <DashboardCard
            title="Department"
            value="CSE"
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