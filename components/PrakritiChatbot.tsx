"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, X, Send, Sparkles, RefreshCw, MessageSquare, ShieldCheck, Zap } from "lucide-react";

interface Message {
  id: string;
  sender: "user" | "prakriti";
  text: string;
}

const QUICK_PROMPTS = [
  "💰 What are your package prices?",
  "⚡ How fast can you deliver?",
  "💳 What are your payment terms?",
  "🔌 What add-ons do you offer?",
];

export default function PrakritiChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      sender: "prakriti",
      text: "Hi, I'm Prakriti. How can I help you?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      chatBottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen, isTyping]);

  const handleSendMessage = async (textToSend?: string) => {
    const queryText = (textToSend || input).trim();
    if (!queryText) return;

    const userMsg: Message = {
      id: `user_${Date.now()}`,
      sender: "user",
      text: queryText,
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput("");
    setIsTyping(true);

    try {
      const res = await fetch("/api/chat/prakriti", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMsg].map((m) => ({
            role: m.sender === "user" ? "user" : "assistant",
            content: m.text,
          })),
        }),
      });

      const data = await res.json();
      if (res.ok && data.content) {
        const botMsg: Message = {
          id: `prakriti_${Date.now()}`,
          sender: "prakriti",
          text: data.content,
        };
        setMessages((prev) => [...prev, botMsg]);
      } else {
        throw new Error(data.error || "Failed to respond");
      }
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          id: `prakriti_err_${Date.now()}`,
          sender: "prakriti",
          text: "Apologies, I encountered a temporary connection issue. Please feel free to email Vishal directly at **vishal.buildss@gmail.com**!",
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: "welcome",
        sender: "prakriti",
        text: "Hi, I'm Prakriti. How can I help you?",
      },
    ]);
  };

  return (
    <>
      {/* DRAGGABLE & DROPABLE CIRCULAR PRAKRITI TRIGGER AVATAR */}
      <motion.div
        drag
        dragMomentum={false}
        dragElastic={0.1}
        className="fixed bottom-6 left-6 z-50 cursor-grab active:cursor-grabbing touch-none select-none"
      >
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-slate-900 border-2 border-white shadow-2xl flex items-center justify-center group"
          title="Drag me around! Click to chat with Prakriti"
        >
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white text-black flex items-center justify-center font-black shadow-md">
            <Bot className="w-6 h-6 text-black" />
          </div>
          {/* Glowing Green Online Status Beacon */}
          <span className="absolute top-0 right-0 flex h-3.5 w-3.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 border-slate-900" />
          </span>
        </motion.button>
      </motion.div>

      {/* Prakriti Chat Window Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            className="fixed bottom-24 left-4 sm:left-6 z-50 w-[calc(100vw-32px)] sm:w-[400px] h-[520px] bg-slate-900 text-white rounded-3xl border-2 border-white/60 shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Clean Chatbot Header */}
            <div className="bg-slate-950 p-4 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center font-black shadow-md">
                    <Bot className="w-5 h-5 text-black" />
                  </div>
                  <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 border-2 border-slate-950" />
                </div>
                <div>
                  <h3 className="text-base font-black text-white">Prakriti</h3>
                </div>
              </div>

              <div className="flex items-center space-x-1">
                <button
                  type="button"
                  onClick={handleResetChat}
                  className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                  title="Reset Conversation"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Messages Body */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4 text-xs font-sans">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] p-3.5 rounded-2xl leading-relaxed whitespace-pre-wrap ${
                      msg.sender === "user"
                        ? "bg-white text-black font-semibold rounded-br-none shadow-md"
                        : "bg-slate-800 text-slate-200 border border-slate-700 rounded-bl-none shadow-sm"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-slate-800 border border-slate-700 p-3 rounded-2xl rounded-bl-none text-slate-400 text-xs flex items-center space-x-2">
                    <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                    <span>Prakriti is typing...</span>
                  </div>
                </div>
              )}
              <div ref={chatBottomRef} />
            </div>

            {/* Quick Suggestion Prompts */}
            {messages.length < 5 && (
              <div className="px-4 py-2 border-t border-slate-800/80 flex items-center space-x-2 overflow-x-auto no-scrollbar">
                {QUICK_PROMPTS.map((prompt) => (
                  <button
                    type="button"
                    key={prompt}
                    onClick={() => handleSendMessage(prompt)}
                    className="px-3 py-1.5 rounded-full bg-slate-800 hover:bg-white hover:text-black border border-slate-700 text-[11px] font-bold text-slate-300 whitespace-nowrap transition-colors flex-shrink-0"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            )}

            {/* Input Footer */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="p-3 bg-slate-950 border-t border-slate-800 flex items-center space-x-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask Prakriti about pricing, timeline..."
                className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-white transition-colors"
              />
              <button
                type="submit"
                disabled={!input.trim() || isTyping}
                className="p-2.5 rounded-xl bg-white text-black hover:bg-slate-200 disabled:opacity-40 transition-colors font-bold"
              >
                <Send className="w-4 h-4 text-black" />
              </button>
            </form>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
