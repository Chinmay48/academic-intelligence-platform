import React, { useState } from 'react'
import DashboardLayout from '../../components/layout/DashboardLayout';
import ConversationSidebar from '../../components/chat/ConversationSidebar';
import ChatInput from '../../components/chat/ChatInput';
function StudentChat() {
  const[activeConversationId,setActiveConversationId]=useState(null)
  const[messages,setMessages]=useState([]);
  const handleNewChat=()=>{
    setActiveConversationId(null);
    setMessages([])
  }
  const handleSendMessage=(question)=>{
    console.log("Question: ",question)
    console.log("Conversation:",activeConversationId);
  }
  return (
    <DashboardLayout>
      <div className="h-[calc(100vh-6rem)] bg-white border border-slate-200 rounded-2xl overflow-hidden flex shadow-sm">
        <ConversationSidebar
          activeConversationId={activeConversationId}
          onSelectConversation={setActiveConversationId}
          onNewChat={handleNewChat}
        />

        <div className="flex-1 min-w-0 flex flex-col">
          <div className="px-6 py-4 border-b border-slate-200">
            <h1 className="text-lg font-semibold text-slate-800">
              AI Academic Assistant
            </h1>

            <p className="text-sm text-slate-500">
              Ask questions from your department's academic resources
            </p>
          </div>

          <div className="flex-1 overflow-y-auto p-6">
            {messages.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center">
                <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center mb-4">
                  <span className="text-2xl">✦</span>
                </div>

                <h2 className="text-2xl font-semibold text-slate-800">
                  What would you like to learn?
                </h2>

                <p className="mt-2 text-slate-500 max-w-md">
                  Ask a question and EduPilot will answer using the academic
                  resources available for your department.
                </p>
              </div>
            ) : (
              <div>
                {/* ChatMessages will come in the next step */}
              </div>
            )}
          </div>

          <ChatInput onSend={handleSendMessage} />
        </div>
      </div>
    </DashboardLayout>
  )
}

export default StudentChat

