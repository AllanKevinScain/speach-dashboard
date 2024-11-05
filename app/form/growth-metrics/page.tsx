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
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronRight, LineChart } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import * as z from "zod";

const formSchema = z.object({
  currentEmployees: z.string()
    .regex(/^\d+$/, "Must be a number")
    .transform(Number)
    .refine((n) => n >= 0, "Must be a positive number"),
  newHires: z.string()
    .regex(/^\d+$/, "Must be a number")
    .transform(Number)
    .refine((n) => n >= 0, "Must be a positive number"),
  currentProducts: z.string()
    .regex(/^\d+$/, "Must be a number")
    .transform(Number)
    .refine((n) => n >= 0, "Must be a positive number"),
  newProducts: z.string()
    .regex(/^\d+$/, "Must be a number")
    .transform(Number)
    .refine((n) => n >= 0, "Must be a positive number"),
});

export default function GrowthMetrics() {
  const router = useRouter();
  const { toast } = useToast();
  const searchParams = useSearchParams();
  const companyName = searchParams.get("name") || "";

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      currentEmployees: 0,
      newHires: 0,
      currentProducts: 0,
      newProducts: 0,
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
    
    router.push(`/form/company-culture?${queryParams.toString()}`);
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-secondary py-16">
      <div className="container max-w-2xl mx-auto px-4">
        <div className="text-center mb-8">
          <LineChart className="h-12 w-12 mx-auto mb-4 text-primary" />
          <h1 className="text-3xl font-bold mb-2">Growth Metrics</h1>
          <p className="text-muted-foreground">
            Tell us about {companyName}&apos;s growth
          </p>
        </div>

        <Card className="p-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="currentEmployees"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Current Employees</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="0"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="newHires"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>New Hires This Year</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="0"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="currentProducts"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Current Products</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="0"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="newProducts"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>New Products This Year</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="0"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button type="submit" className="w-full group">
                Next Step
                <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </form>
          </Form>
        </Card>
      </div>
    </main>
  );
}