import { useEffect, useRef, useState } from "react";
import { DateRange, RangeKeyDict } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import MessageStats from "../components/ColumnChart";
import ActivenessChart from "../components/DonutChart";
import SentimentChart from "../components/LineChart";
import CommunitiesDashboard from "../components/Dashboard";
import Sidebar from "../components/Sidebar/Sidebar";
import MobileNav from "../components/Header/NavMenu";
import { Button } from "../components/ui/button";
import { Bell } from "lucide-react";
import NotificationsSidebar from "../components/Notification";
import calendarIcon from "../assets/Icons/calendar.svg";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../config/store";
import { getActivenessAPI, getDashboardTableData, getDBChannels } from "../redux/dashboard/dashboardAPI";
import { getAccessToken } from "../utility/session";
import { getUserAPI } from "../redux/user/userAPI";
import { setDateRange } from "../redux/dashboard/dashboardSlice";

const InitialRange = [
  {
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  },

]

function DashboardPage() {
  const calendarRef = useRef<HTMLDivElement>(null);

  const dispatch = useDispatch<AppDispatch>()
  const { allChannels, sentimentsData, activenessData, dashboardDateRange, selectedCommunities } = useSelector((state: RootState) => state.dashboardData)
  const { userData } = useSelector((state: RootState) => state.userData)

  const [isCalendarOpen, setCalendarOpen] = useState(false);
  const [isNotificationSidebarOpen, setIsNotificationSidebarOpen] =
    useState(false);
  const [currentInterval, setCurrentInterval] = useState(0);
  const [isIntervalSelected, setIsIntervalSelected] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target as Node)) {
        setCalendarOpen(false);
      }
    };

    if (isCalendarOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isCalendarOpen]);

  const handleDateSelect = (ranges: RangeKeyDict) => {
    const selection = ranges.selection;
    if (selection) {
      const startDate = selection.startDate ? new Date(selection.startDate) : new Date();
      let endDate = selection.endDate ? new Date(selection.endDate) : new Date();

      const maxEndDate = new Date(startDate);
      maxEndDate.setDate(startDate.getDate() + 7);

      if (endDate > maxEndDate) {
        endDate = maxEndDate;
      }

      const adjustToLocalDate = (date: Date) => {
        const offset = date.getTimezoneOffset() * 60000; // Convert minutes to milliseconds
        return new Date(date.getTime() - offset).toISOString().split("T")[0];
      };

      const serializedStartDate = adjustToLocalDate(startDate);
      const serializedEndDate = adjustToLocalDate(endDate);
      dispatch(setDateRange([
        {
          startDate: startDate.toISOString(),
          endDate: endDate.toISOString(),
          key: selection.key ?? "default",
        },
      ]));

      dispatch(getDashboardTableData({ startDate: serializedStartDate, endDate: serializedEndDate, channelIds: selectedCommunities }));
      dispatch(getActivenessAPI({ startDate: serializedStartDate, endDate: serializedEndDate, channelIds: selectedCommunities }));
    }
  };

  useEffect(() => {
    if (getAccessToken() && (!sentimentsData || Object.keys(sentimentsData).length <= 0)) {
      dispatch(getDashboardTableData())
    }
  }, [dispatch, sentimentsData])

  useEffect(() => {
    if (getAccessToken() && activenessData.length <= 0) {
      dispatch(getActivenessAPI())
    }
  }, [activenessData.length, dispatch])

  useEffect(() => {
    if (getAccessToken() && allChannels.length <= 0) {
      dispatch(getDBChannels());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch])

  useEffect(() => {
    if (getAccessToken() && !userData) {
      dispatch(getUserAPI())
    }
  }, [dispatch, userData])

  return (
    <div className="flex min-h-screen font-sora">
      <div className="hidden lg:block">
        <Sidebar />
      </div>
      <main className="flex-1 min-w-0 p-6">
        {" "}
        {/* Added min-w-0 to prevent flex item from expanding */}
        <div className="lg:hidden">
          <MobileNav
            currentInterval={currentInterval}
            setCurrentInterval={setCurrentInterval}
            isIntervalSelected={isIntervalSelected}
            setIsIntervalSelected={setIsIntervalSelected}
          />
        </div>
        <div className="items-center justify-between mb-8 border-b-[#3F3A52] border-b-[1px] border-solid p-4 hidden lg:flex">
          <h1 className="text-2xl font-semibold text-white">Dashboard</h1>

          <div className="relative">
            <button
              onClick={() => setCalendarOpen(!isCalendarOpen)}
              className="flex items-center px-4 py-2 text-sm font-medium text-[#757185] bg-[#0E0C15] rounded-md"
            >
              <img
                src={calendarIcon}
                alt="Calendar"
                width={24}
                height={24}
                className="mx-2"
              />
              {dashboardDateRange.length > 0 &&
                `${new Date(dashboardDateRange[0].startDate).toLocaleDateString()} - 
                  ${new Date(dashboardDateRange[0].endDate).toLocaleDateString()}`}

            </button>
            {isCalendarOpen && (
              <div ref={calendarRef} className="absolute right-0 z-10 mt-2 rounded-lg shadow-lg">
                <DateRange
                  ranges={dashboardDateRange.length > 0 ?
                    [{
                      startDate: new Date(dashboardDateRange[0].startDate),
                      endDate: new Date(dashboardDateRange[0].endDate),
                      key: dashboardDateRange[0].key,
                    }] :
                    InitialRange}
                  onChange={handleDateSelect}
                  rangeColors={["#15131D"]}
                  showDateDisplay={false}
                  className="bg-[#252134] text-white"
                  maxDate={new Date()}
                />
              </div>
            )}
          </div>
        </div>
        {/* Notification toggle button for smaller screens */}
        <div className="lg:hidden fixed bottom-4 right-4 z-50">
          <Button
            onClick={() => setIsNotificationSidebarOpen(true)}
            className="rounded-full p-3 bg-[#B3FF53] text-black hover:bg-[#9FE647]"
          >
            <Bell className="h-6 w-6" />
          </Button>
        </div>
        {/* Charts Grid */}
        <div className="grid xl:grid-cols-2 grid-cols-1 gap-6 mb-6 mt-20 lg:mt-0">
          <div className="bg-[#0E0C15] rounded-xl p-4 min-w-0 overflow-hidden">
            {" "}
            {/* Added min-w-0 and overflow-hidden */}
            <MessageStats />
          </div>
          <div className="flex flex-col gap-6 min-w-0">
            {" "}
            {/* Added min-w-0 */}
            <div className="bg-[#0E0C15] rounded-xl p-4 overflow-hidden">
              <ActivenessChart
                intervalIndex={currentInterval}
                isIntervalSelected={isIntervalSelected}
                setIsIntervalSelected={setIsIntervalSelected}
              />
            </div>
            <div className="bg-[#0E0C15] rounded-xl p-4 overflow-hidden">
              <SentimentChart
                intervalIndex={currentInterval}
                isIntervalSelected={isIntervalSelected}
                setIsIntervalSelected={setIsIntervalSelected}
              />
            </div>
          </div>
        </div>
        {/* Communities Dashboard */}
        <div className="bg-[#0E0C15] rounded-xl overflow-hidden">
          {" "}
          {/* Added overflow-hidden */}
          <CommunitiesDashboard />
        </div>
      </main>

      <NotificationsSidebar
        isOpen={isNotificationSidebarOpen}
        onClose={() => setIsNotificationSidebarOpen(false)}
      />
    </div>
  );
}

export default DashboardPage;
