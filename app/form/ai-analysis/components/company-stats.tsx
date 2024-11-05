"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Users, Package, TrendingUp, Building } from "lucide-react";
import { motion } from "framer-motion";

interface CompanyStatsProps {
  currentEmployees: number;
  newHires: number;
  currentProducts: number;
  newProducts: number;
}

export function CompanyStats({
  currentEmployees,
  newHires,
  currentProducts,
  newProducts,
}: CompanyStatsProps) {
  const stats = [
    {
      title: "Current Employees",
      value: currentEmployees,
      icon: Users,
      color: "text-blue-500",
    },
    {
      title: "New Hires",
      value: newHires,
      icon: Building,
      color: "text-green-500",
    },
    {
      title: "Current Products",
      value: currentProducts,
      icon: Package,
      color: "text-purple-500",
    },
    {
      title: "New Products",
      value: newProducts,
      icon: TrendingUp,
      color: "text-orange-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.title}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.1 }}
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}