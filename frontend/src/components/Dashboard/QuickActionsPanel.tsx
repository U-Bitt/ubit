import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";
import { Target } from "lucide-react";

interface QuickAction {
  label: string;
  icon: LucideIcon;
  action: string;
  color: string;
}

interface QuickActionsPanelProps {
  quickActions: QuickAction[];
  onActionClick: (action: string) => void;
}

export const QuickActionsPanel = ({
  quickActions,
  onActionClick,
}: QuickActionsPanelProps) => {
  return (
    <div className="mb-8">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Quick Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {quickActions.map((action, index) => (
              <Button
                key={index}
                variant="outline"
                className="h-20 flex flex-col items-center justify-center gap-2 hover:shadow-md transition-shadow"
                onClick={() => onActionClick(action.action)}
              >
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center ${action.color}`}
                >
                  <action.icon className="h-4 w-4 text-white" />
                </div>
                <span className="text-xs font-medium">{action.label}</span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
