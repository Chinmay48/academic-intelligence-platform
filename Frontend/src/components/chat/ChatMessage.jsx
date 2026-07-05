import { Bot, User } from "lucide-react";

function ChatMessage({ messages, sending, loading }) {
  if (loading) {
    return (
      <div
        className="
                h-full
                flex
                items-center
                justify-center
                text-slate-500
            "
      >
        Loading conversation...
      </div>
    );
  }
  if (messages.length === 0 && !sending) {
    return (
      <div
        className="
                h-full
                flex
                flex-col
                items-center
                justify-center
                text-center
                p-6
            "
      >
        <div
          className="
                    w-14
                    h-14
                    rounded-2xl
                    bg-blue-50
                    flex
                    items-center
                    justify-center
                    mb-4
                "
        >
          <Bot size={28} className="text-blue-600" />
        </div>

        <h2
          className="
                    text-2xl
                    font-semibold
                    text-slate-800
                "
        >
          What would you like to learn?
        </h2>

        <p
          className="
                    mt-2
                    text-slate-500
                    max-w-md
                "
        >
          Ask a question and EduPilot will answer using available academic
          resources.
        </p>
      </div>
    );
  }
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`
                            flex
                            gap-3

                            ${
                              message.role === "USER"
                                ? "justify-end"
                                : "justify-start"
                            }
                        `}
        >
          {message.role === "ASSISTANT" && (
            <div
              className="
                                    w-9
                                    h-9
                                    shrink-0
                                    rounded-full
                                    bg-blue-100
                                    flex
                                    items-center
                                    justify-center
                                "
            >
              <Bot size={18} className="text-blue-600" />
            </div>
          )}

          <div
            className={`
                                max-w-[75%]
                                rounded-2xl
                                px-4
                                py-3
                                whitespace-pre-wrap

                                ${
                                  message.role === "USER"
                                    ? "bg-blue-600 text-white"
                                    : "bg-slate-100 text-slate-800"
                                }
                            `}
          >
            {message.context}
          </div>
        </div>
      ))}
      {
        sending && ( <div className="
                        flex
                        gap-3
                        items-center
                    ">

                        <div className="
                            w-9
                            h-9
                            rounded-full
                            bg-blue-100
                            flex
                            items-center
                            justify-center
                        ">

                            <Bot
                                size={18}
                                className="text-blue-600"
                            />

                        </div>


                        <div className="
                            bg-slate-100
                            rounded-2xl
                            px-4
                            py-3
                            text-slate-500
                        ">

                            Thinking...

                        </div>

                    </div>)
      }
    </div>
  );
}

export default ChatMessage;
