import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";
import { Target, Sparkles, Zap } from "lucide-react";

interface QuickAction {
  label: string;
  icon: LucideIcon;
  action: string;
  color: string;
  description?: string;
  badge?: string;
}

interface EnhancedQuickActionsPanelProps {
  quickActions: QuickAction[];
  onActionClick: (action: string) => void;
}

export const EnhancedQuickActionsPanel = ({
  quickActions,
  onActionClick,
}: EnhancedQuickActionsPanelProps) => {
  return (
    <div className="mb-8">
      <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-3 text-xl">
            <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-500">
              <Target className="h-5 w-5 text-white" />
            </div>
            Quick Actions
            <div className="flex items-center gap-2 ml-auto">
              <Sparkles className="h-4 w-4 text-yellow-500" />
              <span className="text-sm text-slate-600">Popular</span>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {quickActions.map((action, index) => (
              <Button
                key={index}
                variant="outline"
                className="group h-24 flex flex-col items-center justify-center gap-3 hover:shadow-lg transition-all duration-300 border-0 bg-white/50 hover:bg-white/80 hover:scale-105 relative overflow-hidden"
                onClick={() => onActionClick(action.action)}
              >
                {/* Background gradient on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${action.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                
                {/* Icon container */}
                <div className={`relative z-10 w-10 h-10 rounded-xl flex items-center justify-center ${action.color} group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  <action.icon className="h-5 w-5 text-white" />
                </div>
                
                {/* Action label */}
                <span className="relative z-10 text-xs font-semibold text-slate-700 group-hover:text-slate-900 transition-colors duration-300 text-center leading-tight">
                  {action.label}
                </span>

                {/* Badge */}
                {action.badge && (
                  <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                    {action.badge}
                  </div>
                )}

                {/* Hover effect line */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
              </Button>
            ))}
          </div>

          {/* Additional info */}
          <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
            <div className="flex items-center gap-2 text-sm text-blue-700">
              <Zap className="h-4 w-4" />
              <span className="font-medium">Pro Tip:</span>
              <span>Use quick actions to speed up your application process</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
