import { ArrowRight } from "lucide-react";

import { useState } from "react";
import bg1 from "../assets/Images/Frame 663.png";

import bg2 from "../assets/Images/Frame 663 (1).png";
import { Card } from "./ui/card";
import { Button } from "./ui/button";

// Team member data
const teamMembers = [
  {
    id: 1,
    name: "Karmendra Choudhary",
    role: "CEO",
    initial: "M",
    description: `As Head of Marketing at India's largest crypto exchange (5M+ Users), Karmendra stands out with his tech-savvy marketing strategies. His portfolio contains multiple successful web3 projects with a profound understanding of blockchain technology stemming from his background as a software engineer, enabling him to craft uniquely effective campaigns that resonate with the community. His mastery of various digital tools & platforms illustrates his exceptional talent for promoting significant growth and effectively managing the complete growth funnel.`,
    image: bg1,
  },
  {
    id: 2,
    name: "Harsh Raj Singh",
    role: "CTO",
    initial: "H",
    description:
      "Technical leader with extensive experience in blockchain and web3 technologies...",
    image: bg2,
  },
];

// Team member data

("use client");

export default function TeamSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="relative min-h-screen  bg-[url('/topography.svg')] bg-cover bg-center bg-no-repeat px-4 py-20 hidden md:block">
      <div className="mx-auto max-w-7xl text-center">
        <h2 className="mb-4 text-4xl font-bold text-white">
          Meet the Experts Behind Our Team
        </h2>
        <p className="mb-16 text-lg text-gray-400">
          Discover the experienced professionals who comprise our crew.
        </p>

        <div className="grid gap-8 md:grid-cols-2">
          {teamMembers.map((member) => (
            <Card
              key={member.id}
              className="group relative overflow-hidden rounded-[24px] bg-[#000] h-[500px] border-0 "
            >
              <div className="relative aspect-[1.2] h-[400px] w-full rounded-[24px] bg-[#0A080E]  border-[#C9C9C9] border-[1px] border-solid ">
                {/* Background Image */}
                <div className="absolute inset-0 ">
                  <img src={member.image} alt="" className="object-cover h-[400px]" />
                </div>

                {/* Content Container */}
                <div className="relative z-10 h-full p-8">
                  <div className="flex h-full flex-col justify-between">
                    <div>
                      {/* Name and Role */}
                      <div className="absolute bottom-4 left-4 w-[100px]">
                        <h3 className="mb-2 text-3xl font-bold text-white">
                          {member.name}
                        </h3>
                        <p className="text-lg font-medium text-[#9efa35]">
                          {member.role}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Description Overlay */}
                  <div className="absolute right-2 top-2 w-[350px] h-[450px]">
                    <div className="h-full bg-[#0A080E] border-[#C9C9C9] border-solid border-[1px] p-8 rounded-2xl">
                      <p className="mb-6 text-sm leading-relaxed text-white/90">
                        {member.description}
                      </p>
                      <Button
                        variant="ghost"
                        className="text-[#9efa35] hover:text-[#9efa35]/90 hover:bg-transparent"
                      >
                        Visit Me <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Navigation Dots */}
        <div className="mt-20 flex justify-center gap-2">
          {teamMembers.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`h-2 w-2 rounded-full transition-all ${
                activeIndex === index ? "bg-[#9efa35] w-4" : "bg-gray-600"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
