import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        // Primary Button - Main brand color
        primary:
          "bg-primary-500 text-white hover:bg-primary-600 active:bg-primary-700 shadow-sm",

        // Secondary Button - Outline style
        secondary:
          "border-2 border-primary-500 text-primary-500 bg-transparent hover:bg-primary-500 hover:text-white active:bg-primary-600",

        // Accent Button - Pink accent color
        accent:
          "bg-accent-500 text-white hover:bg-accent-600 active:bg-accent-700 shadow-sm",

        // Ghost Button - Transparent with hover
        ghost: "text-muted-foreground hover:text-foreground hover:bg-muted/50",

        // Destructive Button - For dangerous actions
        destructive:
          "bg-red-500 text-white hover:bg-red-600 active:bg-red-700 shadow-sm",

        // Success Button - For positive actions
        success:
          "bg-green-500 text-white hover:bg-green-600 active:bg-green-700 shadow-sm",

        // Link Button - Looks like a link
        link: "text-primary-500 underline-offset-4 hover:underline",
      },
      size: {
        sm: "h-9 px-3 text-sm",
        default: "h-10 px-4 py-2",
        lg: "h-12 px-8 text-base",
        xl: "h-14 px-10 text-lg",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export { buttonVariants };
