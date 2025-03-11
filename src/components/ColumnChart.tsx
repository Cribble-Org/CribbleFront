import { useEffect, useRef, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as echarts from "echarts";
import expand from '../assets/Icons/ci_expand.svg'
import { DropdownMenu, DropdownMenuItem } from './ui/dropdownMenu'
import { MoreHorizontal, RotateCcw, Trash2 } from 'lucide-react'
import { AppDispatch, RootState } from "../config/store";
import { getActivenessAPI, getDashboardTableData } from "../redux/dashboard/dashboardAPI";
import { setDateRange, setSelectedCommunities } from "../redux/dashboard/dashboardSlice";
import Loader from "./Loader/Loader";

export default function MessageStats() {
  const chartRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch<AppDispatch>()
  const { sentimentsData, loadingSentimentsData, selectedCommunities, dashboardDateRange } = useSelector((state: RootState) => state.dashboardData);

  const [isExpanded, setIsExpanded] = useState(false)
  const intervalData = useMemo(() => {
    if (!sentimentsData?.graphData?.length) return [];

    const data = sentimentsData.graphData;

    // Check if any object has a 'date' field
    const hasDateField = data.some(item => item.date);

    if (hasDateField) {
      return data; // Return as is, without sorting
    }

    const todayIndex = new Date().getDay();
    return [...data.slice(todayIndex + 1), ...data.slice(0, todayIndex + 1)];
  }, [sentimentsData]);

  useEffect(() => {
    if (chartRef.current && intervalData.length > 0) {
      const chart = echarts.init(chartRef.current);

      const option = {
        tooltip: {
          trigger: "axis",
          backgroundColor: "#1f2937",
          borderColor: "#374151",
          textStyle: { color: "#fff" },
        },
        xAxis: {
          type: "category",
          data: intervalData.map((data) => data.day || data.date),
          axisLine: { lineStyle: { color: "#4b5563" } },
          axisLabel: { color: "#9ca3af", rotate: 30 },
        },
        yAxis: {
          type: "value",
          splitLine: { lineStyle: { type: "dashed", color: "#374151" } },
          axisLine: { lineStyle: { color: "#4b5563" } },
          axisLabel: { color: "#9ca3af" },
        },
        grid: {
          left: "10%",
          right: "10%",
          bottom: "15%",
          top: "10%",
        },
        series: [
          {
            name: "Positive",
            type: "bar",
            stack: "total",
            data: intervalData.map((data) => data.positiveCount),
            itemStyle: { color: "#4ade80" },
          },
          {
            name: "Negative",
            type: "bar",
            stack: "total",
            data: intervalData.map((data) => data.negativeCount),
            itemStyle: { color: "#f87171" },
          },
        ],
      };

      chart.setOption(option);

      const handleResize = () => chart.resize();
      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
        chart.dispose();
      };
    }
  }, [intervalData]);

  const handleExpand = () => {
    setIsExpanded(!isExpanded)
  }

  const handleReloadStats = () => {
    const { startDate, endDate } = dashboardDateRange[0] || {};
    const payload = {
      channelIds: selectedCommunities,
      startDate: startDate,
      endDate: endDate,
    };

    dispatch(getDashboardTableData(payload));
  }

  const handleReset = () => {
    dispatch(setDateRange([]))
    dispatch(getDashboardTableData())
    dispatch(getActivenessAPI())
    dispatch(setSelectedCommunities([]))
  }

  return (
    <div
      className={`text-white p-4 rounded-3xl transition-all duration-300 h-full ${isExpanded ? 'fixed inset-0 z-50 max-w-6xl bg-gray-900' : ''
        }`}
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Total Messages</h2>
        <div className="flex items-center space-x-2">
          <button className="mx-4" onClick={handleExpand}>
            <img src={expand} />
          </button>
          <DropdownMenu
            trigger={
              <button className="border-none bg-none">
                <MoreHorizontal className="h-5 w-5" />
              </button>
            }
          >
            <DropdownMenuItem onClick={handleReloadStats} className="text-gray-300 flex flex-row p-2">
              <RotateCcw className="mr-2 h-4 w-4 mt-1" />
              Reload Stats
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleReset} className="text-gray-300 flex flex-row p-2">
              <Trash2 className="mr-2 h-4 w-4 mt-1" />
              Reset to default
            </DropdownMenuItem>
          </DropdownMenu>
        </div>
      </div>
      {
        loadingSentimentsData ? <Loader fullPage={false} /> :
          (intervalData.length > 0 ? (
            <>
              <div className="text-sm text-gray-400 mb-4">Summary</div>
              <div ref={chartRef} className={`${isExpanded ? 'h-[70vh]' : 'h-[400px]'}`} />
              <div className="flex justify-between mt-10">
                <div className="flex flex-col text-lg font-bold">
                  <span className="text-[#757185]">Total messages</span>
                  <span className="text-3xl">{sentimentsData?.totals?.totalMessages}</span>
                </div>
                <div className="flex flex-col text-sm mt-5">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-[#4ade80] rounded-full mr-2" />
                    <span className="text-gray-400">Positive</span>
                    <span className="ml-2 font-semibold">{sentimentsData?.totals?.totalPositive}</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-[#f87171] rounded-full mr-2" />
                    <span className="text-gray-400">Negative</span>
                    <span className="ml-2 font-semibold">{sentimentsData?.totals?.totalNegative}</span>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="flex justify-center items-center h-full">
              <p>No data found</p>
            </div>)
          )}
    </div>
  );
}
