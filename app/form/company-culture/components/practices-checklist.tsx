"use client";

import { Checkbox } from "@/components/ui/checkbox";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Control } from "react-hook-form";

const practices = [
  { id: "agile", label: "Agile Methodologies" },
  { id: "scrum", label: "Scrum Framework" },
  { id: "kanban", label: "Kanban" },
  { id: "devops", label: "DevOps Practices" },
  { id: "ci-cd", label: "CI/CD Pipeline" },
  { id: "code-review", label: "Code Review Process" },
  { id: "pair-programming", label: "Pair Programming" },
  { id: "tdd", label: "Test-Driven Development" },
  { id: "microservices", label: "Microservices Architecture" },
  { id: "cloud", label: "Cloud Infrastructure" },
];

interface PracticesChecklistProps {
  control: Control<any>;
}

export function PracticesChecklist({ control }: PracticesChecklistProps) {
  return (
    <div className="grid grid-cols-2 gap-4">
      {practices.map((practice) => (
        <FormField
          key={practice.id}
          control={control}
          name={`practices.${practice.id}`}
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormLabel className="font-normal cursor-pointer">
                {practice.label}
              </FormLabel>
            </FormItem>
          )}
        />
      ))}
    </div>
  );
}