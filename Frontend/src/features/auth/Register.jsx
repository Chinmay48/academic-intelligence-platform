import React, { useEffect, useState } from "react";
import logo from "../../assets/logos/edupilot_logo_transparent edited.PNG";

import { showSuccess,showError } from "../../utils/toast";
import { useNavigate } from "react-router-dom";
import {
  Eye,
  EyeOff,
  Sparkles,
  BookOpen,
  Clock,
  BarChart3,
  AlertCircle
} from "lucide-react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { getAllDepartments } from "../../services/departementService";
import Loading from "../../components/common/Loading";
import { register } from "../../services/authService";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "", // Added confirm password to state
    role: "",
    departmentId: "",
    year: "",
  });
  const navigate=useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [department, setDepartment] = useState([]);

  useEffect(() => {
    loadDepartments();
  }, []);

  const loadDepartments = async () => {
    try {
      const response = await getAllDepartments();
      setDepartment(response);
      console.log(response)
    } catch (error) {
      console.log(error)
      showError(error.response?.data?.message || "Failed to fetch departments")
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    
    if (e.target.name === "password" || e.target.name === "confirmPassword") {
      setPasswordError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Check if passwords match before calling API
    if (formData.password !== formData.confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      const payLoad = {
        ...formData,
        year: formData.role === "STUDENT" ? Number(formData.year) : null,
      };
      // Removing confirmPassword from payload as the backend likely doesn't need it
      delete payLoad.confirmPassword; 
      
      await register(payLoad);
      showSuccess("Registration successful!")
      setTimeout(()=>{
           navigate("/login")
      },1200)
    } catch (error) {
      showError(
    error.response?.data?.message ||
    "Registration failed"
);
    } finally {
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 120 } },
  };

  

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-slate-50 font-sans selection:bg-blue-500 selection:text-white">
      {/* --- LEFT PANEL: Branding & Info --- */}
      <div className="relative hidden lg:flex flex-col justify-center items-center bg-slate-900 overflow-hidden p-16 sticky top-0 h-screen">
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-blue-800/40 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-indigo-800/20 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative z-10 w-full max-w-md flex flex-col items-center">
          <motion.img
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            src={logo}
            alt="EduPilot"
            className="w-56 mb-12 drop-shadow-2xl"
          />

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center w-full"
          >
            <h1 className="text-4xl font-extrabold text-white tracking-tight mb-4">
              Join EduPilot Today
            </h1>
            <p className="text-lg text-blue-400 font-medium mb-10 flex items-center justify-center gap-2">
              <Sparkles size={20} />
              AI Powered Academic Intelligence
            </p>

            <motion.ul
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="space-y-5 text-left bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 shadow-2xl"
            >
              <motion.li variants={itemVariants} className="flex items-center gap-4 text-slate-300">
                <div className="p-2 bg-blue-500/20 rounded-lg text-blue-400">
                  <Sparkles size={20} />
                </div>
                <span className="font-medium">Chat with AI Assistant</span>
              </motion.li>
              <motion.li variants={itemVariants} className="flex items-center gap-4 text-slate-300">
                <div className="p-2 bg-indigo-500/20 rounded-lg text-indigo-400">
                  <BookOpen size={20} />
                </div>
                <span className="font-medium">Download Study Resources</span>
              </motion.li>
              <motion.li variants={itemVariants} className="flex items-center gap-4 text-slate-300">
                <div className="p-2 bg-purple-500/20 rounded-lg text-purple-400">
                  <Clock size={20} />
                </div>
                <span className="font-medium">Access Previous Year Papers</span>
              </motion.li>
              <motion.li variants={itemVariants} className="flex items-center gap-4 text-slate-300">
                <div className="p-2 bg-emerald-500/20 rounded-lg text-emerald-400">
                  <BarChart3 size={20} />
                </div>
                <span className="font-medium">Analytics & Predictions</span>
              </motion.li>
            </motion.ul>
          </motion.div>
        </div>
      </div>

      {/* --- RIGHT PANEL: Register Form --- */}
      <div className="flex justify-center items-center p-6 relative py-12 lg:py-6">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-100/50 via-slate-50 to-slate-50 lg:hidden pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="bg-white/80 backdrop-blur-xl shadow-2xl shadow-slate-200/50 border border-slate-100 rounded-[2rem] p-8 sm:p-10 w-full max-w-lg relative z-10"
        >
          <div className="lg:hidden flex justify-center mb-8">
            <img src={logo} alt="EduPilot" className="w-48 drop-shadow-md" />
          </div>

          <div className="mb-8">
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Create Account
            </h2>
            <p className="text-slate-500 mt-2 font-medium">
              Fill in your details to get started
            </p>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Name Field */}
            <div className="space-y-1.5">
              <label className="block text-sm font-semibold text-slate-700 ml-1">
                Full Name
              </label>
              <motion.div whileTap={{ scale: 0.995 }}>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl px-4 py-3 transition-all duration-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 placeholder:text-slate-400"
                />
              </motion.div>
            </div>

            {/* Email Field */}
            <div className="space-y-1.5">
              <label className="block text-sm font-semibold text-slate-700 ml-1">
                Email Address
              </label>
              <motion.div whileTap={{ scale: 0.995 }}>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@example.com"
                  className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl px-4 py-3 transition-all duration-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 placeholder:text-slate-400"
                />
              </motion.div>
            </div>

            {/* Password Fields Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Password */}
              <div className="space-y-1.5">
                <label className="block text-sm font-semibold text-slate-700 ml-1">
                  Password
                </label>
                <motion.div whileTap={{ scale: 0.995 }} className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="••••••••"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl pl-4 pr-10 py-3 transition-all duration-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 placeholder:text-slate-400"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-600 transition-colors p-1"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </motion.div>
              </div>

              {/* Confirm Password */}
              <div className="space-y-1.5">
                <label className="block text-sm font-semibold text-slate-700 ml-1">
                  Confirm Password
                </label>
                <motion.div whileTap={{ scale: 0.995 }} className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    placeholder="••••••••"
                    required
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={`w-full bg-slate-50 border text-slate-900 rounded-xl pl-4 pr-10 py-3 transition-all duration-200 focus:bg-white focus:outline-none focus:ring-2 placeholder:text-slate-400 ${
                      passwordError ? "border-red-400 focus:ring-red-500/50 focus:border-red-500" : "border-slate-200 focus:ring-blue-500/50 focus:border-blue-500"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-600 transition-colors p-1"
                  >
                    {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </motion.div>
              </div>
            </div>

            {/* Password Error Message */}
            <AnimatePresence>
              {passwordError && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="text-red-500 text-sm font-medium flex items-center gap-1.5 ml-1"
                >
                  <AlertCircle size={14} />
                  {passwordError}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Role & Department Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-sm font-semibold text-slate-700 ml-1">
                  Role
                </label>
                <motion.div whileTap={{ scale: 0.995 }}>
                  <select
                    name="role"
                    required
                    value={formData.role}
                    onChange={handleChange}
                    className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl px-4 py-3 transition-all duration-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 appearance-none cursor-pointer"
                  >
                    <option value="" disabled>Select Role</option>
                    <option value="STUDENT">Student</option>
                    <option value="FACULTY">Faculty</option>
                    <option value="ADMIN">Admin</option>
                  </select>
                </motion.div>
              </div>

              {department.length > 0 && (
                <div className="space-y-1.5">
                  <label className="block text-sm font-semibold text-slate-700 ml-1">
                    Department
                  </label>
                  <motion.div whileTap={{ scale: 0.995 }}>
                    <select
                      name="departmentId"
                      required
                      className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl px-4 py-3 transition-all duration-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 appearance-none cursor-pointer"
                      value={formData.departmentId}
                      onChange={handleChange}
                    >
                      <option value="" disabled>Select Department</option>
                      {department.map((dep) => (
                        <option key={dep.id} value={dep.id}>
                          {dep.name}
                        </option>
                      ))}
                    </select>
                  </motion.div>
                </div>
              )}
            </div>

            {/* Conditional Year Field for Students */}
            <AnimatePresence>
              {formData.role === "STUDENT" && (
                <motion.div
                  initial={{ opacity: 0, height: 0, marginTop: 0 }}
                  animate={{ opacity: 1, height: "auto", marginTop: "1rem" }}
                  exit={{ opacity: 0, height: 0, marginTop: 0 }}
                  className="space-y-1.5 overflow-hidden"
                >
                  <label className="block text-sm font-semibold text-slate-700 ml-1">
                    Academic Year
                  </label>
                  <motion.div whileTap={{ scale: 0.995 }}>
                    <select
                      name="year"
                      required
                      value={formData.year}
                      onChange={handleChange}
                      className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl px-4 py-3 transition-all duration-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 appearance-none cursor-pointer"
                    >
                      <option value="" disabled>Select Year</option>
                      <option value="1">First Year (FE)</option>
                      <option value="2">Second Year (SE)</option>
                      <option value="3">Third Year (TE)</option>
                      <option value="4">Final Year (BE)</option>
                    </select>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.01, translateY: -1 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg shadow-blue-500/25 disabled:opacity-70 disabled:cursor-not-allowed text-white py-3.5 rounded-xl font-bold tracking-wide transition-all mt-6"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Creating Account...
                </span>
              ) : (
                "Create Account"
              )}
            </motion.button>
          </form>

          <p className="mt-8 text-center text-sm text-slate-600 font-medium">
            Already have an account?
            <Link
              to="/login"
              className="ml-2 text-blue-600 font-bold hover:text-indigo-600 transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-indigo-600 hover:after:w-full after:transition-all after:duration-300"
            >
              Login here
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}

export default Register;