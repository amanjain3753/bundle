"use client";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function ChatPage() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  async function sendMessage() {
    if (!message.trim()) return;

    const userMsg = { role: "user", text: message };

    setMessages((prev) => [...prev, userMsg]);
    setMessage("");

    const typingMsg = { role: "assistant", text: "AI is typing..." };
    setMessages((prev) => [...prev, typingMsg]);

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        message,
        session: "rana-user"
      })
    });

    const data = await res.json();

    setMessages((prev) => {
      const updated = [...prev];
      updated[updated.length - 1] = {
        role: "assistant",
        text: data.reply
      };
      return updated;
    });
  }

  return (
    <div className="chat-container">
      <h1 className="title">AI Assistant</h1>

      <div className="chat-box">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={
              msg.role === "user" ? "msg user-msg" : "msg bot-msg"
            }
          >
            {msg.role === "assistant" ? (
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {msg.text}
              </ReactMarkdown>
            ) : (
              msg.text
            )}
          </div>
        ))}
      </div>

      <div className="input-area">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Ask anything..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}