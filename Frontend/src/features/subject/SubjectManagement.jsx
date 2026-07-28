import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen,
  Plus,
  Search,
  Edit2,
  Trash2,
  X,
  AlertTriangle,
  Loader2,
} from "lucide-react";

// Assuming these are your correct service exports. Corrected the typo 'updateSuject' and added missing ones.
import {
  getAllSubjects,
  updateSubject,
  createSubject,
  deleteSubject,
} from "../../services/subjectService";
import { getAllDepartments } from "../../services/departementService";
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
    transition: { type: "spring", stiffness: 300, damping: 30 },
  },
  exit: { opacity: 0, scale: 0.95, y: 20 },
};

function SubjectManagement() {
  const [subjects, setSubjects] = useState([]);
  const [departments, setDepartments] = useState([]);

  const [loadingSubjects, setLoadingSubjects] = useState(false);
  const [savingSubject, setSavingSubject] = useState(false);

  const [subjectName, setSubjectName] = useState("");
  const [departmentId, setDepartmentId] = useState("");

  const [search, setSearch] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [isEditing, setIsEditing] = useState(false);

  const [selectedSubject, setSelectedSubject] = useState(null);
  const [subjectToDelete, setSubjectToDelete] = useState(null);

  useEffect(() => {
    loadDepartments();
    loadSubjects();
  }, []);

  const loadSubjects = async () => {
    setLoadingSubjects(true);
    try {
      const response = await getAllSubjects();
      setSubjects(response);
    } catch (error) {
      showError("Failed to load subjects");
    } finally {
      setLoadingSubjects(false);
    }
  };

  const loadDepartments = async () => {
    try {
      const response = await getAllDepartments();
      setDepartments(response);
    } catch (error) {
      showError("Failed to load departments");
    }
  };

  const handleSave = async () => {
    if (!subjectName.trim()) {
      showError("Subject name is required");
      return;
    }
    if (!departmentId || !String(departmentId).trim()) {
      showError("Department selection is required");
      return; // Added missing return here
    }

    setSavingSubject(true);

    try {
      if (isEditing) {
        await updateSubject(selectedSubject.id, {
          name: subjectName,
          departmentId,
        });
        showSuccess("Subject updated successfully");
      } else {
        // Changed from axios.create to createSubject
        await createSubject({
          name: subjectName,
          departmentId,
        });
        showSuccess("Subject created successfully");
      }
      loadSubjects();
      closeModal();
    } catch (error) {
      showError(error.response?.data?.message || "Operation failed");
    } finally {
      setSavingSubject(false);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteSubject(subjectToDelete.id);
      showSuccess("Subject deleted successfully");
      closeDeleteModal();
      loadSubjects();
    } catch (error) {
      showError(error.response?.data?.message || "Failed to delete subject");
    }
  };

  // Fixed Logic: Pulled these out of the handleDelete function scope
  const openDeleteModal = (subject) => {
    setSubjectToDelete(subject);
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setSubjectToDelete(null);
    setShowDeleteModal(false);
  };

  const openCreateModal = () => {
    setSubjectName("");
    setDepartmentId("");
    setSelectedSubject(null);
    setIsEditing(false);
    setShowModal(true);
  };

  const openEditModal = (subject) => {
    setSelectedSubject(subject);
    setSubjectName(subject.name);
    setDepartmentId(subject.departmentId);
    setIsEditing(true);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSubjectName("");
    setDepartmentId("");
    setSelectedSubject(null);
    setIsEditing(false);
  };

  const filteredSubjects = subjects.filter(
    (subject) =>
      subject.name.toLowerCase().includes(search.toLowerCase()) ||
      (subject.departmentName &&
        subject.departmentName.toLowerCase().includes(search.toLowerCase()))
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
              <div className="p-2.5 bg-indigo-100 text-indigo-600 rounded-xl">
                <BookOpen className="w-6 h-6" />
              </div>
              Subject Management
            </h1>
            <p className="text-slate-500 mt-2 ml-14">
              Create, update and map subjects to departments.
            </p>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={openCreateModal}
            className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-medium transition shadow-sm hover:shadow-md"
          >
            <Plus className="w-5 h-5" /> Create Subject
          </motion.button>
        </div>

        {/* Search */}
        <div className="mb-6 relative max-w-md">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-slate-400" />
          </div>
          <input
            type="text"
            placeholder="Search subjects or departments..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border border-slate-300 rounded-xl pl-11 pr-4 py-3 text-slate-700 transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm"
          />
        </div>

        {/* Loading State */}
        {loadingSubjects ? (
          <div className="flex flex-col items-center justify-center py-20 text-slate-500">
            <Loader2 className="w-8 h-8 animate-spin text-indigo-500 mb-4" />
            <p className="font-medium">Loading subjects...</p>
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
                      Subject Name
                    </th>
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
                  {filteredSubjects.length > 0 ? (
                    filteredSubjects.map((subject) => (
                      <motion.tr
                        variants={itemVariants}
                        key={subject.id}
                        className="hover:bg-slate-50/80 transition-colors group"
                      >
                        <td className="px-6 py-4 font-medium text-slate-800">
                          {subject.name}
                        </td>
                        <td className="px-6 py-4 text-slate-600">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-800 border border-slate-200">
                            {subject.departmentName || "Unassigned"}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex justify-end gap-2">
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => openEditModal(subject)}
                              className="p-2 text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors font-medium flex items-center gap-1.5"
                            >
                              <Edit2 className="w-4 h-4" />{" "}
                              <span className="hidden sm:inline text-sm">
                                Edit
                              </span>
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => openDeleteModal(subject)}
                              className="p-2 text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors font-medium flex items-center gap-1.5"
                            >
                              <Trash2 className="w-4 h-4" />{" "}
                              <span className="hidden sm:inline text-sm">
                                Delete
                              </span>
                            </motion.button>
                          </div>
                        </td>
                      </motion.tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="3" className="px-6 py-12 text-center text-slate-500">
                        No subjects found matching "{search}"
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
                    {isEditing ? "Edit Subject" : "Create Subject"}
                  </h2>
                  <p className="text-sm text-slate-500 mt-1">
                    {isEditing
                      ? "Update subject details."
                      : "Add a new subject to a department."}
                  </p>
                </div>
                <button
                  onClick={closeModal}
                  className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Subject Name
                  </label>
                  <input
                    type="text"
                    value={subjectName}
                    onChange={(e) => setSubjectName(e.target.value)}
                    placeholder="e.g. Data Structures"
                    className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all shadow-sm"
                    autoFocus
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Department
                  </label>
                  <select
                    value={departmentId}
                    onChange={(e) => setDepartmentId(e.target.value)}
                    className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all shadow-sm bg-white"
                  >
                    <option value="" disabled>
                      Select a department
                    </option>
                    {departments.map((dept) => (
                      <option key={dept.id} value={dept.id}>
                        {dept.name}
                      </option>
                    ))}
                  </select>
                </div>

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
                    disabled={savingSubject}
                    className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-medium transition-colors disabled:opacity-70 shadow-sm"
                  >
                    {savingSubject && <Loader2 className="w-4 h-4 animate-spin" />}
                    {savingSubject
                      ? "Saving..."
                      : isEditing
                      ? "Update Subject"
                      : "Create Subject"}
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
                Delete Subject
              </h2>
              <p className="text-slate-600 mb-6">
                Are you sure you want to delete{" "}
                <span className="font-bold text-slate-800">
                  {subjectToDelete?.name}
                </span>
                ? <br />
                <span className="text-red-500 text-sm font-medium">
                  This action cannot be undone.
                </span>
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

export default SubjectManagement;