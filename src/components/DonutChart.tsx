import { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as echarts from "echarts";
import { MoreHorizontal, ArrowUp, RotateCw, Trash2 } from "lucide-react";
import { DropdownMenu, DropdownMenuItem } from "./ui/dropdownMenu";
import { AppDispatch, RootState } from "../config/store";
import { getActivenessAPI, getDashboardTableData } from "../redux/dashboard/dashboardAPI";
import { setDateRange, setSelectedCommunities } from "../redux/dashboard/dashboardSlice";
import Loader from "./Loader/Loader";


interface ChartData {
  name: string;
  value: string;
  color: string
}

const dummyStats = {
  initial: { members: 2789, percentage: 25 },
  reload: { members: 3400, percentage: 15 },
};

export default function ActivenessChart({
  isIntervalSelected,
}: {
  intervalIndex: number;
  isIntervalSelected: boolean;
  setIsIntervalSelected: (value: boolean) => void;
}) {
  const dispatch = useDispatch<AppDispatch>()
  const { activenessData, loadingActiveness, dashboardDateRange, selectedCommunities } = useSelector((state: RootState) => state.dashboardData)
  const chartRef = useRef<HTMLDivElement>(null);
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [members, setMembers] = useState<number>(0);
  const [percentage, setPercentage] = useState(dummyStats.initial.percentage);

  const intervalData = useMemo(() => activenessData || [], [activenessData]);

  useEffect(() => {
    setChartData(intervalData[0]?.chart);
    setMembers(intervalData[0]?.states?.members);
    setPercentage(dummyStats.initial.percentage);
  }, [intervalData, isIntervalSelected]);

  useEffect(() => {
    if (chartRef.current) {
      const chart = echarts.init(chartRef.current);

      const option = {
        tooltip: {
          trigger: "item",
          formatter: "{b}: {c} ({d}%)",
        },
        series: [
          {
            name: "Activeness",
            type: "pie",
            radius: ["60%", "80%"],
            avoidLabelOverlap: false,
            label: {
              show: false,
            },
            labelLine: {
              show: false,
            },
            data: chartData?.map((item) => ({
              value: item?.value,
              name: item?.name,
              itemStyle: {
                color: item?.color,
              },
            })),
          },
        ],
      };

      chart.setOption(option);

      const resizeHandler = () => chart.resize();
      window.addEventListener("resize", resizeHandler);

      return () => {
        window.removeEventListener("resize", resizeHandler);
        chart.dispose();
      };
    }
  }, [chartData]);

  const handleReloadStats = () => {
    const { startDate, endDate } = dashboardDateRange[0] || {};
    const payload = {
      channelIds: selectedCommunities,
      startDate: startDate,
      endDate: endDate,
    };

    dispatch(getActivenessAPI(payload));
  };

  const handleResetToDefault = () => {
    dispatch(setDateRange([]))
    dispatch(getDashboardTableData())
    dispatch(getActivenessAPI())
    dispatch(setSelectedCommunities([]))
  };

  return (
    <div className="text-white p-2 rounded-3xl">
      <div className="flex justify-between items-center">
        <h2 className="text-sm font-medium">Activeness</h2>
        <DropdownMenu
          trigger={
            <button className="h-8 w-8 p-0 ">
              <MoreHorizontal className="h-4 w-4 text-gray-400" />
            </button>
          }
        >
          <DropdownMenuItem
            onClick={handleReloadStats}
            className="flex items-center text-gray-200 focus:text-gray-200 p-2"
          >
            <RotateCw className="mr-2 h-4 w-4" />
            Reload Stats
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={handleResetToDefault}
            className="flex items-center p-2 text-gray-200 focus:text-gray-200"
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Reset to Default
          </DropdownMenuItem>
        </DropdownMenu>
      </div>
      {loadingActiveness ? <Loader fullPage={false} /> :
        (intervalData.length <= 0 ?
          <div className="flex justify-center items-center h-full">
            <p>No data found</p>
          </div>
          :
          <div className="flex flex-row mt-5 gap-5">
            <div className="flex flex-col">
              <div className="text-2xl font-bold">{members}</div>
              <p className="text-xs text-gray-400">Members</p>
              <div className="mt-10 items-center flex flex-col -ml-2">
                <p className="text-xs text-gray-400 -ml-[70px]">Compare</p>
                <div className="flex-row flex">
                  <div
                    className={`flex items-center space-x-1 ${percentage > 0 ? "text-green-500" : "text-red-500"
                      }`}
                  >
                    <ArrowUp className="h-4 w-4" />
                    <span className="text-sm">{percentage}%</span>
                  </div>
                  <span className="text-[13px] ml-2 text-white flex-row flex">
                    vs last month
                  </span>
                </div>
              </div>
            </div>
            <div ref={chartRef} className="w-[200px] h-[200px] -mt-10" />
          </div>)
      }
    </div>
  );
}
