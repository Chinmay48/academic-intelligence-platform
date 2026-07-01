import React from "react";
import { motion } from "framer-motion";

function DashboardCard({ 
  title, 
  value, 
  icon: Icon, 
  colorTheme = "blue",
  delay = 0 
}) {
 
  const themeClasses = {
    blue: "text-blue-600 bg-blue-50 group-hover:bg-blue-100",
    green: "text-emerald-600 bg-emerald-50 group-hover:bg-emerald-100",
    purple: "text-purple-600 bg-purple-50 group-hover:bg-purple-100",
    orange: "text-orange-600 bg-orange-50 group-hover:bg-orange-100",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5, type: "spring", stiffness: 100 }}
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
      className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all flex justify-between items-center group cursor-pointer"
    >
      <div>
        <p className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-1">
          {title}
        </p>
        <h2 className="text-4xl font-extrabold text-slate-800 tracking-tight">
          {value}
        </h2>
      </div>

      <div 
        className={`p-4 rounded-2xl transition-colors duration-300 ${themeClasses[colorTheme] || themeClasses.blue}`}
      >
        <motion.div
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Icon size={32} strokeWidth={2} />
        </motion.div>
      </div>
    </motion.div>
  );
}

export default DashboardCard;