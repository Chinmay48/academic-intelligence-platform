import { Bot } from "lucide-react";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";

function ChatMessage({ messages, sending, loading }) {
  if (loading) {
    return (
      <div className="h-full flex items-center justify-center text-slate-500">
        Loading conversation...
      </div>
    );
  }

  if (messages.length === 0 && !sending) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="h-full flex flex-col items-center justify-center text-center p-6"
      >
        <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center mb-4">
          <Bot size={28} className="text-blue-600" />
        </div>
        <h2 className="text-2xl font-semibold text-slate-800">
          What would you like to learn?
        </h2>
        <p className="mt-2 text-slate-500 max-w-md">
          Ask a question and EduPilot will answer using available academic resources.
        </p>
      </motion.div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 space-y-6">
      {messages.map((message, index) => (
        <motion.div
          key={message.id || index}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className={`flex gap-3 ${message.role === "USER" ? "justify-end" : "justify-start"}`}
        >
          {message.role === "ASSISTANT" && (
            <div className="w-8 h-8 md:w-9 md:h-9 shrink-0 rounded-full bg-blue-100 flex items-center justify-center mt-1">
              <Bot size={18} className="text-blue-600" />
            </div>
          )}

          <div
  className={`
    max-w-[85%] md:max-w-[75%] rounded-2xl px-4 py-3
    ${message.role === "USER" ? "bg-blue-600 text-white rounded-tr-sm" : "bg-slate-50 border border-slate-100 text-slate-800 rounded-tl-sm shadow-sm"}
  `}
>
  {message.role === "USER" ? (
    <div className="whitespace-pre-wrap text-sm md:text-base">{message.context}</div>
  ) : (
    // Moved the classes to a wrapper div here
    <div className="text-sm md:text-base break-words">
      <ReactMarkdown
        components={{
          h1: ({node, ...props}) => <h1 className="text-xl md:text-2xl font-bold mt-4 mb-2" {...props} />,
          h2: ({node, ...props}) => <h2 className="text-lg md:text-xl font-bold mt-4 mb-2" {...props} />,
          h3: ({node, ...props}) => <h3 className="text-base md:text-lg font-bold mt-3 mb-2" {...props} />,
          p: ({node, ...props}) => <p className="mb-3 last:mb-0 leading-relaxed" {...props} />,
          ul: ({node, ...props}) => <ul className="list-disc ml-5 mb-4 space-y-1" {...props} />,
          ol: ({node, ...props}) => <ol className="list-decimal ml-5 mb-4 space-y-1" {...props} />,
          li: ({node, ...props}) => <li className="pl-1" {...props} />,
          strong: ({node, ...props}) => <strong className="font-semibold text-slate-900" {...props} />
        }}
      >
        {message.context}
      </ReactMarkdown>
    </div>
  )}
</div>
        </motion.div>
      ))}

      {sending && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="flex gap-3 justify-start"
        >
          <div className="w-8 h-8 md:w-9 md:h-9 shrink-0 rounded-full bg-blue-100 flex items-center justify-center mt-1">
            <Bot size={18} className="text-blue-600" />
          </div>
          <div className="bg-slate-50 border border-slate-100 rounded-2xl rounded-tl-sm px-4 py-4 max-w-[75%] w-64 space-y-3 shadow-sm">
             {/* Animated Skeleton Loader */}
             <motion.div 
               className="h-2 bg-slate-200 rounded-full w-3/4"
               animate={{ opacity: [0.4, 1, 0.4] }}
               transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
             />
             <motion.div 
               className="h-2 bg-slate-200 rounded-full w-full"
               animate={{ opacity: [0.4, 1, 0.4] }}
               transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut", delay: 0.2 }}
             />
             <motion.div 
               className="h-2 bg-slate-200 rounded-full w-5/6"
               animate={{ opacity: [0.4, 1, 0.4] }}
               transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut", delay: 0.4 }}
             />
          </div>
        </motion.div>
      )}
    </div>
  );
}

export default ChatMessage;