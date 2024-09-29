"use client"
import React from 'react';
import { useState } from 'react'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { UserCircle, LogOut, Send, Menu } from 'lucide-react'
import ModeToggle from '../components/ModeToggle';
import { RainbowButton } from '@/components/ui/rainbow-button';

interface ChatMessage {
  id: number;
  content: string;
  sender: 'user' | 'ai';
}

interface ChatHistory {
  id: number;
  title: string;
}

export default function ChatPage() {
  const [chatHistories, setChatHistories] = useState<ChatHistory[]>([
    { id: 1, title: "Chat about React" },
    { id: 2, title: "Next.js discussion" },
    { id: 3, title: "TypeScript tips" },
  ]);

  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: 1, content: "Hello! How can I help you today?", sender: 'ai' },
    { id: 2, content: "I have a question about React hooks.", sender: 'user' },
  ]);

  const [inputMessage, setInputMessage] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      setMessages([...messages, { id: messages.length + 1, content: inputMessage, sender: 'user' }]);
      setInputMessage('');
    }
  };

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Header */}
      <header className="flex items-center justify-between p-4 border-b">
        <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
          <Menu className="h-6 w-6" />
        </Button>
        <h1 className="text-2xl font-bold">ORBIT</h1>
        <div className="flex items-center space-x-4">
        <ModeToggle />
          <button className="rounded-full relative flex py-2 px-4 items-center justify-center hover:space-x-8 bg-gradient-to-r from-blue-500 to-cyan-500 overflow-hidden bg-cyan-500 font-medium text-white shadow-2xl transition-all duration-300 before:absolute before:inset-0 before:border-0 before: before:duration-100 before:ease-linear hover:bg-black hover:text-cyan-500 hover:shadow-blue-500 hover:before:border-[25px]">
            <span className="relative z-10">
              <a href="_blank">Log Out</a>
            </span>
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden ">
        {/* Sidebar */}
        <aside className={`w-64 bg-muted p-4 border-r overflow-hidden transition-all duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
          <h2 className="text-lg font-semibold mb-4">Planner History</h2>
          <ScrollArea className="h-[calc(100vh-8rem)] ">
            {chatHistories.map((chat) => (
              <Button key={chat.id} variant="ghost" className="w-full justify-start mb-2 bg-white/20 shadow-md ring-1 ring-black/5 relative">
                {chat.title}
              </Button>
            ))}
          </ScrollArea>
        </aside>

        {/* Main Chat Area */}
        <main className="flex-1 flex flex-col overflow-hidden">
          <ScrollArea className="flex-1 p-4">
            {messages.map((message) => (
              <div key={message.id} className={`mb-4 ${message.sender === 'user' ? 'text-right' : 'text-left'}`}>
                <div className={`inline-block p-2 rounded-lg ${message.sender === 'user' ? 'bg-primary text-primary-foreground ' : 'bg-muted'}`}>
                  {message.content}
                </div>
              </div>
            ))}
          </ScrollArea>

          {/* Message Input */}
          <div className="p-4 border-t">
          
          <div className="flex space-x-2 rounded-t p-2"> 
            
          
              <Input
                type="text"
                placeholder="Type your message..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                className="flex-1"
              />
              
              <RainbowButton onClick={handleSendMessage}>
                <Send className="h-4 w-4 mr-2" />
                Send
              </RainbowButton>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}