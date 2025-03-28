import { useState } from "react";
import {
  PieChart,
  Box,
  MessageCircle,
  Bell,
  CircleUser,
  Settings2,
  HelpCircle,
  LogOut,
  Menu,
  ChevronDown,
  BotIcon,
} from "lucide-react";
import { DateRange, RangeKeyDict } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import logo from "../../assets/Images/o bg.webp";
import { Button } from "../ui/button";
import calendarIcon from "../../assets/Icons/calendar.svg";
import { DropdownMenu, DropdownMenuItem } from "../ui/dropdownMenu";
import { Link } from "react-router-dom";
import { DASHBOARD_URL } from "../../constants/urls";

interface NavItemProps {
  icon: React.ElementType;
  label: string;
  badge?: string;
  to?: string;
  onClick?: () => void;
}

function NavItem({ icon: Icon, label, badge, to, onClick }: NavItemProps) {
  return (
    <DropdownMenuItem
      className="flex items-center gap-2 p-3 text-sm text-gray-300 cursor-pointer focus:bg-gray-800 focus:text-gray-200"
      onClick={onClick}
    >
      {to ? (
        <Link to={to} className="flex items-center gap-2 w-full">
          <Icon className="w-5 h-5" />
          <span className="flex-1">{label}</span>
          {badge && (
            <span className="px-2 py-0.5 text-xs font-medium text-white bg-green-500 rounded-full">
              {badge}
            </span>
          )}
        </Link>
      ) : (
        <>
          <Icon className="w-5 h-5" />
          <span className="flex-1">{label}</span>
          {badge && (
            <span className="px-2 py-0.5 text-xs font-medium text-white bg-green-500 rounded-full">
              {badge}
            </span>
          )}
        </>
      )}
    </DropdownMenuItem>
  );
}

interface MobileNavProps {
  currentInterval: number;
  setCurrentInterval: (value: number) => void;
  isIntervalSelected: boolean;
  setIsIntervalSelected: (value: boolean) => void;
}
export default function MobileNav({
  currentInterval,
  setCurrentInterval,
  setIsIntervalSelected,
}: MobileNavProps) {
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const handleDateSelect = (ranges: RangeKeyDict) => {
    const selection = ranges.selection;
    if (selection) {
      const newInterval = (currentInterval + 1) % 4;
      setCurrentInterval(newInterval);
      setIsIntervalSelected(true);
      setDateRange([
        {
          startDate: selection.startDate ?? new Date(),
          endDate: selection.endDate ?? new Date(),
          key: selection.key ?? "default",
        },
      ]);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-3 bg-[#0E0C15] border-b border-gray-800">
      <div className="flex items-center gap-2">
        <div className="relative h-10 w-10 sm:w-12 sm:h-12">
          <img src={logo} alt="Logo" className="rounded-full" />
        </div>
        <span className="text-lg font-semibold text-white hidden sm:inline">
          CRIBBLE
        </span>
      </div>

      <div className="flex items-center gap-2 sm:gap-4">
        <DropdownMenu
          trigger={
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-1 text-sm font-medium text-[#757185] bg-[#0E0C15] border-gray-700 hover:bg-gray-800"
            >
              <img src={calendarIcon} alt="Calendar" width={16} height={16} />
              <span className="hidden sm:inline">
                {`${dateRange[0].startDate?.toLocaleDateString()} - ${dateRange[0].endDate?.toLocaleDateString()}`}
              </span>
              <ChevronDown className="w-4 h-4 ml-1" />
            </Button>
          }
        >
          <div className="p-0 bg-[#252134]">
            <DateRange
              ranges={dateRange}
              onChange={handleDateSelect}
              rangeColors={["#15131D"]}
              showDateDisplay={false}
              className="bg-[#252134] text-white"
            />
          </div>
        </DropdownMenu>

        <DropdownMenu
          trigger={
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-400 hover:text-gray-300 hover:bg-gray-800"
            >
              <Menu className="w-5 h-5" />
            </Button>
          }
        >
          <div className="w-56 mt-2">
            <NavItem icon={PieChart} label="Dashboard" to={DASHBOARD_URL} />
            <NavItem icon={Box} label="Reports" to="/reports" />
            <NavItem icon={MessageCircle} label="Chat" to="/chat" />
            <NavItem icon={Bell} label="Notifications" to="/notifications" />
            <NavItem icon={CircleUser} label="Profile" to="/profile" />
            <NavItem icon={Settings2} label="Settings" to="/settings" />
            <DropdownMenuItem className="bg-gray-800 h-px m-1" />
            <NavItem icon={HelpCircle} label="Help" to="/help" />
            <NavItem icon={BotIcon} label="AIBot" to="/bot-agent" />
            <NavItem icon={LogOut} label="Logout" onClick={() => {}} />
          </div>
        </DropdownMenu>
      </div>
    </header>
  );
}
