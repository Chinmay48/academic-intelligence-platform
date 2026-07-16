import {
  CircleHelp,
  TrendingUp,
  Target,
  FileText,
  BookOpen,
  BarChart3,
  Lightbulb,
  Award,
  Zap,
  Activity,
} from "lucide-react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DashboardLayout from "../../components/layout/DashboardLayout";
import useAuth from "../../hooks/useAuth";
import { getSubjects } from "../../services/subjectService";
import { showError } from "../../utils/toast";
import { getAnalyticsDashboard } from "../../services/analyticsService";
import { getQuestionsBySubject } from "../../services/pyqService";
// --- Framer Motion Variants ---
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 24 },
  },
};

const cardHover = {
  rest: { scale: 1, y: 0, boxShadow: "0 1px 2px 0 rgb(0 0 0 / 0.05)" },
  hover: {
    scale: 1.02,
    y: -4,
    boxShadow:
      "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
    transition: { type: "spring", stiffness: 400, damping: 25 },
  },
};

function StudentAnalytics() {
  const { user } = useAuth();
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [analytics, setAnalytics] = useState(null);
  const [loadingAnalytics, setLoadingAnalytics] = useState(false);
  const [loadingSubjects, setLoadingSubjects] = useState(false);
  const [questions, setQuestions] = useState([]);
  const topTopics = analytics?.topTopics ?? [];
  const predictedTopics = analytics?.predictedQuestions ?? [];
  const marksDistribution = analytics?.marksDistribution ?? [];
  const courseOutcomes = analytics?.courseOutcomeDistribution ?? [];

  const maxMarksCount = Math.max(...marksDistribution.map((m) => m.count), 1);
  const maxCOCount = Math.max(...courseOutcomes.map((c) => c.count), 1);

  useEffect(() => {
    if (user?.departmentId) {
      loadSubjects();
    }
  }, [user.departmentId]);

  useEffect(() => {
    if (selectedSubject) {
      loadAnalytics();
    } else {
      setAnalytics(null);
    }
  }, [selectedSubject]);

  const topTopic =
    analytics?.topTopics?.length > 0 ? analytics.topTopics[0].topic : "-";
  const predictedTopic =
    analytics?.predictedQuestions?.length > 0
      ? analytics.predictedQuestions[0].topic
      : "-";

  const loadSubjects = async () => {
    setLoadingSubjects(true);
    try {
      const response = await getSubjects(user.departmentId);
      console.log(response);
      setSubjects(response);
    } catch (error) {
      showError(error.response?.data?.message || "Failed to load subjects");
    } finally {
      setLoadingSubjects(false);
    }
  };

  const loadAnalytics = async () => {
    setLoadingAnalytics(false);
    try {
      const response = await getAnalyticsDashboard(selectedSubject);
      console.log("Analytics Dashboard", response);
      const questionResponse = await getQuestionsBySubject(selectedSubject);

      setQuestions(questionResponse);
      setAnalytics(response);
    } catch (error) {
      console.log(error);
      showError(error.response?.data.message || "Failed to get analytics");
      setAnalytics(null);
    } finally {
      setLoadingAnalytics(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 pt-4">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2.5 bg-indigo-100 text-indigo-600 rounded-xl">
              <BarChart3 className="w-6 h-6" />
            </div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
              PYQ Intelligence
            </h1>
          </div>
          <p className="text-slate-500 text-base max-w-2xl ml-12">
            Analyze previous examination patterns, discover important topics,
            and prepare intelligently with predictive analytics.
          </p>
        </motion.div>

        {/* Subject Selection */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="bg-white/60 backdrop-blur-xl border border-slate-200/60 rounded-3xl p-6 lg:p-8 shadow-sm mb-8"
        >
          <div className="max-w-xl">
            <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-3">
              <BookOpen className="w-4 h-4 text-indigo-500" />
              Select Subject Space
            </label>
            <div className="relative">
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                disabled={loadingSubjects}
                className="w-full appearance-none rounded-2xl border border-slate-200 bg-white px-5 py-4 text-slate-700 font-medium transition-all hover:border-indigo-300 focus:outline-none focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 disabled:bg-slate-50 disabled:text-slate-400 cursor-pointer shadow-sm"
              >
                <option value="">
                  {loadingSubjects
                    ? "Loading subjects..."
                    : "Choose a subject to analyze..."}
                </option>
                {subjects.map((subject) => (
                  <option key={subject.id} value={subject.name}>
                    {subject.name}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-5 flex items-center pointer-events-none">
                <Activity
                  className={`w-5 h-5 ${selectedSubject ? "text-indigo-500" : "text-slate-400"}`}
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Empty State */}
        <AnimatePresence mode="wait">
          {!selectedSubject && (
            <motion.div
              key="empty-state"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mt-8 bg-slate-50/50 border border-slate-200/50 border-dashed rounded-3xl py-24 px-6 text-center flex flex-col items-center justify-center"
            >
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 3,
                  ease: "easeInOut",
                }}
                className="w-20 h-20 bg-indigo-50 rounded-full flex items-center justify-center mb-6"
              >
                <Lightbulb className="w-10 h-10 text-indigo-400" />
              </motion.div>
              <h2 className="text-xl font-bold text-slate-800 mb-2">
                Awaiting Subject Selection
              </h2>
              <p className="text-base text-slate-500 max-w-md">
                Select a subject above to generate AI-driven PYQ patterns, topic
                frequencies, and examination predictions.
              </p>
            </motion.div>
          )}

          {/* Analytics Dashboard */}
          {selectedSubject && analytics && (
            <motion.div
              key="analytics-dashboard"
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="mt-4 space-y-8"
            >
              {/* Summary Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                <motion.div
                  variants={itemVariants}
                  initial="rest"
                  whileHover="hover"
                  animate="rest"
                  className="bg-white rounded-3xl border border-slate-100 p-6 relative overflow-hidden group"
                >
                  <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                    <FileText className="w-24 h-24 text-blue-600 -mr-6 -mt-6" />
                  </div>
                  <div className="relative z-10">
                    <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-4">
                      <FileText className="w-6 h-6" />
                    </div>
                    <p className="text-slate-500 text-sm font-medium mb-1">
                      Papers Analysed
                    </p>
                    <h2 className="text-4xl font-black text-slate-800 tracking-tight">
                      {analytics.totalPapers}
                    </h2>
                  </div>
                </motion.div>

                <motion.div
                  variants={itemVariants}
                  initial="rest"
                  whileHover="hover"
                  animate="rest"
                  className="bg-white rounded-3xl border border-slate-100 p-6 relative overflow-hidden group"
                >
                  <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                    <CircleHelp className="w-24 h-24 text-emerald-600 -mr-6 -mt-6" />
                  </div>
                  <div className="relative z-10">
                    <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-4">
                      <CircleHelp className="w-6 h-6" />
                    </div>
                    <p className="text-slate-500 text-sm font-medium mb-1">
                      Questions Analysed
                    </p>
                    <h2 className="text-4xl font-black text-slate-800 tracking-tight">
                      {analytics.totalQuestions}
                    </h2>
                  </div>
                </motion.div>

                <motion.div
                  variants={itemVariants}
                  initial="rest"
                  whileHover="hover"
                  animate="rest"
                  className="bg-white rounded-3xl border border-slate-100 p-6 relative overflow-hidden group"
                >
                  <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                    <TrendingUp className="w-24 h-24 text-purple-600 -mr-6 -mt-6" />
                  </div>
                  <div className="relative z-10">
                    <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center mb-4">
                      <TrendingUp className="w-6 h-6" />
                    </div>
                    <p className="text-slate-500 text-sm font-medium mb-1">
                      Most Asked Topic
                    </p>
                    <h2
                      className="text-xl font-bold text-slate-800 leading-tight truncate"
                      title={topTopic}
                    >
                      {topTopic}
                    </h2>
                  </div>
                </motion.div>

                <motion.div
                  variants={itemVariants}
                  initial="rest"
                  whileHover="hover"
                  animate="rest"
                  className="bg-white rounded-3xl border border-slate-100 p-6 relative overflow-hidden group"
                >
                  <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                    <Target className="w-24 h-24 text-orange-600 -mr-6 -mt-6" />
                  </div>
                  <div className="relative z-10">
                    <div className="w-12 h-12 bg-orange-50 text-orange-600 rounded-2xl flex items-center justify-center mb-4">
                      <Target className="w-6 h-6" />
                    </div>
                    <p className="text-slate-500 text-sm font-medium mb-1">
                      Top Expected Topic
                    </p>
                    <h2
                      className="text-xl font-bold text-slate-800 leading-tight truncate"
                      title={predictedTopic}
                    >
                      {predictedTopic}
                    </h2>
                  </div>
                </motion.div>
              </div>

              {/* Lists Section */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Most Asked Topics */}
                <motion.div
                  variants={itemVariants}
                  className="bg-white rounded-3xl border border-slate-100 p-6 lg:p-8 flex flex-col"
                >
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                        <Zap className="w-5 h-5 text-amber-500" /> Highly
                        Repeated
                      </h2>
                      <p className="text-sm text-slate-500 mt-1">
                        Frequently appearing topics across previous papers
                      </p>
                    </div>
                  </div>
                  <div className="space-y-3 flex-1">
                    {topTopics.slice(0, 8).map((topic, index) => (
                      <motion.div
                        whileHover={{
                          x: 4,
                          backgroundColor: "rgba(248, 250, 252, 1)",
                        }}
                        key={topic.topic}
                        className="flex items-center justify-between p-3 rounded-2xl transition-colors border border-transparent hover:border-slate-100"
                      >
                        <div className="flex items-center gap-4 overflow-hidden">
                          <div
                            className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${index < 3 ? "bg-indigo-600 text-white shadow-md shadow-indigo-200" : "bg-slate-100 text-slate-500"}`}
                          >
                            {index + 1}
                          </div>
                          <span
                            className="font-semibold text-slate-700 truncate"
                            title={topic.topic}
                          >
                            {topic.topic}
                          </span>
                        </div>
                        <span className="shrink-0 ml-4 bg-indigo-50 text-indigo-700 border border-indigo-100 px-3 py-1 rounded-full text-xs font-bold tracking-wide">
                          {topic.frequency} ×
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Expected Topics */}
                <motion.div
                  variants={itemVariants}
                  className="bg-white rounded-3xl border border-slate-100 p-6 lg:p-8 flex flex-col"
                >
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                        <Target className="w-5 h-5 text-rose-500" /> AI
                        Predictions
                      </h2>
                      <p className="text-sm text-slate-500 mt-1">
                        Ranked using historical frequency, marks, and recency
                      </p>
                    </div>
                  </div>
                  <div className="space-y-3 flex-1">
                    {predictedTopics.slice(0, 8).map((topic, index) => (
                      <motion.div
                        whileHover={{
                          x: 4,
                          backgroundColor: "rgba(248, 250, 252, 1)",
                        }}
                        key={topic.topic}
                        className="flex items-center justify-between p-3 rounded-2xl transition-colors border border-transparent hover:border-slate-100"
                      >
                        <div className="flex items-center gap-4 overflow-hidden">
                          <div
                            className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${index < 3 ? "bg-rose-500 text-white shadow-md shadow-rose-200" : "bg-slate-100 text-slate-500"}`}
                          >
                            {index + 1}
                          </div>
                          <div className="truncate">
                            <p
                              className="font-semibold text-slate-700 truncate"
                              title={topic.topic}
                            >
                              {topic.topic}
                            </p>
                            <p className="text-[11px] font-medium text-slate-400 mt-0.5">
                              Last Asked: {topic.latestYear}
                            </p>
                          </div>
                        </div>
                        <div className="shrink-0 ml-4 flex flex-col items-end">
                          <span className="bg-rose-50 text-rose-700 border border-rose-100 px-3 py-1 rounded-full text-xs font-bold tracking-wide">
                            {topic.confidence}% Match
                          </span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Progress Bars Section */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Marks Distribution */}
                <motion.div
                  variants={itemVariants}
                  className="bg-white rounded-3xl border border-slate-100 p-6 lg:p-8"
                >
                  <div className="mb-8">
                    <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                      <Award className="w-5 h-5 text-blue-500" /> Marks
                      Weightage
                    </h2>
                    <p className="text-sm text-slate-500 mt-1">
                      Historical distribution of questions according to marks.
                    </p>
                  </div>

                  <div className="space-y-6">
                    {marksDistribution.map((mark, idx) => (
                      <div key={mark.marks} className="group">
                        <div className="flex justify-between items-end mb-2">
                          <span className="font-bold text-slate-700 flex items-center gap-2">
                            {mark.marks} Marks
                          </span>
                          <span className="text-sm font-medium text-slate-500 bg-slate-50 px-2 py-0.5 rounded-md">
                            {mark.count} Qs
                          </span>
                        </div>
                        <div className="w-full h-3.5 rounded-full bg-slate-100 overflow-hidden shadow-inner">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{
                              width: `${(mark.count * 100) / maxMarksCount}%`,
                            }}
                            viewport={{ once: true }}
                            transition={{
                              duration: 1,
                              delay: idx * 0.1,
                              ease: "easeOut",
                            }}
                            className="h-full rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 relative"
                          >
                            <div
                              className="absolute inset-0 bg-white/20 w-full h-full rounded-full"
                              style={{
                                backgroundImage:
                                  "linear-gradient(45deg,rgba(255,255,255,.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,.15) 50%,rgba(255,255,255,.15) 75%,transparent 75%,transparent)",
                                backgroundSize: "1rem 1rem",
                              }}
                            ></div>
                          </motion.div>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Course Outcomes */}
                <motion.div
                  variants={itemVariants}
                  className="bg-white rounded-3xl border border-slate-100 p-6 lg:p-8"
                >
                  <div className="mb-8">
                    <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                      <BookOpen className="w-5 h-5 text-emerald-500" /> Course
                      Outcomes
                    </h2>
                    <p className="text-sm text-slate-500 mt-1">
                      Number of historical questions mapped to each CO.
                    </p>
                  </div>

                  <div className="space-y-6">
                    {courseOutcomes.map((co, idx) => (
                      <div key={co.courseOutcome} className="group">
                        <div className="flex justify-between items-end mb-2">
                          <span className="font-bold text-slate-700">
                            Outcome {co.courseOutcome}
                          </span>
                          <span className="text-sm font-medium text-slate-500 bg-slate-50 px-2 py-0.5 rounded-md">
                            {co.count} Qs
                          </span>
                        </div>
                        <div className="w-full h-3.5 rounded-full bg-slate-100 overflow-hidden shadow-inner">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{
                              width: `${(co.count * 100) / maxCOCount}%`,
                            }}
                            viewport={{ once: true }}
                            transition={{
                              duration: 1,
                              delay: idx * 0.1,
                              ease: "easeOut",
                            }}
                            className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-teal-500 relative"
                          >
                            <div
                              className="absolute inset-0 bg-white/20 w-full h-full rounded-full"
                              style={{
                                backgroundImage:
                                  "linear-gradient(45deg,rgba(255,255,255,.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,.15) 50%,rgba(255,255,255,.15) 75%,transparent 75%,transparent)",
                                backgroundSize: "1rem 1rem",
                              }}
                            ></div>
                          </motion.div>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div className="mt-8 bg-white rounded-2xl border shadow-sm p-6">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold">Previous Questions</h2>

            <p className="text-slate-500 mt-1">
              Browse previously asked examination questions.
            </p>
          </div>

          <div className="space-y-5">
            {questions.map((question) => (
              <div
                key={question.id}
                className="border rounded-xl p-5 hover:bg-slate-50 transition"
              >
                <div className="flex flex-wrap gap-2 mb-3">
                  <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs">
                    {question.topic}
                  </span>

                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs">
                    {question.marks} Marks
                  </span>

                  <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-xs">
                    CO {question.courseOutcome}
                  </span>
                </div>

                <p className="leading-7 text-slate-700">
                  {question.questionText}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default StudentAnalytics;
