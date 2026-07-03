import { Loader2, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

function UploadProgress({ progress }) {
  if (progress <= 0 || progress >= 100) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      className="mt-6 bg-slate-50 border border-slate-200 rounded-xl p-5"
    >
      <div className="flex justify-between items-end mb-3">
        <span className="font-bold text-slate-700 flex items-center gap-2">
          <Loader2 className="animate-spin text-blue-600" size={18} />
          Uploading to server...
        </span>
        <span className="font-bold text-blue-600 text-lg">
          {Math.round(progress)}%
        </span>
      </div>

      <div className="w-full h-3 rounded-full bg-slate-200 overflow-hidden relative">
        <motion.div
          className="absolute top-0 left-0 bottom-0 bg-blue-600 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ type: "spring", bounce: 0, duration: 0.5 }}
        >
          {/* Subtle animated shimmer over the progress bar */}
          <div className="absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full animate-[shimmer_1.5s_infinite]" />
        </motion.div>
      </div>

      <div className="flex items-center gap-2 mt-4 text-sm font-medium text-slate-500">
        {progress < 50 ? (
          <p>Encrypting and transferring file data...</p>
        ) : progress < 90 ? (
          <p>Processing text for vector embeddings...</p>
        ) : (
          <p className="flex items-center gap-1.5 text-blue-600">
            <CheckCircle2 size={16} /> Finalizing chunks...
          </p>
        )}
      </div>
    </motion.div>
  );
}

export default UploadProgress;