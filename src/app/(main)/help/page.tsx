"use client";

import Link from "next/link";
import {
  ArrowLeft,
  HelpCircle,
  Mail,
  MessageSquare,
  Phone,
  Search,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function HelpPage() {
  const faqs = [
    {
      category: "Bookings",
      questions: [
        {
          q: "How do I make a booking?",
          a: "Browse available vehicles, select your dates, and complete the checkout process.",
        },
        {
          q: "Can I cancel my booking?",
          a: "Yes, you can cancel up to 48 hours before check-in for a full refund.",
        },
        {
          q: "What payment methods do you accept?",
          a: "We accept credit cards, debit cards, and bank transfers.",
        },
      ],
    },
    {
      category: "Vehicles",
      questions: [
        {
          q: "How do I list my vehicle?",
          a: "Go to Host Dashboard, click 'List New Vehicle', and provide vehicle details.",
        },
        {
          q: "What insurance is included?",
          a: "Basic third-party liability is included. Premium coverage is available for extra fee.",
        },
        {
          q: "Can I set my own prices?",
          a: "Yes, you can set daily, weekly, and monthly rates for your vehicle.",
        },
      ],
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
          <h1 className="text-3xl font-bold">Help & Support</h1>
          <p className="text-sm text-slate-600">Find answers and get support</p>
        </div>
      </div>

      {/* Search */}
      <Card className="mb-8">
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute top-3 left-3 h-5 w-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search for help..."
              className="w-full rounded-lg border border-slate-300 py-2 pr-4 pl-10 focus:border-blue-500 focus:outline-none"
            />
          </div>
        </CardContent>
      </Card>

      {/* Contact Options */}
      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          {
            icon: MessageSquare,
            title: "Live Chat",
            desc: "Chat with our team",
            action: "Start Chat",
          },
          {
            icon: Phone,
            title: "Phone Support",
            desc: "Call us anytime",
            action: "Call Us",
          },
          {
            icon: Mail,
            title: "Email",
            desc: "Send us a message",
            action: "Email Us",
          },
          {
            icon: HelpCircle,
            title: "FAQ",
            desc: "Common questions",
            action: "View FAQ",
          },
        ].map((option) => {
          const Icon = option.icon;
          return (
            <Card
              key={option.title}
              className="transition-shadow hover:shadow-lg"
            >
              <CardContent className="pt-6 text-center">
                <Icon className="mx-auto mb-3 h-8 w-8 text-blue-600" />
                <h3 className="mb-1 font-semibold">{option.title}</h3>
                <p className="mb-4 text-sm text-slate-600">{option.desc}</p>
                <Button variant="outline" size="sm" className="w-full">
                  {option.action}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* FAQs */}
      <div className="space-y-8">
        {faqs.map((section) => (
          <div key={section.category}>
            <h2 className="mb-4 text-2xl font-bold">{section.category}</h2>
            <div className="space-y-3">
              {section.questions.map((item, i) => (
                <Card key={i}>
                  <CardContent className="pt-6">
                    <details className="group">
                      <summary className="flex cursor-pointer justify-between font-semibold hover:text-blue-600">
                        {item.q}
                        <span className="transition-transform group-open:rotate-180">
                          ▼
                        </span>
                      </summary>
                      <p className="mt-3 text-slate-600">{item.a}</p>
                    </details>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Still Need Help */}
      <Card className="mt-8 bg-blue-50">
        <CardContent className="pt-6">
          <div className="text-center">
            <h3 className="mb-2 text-lg font-semibold">Still need help?</h3>
            <p className="mb-4 text-slate-600">
              Our support team is available 24/7 to assist you
            </p>
            <div className="flex flex-col justify-center gap-2 sm:flex-row">
              <Button>Contact Support</Button>
              <Button variant="outline">Schedule a Call</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
