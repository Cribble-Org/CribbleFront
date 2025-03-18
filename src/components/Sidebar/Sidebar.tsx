import * as React from "react";
import {
  Bell,
  CircleUser,
  HelpCircle,
  LogOut,
  MessageCircle,
  PieChart,
  Settings2,
  Box,
  ChevronLeft,
  ChevronRight,
  BotIcon,
} from 'lucide-react';
import { cn } from "../../lib/utils";
import logo from '../../assets/Images/o bg.webp';
import { Link, useNavigate } from "react-router-dom";
import handleAppEvents from "../../utility/toast";
import { revertAll } from "../../redux/user/userSlice";
import { useDispatch } from "react-redux";
import { DASHBOARD_URL, LOGIN_URL } from "../../constants/urls";

function NavItem({
  icon: Icon,
  label,
  expanded,
  badge,
  to,
}: {
  icon: React.ElementType;
  label: string;
  expanded: boolean;
  badge?: string;
  to: string;
}) {
  return (
    <Link to={to}>
      <button
        className={cn(
          "group relative flex items-center rounded-xl bg-transparent p-2 hover:bg-white/5 w-full",
          expanded ? "justify-start" : "justify-center"
        )}
      >
        <Icon className="h-5 w-5 text-white/70 transition-colors group-hover:text-white" />
        {expanded && (
          <span className="ml-3 text-sm font-medium text-white/70 transition-colors group-hover:text-white">
            {label}
          </span>
        )}
        {badge && (
          <div className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-pink-500 px-1 text-xs font-medium text-white">
            {badge}
          </div>
        )}
      </button>
    </Link>
  );
}

export default function Sidebar() {
  const [expanded, setExpanded] = React.useState(false);
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleLogout = () => {
    localStorage.clear(); 
    handleAppEvents("Logout Successfully", "success")
    dispatch(revertAll())
    navigate(LOGIN_URL, { replace: true });
  };

  return (
    <div
      className={cn(
        "sticky top-0 flex flex-col h-screen bg-black text-white border-[#3F3A52] border-solid border-[1px] transition-all duration-300",
        expanded ? "w-[200px]" : "w-[72px]"
      )}
    >
      {/* Toggle Button */}
      <button
        onClick={() => setExpanded(!expanded)}
        className={cn(
          "absolute mx-auto mb-4 mt-4 flex h-6 w-6 items-center justify-center rounded-full bg-white text-black hover:bg-gray-200",
          expanded ? "left-[11.5em]" : "left-[4em]"
        )}
      >
        {expanded ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
      </button>

      {/* Logo */}
      <div className="absolute top-4 left-4 flex h-[72px] items-center">
        <div className="relative h-12 w-12 rounded-full">
          <div className="absolute inset-0 rounded-full" />
          <div className="relative z-10 flex h-full items-center justify-center text-2xl font-bold">
            <img src={logo} className="rounded-full" />
          </div>
          <div className="absolute -inset-1 animate-pulse rounded-full bg-gradient-to-br from-purple-500/50 to-pink-500/50 blur-md" />
        </div>
        {expanded && (
          <span className="ml-4 text-lg font-bold text-white transition-all duration-300">
            Sidebar
          </span>
        )}
      </div>

      {/* Sidebar Navigation */}
      <div className="flex flex-col mt-[96px] flex-1 space-y-2 p-2">
        <NavItem icon={PieChart} label="Dashboard" expanded={expanded} to={DASHBOARD_URL} />
        <NavItem icon={Box} label="Reports" expanded={expanded} to="/reports" />
        <NavItem icon={MessageCircle} label="Chat" expanded={expanded}  to="/chat" />
        <NavItem icon={Bell} label="Notifications" expanded={expanded} to="/notifications" />
        <NavItem icon={CircleUser} label="Profile" expanded={expanded} to="/profile" />
        <NavItem icon={BotIcon} label="AIBot" expanded={expanded} to="/bot-aggent" />
        <NavItem  icon={Settings2} label="Settings" expanded={expanded} to="/settings"
 />
      </div>

      {/* Bottom Navigation */}
      {/* <div className="p-2 space-y-2">
        <NavItem icon={HelpCircle} label="Help" expanded={expanded} to="/help" />
        <NavItem icon={LogOut} label="Logout" expanded={expanded} to="/logout" />
      </div> */}
      <div className="p-2 space-y-2">
        <NavItem icon={HelpCircle} label="Help" expanded={expanded} to="/help" />
        <button
          onClick={handleLogout}
          className={cn(
            "group relative flex items-center rounded-xl bg-transparent p-2 hover:bg-white/5 w-full",
            expanded ? "justify-start" : "justify-center"
          )}
        >
          <LogOut className="h-5 w-5 text-white/70 transition-colors group-hover:text-white" />
          {expanded && (
            <span className="ml-3 text-sm font-medium text-white/70 transition-colors group-hover:text-white">
              Logout
            </span>
          )}
        </button>
      </div>
    </div>
  );
}
