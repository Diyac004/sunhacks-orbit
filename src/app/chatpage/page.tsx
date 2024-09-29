"use client";
import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Menu, MessageCircle } from 'lucide-react';
import ModeToggle from '../components/ModeToggle';
import { RainbowButton } from '@/components/ui/rainbow-button';
import Link from 'next/link';
import FlipText from "@/components/ui/flip-text";
import { SignedOut, SignInButton, UserButton } from '@clerk/nextjs';
import Markdown from 'react-markdown'
import { FlightsData } from '@/lib/types';
import { EnhancedFlightDetails } from '@/components/enhanced-flight-details';
import { getUserLocation } from './actions';
import { Skeleton } from "@/components/ui/skeleton";

interface ChatMessage {
  id: number;
  content: string;
  sender: 'user' | 'ai';
  flight_data?: FlightsData[];
}

interface ChatHistory {
  id: number;
  title: string;
}

export default function ChatPage() {
  const [chatHistories, setChatHistories] = useState<ChatHistory[]>([
    { id: 1, title: "Trip to Mumbai" },
    { id: 2, title: "Trip to London" },
    { id: 3, title: "Trip to Las Vegas" },
  ]);

  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: 1, content: 'Howdy!', sender: 'ai' },
    { id: 2, content: 'Where are we headed? Drop your destination, budget, travelers, and any preferences.', sender: 'ai' },
    { id: 3, content: 'Let’s plan this :)', sender: 'ai' },
  ]);
  
  const [loading, setLoading] = useState(false);
  const [city, setCity] = useState<string | undefined>();
  const [inputMessage, setInputMessage] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSendMessage = async () => {
    if (inputMessage.trim()) {
      setMessages([...messages, { id: messages.length + 1, content: inputMessage + ` my location is ${city}`, sender: 'user' }]);
      setInputMessage('');
    }

    setLoading(true);

    const response = await fetch("https://chamber-lasting-roger-forums.trycloudflare.com/trip_plan?query=" + inputMessage);

    if (response.ok) {
      const data = await response.json();

      let ourFlightData: FlightsData[] = [];
      if (data.flight_data) {
        ourFlightData = data.flight_data
      }

      setMessages(oldMessages => [...oldMessages, { id: messages.length + 1, content: data.response, sender: 'ai', flight_data: ourFlightData }]);
    } else {
      console.error('Failed to fetch data', response.statusText, response.status, response.url, response.body);
      setMessages(oldMessages => [...oldMessages, { id: messages.length + 1, content: 'Sorry, I am unable to process your request.', sender: 'ai' }]);
    }

    setLoading(oldLoading => !oldLoading);
  };

  useEffect(() => {
    getUserLocation().then(data => setCity(data ?? "Phoenix"))
  }, [])

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900">
      <header className="w-full py-4 px-6 flex justify-between items-center bg-white dark:bg-gray-900 shadow-md">
        <h1 className="text-2xl font-bold flex items-center">
          <Link href="/">
            <FlipText word="ORBIT" />
          </Link>
          <Button onClick={toggleSidebar} className="md:hidden">
            <Menu className="h-6 w-6" />
          </Button>
        </h1>
       
        <div className="flex items-center space-x-4">
          <ModeToggle />
          <SignedOut>
            <button className="rounded-full relative flex py-2 px-4 items-center justify-center hover:space-x-2 bg-gradient-to-r from-blue-500 to-cyan-500 overflow-hidden font-medium text-white shadow-lg transition-all duration-300 hover:shadow-cyan-500/50">
              <span className="relative z-10">
                <SignInButton />
              </span>
            </button>
          </SignedOut>
          <UserButton />
        </div>
      </header>
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className={`w-64 bg-white dark:bg-gray-800 p-4 border-r border-gray-200 dark:border-gray-700 overflow-hidden transition-all duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
          <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">Chat History</h2>
          <ScrollArea className="h-[calc(100vh-8rem)]">
            {chatHistories.map((chat) => (
              <Button key={chat.id} variant="ghost" className="w-full justify-start mb-2 bg-gray-100 dark:bg-gray-700 shadow-sm hover:shadow-md transition-shadow duration-300 text-gray-800 dark:text-gray-200">
                <MessageCircle className="mr-2 h-4 w-4" />
                {chat.title}
              </Button>
            ))}
          </ScrollArea>
        </aside>

        {/* Main Chat Area */}
        <main className="flex-1 flex flex-col overflow-hidden gap-4 bg-white dark:bg-gray-900">
          <ScrollArea className="flex-1 p-4">
            {messages.map((message) => (
              <div key={message.id} className="mb-4 grid grid-cols-2 gap-4">
                <div className={`${message.sender === 'user' ? 'justify-self-end' : 'justify-self-start'}`}>
                  <div className={`inline-block p-3 rounded-lg shadow-md ${
                    message.sender === 'user' 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200'
                  } prose lg:prose-lg max-w-prose dark:prose-invert`}>
                    <Markdown>{message.content}</Markdown>
                  </div>
                </div>
                <div className="col-span-1">
                  {message.flight_data && message.flight_data.slice(0,5).map((flight, index) => (
                    <EnhancedFlightDetails key={index} flight={flight} />
                  ))}
                </div>
              </div>
            ))}
            {loading && (
              <div className="text-center">
                <Skeleton className="w-[200px] h-[40px] rounded-md mx-auto" />
              </div>
            )}
          </ScrollArea>

          {/* Message Input */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex justify-start space-x-2 rounded-lg bg-gray-100 dark:bg-gray-800 p-2 w-full">
              <Input
                type="text"
                placeholder="Type your message..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={async (e) => e.key === 'Enter' && await handleSendMessage()}
                className="flex-grow bg-transparent border-none focus:ring-0"
              />
              <RainbowButton onClick={async () => await handleSendMessage()}>
                <Send className=" flex h-4 w-4 mr-2" />
                Send
              </RainbowButton>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}