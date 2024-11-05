"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bot, Building2, ChevronRight, LineChart } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";

export default function Home() {
  const [companyName, setCompanyName] = useState("");
  const router = useRouter();

  const handleStart = () => {
    if (companyName.trim()) {
      router.push(`/form/company-info?name=${encodeURIComponent(companyName)}`);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-secondary">
      <div className="container mx-auto px-4 py-16 max-w-6xl">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <Bot className="h-16 w-16 text-primary animate-pulse" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-600">
            Transform Your Company Data
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Turn your company metrics into compelling narratives with AI-powered insights
          </p>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <Building2 className="h-8 w-8 mb-4 text-primary" />
            <h3 className="text-xl font-semibold mb-2">Company Profile</h3>
            <p className="text-muted-foreground">
              Share your company's journey and current status
            </p>
          </Card>
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <LineChart className="h-8 w-8 mb-4 text-primary" />
            <h3 className="text-xl font-semibold mb-2">Growth Analytics</h3>
            <p className="text-muted-foreground">
              Get insights about your company's growth trajectory
            </p>
          </Card>
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <Bot className="h-8 w-8 mb-4 text-primary" />
            <h3 className="text-xl font-semibold mb-2">AI Insights</h3>
            <p className="text-muted-foreground">
              Receive AI-generated narratives about your company
            </p>
          </Card>
        </div>

        {/* Start Form */}
        <div className="max-w-md mx-auto">
          <Card className="p-8">
            <h2 className="text-2xl font-semibold mb-6 text-center">
              Start Your Journey
            </h2>
            <div className="space-y-4">
              <Input
                placeholder="Enter your company name"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="text-lg"
              />
              <Button
                onClick={handleStart}
                disabled={!companyName.trim()}
                className="w-full group"
              >
                Next
                <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </main>
  );
}