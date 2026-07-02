import { FileText, X } from "lucide-react";

function SelectedFileCard({

    file,

    onRemove

}) {

    if (!file) return null;

    return (

        <div className="mt-6 bg-slate-50 border rounded-xl p-5 flex justify-between items-center">

            <div className="flex items-center gap-4">

                <FileText

                    size={35}

                    className="text-red-600"

                />

                <div>

                    <h3 className="font-semibold">

                        {file.name}

                    </h3>

                    <p className="text-sm text-slate-500">

                        {(file.size / 1024 / 1024).toFixed(2)} MB

                    </p>

                </div>

            </div>

            <button

                onClick={onRemove}

            >

                <X className="text-red-600"/>

            </button>

        </div>

    );

}

export default SelectedFileCard;