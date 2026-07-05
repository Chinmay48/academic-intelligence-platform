import api from "../utils/axios";

export const askQuestion = async (
    question,
    conversationId
) => {

    const response = await api.post(
        "/chat",
        {
            question,
            conversationId
        }
    );

    return response.data;
};


export const getConversations = async () => {

    const response = await api.get(
        "/conversations"
    );

    return response.data;
};


export const getConversationMessages = async (
    conversationId
) => {

    const response = await api.get(
        `/conversations/${conversationId}/message`
    );

    return response.data;
};


export const deleteConversation = async (
    conversationId
) => {

    await api.delete(
        `/conversations/${conversationId}`
    );
};