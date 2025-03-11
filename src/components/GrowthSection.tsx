"use client";

import { Line, Bar } from "react-chartjs-2";
import {  Users, Activity, Timer } from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

const months = [
  "JAN",
  "FEB",
  "MAR",
  "APR",
  "MAY",
  "JUN",
  "JUL",
  "AUG",
  "SEP",
  "OCT",
];
const userData = [
  45000, 52000, 49000, 78500, 62000, 58000, 70000, 68000, 75000, 78500,
];
const retentionData = [30, 45, 25, 60, 35, 50, 40, 55];

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
      ticks: {
        color: "#666",
        maxRotation: 0,
        autoSkip: true,
        maxTicksLimit: 5,
        font: {
          size: 10,
        },
      },
    },
    y: {
      grid: {
        display: false,
      },
      ticks: {
        display: false, // Hide y-axis ticks
      },
    },
  },
};

const lineChartOptions = {
  ...chartOptions,
  elements: {
    line: {
      tension: 0.4,
    },
  },
};

const barChartOptions = {
  ...chartOptions,
  barPercentage: 0.4,
};

export default function GrowthSection() {
  return (
    <section className="container mx-auto px-4 py-12 sm:py-16 md:py-20">
      <div className="text-center mb-8 sm:mb-12">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
          Experience Growth, Amplified
        </h2>
        <p className="text-gray-400 text-base sm:text-lg">
        Unlock your startup's potential with our game-changing benefits
        </p>
      </div>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-2">
        <StatCard
          icon={<Users className="h-6 w-6 sm:h-8 sm:w-8 text-[#9efa35]" />}
          title="What is my product's current audience?"
        />

        <div className="col-span-1 sm:col-span-2 lg:col-span-1">
          <UserStatsCard />
        </div>

        <div className="col-span-1 sm:col-span-2 lg:col-span-1">
          <MonthlyUsersCard />
        </div>

        <StatCard
          icon={<Activity className="h-6 w-6 sm:h-8 sm:w-8 text-[#9efa35]" />}
          title="When and why users disappear?"
        />

        <StatCard
          icon={<Timer className="h-6 w-6 sm:h-8 sm:w-8 text-[#9efa35]" />}
          title="Which users are currently exhibiting the highest retention rate?"
        />

        <div className="col-span-1 sm:col-span-2 lg:col-span-1">
          <UserDetailsCard />
        </div>
      </div>
    </section>
  );
}
interface StatCardProps {
  title: string;
  icon: any;
 
}
function StatCard({ icon, title }: StatCardProps) {
  return (
    <div className="border border-[#1F1F1F] bg-[#0A080E] p-8 rounded-[32px] flex flex-col">
      <div className="flex items-start justify-between">
        <div className="space-y-6">
          <div className="bg-[#1F1F1F] p-4 rounded-2xl inline-block">
            {icon}
          </div>
          <h3 className="text-[32px] leading-[38px] font-medium text-white max-w-[380px]">
            {title}
          </h3>
        </div>
      </div>
    </div>
  );
}
function UserStatsCard() {
  return (
    <div className="border border-[#1F1F1F] bg-[#0A080E] p-6 rounded-2xl">
      <div className="space-y-6">
        <h3 className="text-2xl font-semibold text-white">
          78,50K Users
        </h3>
        <div className="h-[200px]">
          <Bar
            data={{
              labels: Array(8).fill(""),
              datasets: [
                {
                  data: retentionData,
                  backgroundColor: "#9efa35",
                  borderRadius: 6,
                  barPercentage: 0.5,
                  categoryPercentage: 0.5,
                },
              ],
            }}
            options={barChartOptions}
          />
        </div>
      </div>
    </div>
  );
}

function MonthlyUsersCard() {
  return (
    <div className="border border-[#C9C9C9] bg-[#0A080E] p-3 sm:p-4 md:p-6 rounded-xl">
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-xs sm:text-sm text-gray-400">Last year</span>
          <span className="text-base sm:text-lg font-semibold text-white">
            78,50K Users
          </span>
        </div>
        <div className="h-[120px] sm:h-[150px] md:h-[200px]">
          <Line
            data={{
              labels: months,
              datasets: [
                {
                  data: userData,
                  borderColor: "#9efa35",
                  backgroundColor: "rgba(158, 250, 53, 0.1)",
                  fill: true,
                  tension: 0.4,
                  borderWidth: 2,
                  pointRadius: 0,
                  pointHoverRadius: 4,
                },
              ],
            }}
            options={lineChartOptions}
          />
        </div>
      </div>
    </div>
  );
}
function UserDetailsCard() {
  return (
    <div className="space-y-4">
      {[1, 2, 3].map((index) => (
        <div
          key={index}
          className="border border-[#C9C9C9] bg-[#0A080E] p-3 sm:p-4 rounded-xl"
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs sm:text-sm">
              <span className="text-gray-400">{`0${index} - Racer`}</span>
              <span className="text-white">User xJy34.56</span>
            </div>
            <div className="h-[30px]">
              <Line
                data={{
                  labels: Array(10).fill(""),
                  datasets: [
                    {
                      data: Array(10)
                        .fill(0)
                        .map(() => Math.random() * 100),
                      borderColor: "#9efa35",
                      borderWidth: 1.5,
                      pointRadius: 0,
                      tension: 0.4,
                      fill: false,
                    },
                  ],
                }}
                options={{
                  ...lineChartOptions,
                  scales: {
                    x: { display: false },
                    y: { display: false },
                  },
                  plugins: {
                    tooltip: { enabled: false },
                  },
                  maintainAspectRatio: false,
                }}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}