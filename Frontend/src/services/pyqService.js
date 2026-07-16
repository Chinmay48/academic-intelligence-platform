import api from "../utils/axios";

export const uploadPYQ = async (
    file,
    subjectId,
    onUploadProgress
) => {

    const formData = new FormData();

    formData.append("file", file);

    formData.append(
        "subjectId",
        subjectId
    );


    const response = await api.post(
        "/pyq/upload",
        formData,
        {
            onUploadProgress: (progressEvent) => {

                if (!progressEvent.total) {
                    return;
                }

                const percent =
                    Math.round(
                        (
                            progressEvent.loaded
                            * 100
                        )
                        /
                        progressEvent.total
                    );


                onUploadProgress?.(
                    percent
                );
            }
        }
    );


    return response.data;
};

export const getQuestionsBySubject = async (subjectName) => {

    const response = await api.get(
        `/pyq/questions?subject=${encodeURIComponent(subjectName)}`
    );

    return response.data;
};