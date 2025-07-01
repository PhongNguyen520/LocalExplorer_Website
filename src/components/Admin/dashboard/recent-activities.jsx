import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

const activities = [
  {
    id: 1,
    type: "business_added",
    content: "New business 'Hanoi Food Tour' was added",
    timestamp: "2 minutes ago",
    icon: "HF",
    iconColor: "bg-green-500",
  },
  {
    id: 2,
    type: "user_registered",
    content: "New user Minh Nguyen registered",
    timestamp: "15 minutes ago",
    icon: "MN",
    iconColor: "bg-blue-500",
  },
  {
    id: 3,
    type: "feedback_received",
    content: "New 5-star feedback for 'Saigon City Tour'",
    timestamp: "32 minutes ago",
    icon: "SC",
    iconColor: "bg-yellow-500",
  },
  {
    id: 4,
    type: "schedule_created",
    content: "New schedule 'Weekend Getaway' created",
    timestamp: "1 hour ago",
    icon: "WG",
    iconColor: "bg-purple-500",
  },
  {
    id: 5,
    type: "transaction_completed",
    content: "Payment received for 'Hue Imperial City Tour'",
    timestamp: "2 hours ago",
    icon: "HI",
    iconColor: "bg-red-500",
  },
]

export function RecentActivities() {
  return (
    <div className="space-y-8">
      {activities.map((activity) => (
        <div key={activity.id} className="flex items-start">
          <Avatar className={cn("h-9 w-9", activity.iconColor)}>
            <AvatarFallback className="text-white">{activity.icon}</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{activity.content}</p>
            <p className="text-sm text-muted-foreground">{activity.timestamp}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
