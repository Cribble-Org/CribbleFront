

import * as React from 'react'
import { Slider } from './ui/slider'
import { Toggle } from './ui/toggle'
import { Card, CardContent } from './ui/card'
import { Button } from './ui/button'

export default function PricingSection() {
  const [credits, setCredits] = React.useState(50000)
  const [billingCycle, setBillingCycle] = React.useState<'monthly' | 'annually'>('monthly')

  return (
    <section className="container relative mx-auto px-4 py-20">
      <h2 className="text-4xl font-bold text-center text-white mb-12">
        Plans and Pricing
      </h2>

      <div className="max-w-4xl mx-auto space-y-8">
        {/* Credits Slider and Billing Toggle */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="w-full md:w-2/3 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-white">Member Credits</span>
              <span className="text-white">{credits.toLocaleString()} / month</span>
            </div>
            <Slider
              value={[credits]}
              onValueChange={(value) => setCredits(value[0])}
              max={100000}
              step={10000}
              className="[&_[role=slider]]:bg-[#9efa35]"
            />
          </div>
          
          <div className="flex items-center gap-2 bg-black/40 p-1 rounded-lg">
            <Toggle
              pressed={billingCycle === 'monthly'}
              onPressedChange={() => setBillingCycle('monthly')}
              className="data-[state=on]:bg-[#9efa35] data-[state=on]:text-black"
            >
              Monthly
            </Toggle>
            <Toggle
              pressed={billingCycle === 'annually'}
              onPressedChange={() => setBillingCycle('annually')}
              className="data-[state=on]:bg-[#9efa35] data-[state=on]:text-black"
            >
              Annually
            </Toggle>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {/* Basic Plan */}
          <Card className="bg-[#0A080E] border-0 backdrop-blur">
            <CardContent className="p-6">
              <h3 className="text-[#9efa35] font-bold mb-1">Basic</h3>
              <p className="text-sm text-gray-400 mb-4">20,000 Member Credits</p>
              <div className="mb-6">
                <span className="text-4xl font-bold text-white">$99</span>
                <span className="text-gray-400">/Month</span>
              </div>
              <ul className="space-y-3 text-gray-300">
                <li>• Lorem ipsum doler amite</li>
                <li>• Lorem ipsum dolerAamite</li>
                <li>• Lorem ipsum doler amite</li>
              </ul>
            </CardContent>
            <div className="p-6 pt-0">
              <Button className="w-full bg-white/10 hover:bg-white/20 text-white">
                Get Started
              </Button>
            </div>
          </Card>

          {/* Pro Plan */}
          <Card className="bg-white border-0">
            <CardContent className="p-6">
              <h3 className="text-black font-bold mb-1">Pro</h3>
              <p className="text-sm text-gray-600 mb-4">50,000 Member Credits</p>
              <div className="mb-6">
                <span className="text-4xl font-bold text-black">$199</span>
                <span className="text-gray-600">/Month</span>
              </div>
              <ul className="space-y-3 text-gray-700">
                <li>• Lorem ipsum doler amite</li>
                <li>• Lorem ipsum dolerAamite</li>
                <li>• Lorem ipsum doler amite</li>
                <li>• Lorem ipsum doler amite</li>
              </ul>
            </CardContent>
            <div className="p-6 pt-0">
              <Button className="w-full bg-[#9efa35] hover:bg-[#9efa35]/90 text-black">
                Get Started
              </Button>
            </div>
          </Card>

          {/* Enterprise Plan */}
          <Card className="bg-[#0A080E] border-0 backdrop-blur">
            <CardContent className="p-6">
              <h3 className="text-[#9efa35] font-bold mb-1">Enterprise</h3>
              <p className="text-sm text-gray-400 mb-4">Understand every user</p>
              <div className="mb-6">
                <span className="text-4xl font-bold text-white">Let's Talk!</span>
              </div>
              <ul className="space-y-3 text-gray-300">
                <li>• Lorem ipsum doler amite</li>
                <li>• Lorem ipsum dolerAamite</li>
                <li>• Lorem ipsum doler amite</li>
              </ul>
            </CardContent>
            <div className="p-6 pt-0">
              <Button className="w-full bg-white/10 hover:bg-white/20 text-white">
                Get Started
              </Button>
            </div>
          </Card>
        </div>

        {/* Free Tier */}
        <Card className="bg-[#0A080E] border-0 backdrop-blur">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div>
                <h3 className="text-[#9efa35] font-bold mb-1">Free</h3>
                <p className="text-sm text-gray-400 mb-4">10,000 Member Credits</p>
                <div className="mb-4 md:mb-0">
                  <span className="text-4xl font-bold text-white">$0</span>
                  <span className="text-gray-400">/Month</span>
                </div>
              </div>
              <div className="flex-grow">
                <ul className="space-y-2 text-gray-300">
                  <li>• Lorem ipsum doler amite doler ipsum doler amite</li>
                  <li>• Lorem ipsum doler amite doler ipsum doler amite</li>
                  <li>• Lorem ipsum doler amite doler ipsum doler amite</li>
                </ul>
              </div>
              <Button className="bg-white/10 hover:bg-white/20 text-white whitespace-nowrap">
                Get Started
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

