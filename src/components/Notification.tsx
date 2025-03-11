import { RefreshCw, X } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import logo from "../assets/Images/Logov.1-blackv1 1.webp"
const notifications = [
  {
    id: 1,
    title: "Report Downloaded",
    description: "Weekly CribbleCrypto1 community report for Month: December 2023 has been downloaded.",
    time: "2 min ago",
    icon: "/placeholder.svg",
  },
  {
    id: 2,
    title: "Upgrade Reminder",
    description: "You can upgrade your plan to Premium with 20% discount. Offer valid till 01/15/2024",
    time: "12 min ago",
    icon: "⚡"
  },
  {
    id: 3,
    title: "Task Completed",
    description: "Your task 'Weekly Backup' has been completed. Please mark it as done in the progress list.",
    time: "45 min ago",
    icon: "✅"
  },
  {
    id: 4,
    title: "Task Completed",
    description: "Your task 'Weekly Backup' has been completed. Please mark it as done in the progress list.",
    time: "45 min ago",
    icon: "✅"
  }
]

const insights = [
  {
    id: 1,
    community: "CribbleCrypto1",
    description: "Community members increased by 157 members in last 24 hours.",
    time: "Just now",
    icon: "🤖"
  },
  {
    id: 2,
    community: "CribbleCrypto3",
    description: "2 new members got more active in last 24 hours",
    time: "2 mins ago",
    icon: "🤖"
  },
  {
    id: 3,
    community: "CribbleCrypto2",
    description: "New AI has been assigned as new admin.",
    time: "5 mins ago",
    icon: "🤖"
  },
  {
    id: 4,
    community: "CribbleCrypto2",
    description: "New AI has been assigned as new admin.",
    time: "5 mins ago",
    icon: "🤖"
  }
]

interface NotificationsSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function NotificationsSidebar({ isOpen, onClose }: NotificationsSidebarProps) {
  return (
    <div className={`
      fixed inset-y-0 right-0 w-full sm:w-96 bg-[#0E0C15] border-l border-[#3F3A52] transform transition-transform duration-300 ease-in-out z-50
      ${isOpen ? 'translate-x-0' : 'translate-x-full'}
      lg:sticky lg:translate-x-0 lg:w-[18%] lg:flex lg:flex-col lg:gap-4 lg:h-screen 
    `}>
      <div className="flex justify-between items-center p-4 lg:hidden">
        <h2 className="text-xl font-semibold">Notifications</h2>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <X className="h-6 w-6" />
        </Button>
      </div>

      {/* First Card: Notifications */}
      <Card className="bg-[#0E0C15]  overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between pb-2 sticky top-0 bg-black z-10">
          <CardTitle className="text-sm font-medium">Notifications</CardTitle>
          <p className='text-xs text-white mt-1' >Coming soon</p>
          <Button variant="ghost" size="sm" className="h-8 w-8">
            <RefreshCw className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {notifications.map((notification) => (
            <div key={notification.id} className="flex gap-3">
              <div className="w-8 h-8 flex items-center justify-center bg-gray-800 rounded-full">
                <img src={logo} alt="" width={32} height={32} />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-medium truncate">{notification.title}</h3>
                <p className="text-xs text-gray-400 mt-1 line-clamp-2">{notification.description}</p>
                <span className="text-xs text-gray-500 mt-1 block">{notification.time}</span>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Second Card: Insights */}
      <Card className="bg-[#0E0C15] border-gray-800  overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between pb-2 sticky top-0 bg-black z-10">
          <CardTitle className="text-sm font-medium">Insights</CardTitle>
          <p className='text-xs text-white mt-1' >Coming soon</p>
          <Button variant="ghost" size="sm" className="h-8 w-8">
            <RefreshCw className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {insights.map((insight) => (
            <div key={insight.id} className="flex gap-3">
              <div className="w-8 h-8 flex items-center justify-center bg-gray-800 rounded-full">
                <img src={logo} alt="" width={32} height={32} />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-medium truncate">{insight.community}</h3>
                <p className="text-xs text-gray-400 mt-1 line-clamp-2">{insight.description}</p>
                <span className="text-xs text-gray-500 mt-1 block">{insight.time}</span>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}

