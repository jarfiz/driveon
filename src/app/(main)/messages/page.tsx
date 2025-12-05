"use client";

import Link from "next/link";
import { ArrowLeft, Paperclip, Phone, Send, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function MessagesPage() {
  const conversations = [
    {
      id: 1,
      name: "John Smith",
      avatar: "JS",
      lastMessage: "The vehicle is ready for pickup!",
      time: "2 hours ago",
      unread: true,
      online: true,
    },
    {
      id: 2,
      name: "Sarah Johnson",
      avatar: "SJ",
      lastMessage: "Thank you for the smooth rental experience",
      time: "1 day ago",
      unread: false,
      online: false,
    },
    {
      id: 3,
      name: "Michael Chen",
      avatar: "MC",
      lastMessage: "Can I extend my booking?",
      time: "3 days ago",
      unread: false,
      online: false,
    },
  ];

  const messages = [
    {
      id: 1,
      sender: "host",
      content: "Hi! Your booking for January 15 is confirmed.",
      time: "10:30 AM",
    },
    {
      id: 2,
      sender: "host",
      content: "The vehicle will be ready at the Jakarta office by 10 AM.",
      time: "10:35 AM",
    },
    {
      id: 3,
      sender: "guest",
      content: "Great! I'll be there on time.",
      time: "11:00 AM",
    },
    {
      id: 4,
      sender: "host",
      content: "The vehicle is ready for pickup!",
      time: "2 hours ago",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8 flex items-center gap-3">
        <Link href="/dashboard">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold">Messages</h1>
          <p className="text-sm text-slate-600">
            Communicate with hosts and guests
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Conversations List */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Conversations</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="space-y-0">
              {conversations.map((conv) => (
                <button
                  key={conv.id}
                  className="w-full border-b p-4 text-left transition-colors hover:bg-slate-50"
                >
                  <div className="flex gap-3">
                    <div className="relative flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-400 to-purple-500 text-sm font-bold text-white">
                      {conv.avatar}
                      {conv.online && (
                        <span className="absolute right-0 bottom-0 h-3 w-3 rounded-full border-2 border-white bg-green-500" />
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between">
                        <p className="font-semibold">{conv.name}</p>
                        {conv.unread && (
                          <span className="h-2 w-2 rounded-full bg-blue-600" />
                        )}
                      </div>
                      <p className="truncate text-sm text-slate-600">
                        {conv.lastMessage}
                      </p>
                      <p className="mt-1 text-xs text-slate-500">{conv.time}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Chat Window */}
        <Card className="flex h-96 flex-col lg:col-span-2 lg:h-auto">
          <CardHeader className="border-b">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-400 to-purple-500 text-sm font-bold text-white">
                  JS
                </div>
                <div>
                  <CardTitle className="text-lg">John Smith</CardTitle>
                  <p className="text-xs text-green-600">Online</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" size="icon">
                  <Phone className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Video className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>

          <CardContent className="flex-1 space-y-4 overflow-y-auto p-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${
                  msg.sender === "guest" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-xs rounded-lg px-4 py-2 ${
                    msg.sender === "guest"
                      ? "bg-blue-600 text-white"
                      : "bg-slate-100 text-slate-900"
                  }`}
                >
                  <p className="text-sm">{msg.content}</p>
                  <p
                    className={`mt-1 text-xs ${
                      msg.sender === "guest"
                        ? "text-blue-100"
                        : "text-slate-500"
                    }`}
                  >
                    {msg.time}
                  </p>
                </div>
              </div>
            ))}
          </CardContent>

          {/* Message Input */}
          <div className="border-t p-4">
            <div className="flex gap-2">
              <Button variant="ghost" size="icon">
                <Paperclip className="h-4 w-4" />
              </Button>
              <input
                type="text"
                placeholder="Type your message..."
                className="flex-1 rounded-lg border border-slate-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
              />
              <Button size="icon">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
