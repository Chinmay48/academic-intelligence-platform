import React, { useState } from "react";
import logo from "../../assets/logos/edupilot_logo_transparent edited.PNG";
import {
  Eye,
  EyeOff,
  Sparkles,
  BookOpen,
  Clock,
  BarChart3,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { login } from "../../services/authService";
import { showError, showSuccess } from "../../utils/toast";
import { saveToken } from "../../utils/token";
import useAuth from "../../hooks/useAuth";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const{loadUser}=useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const routeMapper={
    ADMIN:"admin",
    STUDENT:"student",
    FACULTY:"faculty"
  }
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
     const response= await login(formData);
     saveToken(response.token);
     const logginUser=await loadUser();
     console.log("User",logginUser)
     if(logginUser) navigate(`/${routeMapper[logginUser.role]}/dashboard`);
      showSuccess("Login Successfully")
    } catch (error) {
      showError(error.response?.data?.message || "Inavalid email or password");
      console.log(error)
    } finally {
      setLoading(false);
    }
  };

  // Animation variants for the staggered list
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
      <div className="relative hidden lg:flex flex-col justify-center items-center bg-slate-900 overflow-hidden p-16">
        {/* Ambient glowing background shapes */}
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
              Welcome to EduPilot
            </h1>
            <p className="text-lg text-blue-400 font-medium mb-10 flex items-center justify-center gap-2">
              <Sparkles size={20} />
              AI Powered Academic Intelligence
            </p>

            {/* Staggered Features List */}
            <motion.ul
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="space-y-5 text-left bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 shadow-2xl"
            >
              <motion.li
                variants={itemVariants}
                className="flex items-center gap-4 text-slate-300"
              >
                <div className="p-2 bg-blue-500/20 rounded-lg text-blue-400">
                  <Sparkles size={20} />
                </div>
                <span className="font-medium">Chat with AI Assistant</span>
              </motion.li>
              <motion.li
                variants={itemVariants}
                className="flex items-center gap-4 text-slate-300"
              >
                <div className="p-2 bg-indigo-500/20 rounded-lg text-indigo-400">
                  <BookOpen size={20} />
                </div>
                <span className="font-medium">Download Study Resources</span>
              </motion.li>
              <motion.li
                variants={itemVariants}
                className="flex items-center gap-4 text-slate-300"
              >
                <div className="p-2 bg-purple-500/20 rounded-lg text-purple-400">
                  <Clock size={20} />
                </div>
                <span className="font-medium">Access Previous Year Papers</span>
              </motion.li>
              <motion.li
                variants={itemVariants}
                className="flex items-center gap-4 text-slate-300"
              >
                <div className="p-2 bg-emerald-500/20 rounded-lg text-emerald-400">
                  <BarChart3 size={20} />
                </div>
                <span className="font-medium">Analytics & Predictions</span>
              </motion.li>
            </motion.ul>
          </motion.div>
        </div>
      </div>

      {/* --- RIGHT PANEL: Login Form --- */}
      <div className="flex justify-center items-center p-6 relative">
        {/* Subtle mobile background decoration */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-100/50 via-slate-50 to-slate-50 lg:hidden pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="bg-white/80 backdrop-blur-xl shadow-2xl shadow-slate-200/50 border border-slate-100 rounded-[2rem] p-8 sm:p-10 w-full max-w-md relative z-10"
        >
          <div className="lg:hidden flex justify-center mb-8">
            <img src={logo} alt="EduPilot" className="w-48 drop-shadow-md" />
          </div>

          <div className="mb-10">
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Welcome Back
            </h2>
            <p className="text-slate-500 mt-2 font-medium">
              Sign in to your account to continue
            </p>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
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
                  className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl px-4 py-3.5 transition-all duration-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 placeholder:text-slate-400"
                />
              </motion.div>
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center ml-1">
                <label className="block text-sm font-semibold text-slate-700">
                  Password
                </label>
                <a
                  href="#"
                  className="text-xs font-semibold text-blue-600 hover:text-blue-700 hover:underline transition-colors"
                >
                  Forgot password?
                </a>
              </div>
              <motion.div whileTap={{ scale: 0.995 }} className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl pl-4 pr-12 py-3.5 transition-all duration-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 placeholder:text-slate-400"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-600 transition-colors p-1"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </motion.div>
            </div>

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
                  Signing In...
                </span>
              ) : (
                "Login"
              )}
            </motion.button>
          </form>

          <p className="mt-8 text-center text-sm text-slate-600 font-medium">
            Don't have an account?
            <Link
              to="/register"
              className="ml-2 text-blue-600 font-bold hover:text-indigo-600 transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-indigo-600 hover:after:w-full after:transition-all after:duration-300"
            >
              Register here
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}

export default Login;
