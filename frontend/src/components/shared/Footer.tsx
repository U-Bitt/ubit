import { Heart } from "lucide-react";
import Link from "next/link";
import { Logo } from "@/components/ui/Logo";

export default function Footer() {
  return (
    <footer className="bg-muted/30 border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col items-center space-y-4">
          <Logo showText={true} />

          <div className="flex items-center space-x-6">
            <Link 
              href="/about" 
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              About
            </Link>
          </div>

          <p className="text-sm text-muted-foreground">
            © 2025 All rights reserved
          </p>

          <p className="text-sm text-muted-foreground flex items-center space-x-1">
            <span>Made with</span>
            <Heart className="h-4 w-4 text-red-500 fill-red-500" />
            <span>by U-Bit team</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
