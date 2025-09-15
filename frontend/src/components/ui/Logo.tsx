import Link from "next/link";
import { ChevronUp } from "lucide-react";

interface LogoProps {
  showText?: boolean;
  className?: string;
  href?: string;
}

export function Logo({
  showText = true,
  className = "",
  href = "/",
}: LogoProps) {
  const logoElement = (
    <div className={`flex items-center space-x-3 ${className}`}>
      {/* Logo Icon using upward chevron */}
      <div className="flex items-center">
        <ChevronUp className="w-8 h-8 text-primary" />
      </div>

      {/* Text */}
      {showText && (
        <span className="text-xl font-bold text-foreground">U-Bit</span>
      )}
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="hover:opacity-80 transition-opacity">
        {logoElement}
      </Link>
    );
  }

  return logoElement;
}
