import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { UploadCloud, FileUp } from "lucide-react";
import { motion } from "framer-motion";

function FileDropZone({ onFileSelect }) {
  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      onFileSelect(acceptedFiles[0]);
    }
  }, [onFileSelect]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    multiple: false,
    maxSize: 25 * 1024 * 1024,
    accept: {
      "application/pdf": [".pdf"],
      "application/vnd.ms-powerpoint": [".ppt"],
      "application/vnd.openxmlformats-officedocument.presentationml.presentation": [".pptx"]
    },
    onDrop
  });

  return (
    <motion.div
      {...getRootProps()}
      animate={{
        scale: isDragActive ? 1.02 : 1,
        borderColor: isDragActive ? "#3b82f6" : "#cbd5e1",
        backgroundColor: isDragActive ? "#eff6ff" : "#f8fafc"
      }}
      whileHover={{ scale: 1.01, backgroundColor: "#f1f5f9", borderColor: "#94a3b8" }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer relative overflow-hidden group"
    >
      <input {...getInputProps()} />
      
      {/* Subtle background glow effect when dragging */}
      <motion.div 
        animate={{ opacity: isDragActive ? 1 : 0 }}
        className="absolute inset-0 bg-blue-500/5 blur-3xl rounded-full"
      />

      <motion.div
        animate={{ y: isDragActive ? -5 : 0 }}
        transition={{ type: "spring", repeat: isDragActive ? Infinity : 0, repeatType: "reverse" }}
        className="relative z-10 flex justify-center mb-4"
      >
        <div className={`p-4 rounded-full transition-colors duration-300 ${isDragActive ? "bg-blue-100 text-blue-600" : "bg-white shadow-sm border border-slate-100 text-slate-400 group-hover:text-blue-500"}`}>
          {isDragActive ? <FileUp size={40} /> : <UploadCloud size={40} />}
        </div>
      </motion.div>

      <h3 className="relative z-10 text-xl font-bold text-slate-800">
        {isDragActive ? "Drop the file to upload" : "Drag & Drop your file"}
      </h3>
      <p className="relative z-10 text-slate-500 mt-2 font-medium">
        or <span className="text-blue-600 font-semibold group-hover:underline">click to browse</span> from your computer
      </p>

      <div className="relative z-10 flex items-center justify-center gap-3 mt-6 text-xs font-semibold text-slate-400 uppercase tracking-wider">
        <span className="bg-slate-200/50 px-3 py-1 rounded-md">PDF</span>
        <span className="bg-slate-200/50 px-3 py-1 rounded-md">PPT</span>
        <span className="bg-slate-200/50 px-3 py-1 rounded-md">PPTX</span>
        <span className="px-3 py-1 border border-slate-200 rounded-md">MAX 25 MB</span>
      </div>
    </motion.div>
  );
}

export default FileDropZone;