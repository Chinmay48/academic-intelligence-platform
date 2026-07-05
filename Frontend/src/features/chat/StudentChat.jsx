import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import DashboardLayout from "../../components/layout/DashboardLayout";
import ConversationSidebar from "../../components/chat/ConversationSidebar";
import ChatInput from "../../components/chat/ChatInput";
import ChatMessage from "../../components/chat/ChatMessage";
import { askQuestion, getConversations, getConversationMessages } from "../../services/chatService";
import { showError } from "../../utils/toast";

function StudentChat() {
  const [conversations, setConversations] = useState([]);
  const [activeConversationId, setActiveConversationId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [sending, setSending] = useState(false);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Mobile sidebar state

  useEffect(() => {
    loadConversations();
  }, []);

  const loadConversations = async () => {
    try {
      const data = await getConversations();
      setConversations(data);
    } catch (error) {
      console.error(error);
      showError("Failed to load conversations");
    }
  };

  const handleNewChat = () => {
    setActiveConversationId(null);
    setMessages([]);
    if (window.innerWidth < 768) setIsSidebarOpen(false);
  };

  const handleSelectConversation = async (conversationId) => {
    try {
      setLoadingMessages(true);
      setActiveConversationId(conversationId);
      if (window.innerWidth < 768) setIsSidebarOpen(false);

      const data = await getConversationMessages(conversationId);
      setMessages(data);
    } catch (error) {
      console.error(error);
      showError("Failed to load conversation");
    } finally {
      setLoadingMessages(false);
    }
  };

  const handleSendMessage = async (question) => {
    if (sending) return;

    const temporaryUserMessage = {
      id: `temp-${Date.now()}`,
      role: "USER",
      context: question,
      createdAt: new Date().toISOString()
    };

    setMessages(prev => [...prev, temporaryUserMessage]);

    try {
      setSending(true);
      const response = await askQuestion(question, activeConversationId);

      if (!activeConversationId) {
        setActiveConversationId(response.conversationId);
      }

      const assistantMessage = {
        id: `assistant-${Date.now()}`,
        role: "ASSISTANT",
        context: response.answer,
        citations: response.citations || [],
        createdAt: new Date().toISOString()
      };

      setMessages(prev => [...prev, assistantMessage]);
      await loadConversations();
    } catch (error) {
      console.error(error);
      showError(error.response?.data?.message || "Failed to generate answer");
    } finally {
      setSending(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="h-[calc(100vh-6rem)] bg-white border border-slate-200 rounded-2xl overflow-hidden flex shadow-sm relative">
        
        {/* Mobile Sidebar Overlay */}
        <AnimatePresence>
          {isSidebarOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSidebarOpen(false)}
              className="md:hidden absolute inset-0 bg-slate-900/20 z-20"
            />
          )}
        </AnimatePresence>

        {/* Sidebar Container */}
        <div className={`
          absolute md:relative z-30 h-full bg-slate-50 transition-transform duration-300 ease-in-out
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}>
          <ConversationSidebar
            conversations={conversations}
            activeConversationId={activeConversationId}
            onSelectConversation={handleSelectConversation}
            onNewChat={handleNewChat}
            onClose={() => setIsSidebarOpen(false)}
          />
        </div>

        {/* Main Chat Area */}
        <div className="flex-1 min-w-0 flex flex-col h-full w-full">
          <div className="px-4 md:px-6 py-4 border-b border-slate-200 flex items-center gap-3">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="md:hidden p-2 -ml-2 text-slate-500 hover:bg-slate-100 rounded-lg"
            >
              <Menu size={24} />
            </button>
            <div>
              <h1 className="text-lg font-semibold text-slate-800">AI Academic Assistant</h1>
              <p className="text-xs md:text-sm text-slate-500 hidden sm:block">
                Ask questions from your department's academic resources
              </p>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            <ChatMessage
              messages={messages}
              sending={sending}
              loading={loadingMessages}
            />
          </div>

          <ChatInput onSend={handleSendMessage} disabled={sending} />
        </div>
      </div>
    </DashboardLayout>
  );
}

export default StudentChat;