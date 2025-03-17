

import { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as echarts from "echarts";
import { MoreHorizontal, ArrowUp, RotateCcw, RefreshCw } from "lucide-react";
import { DropdownMenu, DropdownMenuItem } from "./ui/dropdownMenu";
import { AppDispatch, RootState } from "../config/store";
import { getSentimentsAverage } from "../lib/utils";
import { getActivenessAPI, getDashboardTableData } from "../redux/dashboard/dashboardAPI";
import { setDateRange, setSelectedCommunities } from "../redux/dashboard/dashboardSlice";
import Loader from "./Loader/Loader";
import { adjustToLocalDate } from "../utility/adjustToLocalDate";

type TimeRange = "week" | "month" | "year" | "interval";

export default function SentimentChart({
  // intervalIndex,
  isIntervalSelected,
  setIsIntervalSelected,
}: {
  intervalIndex: number;
  isIntervalSelected: boolean;
  setIsIntervalSelected: (value: boolean) => void;
}) {

  const dispatch = useDispatch<AppDispatch>()
  const { dashboardDateRange, selectedCommunities, sentimentsData, loadingSentimentsData } = useSelector((state: RootState) => state.dashboardData)

  const chartRef = useRef<HTMLDivElement>(null);
  const [timeRange, setTimeRange] = useState<TimeRange>("week");

  const totalMessages = useMemo(() => {
    if (!sentimentsData?.graphData?.length) return [];

    const data = sentimentsData.graphData;
    const hasDateField = data.some(item => item.date);

    if (hasDateField) {
      return data;
    }

    const todayIndex = new Date().getDay();

    return [...data.slice(todayIndex + 1), ...data.slice(0, todayIndex + 1)];
  }, [sentimentsData]);

  useEffect(() => {
    if (chartRef.current && totalMessages) {
      const chart = echarts.init(chartRef.current);
      // setChartInstance(chart);

      const option = {
        tooltip: {
          trigger: 'axis',
          formatter: '{b}: {c}%',
        },
        xAxis: {
          type: 'category',
          data: totalMessages.map((item) => item.day || item.date),
          axisLine: { lineStyle: { color: '#374151' } },
          axisTick: { show: false },
          axisLabel: { color: '#9CA3AF', fontSize: 12,  rotate: 30 },
        },
        yAxis: {
          type: 'value',
          axisLine: { show: false },
          splitLine: { lineStyle: { type: 'dashed', color: '#374151' } },
          axisTick: { show: false },
          axisLabel: { color: '#9CA3AF', fontSize: 12, formatter: '{value}%' },
          max: 100,
        },
        grid: {
          left: '10%',
          right: '10%',
          bottom: '15%',
          top: '10%',
        },
        series: [
          {
            data: totalMessages.map((item) => item.positiveCount ? ((item.positiveCount / (item.positiveCount + item.negativeCount)) * 100).toFixed(2) : 0),
            type: 'line',
            smooth: true,
            lineStyle: {
              color: '#4ADE80',
              width: 2,
            },
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: '#4ADE80' },
                { offset: 1, color: 'rgba(74, 222, 128, 0)' },
              ]),
            },
            symbol: 'circle',
            symbolSize: 8,
            itemStyle: {
              color: '#4ADE80',
              borderWidth: 2,
              borderColor: '#fff',
            },
          },
        ],
      }


      chart.setOption(option);

      const resizeHandler = () => chart.resize();
      window.addEventListener("resize", resizeHandler);

      return () => {
        window.removeEventListener("resize", resizeHandler);
        chart.dispose();
      };
    }
  }, [totalMessages]);

  const handleTimeRangeChange = (range: TimeRange) => {
    setTimeRange(range);
    setIsIntervalSelected(false); // Reset interval selection
  };

  const handleReload = () => {
    const { startDate, endDate } = dashboardDateRange[0] || {};
     const formattedStartDate= startDate ? `${adjustToLocalDate(new Date(startDate))}` : undefined;
     const formattedEndDate= endDate ? `${adjustToLocalDate(new Date(endDate))}` : undefined;
    
    const payload = {
      channelIds: selectedCommunities,
      startDate: formattedStartDate,
      endDate: formattedEndDate,
    };

    dispatch(getDashboardTableData(payload))
  };

  const handleReset = () => {
    dispatch(setDateRange([]))
    dispatch(getDashboardTableData())
    dispatch(getActivenessAPI())
    dispatch(setSelectedCommunities([]))
    setTimeRange('week');
    setIsIntervalSelected(false);
  };
  return (
    <div className="w-full text-white p-4 rounded-3xl">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-sm font-medium">Sentiments</h2>
        <div className="flex items-center gap-2">
          <DropdownMenu
            trigger={
              <button className="text-gray-400 hover:text-white">
                <MoreHorizontal className="h-4 w-4 text-gray-400" />
              </button>
            }
          >
            <div className="flex flex-col gap-1 px-6 py-4">
              <h3 className="my-2">Overview By</h3>
              <div className="flex flex-row gap-2 mx-1 justify-center items-center border-solid border-2 border-black rounded-lg p-2">
                <DropdownMenuItem
                  onClick={() => handleTimeRangeChange('week')}
                  className={`text-gray-300 hover:text-white ${timeRange === 'week' && !isIntervalSelected ? 'bg-black rounded-lg p-2' : ''
                    }`}
                >
                  Week
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => handleTimeRangeChange('month')}
                  className={`text-gray-300 hover:text-white ${timeRange === 'month' && !isIntervalSelected ? 'bg-black rounded-lg p-2' : ''
                    }`}
                >
                  Month
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => handleTimeRangeChange('year')}
                  className={`text-gray-300 hover:text-white ${timeRange === 'year' && !isIntervalSelected ? 'bg-black rounded-lg p-2' : ''
                    }`}
                >
                  Year
                </DropdownMenuItem>
              </div>
              <div className="bg-gradient-to-r from-black to-black h-px my-2" />
              <DropdownMenuItem
                onClick={handleReload}
                className="text-gray-300 hover:text-white flex flex-row items-center gap-2"
              >
                <RefreshCw className="mr-2 h-4 w-4" />
                Reload stats
              </DropdownMenuItem>
              <div className="bg-gradient-to-r from-black to-black h-px my-1" />
              <DropdownMenuItem
                onClick={handleReset}
                className="text-gray-300 hover:text-white flex flex-row items-center gap-2"
              >
                <RotateCcw className="mr-2 h-4 w-4" />
                Reset to default
              </DropdownMenuItem>
            </div>
          </DropdownMenu>
        </div>
      </div>
      {loadingSentimentsData ? <Loader fullPage={false} /> :
        (totalMessages.length <= 0) ?
          <div className="flex justify-center items-center h-full">
            <p>No data found</p>
          </div>
          :
          <>
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="text-2xl font-bold">{getSentimentsAverage(totalMessages)}%</div>
                <p className="text-xs text-gray-400 flex flex-row">
                  Positive
                  <ArrowUp className="h-4 w-4 text-green-500" />
                  <span className="text-sm text-green-500">1.25%</span>
                </p>
              </div>
            </div>
            <div ref={chartRef} className="h-[320px]" />
          </>
      }
    </div>
  );
}

