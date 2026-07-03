import { FileCheck, X } from "lucide-react";
import { motion } from "framer-motion";

function SelectedFileCard({ file, onRemove }) {
  if (!file) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className="mt-6 bg-white border border-green-100 shadow-sm shadow-green-100/50 rounded-xl p-4 flex justify-between items-center relative overflow-hidden"
    >
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-green-500" />
      
      <div className="flex items-center gap-4 pl-2">
        <div className="p-2.5 bg-green-50 text-green-600 rounded-lg">
          <FileCheck size={28} />
        </div>
        <div>
          <h3 className="font-bold text-slate-800 line-clamp-1 max-w-[200px] sm:max-w-xs">
            {file.name}
          </h3>
          <p className="text-sm font-medium text-slate-500 mt-0.5">
            {(file.size / 1024 / 1024).toFixed(2)} MB • Ready to embed
          </p>
        </div>
      </div>

      <motion.button
        whileHover={{ scale: 1.1, backgroundColor: "#fee2e2", rotate: 90 }}
        whileTap={{ scale: 0.9 }}
        onClick={onRemove}
        className="p-2 text-slate-400 hover:text-red-600 rounded-lg transition-colors"
        title="Remove file"
      >
        <X size={20} strokeWidth={2.5} />
      </motion.button>
    </motion.div>
  );
}

export default SelectedFileCard;