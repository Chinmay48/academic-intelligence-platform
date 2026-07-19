import React, { use, useEffect, useState } from "react";
import {
  createDepartment,
  getAllDepartments,
  updateDepartment,
} from "../../services/departementService";
import { showError, showSuccess } from "../../utils/toast";
import { AwardIcon } from "lucide-react";
import DashboardLayout from "../../components/layout/DashboardLayout";

function DepartmentManagement() {
  const [departments, setDepartments] = useState([]);

  const [loadingDepartments, setLoadingDepartments] = useState(false);
  const [savingDepartment, setSavingDepartment] = useState(false);
  const [departmentName, setDepartmentName] = useState("");
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState(null);

  useEffect(() => {
    loadDepartments();
  }, []);

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

  const handleSave = async () => {
    if (!departmentName.trim()) {
      showError("Department name is required");
      return;
    }
    try {
      if (isEditing) {
        await updateDepartment(selectedDepartment.id, { name: departmentName });
        showSuccess("Department updated sucessfully");
      } else {
        await createDepartment({ name: departmentName });
        showSuccess("Departement created successfully");
      }
      closeModal();
      loadDepartments();
    } catch (error) {
      showError(error.response?.data?.message || "Operation failed");
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

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto p-8">
      {/* Header */}

      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">
            Department Management
          </h1>

          <p className="text-slate-500 mt-2">
            Create, update and manage departments.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="
          bg-blue-600
          hover:bg-blue-700
          text-white
          px-5
          py-2.5
          rounded-xl
          font-medium
          transition
        "
        >
          + Create Department
        </button>
      </div>

      {/* Search */}

      <div className="mb-6">
        <input
          type="text"
          placeholder="Search department..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="
          w-full
          max-w-md
          border
          border-slate-300
          rounded-xl
          px-4
          py-3
          focus:outline-none
          focus:ring-2
          focus:ring-blue-500
        "
        />
      </div>
      {loadingDepartments && (
        <div className="text-center py-10 text-slate-500">
          Loading departments...
        </div>
      )}

      {!loadingDepartments && (
        <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
          <table className="w-full">
            <thead className="bg-slate-100">
              <tr>
                <th className="text-left px-6 py-4 font-semibold">
                  Department
                </th>

                <th className="text-right px-6 py-4 font-semibold">Actions</th>
              </tr>
            </thead>

            <tbody>
              {departments
                .filter((department) =>
                  department.name.toLowerCase().includes(search.toLowerCase()),
                )
                .map((department) => (
                  <tr
                    key={department.id}
                    className="border-t hover:bg-slate-50"
                  >
                    <td className="px-6 py-4">{department.name}</td>

                    <td className="px-6 py-4">
                      <div className="flex justify-end gap-3">
                        <button
                          onClick={() => openEditModal(department)}
                          className="
                        text-blue-600
                        hover:text-blue-800
                        font-medium
                      "
                        >
                          Edit
                        </button>

                        <button
                          className="
                        text-red-600
                        hover:text-red-800
                        font-medium
                      "
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        // table
      )}
      {/* Table */}
    </div>
    </DashboardLayout>
    
  );
}

export default DepartmentManagement;
