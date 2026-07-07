import { useEffect, useState } from "react";

import DashboardLayout
  from "../../components/layout/DashboardLayout";

import FileDropZone
  from "../../components/documents/FileDropZone";

import SelectedFileCard
  from "../../components/documents/SelectedFileCard";

import UploadProgress
  from "../../components/documents/UploadProgress";

import useAuth
  from "../../hooks/useAuth";

import { getSubjects }
  from "../../services/subjectService";

import { uploadPYQ }
  from "../../services/pyqService";

import {
  showError,
  showSuccess
} from "../../utils/toast";


function UploadPYQ() {

  const { user } = useAuth();


  const [subjects, setSubjects] =
    useState([]);


  const [subjectId, setSubjectId] =
    useState("");


  const [selectedFile, setSelectedFile] =
    useState(null);


  const [uploading, setUploading] =
    useState(false);


  const [uploadProgress, setUploadProgress] =
    useState(0);


  useEffect(() => {

    if (user?.departmentId) {
      loadSubjects();
    }

  }, [user?.departmentId]);


  const loadSubjects = async () => {

    try {

      const response =
        await getSubjects(
          user.departmentId
        );

      setSubjects(response);

    } catch (error) {

      console.error(error);

      showError(
        error.response?.data?.message ||
        "Failed to load subjects"
      );
    }
  };


  const handleUpload = async () => {

    if (!selectedFile || !subjectId) {
      return;
    }


    try {

      setUploading(true);

      setUploadProgress(0);


      const paperId = await uploadPYQ(

        selectedFile,

        subjectId,

        setUploadProgress

      );


      showSuccess(
        "Question paper uploaded and processed successfully."
      );


      console.log(
        "Created Question Paper ID:",
        paperId
      );


      // Reset form

      setSelectedFile(null);

      setSubjectId("");

      setUploadProgress(0);


    } catch (error) {

      console.error(error);

      showError(
        error.response?.data?.message ||
        "Failed to process question paper."
      );

    } finally {

      setUploading(false);
    }
  };


  return (

    <DashboardLayout>

      <div className="max-w-5xl mx-auto">


        {/* Header */}

        <div className="mb-8">

          <h1 className="
            text-3xl
            font-bold
            text-slate-800
          ">

            Upload Previous Year Paper

          </h1>


          <p className="
            text-slate-500
            mt-2
          ">

            Upload an examination paper for
            question extraction and PYQ analytics.

          </p>

        </div>


        {/* Upload Card */}

        <div className="
          bg-white
          rounded-2xl
          shadow-sm
          border
          border-slate-200
          p-8
        ">


          {/* Subject */}

          <div className="mb-8">

            <label className="
              block
              mb-2
              font-medium
              text-slate-700
            ">

              Subject

            </label>


            <select

              value={subjectId}

              onChange={(e) =>
                setSubjectId(
                  e.target.value
                )
              }

              disabled={uploading}

              className="
                w-full
                rounded-xl
                border
                border-slate-300
                px-4
                py-3
                bg-white
                focus:outline-none
                focus:ring-2
                focus:ring-blue-500
                disabled:bg-slate-100
              "

            >

              <option value="">

                Select Subject

              </option>


              {subjects.map(subject => (

                <option
                  key={subject.id}
                  value={subject.id}
                >

                  {subject.name}

                </option>

              ))}

            </select>

          </div>


          {/* File heading */}

          <div className="mb-3">

            <label className="
              block
              font-medium
              text-slate-700
            ">

              Question Paper

            </label>


            <p className="
              text-sm
              text-slate-500
              mt-1
            ">

              Upload the examination paper
              that will be processed for analytics.

            </p>

          </div>


          {/* Existing reusable components */}

          <FileDropZone

            onFileSelect={
              setSelectedFile
            }

          />


          <SelectedFileCard

            file={selectedFile}

            onRemove={() =>
              setSelectedFile(null)
            }

          />


          <UploadProgress

            progress={uploadProgress}

          />


          {/* Upload Button */}

          <button

            onClick={handleUpload}

            disabled={
              uploading ||
              !selectedFile ||
              !subjectId
            }

            className="
              mt-8
              w-full
              rounded-xl
              bg-blue-600
              hover:bg-blue-700
              text-white
              py-3
              font-medium
              transition
              disabled:bg-slate-300
              disabled:cursor-not-allowed
            "

          >

            {
              uploading
                ? "Processing Question Paper..."
                : "Upload & Process Question Paper"
            }

          </button>


          {uploading && (

            <p className="
              text-sm
              text-slate-500
              text-center
              mt-3
            ">

              Extracting questions and generating
              analytics topics may take some time.

            </p>

          )}

        </div>

      </div>

    </DashboardLayout>
  );
}


export default UploadPYQ;