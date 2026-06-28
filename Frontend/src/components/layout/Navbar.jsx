import React, { useState, useRef, useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import logo from "../../assets/logos/edupilot_logo_transparent edited.PNG";
import { ChevronDown, LogOut, User, Menu } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

function Navbar({ onMenuClick }) {
  const roleMap = {
    ADMIN: "Administrator",
    FACULTY: "Faculty",
    STUDENT: "Student",
  };

  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-20 h-20 bg-white/80 backdrop-blur-md border-b border-slate-200 flex items-center justify-between px-4 md:px-8 shadow-sm">
      
      {/* Left side: Hamburger (Mobile) + Logo */}
      <div className="flex items-center gap-4">
        <button 
          onClick={onMenuClick}
          className="md:hidden p-2 -ml-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
        >
          <Menu size={24} />
        </button>
        
        <img src={logo} alt="EduPilot" className="h-20 md:h-12 object-fill hidden sm:block" />
      </div>

      {/* Profile Section */}
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-3 hover:bg-slate-100 p-1.5 md:px-3 md:py-2 rounded-xl transition-colors duration-200 outline-none"
        >
          <div className="w-10 h-10 md:w-11 md:h-11 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold text-base md:text-lg shadow-sm">
            {user?.name?.charAt(0).toUpperCase()}
          </div>

          <div className="hidden md:block text-left">
            <p className="font-semibold text-sm text-slate-800 leading-tight">{user?.name}</p>
            <p className="text-xs text-slate-500 font-medium">{roleMap[user?.role]}</p>
          </div>

          <ChevronDown
            size={16}
            className={`text-slate-500 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
          />
        </button>

        {/* Dropdown Menu with Framer Motion */}
        <AnimatePresence>
          {open && (
            <motion.div 
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              className="absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden origin-top-right z-50"
            >
              <div className="p-2 space-y-1">
                <button className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl hover:bg-slate-50 text-slate-700 text-sm font-medium transition-colors">
                  <User size={18} className="text-slate-400" />
                  Profile
                </button>

                <div className="h-px bg-slate-100 my-1 mx-2" />

                <button
                  onClick={logout}
                  className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl hover:bg-red-50 text-red-600 text-sm font-medium transition-colors"
                >
                  <LogOut size={18} className="text-red-400" />
                  Logout
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}

export default Navbar;