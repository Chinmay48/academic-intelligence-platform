import { MessageSquare, Plus } from "lucide-react";

function ConversationSidebar({
  activeConversationId,
  onSelectConversation,
  onNewChat,
}) {
  const conversations = [
    {
      id: "1",
      title: "Linear Regression Steps",
    },
    {
      id: "2",
      title: "Gradient Descent",
    },
    {
      id: "3",
      title: "Compiler Parsing",
    },
  ];

  return (
    <aside className="w-72 shrink-0 bg-slate-50 border-r border-slate-200 flex flex-col">
      <div className="p-4">
        <button
          onClick={onNewChat}
          className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-medium transition"
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
        {conversations.map((conversation) => {
          const isActive =
            activeConversationId === conversation.id;

          return (
            <button
              key={conversation.id}
              onClick={() =>
                onSelectConversation(conversation.id)
              }
              className={`
                w-full flex items-center gap-3 px-3 py-3 rounded-xl
                text-left transition
                ${
                  isActive
                    ? "bg-blue-100 text-blue-700"
                    : "text-slate-600 hover:bg-slate-100"
                }
              `}
            >
              <MessageSquare size={17} className="shrink-0" />

              <span className="text-sm truncate">
                {conversation.title}
              </span>
            </button>
          );
        })}
      </div>
    </aside>
  );
}

export default ConversationSidebar;