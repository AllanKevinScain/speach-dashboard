"use client";

import { useSearchParams } from "next/navigation";
import { AnimatedBot } from "./components/animated-bot";
import { AnalysisSection } from "./components/analysis-section";
import { CompanyStats } from "./components/company-stats";
import { Button } from "@/components/ui/button";
import { Download, Share2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Card } from "@/components/ui/card";

function generateAnalysis(params: URLSearchParams) {
  const companyName = params.get("name") || "your company";
  const industry = params.get("industry") || "technology";
  const currentEmployees = parseInt(params.get("currentEmployees") || "0");
  const newHires = parseInt(params.get("newHires") || "0");
  const growthRate = ((newHires / currentEmployees) * 100).toFixed(1);
  const year = params.get("year") || new Date().getFullYear().toString();
  const location = `${params.get("city") || ""}, ${params.get("country") || ""}`;
  const currentProducts = parseInt(params.get("currentProducts") || "0");
  const newProducts = parseInt(params.get("newProducts") || "0");
  const productGrowth = ((newProducts / currentProducts) * 100).toFixed(1);

  const review = `${companyName} is a dynamic ${industry} company established in ${year}, headquartered in ${location}. 
With a current workforce of ${currentEmployees} employees and ${newHires} new hires this year (${growthRate}% growth), 
the company demonstrates strong expansion. The product portfolio has grown from ${currentProducts} to ${currentProducts + newProducts} 
products this year, marking a ${productGrowth}% increase in offerings. The company maintains a progressive workplace culture, 
implementing modern methodologies and fostering an inclusive environment that prioritizes employee well-being and professional growth.`;

  return {
    review,
    overview: `Based on the data provided, ${companyName} shows remarkable progress in the ${industry} sector. With a workforce growth rate of ${growthRate}%, the company demonstrates strong expansion and market presence.`,
    culture: `The company culture at ${companyName} emphasizes employee well-being and professional development. The comprehensive benefits package and focus on work-life balance contribute to a positive workplace environment.`,
    innovation: `${companyName}'s commitment to innovation is evident through its product development pipeline and adoption of modern practices. The implementation of agile methodologies and focus on continuous improvement drives sustainable growth.`,
    impact: `Through its inclusive policies and sustainable practices, ${companyName} is making a positive impact in the ${industry} industry. The company's achievements and certifications reflect its dedication to excellence and social responsibility.`
  };
}

export default function AIAnalysis() {
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const analysis = generateAnalysis(searchParams);

  const currentEmployees = parseInt(searchParams.get("currentEmployees") || "0");
  const newHires = parseInt(searchParams.get("newHires") || "0");
  const currentProducts = parseInt(searchParams.get("currentProducts") || "0");
  const newProducts = parseInt(searchParams.get("newProducts") || "0");

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Link copied!",
      description: "Share this analysis with your team",
    });
  };

  const handleDownload = () => {
    const content = Object.entries(analysis)
      .map(([title, text]) => `${title.toUpperCase()}\n\n${text}\n\n`)
      .join("\n");
    
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "company-analysis.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-secondary py-16">
      <div className="container max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <AnimatedBot />
          <h1 className="text-3xl font-bold mt-4 mb-2">AI Analysis Report</h1>
          <p className="text-muted-foreground">
            Based on your company data, here's our comprehensive analysis
          </p>
        </div>

        <Card className="p-6 mb-12">
          <h2 className="text-2xl font-semibold mb-4">Company Review</h2>
          <p className="text-muted-foreground leading-relaxed">
            {analysis.review}
          </p>
        </Card>

        <CompanyStats
          currentEmployees={currentEmployees}
          newHires={newHires}
          currentProducts={currentProducts}
          newProducts={newProducts}
        />

        <div className="mt-12 space-y-6">
          <AnalysisSection
            title="Company Overview"
            content={analysis.overview}
            delay={0.2}
          />
          <AnalysisSection
            title="Culture & Environment"
            content={analysis.culture}
            delay={0.4}
          />
          <AnalysisSection
            title="Innovation & Growth"
            content={analysis.innovation}
            delay={0.6}
          />
          <AnalysisSection
            title="Market Impact"
            content={analysis.impact}
            delay={0.8}
          />
        </div>

        <div className="flex justify-center gap-4 mt-8">
          <Button
            variant="outline"
            onClick={handleShare}
            className="gap-2"
          >
            <Share2 className="w-4 h-4" />
            Share Analysis
          </Button>
          <Button
            onClick={handleDownload}
            className="gap-2"
          >
            <Download className="w-4 h-4" />
            Download Report
          </Button>
        </div>
      </div>
    </main>
  );
}