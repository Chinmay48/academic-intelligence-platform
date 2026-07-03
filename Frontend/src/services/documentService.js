import React from 'react'
import api from '../utils/axios';

export const uploadDocument = async (
    file,
    title,
    description,
    subjectId,
    onUploadProgress
) => {

    const formData = new FormData();

    formData.append("file", file);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("subjectId", subjectId);

    const response = await api.post(
        "/documents/upload",
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data"
            },

            onUploadProgress: (progressEvent) => {

                const percent = Math.round(
                    (progressEvent.loaded * 100) /
                    progressEvent.total
                );

                onUploadProgress(percent);

            }
        }
    );

    return response.data;
};



