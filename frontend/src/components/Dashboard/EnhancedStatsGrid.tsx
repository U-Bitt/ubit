import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface Stat {
  label: string;
  value: string;
  icon: LucideIcon;
  change?: number;
  changeType?: "increase" | "decrease" | "neutral";
  description?: string;
}

interface EnhancedStatsGridProps {
  stats: Stat[];
}

export const EnhancedStatsGrid = ({ stats }: EnhancedStatsGridProps) => {
  const getTrendIcon = (changeType?: string) => {
    switch (changeType) {
      case "increase":
        return <TrendingUp className="h-3 w-3 text-green-500" />;
      case "decrease":
        return <TrendingDown className="h-3 w-3 text-red-500" />;
      default:
        return <Minus className="h-3 w-3 text-gray-400" />;
    }
  };

  const getTrendColor = (changeType?: string) => {
    switch (changeType) {
      case "increase":
        return "text-green-600";
      case "decrease":
        return "text-red-600";
      default:
        return "text-gray-500";
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <Card
          key={index}
          className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:scale-105"
        >
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-xl bg-gradient-to-br from-primary/10 to-primary/20 group-hover:from-primary/20 group-hover:to-primary/30 transition-all duration-300">
                <stat.icon className="h-6 w-6 text-primary group-hover:text-primary/80" />
              </div>
              {stat.change !== undefined && (
                <div
                  className={`flex items-center gap-1 text-sm font-medium ${getTrendColor(stat.changeType)}`}
                >
                  {getTrendIcon(stat.changeType)}
                  <span>{Math.abs(stat.change)}%</span>
                </div>
              )}
            </div>

            <div className="space-y-1">
              <p className="text-3xl font-bold text-slate-900 group-hover:text-primary transition-colors duration-300">
                {stat.value}
              </p>
              <p className="text-sm font-medium text-slate-600 group-hover:text-slate-700 transition-colors duration-300">
                {stat.label}
              </p>
              {stat.description && (
                <p className="text-xs text-slate-500 group-hover:text-slate-600 transition-colors duration-300">
                  {stat.description}
                </p>
              )}
            </div>

            {/* Decorative gradient line */}
            <div className="mt-4 h-1 bg-gradient-to-r from-primary/20 via-primary/30 to-primary/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
