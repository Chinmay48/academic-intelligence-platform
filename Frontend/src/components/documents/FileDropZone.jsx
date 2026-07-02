import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { UploadCloud } from "lucide-react";

function FileDropZone({ onFileSelect }) {

    const onDrop = useCallback((acceptedFiles) => {

        if (acceptedFiles.length > 0) {

            onFileSelect(acceptedFiles[0]);

        }

    }, [onFileSelect]);

    const {

        getRootProps,

        getInputProps,

        isDragActive

    } = useDropzone({

        multiple: false,

        maxSize: 25 * 1024 * 1024,

        accept: {

            "application/pdf": [".pdf"],

            "application/vnd.ms-powerpoint": [".ppt"],

            "application/vnd.openxmlformats-officedocument.presentationml.presentation": [".pptx"]

        },

        onDrop

    });

    return (

        <div

            {...getRootProps()}

            className={`
                border-2 border-dashed rounded-2xl p-10
                text-center cursor-pointer transition

                ${isDragActive

                    ? "border-blue-600 bg-blue-50"

                    : "border-slate-300 hover:border-blue-400"

                }
            `}

        >

            <input {...getInputProps()} />

            <UploadCloud
                className="mx-auto text-blue-600"
                size={50}
            />

            <h3 className="mt-4 text-xl font-semibold">

                Drag & Drop your file

            </h3>

            <p className="text-slate-500 mt-2">

                or click to browse

            </p>

            <p className="text-sm text-slate-400 mt-5">

                PDF • PPT • PPTX

                <br />

                Maximum Size 25 MB

            </p>

        </div>

    );

}

export default FileDropZone;