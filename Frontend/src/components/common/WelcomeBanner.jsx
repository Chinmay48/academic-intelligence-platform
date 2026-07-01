import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import useAuth from "../../hooks/useAuth";

function WelcomeBanner() {
  const { user } = useAuth();
  const [headlineIndex, setHeadlineIndex] = useState(0);

  // Tailored for a RAG-based educational platform
  const headlineMapper = {
    STUDENT: [
      "Ask AI questions based on faculty-approved materials.",
      "Search across all your department's resources semantically.",
      "Generate verified answers instantly from uploaded documents."
    ],
    FACULTY: [
      "Upload and embed new study materials for semantic search.",
      "Review AI-generated answers and monitor student queries.",
      "Manage vector databases and resources for your subjects."
    ],
    ADMIN: [
      "Monitor Students, Faculty, and Document embeddings.",
      "Manage Departments, Subjects, and global system access.",
      "Analyze LLM performance and vector search metrics."
    ]
  };

  // Fallback to STUDENT if role is undefined
  const headlines = headlineMapper[user?.role || "STUDENT"];

  // Cycle through headlines every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setHeadlineIndex((prev) => (prev + 1) % headlines.length);
    }, 5000); 
    return () => clearInterval(interval);
  }, [headlines.length]);

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative overflow-hidden bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-800 rounded-[2rem] text-white p-6 sm:p-10 mb-8 shadow-xl shadow-blue-900/10"
    >
      {/* Ambient background glows */}
      <div className="absolute top-[-30%] right-[-10%] w-72 h-72 bg-white/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-30%] left-[-5%] w-56 h-56 bg-indigo-400/20 rounded-full blur-2xl pointer-events-none" />

      <div className="relative z-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight flex items-center flex-wrap gap-2 sm:gap-3">
          Welcome back, {user?.name || "Student"}
          <motion.span
            animate={{ rotate: [0, 14, -8, 14, -4, 10, 0, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 1 }}
            className="inline-block origin-bottom-right"
          >
            👋
          </motion.span>
        </h1>

        {/* Removed fixed height (h-8) and replaced with min-h to allow mobile wrapping */}
        <div className="mt-4 min-h-[3rem] sm:min-h-[2rem]">
          <motion.p
            key={headlineIndex}
            className="text-blue-100 text-base sm:text-lg font-medium inline-block"
            variants={{
              hidden: { opacity: 1 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.03 } // Speed of typing
              }
            }}
            initial="hidden"
            animate="visible"
          >
            {headlines[headlineIndex].split("").map((char, index) => (
              <motion.span
                key={`${char}-${index}`}
                variants={{
                  hidden: { opacity: 0 }, // Changed from display: "none" to fix layout shift
                  visible: { opacity: 1 }
                }}
              >
                {/* Use non-breaking space to prevent spacing collapse */}
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
            {/* Blinking Cursor */}
            <motion.span
              animate={{ opacity: [0, 1, 0] }}
              transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
              className="inline-block w-1.5 h-4 sm:h-5 bg-blue-300 ml-1 translate-y-0.5"
            />
          </motion.p>
        </div>
      </div>
    </motion.div>
  );
}

export default WelcomeBanner;