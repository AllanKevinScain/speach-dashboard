"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control } from "react-hook-form";

interface DiversityMetricsProps {
  control: Control<any>;
}

export function DiversityMetrics({ control }: DiversityMetricsProps) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <FormField
        control={control}
        name="diversity.women"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Women in Workforce (%)</FormLabel>
            <FormControl>
              <Input type="number" placeholder="0" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="diversity.minorities"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Underrepresented Groups (%)</FormLabel>
            <FormControl>
              <Input type="number" placeholder="0" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="diversity.disabilities"
        render={({ field }) => (
          <FormItem>
            <FormLabel>People with Disabilities (%)</FormLabel>
            <FormControl>
              <Input type="number" placeholder="0" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="diversity.lgbtq"
        render={({ field }) => (
          <FormItem>
            <FormLabel>LGBTQ+ Community (%)</FormLabel>
            <FormControl>
              <Input type="number" placeholder="0" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}