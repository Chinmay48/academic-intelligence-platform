import { useEffect, useState } from "react";

import DashboardLayout
    from "../../components/layout/DashboardLayout";

import ConversationSidebar
    from "../../components/chat/ConversationSidebar";

import ChatInput
    from "../../components/chat/ChatInput";

import ChatMessage from "../../components/chat/ChatMessage";

import {
    askQuestion,
    getConversations,
    getConversationMessages
} from "../../services/chatService";

import {
    showError
} from "../../utils/toast";


function StudentChat() {

    const [conversations, setConversations] =
        useState([]);

    const [activeConversationId,
        setActiveConversationId] =
        useState(null);

    const [messages, setMessages] =
        useState([]);

    const [sending, setSending] =
        useState(false);

    const [loadingMessages, setLoadingMessages] =
        useState(false);


    useEffect(() => {

        loadConversations();

    }, []);


    const loadConversations = async () => {

        try {

            const data =
                await getConversations();

            setConversations(data);

        } catch (error) {

            console.error(error);

            showError(
                "Failed to load conversations"
            );
        }
    };


    const handleNewChat = () => {

        setActiveConversationId(null);

        setMessages([]);
    };


    const handleSelectConversation = async (
        conversationId
    ) => {

        try {

            setLoadingMessages(true);

            setActiveConversationId(
                conversationId
            );

            const data =
                await getConversationMessages(
                    conversationId
                );

            setMessages(data);
            console.log(data)

        } catch (error) {

            console.error(error);

            showError(
                "Failed to load conversation"
            );

        } finally {

            setLoadingMessages(false);
        }
    };


    const handleSendMessage = async (
        question
    ) => {

        if (sending) {
            return;
        }


        const temporaryUserMessage = {

            id: `temp-${Date.now()}`,

            role: "USER",

            content: question,

            createdAt:
                new Date().toISOString()
        };


        // Show question immediately

        setMessages(prev => [

            ...prev,

            temporaryUserMessage

        ]);


        try {

            setSending(true);


            const response =
                await askQuestion(

                    question,

                    activeConversationId

                );


            // First message creates conversation

            if (!activeConversationId) {

                setActiveConversationId(
                    response.conversationId
                );
            }


            const assistantMessage = {

                id: `assistant-${Date.now()}`,

                role: "ASSISTANT",

                content: response.answer,

                citations:
                    response.citations || [],

                createdAt:
                    new Date().toISOString()
            };


            setMessages(prev => [

                ...prev,

                assistantMessage

            ]);


            // Refresh sidebar because:
            // 1. New conversation may exist
            // 2. updatedAt may have changed

            await loadConversations();


        } catch (error) {

            console.error(error);

            showError(
                error.response?.data?.message
                ||
                "Failed to generate answer"
            );

        } finally {

            setSending(false);
        }
    };


    return (

        <DashboardLayout>

            <div className="
                h-[calc(100vh-6rem)]
                bg-white
                border
                border-slate-200
                rounded-2xl
                overflow-hidden
                flex
                shadow-sm
            ">


                <ConversationSidebar

                    conversations={
                        conversations
                    }

                    activeConversationId={
                        activeConversationId
                    }

                    onSelectConversation={
                        handleSelectConversation
                    }

                    onNewChat={
                        handleNewChat
                    }

                />


                <div className="
                    flex-1
                    min-w-0
                    flex
                    flex-col
                ">


                    <div className="
                        px-6
                        py-4
                        border-b
                        border-slate-200
                    ">

                        <h1 className="
                            text-lg
                            font-semibold
                            text-slate-800
                        ">

                            AI Academic Assistant

                        </h1>


                        <p className="
                            text-sm
                            text-slate-500
                        ">

                            Ask questions from your
                            department's academic resources

                        </p>

                    </div>


                    <div className="
                        flex-1
                        overflow-y-auto
                    ">

                        <ChatMessage

                            messages={messages}

                            sending={sending}

                            loading={
                                loadingMessages
                            }

                        />

                    </div>


                    <ChatInput

                        onSend={
                            handleSendMessage
                        }

                        disabled={
                            sending
                        }

                    />

                </div>

            </div>

        </DashboardLayout>

    );
}


export default StudentChat;