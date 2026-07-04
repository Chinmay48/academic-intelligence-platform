import { useState } from "react";
import { Send } from "lucide-react";

function ChatInput({ onSend, disabled = false }) {
  const [question, setQuestion] = useState("");

  const submitQuestion = () => {
    const trimmedQuestion = question.trim();

    if (!trimmedQuestion || disabled) {
      return;
    }

    onSend(trimmedQuestion);
    setQuestion("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    submitQuestion();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      submitQuestion();
    }
  };

  return (
    <div className="border-t border-slate-200 p-4 bg-white">
      <form
        onSubmit={handleSubmit}
        className="max-w-4xl mx-auto flex items-end gap-3"
      >
        <textarea
          rows={1}
          value={question}
          disabled={disabled}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask about your academic resources..."
          className="
            flex-1 max-h-36 resize-none
            rounded-xl border border-slate-300
            px-4 py-3
            focus:outline-none
            focus:ring-2
            focus:ring-blue-500
            disabled:bg-slate-100
          "
        />

        <button
          type="submit"
          disabled={disabled || !question.trim()}
          className="
            h-12 w-12 shrink-0
            flex items-center justify-center
            rounded-xl
            bg-blue-600 text-white
            hover:bg-blue-700
            disabled:bg-slate-300
            transition
          "
        >
          <Send size={20} />
        </button>
      </form>

      <p className="text-center text-xs text-slate-400 mt-2">
        Answers are generated only from available academic resources.
      </p>
    </div>
  );
}

export default ChatInput;