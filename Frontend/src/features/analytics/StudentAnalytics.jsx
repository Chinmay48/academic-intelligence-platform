import {
  Files,
  CircleHelp,
  TrendingUp,
  Target
} from "lucide-react";
import { useEffect, useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import useAuth from "../../hooks/useAuth";
import { getSubjects } from "../../services/subjectService";
import { showError } from "../../utils/toast";
import { getAnalyticsDashboard } from "../../services/analyticsService";
function StudentAnalytics() {
  const { user } = useAuth();
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState("");
  const[analytics,setAnalytics] =useState(null)
  const[loadingAnalytics,setLoadingAnalytics]=useState(false);
  const [loadingSubjects, setLoadingSubjects] = useState(false);
  useEffect(() => {
    if (user?.departmentId) {
      loadSubjects()
    }
  },[user.departmentId]);

  const loadSubjects = async () => {
    setLoadingSubjects(true);
    try {
      const response = await getSubjects(user.departmentId);
      console.log(response)
      setSubjects(response);
    } catch (error) {
      showError(error.response?.data?.message || "Failed to load subjects");
    } finally {
      setLoadingSubjects(false);
    }
  };

  const loadAnalytics=async()=>{
    setLoadingAnalytics(false)
    try {
      const response=await getAnalyticsDashboard(selectedSubject)
      console.log("Analytics Dashboard",response)
      setAnalytics(response)
    } catch (error) {
      console.log(error)
        showError(error.response?.data.message || "Failed to get analytics")
        setAnalytics(null)
    }
    finally{
      setLoadingAnalytics(false)
    }

  }

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto pb-10">
        {/* Page Header */}

        <div className="mb-8">
          <h1
            className="
            text-3xl
            font-bold
            text-slate-800
          "
          >
            PYQ Intelligence
          </h1>

          <p
            className="
            mt-2
            text-slate-500
          "
          >
            Analyze previous examination patterns, important topics and expected
            topics.
          </p>
        </div>

        {/* Subject Selection */}

        <div
          className="
          bg-white
          border
          border-slate-200
          rounded-2xl
          p-6
          shadow-sm
        "
        >
          <div
            className="
            max-w-xl
          "
          >
            <label
              className="
              block
              text-sm
              font-medium
              text-slate-700
              mb-2
            "
            >
              Select Subject
            </label>

            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              disabled={loadingSubjects}
              className="
                w-full
                rounded-xl
                border
                border-slate-300
                bg-white
                px-4
                py-3
                text-slate-700
                focus:outline-none
                focus:ring-2
                focus:ring-blue-500
                disabled:bg-slate-100
              "
            >
              <option value="">
                {loadingSubjects ? "Loading subjects..." : "Select a subject"}
              </option>

              {subjects.map((subject) => (
                <option key={subject.id} value={subject.name}>
                  {subject.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Temporary State */}

        {!selectedSubject && (
          <div
            className="
            mt-8
            bg-slate-50
            border
            border-slate-200
            rounded-2xl
            py-16
            px-6
            text-center
          "
          >
            <h2
              className="
              text-lg
              font-semibold
              text-slate-700
            "
            >
              Select a subject to view analytics
            </h2>

            <p
              className="
              text-sm
              text-slate-500
              mt-2
            "
            >
              PYQ patterns will be generated from the uploaded examination
              papers.
            </p>
          </div>
        )}

        {/* Analytics will go here next */}

        {selectedSubject && (
          <div
            className="
            mt-8
            bg-white
            border
            border-slate-200
            rounded-2xl
            p-8
          "
          >
            <p className="text-slate-600">
              Selected Subject:{" "}
              <span className="font-semibold">{selectedSubject}</span>
            </p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

export default StudentAnalytics;
