"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/Logo";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Menu,
  X,
  User,
  Bell,
  Settings,
  LogOut,
  GraduationCap,
  MapPin,
  BookOpen,
  Lightbulb,
  FileText,
  BarChart3,
  Award,
  ChevronDown,
  Users,
  Plane,
} from "lucide-react";

const navigationMenus = [
  {
    name: "Discover",
    items: [
      { name: "Universities", href: "/discover/universities", icon: GraduationCap },
      { name: "Countries", href: "/discover/countries", icon: MapPin },
      { name: "Scholarships", href: "/discover/scholarships", icon: Award },
    ],
  },
  {
    name: "Prepare",
    items: [
      { name: "Exams", href: "/prepare/exams", icon: BookOpen },
      { name: "Recommendations", href: "/prepare/recommendations", icon: Lightbulb },
      { name: "Documents", href: "/prepare/documents", icon: FileText },
      { name: "Trainings", href: "/prepare/trainings", icon: Users },
      { name: "Visa", href: "/prepare/visa", icon: Plane },
      { name: "Packages", href: "/prepare/packages", icon: FileText },
    ],
  },
  {
    name: "Manage",
    items: [{ name: "Dashboard", href: "/manage/dashboard", icon: BarChart3 }],
  },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Logo />

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {/* Home Link */}
            <Link href="/">
              <Button
                variant={router.pathname === "/" ? "default" : "ghost"}
                className={`flex items-center space-x-2 ${
                  router.pathname === "/"
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <GraduationCap className="h-4 w-4" />
                <span>Home</span>
              </Button>
            </Link>

            {/* Dropdown Menus */}
            {navigationMenus.map(menu => (
              <DropdownMenu key={menu.name}>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="flex items-center space-x-1 text-muted-foreground hover:text-foreground"
                  >
                    <span>{menu.name}</span>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-48">
                  {menu.items.map(item => {
                    const isActive = router.pathname === item.href;
                    return (
                      <DropdownMenuItem key={item.name} asChild>
                        <Link
                          href={item.href}
                          className={`flex items-center space-x-2 w-full ${
                            isActive ? "bg-primary/10 text-primary" : ""
                          }`}
                        >
                          <item.icon className="h-4 w-4" />
                          <span>{item.name}</span>
                        </Link>
                      </DropdownMenuItem>
                    );
                  })}
                </DropdownMenuContent>
              </DropdownMenu>
            ))}
          </div>

          {/* Right side buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" >
              <Bell className="h-4 w-4" />
            </Button>
            <Button variant="ghost" >
              <Settings className="h-4 w-4" />
            </Button>
            <Link href="/user/profile" className="flex items-center space-x-2">
              <User className="h-4 w-4 mr-2" />
              Profile
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden border-t border-gray-200">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {/* Home Link */}
              <Link href="/">
                <Button
                  variant={router.pathname === "/" ? "default" : "ghost"}
                  className={`w-full justify-start flex items-center space-x-2 ${
                    router.pathname === "/"
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <GraduationCap className="h-4 w-4" />
                  <span>Home</span>
                </Button>
              </Link>

              {/* Dropdown Menus for Mobile */}
              {navigationMenus.map(menu => (
                <div key={menu.name} className="space-y-1">
                  <div className="px-3 py-2 text-sm font-medium text-muted-foreground">
                    {menu.name}
                  </div>
                  {menu.items.map(item => {
                    const isActive = router.pathname === item.href;
                    return (
                      <Link key={item.name} href={item.href}>
                        <Button
                          variant={isActive ? "default" : "ghost"}
                          className={`w-full justify-start flex items-center space-x-2 ml-4 ${
                            isActive
                              ? "bg-primary text-primary-foreground"
                              : "text-muted-foreground hover:text-foreground"
                          }`}
                        >
                          <item.icon className="h-4 w-4" />
                          <span>{item.name}</span>
                        </Button>
                      </Link>
                    );
                  })}
                </div>
              ))}
            </div>
            <div className="pt-4 pb-3 border-t border-gray-200">
              <div className="flex items-center px-3">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                    <User className="h-4 w-4 text-white" />
                  </div>
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium text-foreground">
                    Alex Smith
                  </div>
                  <div className="text-sm text-muted-foreground">
                    alex.smith@email.com
                  </div>
                </div>
              </div>
              <div className="mt-3 space-y-1">
                <Button variant="ghost" className="w-full justify-start">
                  <User className="h-4 w-4 mr-2" />
                  Your Profile
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign out
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
