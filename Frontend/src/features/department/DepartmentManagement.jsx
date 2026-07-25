import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Building2,
  Plus,
  Search,
  Edit2,
  Trash2,
  X,
  AlertTriangle,
  Loader2
} from "lucide-react";
import {
  createDepartment,
  getAllDepartments,
  updateDepartment,
  deleteDepartment,
} from "../../services/departementService";
import { showError, showSuccess } from "../../utils/toast";
import DashboardLayout from "../../components/layout/DashboardLayout";

// --- Framer Motion Variants ---
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0 },
};

const modalBackdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 30 }
  },
  exit: { opacity: 0, scale: 0.95, y: 20 }
};

function DepartmentManagement() {
  const [departments, setDepartments] = useState([]);
  const [loadingDepartments, setLoadingDepartments] = useState(false);
  const [savingDepartment, setSavingDepartment] = useState(false);
  const [departmentName, setDepartmentName] = useState("");
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [departmentToDelete, setDepartmentToDelete] = useState(null);

  useEffect(() => {
    loadDepartments();
  }, []);

  const openDeleteModal = (department) => {
    setDepartmentToDelete(department);
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setDepartmentToDelete(null);
    setShowDeleteModal(false);
  };

  const loadDepartments = async () => {
    setLoadingDepartments(true);
    try {
      const response = await getAllDepartments();
      setDepartments(response);
    } catch (error) {
      showError("Failed to fetch departments");
    } finally {
      setLoadingDepartments(false);
    }
  };

  const handleDelete = async () => {
    if (!departmentToDelete) return;

    try {
      await deleteDepartment(departmentToDelete.id);
      showSuccess("Department deleted successfully");
      closeDeleteModal();
      loadDepartments();
    } catch (error) {
      showError(error.response?.data?.message || "Failed to delete department");
    }
  };

  const handleSave = async () => {
    if (!departmentName.trim()) {
      showError("Department name is required");
      return;
    }

    setSavingDepartment(true);

    try {
      if (isEditing) {
        await updateDepartment(selectedDepartment.id, { name: departmentName });
        showSuccess("Department updated successfully");
      } else {
        await createDepartment({
          name: departmentName,
        });
        showSuccess("Department created successfully");
      }

      closeModal();
      loadDepartments();
    } catch (error) {
      showError(error.response?.data?.message || "Operation failed");
    } finally {
      setSavingDepartment(false);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setDepartmentName("");
    setSelectedDepartment(null);
    setIsEditing(false);
  };

  const openCreateModal = () => {
    setDepartmentName("");
    setSelectedDepartment(null);
    setIsEditing(false);
    setShowModal(true);
  };

  const openEditModal = (department) => {
    setDepartmentName(department.name);
    setSelectedDepartment(department);
    setIsEditing(true);
    setShowModal(true);
  };

  const filteredDepartments = departments.filter((department) =>
    department.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <DashboardLayout>
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-7xl mx-auto p-4 sm:p-8"
      >
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-800 flex items-center gap-3">
              <div className="p-2.5 bg-blue-100 text-blue-600 rounded-xl">
                <Building2 className="w-6 h-6" />
              </div>
              Department Management
            </h1>
            <p className="text-slate-500 mt-2 ml-14">
              Create, update and manage institutional departments.
            </p>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={openCreateModal}
            className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-medium transition shadow-sm hover:shadow-md"
          >
            <Plus className="w-5 h-5" /> Create Department
          </motion.button>
        </div>

        {/* Search */}
        <div className="mb-6 relative max-w-md">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-slate-400" />
          </div>
          <input
            type="text"
            placeholder="Search department..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border border-slate-300 rounded-xl pl-11 pr-4 py-3 text-slate-700 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
          />
        </div>

        {/* Loading State */}
        {loadingDepartments ? (
          <div className="flex flex-col items-center justify-center py-20 text-slate-500">
            <Loader2 className="w-8 h-8 animate-spin text-blue-500 mb-4" />
            <p className="font-medium">Loading departments...</p>
          </div>
        ) : (
          /* Table */
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden"
          >
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50/80 backdrop-blur-sm border-b border-slate-200 text-slate-600">
                  <tr>
                    <th className="text-left px-6 py-4 font-semibold text-sm tracking-wider uppercase">
                      Department
                    </th>
                    <th className="text-right px-6 py-4 font-semibold text-sm tracking-wider uppercase">
                      Actions
                    </th>
                  </tr>
                </thead>

                <motion.tbody 
                  variants={containerVariants} 
                  initial="hidden" 
                  animate="show"
                  className="divide-y divide-slate-100"
                >
                  {filteredDepartments.length > 0 ? (
                    filteredDepartments.map((department) => (
                      <motion.tr
                        variants={itemVariants}
                        key={department.id}
                        className="hover:bg-slate-50/80 transition-colors group"
                      >
                        <td className="px-6 py-4 font-medium text-slate-800">
                          {department.name}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex justify-end gap-2">
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => openEditModal(department)}
                              className="p-2 text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors font-medium flex items-center gap-1.5"
                            >
                              <Edit2 className="w-4 h-4" /> <span className="hidden sm:inline text-sm">Edit</span>
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => openDeleteModal(department)}
                              className="p-2 text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors font-medium flex items-center gap-1.5"
                            >
                              <Trash2 className="w-4 h-4" /> <span className="hidden sm:inline text-sm">Delete</span>
                            </motion.button>
                          </div>
                        </td>
                      </motion.tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="2" className="px-6 py-12 text-center text-slate-500">
                        No departments found matching "{search}"
                      </td>
                    </tr>
                  )}
                </motion.tbody>
              </table>
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* Create / Edit Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            variants={modalBackdropVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          >
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden"
            >
              <div className="px-6 py-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                <div>
                  <h2 className="text-xl font-bold text-slate-800">
                    {isEditing ? "Edit Department" : "Create Department"}
                  </h2>
                  <p className="text-sm text-slate-500 mt-1">
                    {isEditing
                      ? "Update department details."
                      : "Create a new department."}
                  </p>
                </div>
                <button 
                  onClick={closeModal}
                  className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6">
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Department Name
                </label>
                <input
                  type="text"
                  value={departmentName}
                  onChange={(e) => setDepartmentName(e.target.value)}
                  placeholder="e.g. Computer Science"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleSave();
                  }}
                  className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-sm"
                  autoFocus
                />

                <div className="flex justify-end gap-3 mt-8">
                  <button
                    onClick={closeModal}
                    className="px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-medium hover:bg-slate-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleSave}
                    disabled={savingDepartment}
                    className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-medium transition-colors disabled:opacity-70 shadow-sm"
                  >
                    {savingDepartment && <Loader2 className="w-4 h-4 animate-spin" />}
                    {savingDepartment
                      ? "Saving..."
                      : isEditing
                        ? "Update Department"
                        : "Create Department"}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {showDeleteModal && (
          <motion.div
            variants={modalBackdropVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          >
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 text-center"
            >
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertTriangle className="w-8 h-8 text-red-600" />
              </div>
              <h2 className="text-2xl font-bold text-slate-800 mb-2">
                Delete Department
              </h2>
              <p className="text-slate-600 mb-6">
                Are you sure you want to delete{" "}
                <span className="font-bold text-slate-800">
                  {departmentToDelete?.name}
                </span>
                ? <br/><span className="text-red-500 text-sm font-medium">This action cannot be undone.</span>
              </p>

              <div className="flex justify-center gap-3">
                <button
                  onClick={closeDeleteModal}
                  className="px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-medium hover:bg-slate-50 transition-colors w-full"
                >
                  Cancel
                </button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleDelete}
                  className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white font-medium rounded-xl transition-colors shadow-sm w-full"
                >
                  Yes, Delete
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </DashboardLayout>
  );
}

export default DepartmentManagement;