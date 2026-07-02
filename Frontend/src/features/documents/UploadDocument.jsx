import React, { useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import FileDropZone from "../../components/documents/FileDropZone";
import SelectedFileCard from "../../components/documents/SelectedFileCard";
function UploadDocument() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    subjectId: "",
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800">
            Upload Study Resource
          </h1>

          <p className="text-slate-500 mt-2">
            Upload faculty-approved study material for students.
          </p>
        </div>
        <div className="bg-white rounded-2xl shadow-sm border p-8">
          <div className="mb-6">
            <label className="block mb-2 font-medium">Title</label>

            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Operating System Notes"
              className="w-full rounded-xl border border-slate-300 px-4 py-3
               focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-6">
            <label className="block mb-2 font-medium">Description</label>

            <textarea
              rows={5}
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Short description..."
              className="w-full rounded-xl border border-slate-300 px-4 py-3
              resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-8">
            <label className="block mb-2 font-medium">Subject</label>

            <select
              name="subjectId"
              value={formData.subjectId}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-300 px-4 py-3
              focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Subject</option>

              <option value="1">Operating System</option>

              <option value="2">DBMS</option>
            </select>
          </div>
          <FileDropZone onFileSelect={setSelectedFile} />
          <SelectedFileCard
            file={selectedFile}
            onRemove={() => setSelectedFile(null)}
          />
          <button

type="submit"

disabled={!selectedFile}

className="mt-8 w-full bg-blue-600
text-white py-3 rounded-xl
disabled:bg-slate-300"

>

Upload Resource

</button>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default UploadDocument;
