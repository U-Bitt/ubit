"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Bell,
  Check,
  X,
  Clock,
  GraduationCap,
  Award,
  BookOpen,
  Calendar,
  Settings,
  CheckCheck,
} from "lucide-react";

export const Notifications = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "university",
      title: "New University Added",
      message: "Harvard University has been added to your saved list",
      time: "2 hours ago",
      read: false,
      priority: "high",
    },
    {
      id: 2,
      type: "scholarship",
      title: "Scholarship Alert",
      message:
        "New scholarship opportunity: MIT Merit Scholarship - Deadline in 5 days",
      time: "4 hours ago",
      read: false,
      priority: "high",
    },
    {
      id: 3,
      type: "exam",
      title: "Exam Reminder",
      message: "SAT exam scheduled for next week - Don't forget to prepare!",
      time: "1 day ago",
      read: true,
      priority: "medium",
    },
    {
      id: 4,
      type: "deadline",
      title: "Application Deadline",
      message:
        "Stanford University application deadline is approaching in 3 days",
      time: "2 days ago",
      read: true,
      priority: "high",
    },
    {
      id: 5,
      type: "system",
      title: "System Update",
      message: "New features have been added to your dashboard",
      time: "3 days ago",
      read: true,
      priority: "low",
    },
    {
      id: 6,
      type: "recommendation",
      title: "New Recommendation",
      message:
        "Based on your profile, we recommend checking out Carnegie Mellon University",
      time: "4 days ago",
      read: true,
      priority: "medium",
    },
  ]);

  const [filter, setFilter] = useState("all");
  const [selectedNotifications, setSelectedNotifications] = useState<number[]>(
    []
  );

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "university":
        return <GraduationCap className="w-5 h-5 text-blue-500" />;
      case "scholarship":
        return <Award className="w-5 h-5 text-yellow-500" />;
      case "exam":
        return <BookOpen className="w-5 h-5 text-green-500" />;
      case "deadline":
        return <Calendar className="w-5 h-5 text-red-500" />;
      case "system":
        return <Settings className="w-5 h-5 text-gray-500" />;
      case "recommendation":
        return <Bell className="w-5 h-5 text-purple-500" />;
      default:
        return <Bell className="w-5 h-5 text-gray-500" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200";
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "low":
        return "bg-gray-100 text-gray-800 border-gray-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const filteredNotifications = notifications.filter(notification => {
    if (filter === "all") return true;
    if (filter === "unread") return !notification.read;
    if (filter === "high") return notification.priority === "high";
    return notification.type === filter;
  });

  const markAsRead = (id: number) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  const deleteNotification = (id: number) => {
    setNotifications(prev =>
      prev.filter(notification => notification.id !== id)
    );
  };

  const toggleSelection = (id: number) => {
    setSelectedNotifications(prev =>
      prev.includes(id)
        ? prev.filter(notificationId => notificationId !== id)
        : [...prev, id]
    );
  };

  const deleteSelected = () => {
    setNotifications(prev =>
      prev.filter(
        notification => !selectedNotifications.includes(notification.id)
      )
    );
    setSelectedNotifications([]);
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="flex items-center gap-2 mb-2 text-3xl font-bold text-foreground">
          <Bell className="w-8 h-8" />
          Notifications
          {unreadCount > 0 && (
            <Badge variant="destructive" className="ml-2">
              {unreadCount} unread
            </Badge>
          )}
        </h1>
        <p className="text-muted-foreground">
          Stay updated with your university application progress
        </p>
      </div>

      {/* Filter and Actions */}
      <div className="flex flex-col items-start justify-between gap-4 mb-6 sm:flex-row sm:items-center">
        <div className="flex gap-2">
          <Button
            variant={filter === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("all")}
          >
            All
          </Button>
          <Button
            variant={filter === "unread" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("unread")}
          >
            Unread
          </Button>
          <Button
            variant={filter === "high" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("high")}
          >
            High Priority
          </Button>
          <Button
            variant={filter === "university" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("university")}
          >
            Universities
          </Button>
          <Button
            variant={filter === "scholarship" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("scholarship")}
          >
            Scholarships
          </Button>
        </div>

        <div className="flex gap-2">
          {selectedNotifications.length > 0 && (
            <Button variant="destructive" size="sm" onClick={deleteSelected}>
              <X className="w-4 h-4 mr-2" />
              Delete Selected ({selectedNotifications.length})
            </Button>
          )}
          <Button variant="outline" size="sm" onClick={markAllAsRead}>
            <CheckCheck className="w-4 h-4 mr-2" />
            Mark All as Read
          </Button>
        </div>
      </div>

      {/* Notifications List */}
      <div className="space-y-4">
        {filteredNotifications.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <Bell className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="mb-2 text-lg font-medium">No notifications</h3>
              <p className="text-muted-foreground">
                {filter === "all"
                  ? "You're all caught up! No notifications at the moment."
                  : `No ${filter} notifications found.`}
              </p>
            </CardContent>
          </Card>
        ) : (
          filteredNotifications.map(notification => (
            <Card
              key={notification.id}
              className={`transition-all duration-200 hover:shadow-md ${
                !notification.read
                  ? "border-l-4 border-l-blue-500 bg-blue-50/30"
                  : ""
              }`}
            >
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  {/* Selection Checkbox */}
                  <input
                    type="checkbox"
                    checked={selectedNotifications.includes(notification.id)}
                    onChange={() => toggleSelection(notification.id)}
                    className="w-4 h-4 mt-1 text-blue-600 border-gray-300 rounded"
                  />

                  {/* Notification Icon */}
                  <div className="flex-shrink-0">
                    {getNotificationIcon(notification.type)}
                  </div>

                  {/* Notification Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3
                            className={`font-medium ${!notification.read ? "text-foreground" : "text-muted-foreground"}`}
                          >
                            {notification.title}
                          </h3>
                          <Badge
                            variant="outline"
                            className={`text-xs ${getPriorityColor(notification.priority)}`}
                          >
                            {notification.priority}
                          </Badge>
                          {!notification.read && (
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          )}
                        </div>
                        <p
                          className={`text-sm ${!notification.read ? "text-foreground" : "text-muted-foreground"}`}
                        >
                          {notification.message}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <Clock className="w-3 h-3 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">
                            {notification.time}
                          </span>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex items-center gap-2 ml-4">
                        {!notification.read && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => markAsRead(notification.id)}
                            className="w-8 h-8 p-0"
                          >
                            <Check className="w-4 h-4" />
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => deleteNotification(notification.id)}
                          className="w-8 h-8 p-0 text-muted-foreground hover:text-destructive"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Notification Settings Link */}
      <div className="mt-8 text-center">
        <Button variant="outline" asChild>
          <Link href="/settings">
            <Settings className="w-4 h-4 mr-2" />
            Manage Notification Settings
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default Notifications;
