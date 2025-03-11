import background3 from "../assets/Images/Background (3).webp"

import { ArrowRight } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Card, CardContent } from './ui/card'

const tabData = {
  founder: [
    {
      title: "Founder Feature 1",
      feature: "Startup Insights",
      description: "Access to valuable startup metrics and analytics",
      isLarge: true
    },
    {
      title: "Founder Feature 2",
      feature: "Networking Opportunities",
      description: "Connect with potential investors and partners",
      isLarge: false
    }
  ],
  investor: [
    {
      title: "Investor Feature 1",
      feature: "Deal Flow Management",
      description: "Efficiently manage and track investment opportunities",
      isLarge: true
    },
    {
      title: "Investor Feature 2",
      feature: "Portfolio Analytics",
      description: "In-depth analysis of your investment portfolio",
      isLarge: false
    }
  ],
  user: [
    {
      title: "User Feature 1",
      feature: "Product Discovery",
      description: "Discover innovative products and services",
      isLarge: true
    },
    {
      title: "User Feature 2",
      feature: "Community Engagement",
      description: "Participate in discussions and provide feedback",
      isLarge: false
    }
  ]
}

export default function TabSection() {
  return (
    <section className="relative px-4 py-10 sm:py-16 md:py-20">
      <div className="absolute inset-0 " />
      <img src={background3} className="absolute right-0" />
      <div className="relative max-w-7xl mx-auto">
        <h2 className="mb-8 sm:mb-12 text-center text-3xl sm:text-4xl md:text-5xl font-bold text-white">
          Who is it for?
        </h2>

        {/* Tabs List */}
        <Tabs defaultValue="founder">
          <div className="max-w-lg mx-auto">
            <TabsList className="grid w-full grid-cols-3 bg-[#15131D] p-1 rounded-xl">
              <TabsTrigger
                value="founder"
                className="data-[state=active]:bg-[#9efa35] data-[state=active]:text-black rounded-lg text-sm sm:text-base text-white"
              >
                Founder
              </TabsTrigger>
              <TabsTrigger
                value="investor"
                className="data-[state=active]:bg-[#9efa35] data-[state=active]:text-black rounded-lg text-sm sm:text-base text-white"
              >
                Investor
              </TabsTrigger>
              <TabsTrigger
                value="user"
                className="data-[state=active]:bg-[#9efa35] data-[state=active]:text-black rounded-lg text-sm sm:text-base text-white"
              >
                User
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Tabs Content */}
          {Object.entries(tabData).map(([key, items]) => (
            <TabsContent key={key} value={key} className="mt-8 sm:mt-12">
              <div className="w-full px-4 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {items.map((item, index) => (
                    <FeatureCard key={index} {...item} />
                  ))}
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
}
interface FeatureCardProps {
  title: string
  feature: string
  description: string
  isLarge: boolean
}
function FeatureCard({ title, feature, description, isLarge }: FeatureCardProps) {
  return (
    <Card
      className={`bg-[#0A080E] border-[#C9C9C9] rounded-3xl  ${
        isLarge ? "md:col-span-2" : "md:col-span-1"
      }`}
    >
      <CardContent className="p-6">
        <div className="h-full flex flex-col justify-between">
          <div className="space-y-[100px]">
            <h3 className="text-xl sm:text-2xl font-bold text-white">{title}</h3>
            <p className="text-[#9efa35] text-sm">{feature}</p>
            <p className="text-white text-lg">{description}</p>
          </div>
          <a
            href="#"
            className="inline-flex items-center text-[#9efa35] hover:text-[#9efa35]/90 text-sm sm:text-base mt-4"
          >
            More
            <ArrowRight className="ml-2 h-4 w-4" />
          </a>
        </div>
      </CardContent>
    </Card>
  );
}


