import { Loader2 } from "lucide-react";

interface SimpleLoaderProps {
  message?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export const SimpleLoader = ({
  message = "Loading...",
  size = "md",
  className = "",
}: SimpleLoaderProps) => {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-6 w-6",
    lg: "h-8 w-8",
  };

  return (
    <div
      className={`flex flex-col items-center justify-center py-8 ${className}`}
    >
      <Loader2
        className={`animate-spin text-blue-600 ${sizeClasses[size]} mb-3`}
      />
      <p className="text-sm text-muted-foreground">{message}</p>
    </div>
  );
};
