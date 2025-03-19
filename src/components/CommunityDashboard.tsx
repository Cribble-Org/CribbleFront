import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js'
import { CircleArrowUp, MoreHorizontal } from 'lucide-react'

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

// Chart data
const data = {
  labels: ['Nov 1', 'Nov 2', 'Nov 3', 'Nov 4', 'Nov 5', 'Nov 6'],
  datasets: [
    {
      label: 'Positive',
      data: [15000, 25000, 28000, 34600, 28000, 22000],
      borderColor: '#9efa35',
      backgroundColor: 'rgba(158, 250, 53, 0.1)',
      tension: 0.4,
      fill: true,
    },
    {
      label: 'Negative',
      data: [10000, 20000, 24000, 22000, 18000, 15000],
      borderColor: '#ff6b6b',
      backgroundColor: 'rgba(255, 107, 107, 0.1)',
      tension: 0.4,
      fill: true,
    },
  ],
}

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      mode: 'index' as const,
      intersect: false,
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
      ticks: {
        color: '#666',
      },
    },
    y: {
      grid: {
        display: true,
        color: 'rgba(255, 255, 255, 0.1)',
      },
      ticks: {
        display: false,
      },
    },
  },
  interaction: {
    intersect: false,
  },
}

export default function CommunityDashboard() {
  return (
    <div className="rounded-3xl bg-black p-8 max-w-[350px]  md:max-w-[520px] border-[1px] border-solid border-[#C9C9C9] ">
      <h1 className="mb-8 text-2xl font-semibold text-white font-sora">Community Dashboard</h1>
      
      <div className="mb-8 grid gap-8 grid-cols-2">
        {/* Growth Percentage */}
        <div className='flex flex-col gap-2'>
          <h2 className="text-[12px] md:text-sm text-gray-400">Growth percentage</h2>
          <div className="text-2xl font-bold text-white">73%</div>

          <div className=" hidden md:block ">
            <span className="flex items-center text-sm flex-row ">
              <CircleArrowUp className="h-4 w-4 text-[#9efa35]" />
             <span className='text-[#9efa35] mx-1'>12.8% </span> <span> vs Last month</span>
            </span>
          </div>
        </div>

        {/* Messages Count */}
        <div className='flex flex-col gap-2'>
          <h2 className="text-[12px] md:text-sm text-gray-400 ">Messages, last 30 days</h2>
          <div className="text-2xl font-bold text-white">134.76K</div>

          <div className=" hidden md:block">
            <span className="flex items-center text-sm ">
              <CircleArrowUp className="h-4 w-4 text-[#9efa35]" />
              <span className='text-[#9efa35] mx-1'>   40.6K </span><span> vs Last month</span>
            </span>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="mb-8 h-[300px]">
        <Line options={options} data={data} />
      </div>

      {/* Metrics */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-3 w-3 rounded-full bg-[#9efa35]" />
            <span className=" text-sm md:text-xl text-white">Positive</span>
          </div>
          <div className="flex items-center gap-8">
            <span className="text-sm md:text-xl text-gray-400">110.50K</span>
            <span className="text-sm md:text-xl text-gray-400">82%</span>
            <button className="text-gray-400 hover:text-white">
              <MoreHorizontal className="h-6 w-6" />
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-3 w-3 rounded-full bg-[#ff6b6b]" />
            <span className="text-sm md:text-xl text-white">Negative</span>
          </div>
          <div className="flex items-center gap-8">
            <span className="text-sm md:text-xl text-gray-400">24.25K</span>
            <span className="text-sm md:text-xl text-gray-400">18%</span>
            <button className="text-gray-400 hover:text-white">
              <MoreHorizontal className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

