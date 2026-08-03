import React, { use } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import useAuth from "../../hooks/useAuth";
import {
  User,
  Mail,
  Shield,
  Building2,
  GraduationCap
} from "lucide-react";

function Profile() {

  const { user } = useAuth();

  const roleMap = {
    ADMIN: "Administrator",
    FACULTY: "Faculty",
    STUDENT: "Student",
  };

  const yearMap = {
    1: "First Year",
    2: "Second Year",
    3: "Third Year",
    4: "Fourth Year",
  };
 
  if (!user) {
    return (
      <DashboardLayout>
        <div className="text-center py-20 text-slate-500">
          Loading profile...
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>

      <div className="max-w-4xl mx-auto pb-10">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800">
            My Profile
          </h1>

          <p className="text-slate-500 mt-2">
            View your account and academic information.
          </p>
        </div>

        {/* Profile Card */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">

          {/* Top section */}
          <div className="p-8 border-b border-slate-100 flex items-center gap-5">

            <div className="w-20 h-20 rounded-full bg-blue-600 text-white flex items-center justify-center text-3xl font-bold">
              {user.name?.charAt(0).toUpperCase()}
            </div>

            <div>
              <h2 className="text-2xl font-bold text-slate-800">
                {user.name}
              </h2>

              <p className="text-slate-500 mt-1">
                {roleMap[user.role]}
              </p>
            </div>

          </div>

          {/* Information */}
          <div className="p-8">

            <h3 className="text-lg font-semibold text-slate-800 mb-6">
              Account Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              <ProfileField
                icon={User}
                label="Full Name"
                value={user.name}
              />

              <ProfileField
                icon={Mail}
                label="Email Address"
                value={user.email}
              />

              <ProfileField
                icon={Shield}
                label="Role"
                value={roleMap[user.role]}
              />

              {user.role !== "ADMIN" && (
                <ProfileField
                  icon={Building2}
                  label="Department"
                  value={user.department}
                />
              )}

              {user.role === "STUDENT" && (
                <ProfileField
                  icon={GraduationCap}
                  label="Academic Year"
                  value={yearMap[user.year] || "-"}
                />
              )}

            </div>

          </div>

        </div>

      </div>

    </DashboardLayout>
  );
}

function ProfileField({ icon: Icon, label, value }) {
  return (
    <div className="border border-slate-200 rounded-xl p-4">

      <div className="flex items-center gap-3">

        <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center">
          <Icon size={19} className="text-slate-500" />
        </div>

        <div>
          <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">
            {label}
          </p>

          <p className="text-slate-800 font-medium mt-1">
            {value || "-"}
          </p>
        </div>

      </div>

    </div>
  );
}

export default Profile;