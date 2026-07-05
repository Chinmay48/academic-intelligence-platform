import { MessageSquare, Plus, X } from "lucide-react";

function ConversationSidebar({
  conversations,
  activeConversationId,
  onSelectConversation,
  onNewChat,
  onClose // New prop passed from StudentChat
}) {
  return (
    <aside className="w-72 md:w-64 lg:w-72 h-full flex flex-col border-r border-slate-200 shadow-xl md:shadow-none bg-slate-50">
      
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between p-4 border-b border-slate-200">
        <span className="font-semibold text-slate-700">Chat History</span>
        <button onClick={onClose} className="p-1 rounded-md text-slate-500 hover:bg-slate-200">
          <X size={20} />
        </button>
      </div>

      <div className="p-4">
        <button
          onClick={onNewChat}
          className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2.5 md:py-3 rounded-xl font-medium transition shadow-sm"
        >
          <Plus size={18} />
          New Chat
        </button>
      </div>

      <div className="px-4 pb-2">
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
          Recent Chats
        </p>
      </div>

      <div className="flex-1 overflow-y-auto px-3 pb-4 space-y-1">
        {conversations.length === 0 ? (
          <p className="text-sm text-slate-400 text-center mt-6">
            No conversations yet
          </p>
        ) : (
          conversations.map((conversation) => {
            const isActive = activeConversationId === conversation.id;
            return (
              <button
                key={conversation.id}
                onClick={() => onSelectConversation(conversation.id)}
                className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl text-left transition ${
                  isActive
                    ? "bg-blue-100 text-blue-700"
                    : "text-slate-600 hover:bg-slate-200/60"
                }`}
              >
                <MessageSquare size={17} className="shrink-0" />
                <span className="text-sm truncate font-medium">
                  {conversation.title}
                </span>
              </button>
            );
          })
        )}
      </div>
    </aside>
  );
}

export default ConversationSidebar;