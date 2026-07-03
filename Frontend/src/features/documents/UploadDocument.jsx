import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DashboardLayout from "../../components/layout/DashboardLayout";
import FileDropZone from "../../components/documents/FileDropZone";
import SelectedFileCard from "../../components/documents/SelectedFileCard";
import { uploadDocument } from "../../services/documentService";
import { showError, showSuccess } from "../../utils/toast";
import UploadProgress from "../../components/documents/UploadProgress";
import { getSubjects } from "../../services/subjectService";
import useAuth from "../../hooks/useAuth";
import { CloudUpload, BookOpen, FileText, Database } from "lucide-react";

function UploadDocument() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    subjectId: "",
  });
  const { user } = useAuth();
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [subjects, setSubjects] = useState([]);

  const handleUpload = async () => {
    try {
      setUploading(true);
      await uploadDocument(
        selectedFile,
        formData.title,
        formData.description,
        formData.subjectId,
        setUploadProgress
      );

      showSuccess("Document uploaded successfully.");
      setFormData({
        title: "",
        description: "",
        subjectId: "",
      });
      setSelectedFile(null);
      setUploadProgress(0);
    } catch (error) {
      showError(error.response?.data?.message || "Upload failed.");
    } finally {
      setUploading(false);
    }
  };

  useEffect(() => {
    loadSubjects();
  }, []);

  const loadSubjects = async () => {
    try {
      const response = await getSubjects(user.departmentId);
      setSubjects(response);
      console.log("Subjects", response);
    } catch (error) {
      showError(error.data?.message || "Failed to fetch Subjects");
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 120 } },
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto pb-12">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-3">
            <div className="p-2.5 bg-blue-100 text-blue-600 rounded-xl">
              <CloudUpload size={28} />
            </div>
            Upload Study Resource
          </h1>
          <p className="text-slate-500 mt-3 text-lg">
            Upload faculty-approved material. Documents will be vectorized for AI semantic search.
          </p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="bg-white rounded-[2rem] shadow-xl shadow-slate-200/40 border border-slate-100 p-8 sm:p-10"
        >
          <motion.div variants={itemVariants} className="mb-6 space-y-1.5">
            <label className="flex items-center gap-2 text-sm font-bold text-slate-700 ml-1">
              <FileText size={16} className="text-blue-500" />
              Document Title
            </label>
            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g., Chapter 1: Introduction to Operating Systems"
              className="w-full bg-slate-50 rounded-xl border border-slate-200 px-4 py-3.5 text-slate-900 transition-all focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 placeholder:text-slate-400"
            />
          </motion.div>

          <motion.div variants={itemVariants} className="mb-6 space-y-1.5">
            <label className="flex items-center gap-2 text-sm font-bold text-slate-700 ml-1">
              <Database size={16} className="text-indigo-500" />
              Description (Context for AI)
            </label>
            <textarea
              rows={4}
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Provide a brief summary of what this document covers..."
              className="w-full bg-slate-50 rounded-xl border border-slate-200 px-4 py-3.5 text-slate-900 transition-all resize-none focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 placeholder:text-slate-400"
            />
          </motion.div>

          <motion.div variants={itemVariants} className="mb-8 space-y-1.5">
            <label className="flex items-center gap-2 text-sm font-bold text-slate-700 ml-1">
              <BookOpen size={16} className="text-emerald-500" />
              Subject
            </label>
            <div className="relative">
              <select
                name="subjectId"
                value={formData.subjectId}
                onChange={handleChange}
                className="w-full bg-slate-50 rounded-xl border border-slate-200 px-4 py-3.5 text-slate-900 transition-all appearance-none cursor-pointer focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500"
              >
                <option value="" disabled>Select Subject</option>
                {subjects.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name}
                  </option>
                ))}
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <FileDropZone onFileSelect={setSelectedFile} />
          </motion.div>

          <AnimatePresence mode="wait">
            {selectedFile && (
              <SelectedFileCard
                key="selected-file"
                file={selectedFile}
                onRemove={() => setSelectedFile(null)}
              />
            )}
          </AnimatePresence>

          <AnimatePresence>
            {uploadProgress > 0 && uploadProgress < 100 && (
              <UploadProgress key="progress" progress={uploadProgress} />
            )}
          </AnimatePresence>

          <motion.div variants={itemVariants} className="mt-8">
            <motion.button
              whileHover={!uploading && selectedFile && formData.title && formData.subjectId ? { scale: 1.01, y: -2 } : {}}
              whileTap={!uploading ? { scale: 0.98 } : {}}
              onClick={handleUpload}
              disabled={uploading || !selectedFile || !formData.title || !formData.subjectId}
              className="w-full relative overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-4 rounded-xl font-bold tracking-wide transition-all shadow-lg shadow-blue-500/25 disabled:opacity-60 disabled:cursor-not-allowed disabled:shadow-none flex justify-center items-center gap-2"
            >
              {uploading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Processing & Embedding...</span>
                </>
              ) : (
                <>
                  <CloudUpload size={20} />
                  <span>Upload Resource</span>
                </>
              )}
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
}

export default UploadDocument;