import React, { useEffect } from 'react';
import useAuth from '../../hooks/useAuth';
import { GraduationCap, X } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import { sidebarItems } from '../../config/SidebarConfig';
import { motion } from 'framer-motion';

function Sidebar({ isOpen, setIsOpen }) {
  const { user } = useAuth();
  const location = useLocation();
  const items = sidebarItems[user?.role] || [];

  // Close sidebar on route change on mobile devices
  useEffect(() => {
    setIsOpen(false);
  }, [location, setIsOpen]);

  return (
    <aside 
      className={`fixed md:static inset-y-0 left-0 z-40 w-72 bg-slate-900 text-white flex flex-col shadow-2xl md:shadow-xl transform transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      }`}
    >
      {/* Logo & Mobile Close Button */}
      <div className="h-20 flex items-center justify-between px-6 border-b border-slate-700/50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-600/20">
            <GraduationCap size={22} />
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-wide">EduPilot</h1>
            <p className="text-[11px] text-slate-400 font-medium uppercase tracking-wider">
              Academic Intelligence
            </p>
          </div>
        </div>
        
        {/* Mobile Close Button */}
        <button 
          onClick={() => setIsOpen(false)}
          className="md:hidden p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
        >
          <X size={20} />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto custom-scrollbar">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink 
              key={item.path} 
              to={item.path} 
              className="relative flex items-center gap-4 px-4 py-3 rounded-xl transition-colors text-slate-300 hover:text-white group outline-none"
            >
              {({ isActive }) => (
                <>
                  {/* Smooth Background Animation for Active Link */}
                  {isActive && (
                    <motion.div
                      layoutId="active-sidebar-bg"
                      className="absolute inset-0 bg-blue-600 rounded-xl shadow-lg shadow-blue-600/20"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  
                  {/* Hover background for non-active links */}
                  {!isActive && (
                    <div className="absolute inset-0 bg-slate-800/50 opacity-0 group-hover:opacity-100 rounded-xl transition-opacity duration-200" />
                  )}

                  <Icon 
                    size={20} 
                    className={`relative z-10 transition-colors duration-200 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-white'}`} 
                  />
                  <span className={`relative z-10 font-medium tracking-wide text-sm transition-colors duration-200 ${isActive ? 'text-white' : 'text-slate-300 group-hover:text-white'}`}>
                    {item.label}
                  </span>
                </>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="border-t border-slate-700/50 p-5 bg-slate-900/50">
        <div className="text-center">
          <p className="text-xs font-semibold tracking-wide text-slate-300">
            AIP Platform
          </p>
          <p className="text-[10px] text-slate-500 mt-1 uppercase tracking-widest">
            Version 1.0
          </p>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;