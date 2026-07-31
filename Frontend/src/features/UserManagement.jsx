import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Edit,
  Trash2,
  X,
  Users,
  Filter,
  Loader2,
  Save,
  AlertCircle
} from "lucide-react";

import { getAllUsers,getUserById,updateUser,deleteUser } from "../services/userService";

import { getAllDepartments } from "../services/departementService";
import { showError,showSuccess } from "../utils/toast";
import DashboardLayout from "../components/layout/DashboardLayout";

function UserManagement() {
  
  const [users, setUsers] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [savingUser, setSavingUser] = useState(false);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userToDelete, setUserToDelete] = useState(null);

  // Added 'email' to initial state to prevent React uncontrolled input warnings
  const [formData, setFormData] = useState({
    name: "",
    email: "", 
    role: "",
    departmentId: "",
    year: "",
  });

  // --- ORIGINAL LOGIC ---
  const loadUsers = async () => {
    setLoadingUsers(true);
    try {
      const response = await getAllUsers();
      setUsers(response);
      console.log(response)
    } catch (error) {
      showError("Failed to load users");
      console.log(error)
    } finally {
      setLoadingUsers(false);
    }
  };

  const getYear=(year, role)=>{
        if(role==="ADMIN" || role==="FACULTY") return "NA";
        if(year=="1") return "FE";
        if(year=="2") return "SE";
        if(year=="3") return "TE";
        if(year=="4") return "BE";
  }

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase());
    const matchesRole = roleFilter === "" || user.role === roleFilter;
    const matchesDepartment =
      departmentFilter === "" || user.departmentId === departmentFilter;
    return matchesSearch && matchesRole && matchesDepartment;
  });

  const loadDepartments = async () => {
    try {
      const response = await getAllDepartments();
      setDepartments(response);
    } catch (error) {
      showError("Failed to load departments");
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const openEditModal = (user) => {
    setSelectedUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      role: user.role,
      departmentId: user.departmentId || "",
      year: user.year || "",
    });
    setIsEditing(true);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setIsEditing(false);
    setSelectedUser(null);
    setFormData({
      name: "",
      email: "",
      role: "",
      departmentId: "",
      year: "",
    });
  };

  const handleSave = async () => {
    if (!formData.name.trim()) {
      showError("Name is required");
      return;
    }
    if (!formData.role) {
      showError("Role is required");
      return;
    }
    if (formData.role !== "ADMIN" && !formData.departmentId) {
      showError("Department is required");
      return;
    }
    if (formData.role === "STUDENT" && !formData.year) {
      showError("Year is required");
      return;
    }

    try {
      setSavingUser(true);
      await updateUser(selectedUser.id, {
        name: formData.name,
        email: formData.email,
        role: formData.role,
        departmentId:
          formData.role === "ADMIN" ? null : formData.departmentId,
        year: formData.role === "STUDENT" ? Number(formData.year) : null,
      });
      showSuccess("User updated successfully");
      closeModal();
      loadUsers();
    } catch (error) {
      showError(error.response?.data?.message || "Failed to update user");
    } finally {
      setSavingUser(false);
    }
  };

  const openDeleteModal = (user) => {
    setUserToDelete(user);
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setUserToDelete(null);
    setShowDeleteModal(false);
  };

  const handleDelete = async () => {
    if (!userToDelete) return;
    try {
      await deleteUser(userToDelete.id);
      showSuccess("User deleted successfully");
      closeDeleteModal();
      loadUsers();
    } catch (error) {
      showError(error.response?.data?.message || "Failed to delete user");
    }
  };

  useEffect(() => {
    loadUsers();
    loadDepartments();
  }, []);

  // --- NEW UI RENDERING ---
  return (
    <DashboardLayout>

    
    <div className="min-h-screen bg-slate-50 p-2 md:p-4 font-sans">
      <div className="max-w-7xl mx-auto space-y-2">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-100 text-blue-600 rounded-xl">
              <Users size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-800">User Management</h1>
              <p className="text-sm text-slate-500">Manage directory, roles, and access</p>
            </div>
          </div>
        </div>

        {/* Filters & Search */}
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input
              type="text"
              placeholder="Search by name or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow"
            />
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1 sm:w-48">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none cursor-pointer"
              >
                <option value="">All Roles</option>
                <option value="ADMIN">Admin</option>
                <option value="FACULTY">Faculty</option>
                <option value="STUDENT">Student</option>
              </select>
            </div>
            
            <div className="relative flex-1 sm:w-48">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <select
                value={departmentFilter}
                onChange={(e) => setDepartmentFilter(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none cursor-pointer"
              >
                <option value="">All Departments</option>
                {departments.map((dept) => (
                  <option key={dept.id} value={dept.id}>
                    {dept.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Data Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold text-sm">
                  <th className="p-4 py-5">User</th>
                  <th className="p-4 py-5">Role</th>
                  <th className="p-4 py-5">Department</th>
                  <th className="p-4 py-5">Year</th>
                  <th className="p-4 py-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                <AnimatePresence>
                  {loadingUsers ? (
                    <tr>
                      <td colSpan="5" className="p-8 text-center text-slate-500">
                        <Loader2 className="animate-spin mx-auto mb-2 text-blue-500" size={32} />
                        Loading users...
                      </td>
                    </tr>
                  ) : filteredUsers.length > 0 ? (
                    filteredUsers.map((user, index) => (
                      <motion.tr
                        key={user.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ delay: index * 0.05 }}
                        className="border-b border-slate-100 hover:bg-slate-50 transition-colors"
                      >
                        <td className="p-4">
                          <div className="font-medium text-slate-800">{user.name}</div>
                          <div className="text-slate-500 text-xs mt-0.5">{user.email}</div>
                        </td>
                        <td className="p-4">
                          <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                            user.role === 'ADMIN' ? 'bg-purple-100 text-purple-700' :
                            user.role === 'STUDENT' ? 'bg-blue-100 text-blue-700' :
                            'bg-emerald-100 text-emerald-700'
                          }`}>
                            {user.role}
                          </span>
                        </td>
                        <td className="p-4 text-slate-600">
                          {user.role!=="ADMIN" && departments.find(d => d.id === user.departmentId)?.name || "-"}{
                            user.role==="ADMIN" && "NA"
                          }
                        </td>
                        <td className="p-4 text-slate-600">
                          {getYear(user.year,user.role)}
                        </td>
                        <td className="p-4 text-right">
                          <div className="flex justify-end gap-2">
                            <button
                              onClick={() => openEditModal(user)}
                              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                              title="Edit"
                            >
                              <Edit size={18} />
                            </button>
                            <button
                              onClick={() => openDeleteModal(user)}
                              className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                              title="Delete"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </td>
                      </motion.tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="p-8 text-center text-slate-500">
                        No users found matching your criteria.
                      </td>
                    </tr>
                  )}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden"
            >
              <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                <h3 className="text-lg font-semibold text-slate-800">
                  {isEditing ? "Edit User" : "Add User"}
                </h3>
                <button onClick={closeModal} className="text-slate-400 hover:text-slate-600 transition-colors">
                  <X size={20} />
                </button>
              </div>
              
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="John Doe"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Role</label>
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                  >
                    <option value="">Select a role...</option>
                    <option value="ADMIN">Admin</option>
                    <option value="FACULTY">Faculty</option>
                    <option value="STUDENT">Student</option>
                  </select>
                </div>

                {/* Conditional Department Field */}
                {formData.role !== "ADMIN" && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}>
                    <label className="block text-sm font-medium text-slate-700 mb-1 mt-4">Department</label>
                    <select
                      name="departmentId"
                      value={formData.departmentId}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                    >
                      <option value="">Select Department...</option>
                      {departments.map((dept) => (
                        <option key={dept.id} value={dept.id}>{dept.name}</option>
                      ))}
                    </select>
                  </motion.div>
                )}

                {/* Conditional Year Field */}
                {formData.role === "STUDENT" && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}>
                    <label className="block text-sm font-medium text-slate-700 mb-1 mt-4">Year</label>
                    <select
                      name="year"
                      value={formData.year}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                    >
                      <option value="">Select Year...</option>
                      <option value="1">1st Year</option>
                      <option value="2">2nd Year</option>
                      <option value="3">3rd Year</option>
                      <option value="4">4th Year</option>
                    </select>
                  </motion.div>
                )}
              </div>

              <div className="px-6 py-4 border-t border-slate-100 flex justify-end gap-3 bg-slate-50">
                <button
                  onClick={closeModal}
                  className="px-5 py-2.5 rounded-xl text-slate-600 hover:bg-slate-200 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={savingUser}
                  className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white transition-colors font-medium flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {savingUser ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
                  {savingUser ? "Saving..." : "Save User"}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {showDeleteModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl shadow-xl w-full max-w-sm overflow-hidden text-center"
            >
              <div className="p-6">
                <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <AlertCircle size={32} />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">Delete User?</h3>
                <p className="text-slate-500 mb-6">
                  Are you sure you want to remove <span className="font-semibold text-slate-700">{userToDelete?.name}</span>? This action cannot be undone.
                </p>
                
                <div className="flex justify-center gap-3">
                  <button
                    onClick={closeDeleteModal}
                    className="flex-1 px-5 py-2.5 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDelete}
                    className="flex-1 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white transition-colors font-medium shadow-sm shadow-blue-200"
                  >
                    Yes, Delete
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
    </DashboardLayout>
  );
}

export default UserManagement;