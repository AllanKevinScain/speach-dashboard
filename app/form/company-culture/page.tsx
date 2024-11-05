"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { Award, Building2, ChevronRight } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { BenefitsChecklist } from "./components/benefits-checklist";
import { DiversityMetrics } from "./components/diversity-metrics";
import { PracticesChecklist } from "./components/practices-checklist";

const formSchema = z.object({
  practices: z.record(z.boolean()).default({}),
  benefits: z.record(z.boolean()).default({}),
  diversity: z.object({
    women: z.string()
      .regex(/^\d+$/, "Must be a number")
      .transform(Number)
      .refine((n) => n >= 0 && n <= 100, "Must be between 0 and 100"),
    minorities: z.string()
      .regex(/^\d+$/, "Must be a number")
      .transform(Number)
      .refine((n) => n >= 0 && n <= 100, "Must be between 0 and 100"),
    disabilities: z.string()
      .regex(/^\d+$/, "Must be a number")
      .transform(Number)
      .refine((n) => n >= 0 && n <= 100, "Must be between 0 and 100"),
    lgbtq: z.string()
      .regex(/^\d+$/, "Must be a number")
      .transform(Number)
      .refine((n) => n >= 0 && n <= 100, "Must be between 0 and 100"),
  }),
  awards: z.string().optional(),
  certifications: z.string().optional(),
});

export default function CompanyCulture() {
  const router = useRouter();
  const { toast } = useToast();
  const searchParams = useSearchParams();
  const companyName = searchParams.get("name") || "";

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      practices: {},
      benefits: {},
      diversity: {
        women: 0,
        minorities: 0,
        disabilities: 0,
        lgbtq: 0,
      },
      awards: "",
      certifications: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const existingParams = Array.from(searchParams.entries()).reduce<Record<string, string>>(
    (acc, [key, value]) => ({ ...acc, [key]: value }),
    {}
  );

  const serializedValues = Object.fromEntries(
    Object.entries(values).map(([key, value]) => {
      return [key, typeof value === 'object' ? JSON.stringify(value) : String(value)];
    })
  );

  const queryParams = new URLSearchParams({
    ...existingParams,
    ...serializedValues,
  });
    
    router.push(`/form/ai-analysis?${queryParams.toString()}`);  
    
    
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-secondary py-16">
      <div className="container max-w-3xl mx-auto px-4">
        <div className="text-center mb-8">
          <Building2 className="h-12 w-12 mx-auto mb-4 text-primary" />
          <h1 className="text-3xl font-bold mb-2">Company Culture</h1>
          <p className="text-muted-foreground">
            Tell us about {companyName}&apos;s workplace culture and achievements
          </p>
        </div>

        <Card className="p-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div>
                <h2 className="text-lg font-semibold mb-4">Best Practices</h2>
                <PracticesChecklist control={form.control} />
              </div>

              <Separator />

              <div>
                <h2 className="text-lg font-semibold mb-4">Employee Benefits</h2>
                <BenefitsChecklist control={form.control} />
              </div>

              <Separator />

              <div>
                <h2 className="text-lg font-semibold mb-4">Diversity & Inclusion</h2>
                <DiversityMetrics control={form.control} />
              </div>

              <Separator />

              <div>
                <h2 className="text-lg font-semibold mb-4">
                  <Award className="h-5 w-5 inline-block mr-2" />
                  Achievements
                </h2>
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="awards"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Awards</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="List any awards received"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="certifications"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Certifications</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="List any certifications"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <Button type="submit" className="w-full group">
                Generate AI Analysis
                <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </form>
          </Form>
        </Card>
      </div>
    </main>
  );
}