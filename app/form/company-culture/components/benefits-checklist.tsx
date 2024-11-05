"use client";

import { Checkbox } from "@/components/ui/checkbox";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Control } from "react-hook-form";

const benefits = [
  { id: "health", label: "Health Insurance" },
  { id: "dental", label: "Dental Plan" },
  { id: "life", label: "Life Insurance" },
  { id: "education", label: "Education Allowance" },
  { id: "remote", label: "Remote Work" },
  { id: "flexible", label: "Flexible Hours" },
  { id: "gym", label: "Gym Membership" },
  { id: "food", label: "Food Allowance" },
  { id: "transport", label: "Transportation Allowance" },
  { id: "mental", label: "Mental Health Support" },
];

interface BenefitsChecklistProps {
  control: Control<any>;
}

export function BenefitsChecklist({ control }: BenefitsChecklistProps) {
  return (
    <div className="grid grid-cols-2 gap-4">
      {benefits.map((benefit) => (
        <FormField
          key={benefit.id}
          control={control}
          name={`benefits.${benefit.id}`}
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormLabel className="font-normal cursor-pointer">
                {benefit.label}
              </FormLabel>
            </FormItem>
          )}
        />
      ))}
    </div>
  );
}