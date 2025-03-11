import { motion, Variants } from "framer-motion";
import CommunityDashboard from "../components/CommunityDashboard";
import background from '../assets/Images/bg-side.svg';
import bg from '../assets/Images/bg-side-left.svg'
import background1 from "../assets/Images/Background (2).png";
import Header from "../components/Header/Header";
import { Card, CardContent } from "../components/ui/card";
import GrowthSection from "../components/GrowthSection";
import globe from "../assets/Images/Globe.png";
import TestimonialCard from "../components/TestimonialCard";
import image from "../assets/Images/icon.png";
import Footer from "../components/Footer/Footer";
import PricingSection from "../components/Pricing";
import TeamSection from "../components/TeamSection";
import MobileNav from "../components/Header/NavMenu";
import CirclePage from "../components/circleSection";
import TabSection from "../components/WhoIsIt";
import bgsection1 from "../assets/Images/Binary_001 (4).webp";
import bgsection2 from "../assets/Images/Binary_001 (3).webp";
import { useState } from "react";


// Animation Variants
const fadeInUp: Variants = {
  initial: { opacity: 0, y: 60 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6 }
  }
};

const staggerContainer: Variants = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const heroTextVariants: Variants = {
  initial: { opacity: 0, y: 100 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.8,
      staggerChildren: 0.2
    }
  }
};

export default function LandingPage() {
  const [currentInterval, setCurrentInterval] = useState(0);
  const [isIntervalSelected, setIsIntervalSelected] = useState(false);
  return (
    <motion.div
      initial="initial"
      animate="animate"
      className="relative overflow-x-hidden"
    >
      {/* Mobile/Desktop Navigation */}
      <div className="md:hidden">
      <MobileNav
        currentInterval={currentInterval}
        setCurrentInterval={setCurrentInterval}
        isIntervalSelected={isIntervalSelected}
        setIsIntervalSelected={setIsIntervalSelected}
      />          </div>
      <div className="hidden md:block">
        <Header />
      </div>

      {/* Main Content */}
      <div className="relative min-h-screen bg-black">
        {/* Hero Section */}
        <section className="relative">
          {/* Background Images */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0 overflow-hidden"
          >
            <motion.img
              initial={{ opacity: 0, x: 100, rotate: -5, scale: 0.8 }}
              animate={{ 
                opacity: [0, 0.5, 1],
                x: 0,
                rotate: 0,
                scale: 1
              }}
              transition={{ 
                duration: 2,
                ease: "easeOut"
              }}
              whileHover={{ 
                scale: 1.05,
                rotate: -2,
                filter: "brightness(1.2)",
                transition: { duration: 0.3 }
              }}
              src={background}
              alt="Background pattern"
              className="absolute object-cover right-0 top-[-6rem] animate-float"
            />
            
            <motion.img
              initial={{ opacity: 0, x: 100, rotate: 5, scale: 0.8 }}
              animate={{ 
                opacity: [0, 0.5, 1],
                x: 0,
                rotate: 0,
                scale: 1
              }}
              transition={{ 
                duration: 2,
                delay: 0.3,
                ease: "easeOut"
              }}
              whileHover={{ 
                scale: 1.05,
                rotate: 2,
                filter: "brightness(1.2)",
                transition: { duration: 0.3 }
              }}
              drag
              dragConstraints={{
                top: -50,
                left: -50,
                right: 50,
                bottom: 50
              }}
              dragElastic={0.2}
              whileDrag={{ scale: 1.1 }}
              src={bg}
              alt="Background pattern"
              className="absolute object-cover right-[9rem] top-[-8rem] animate-float-delayed"
            />
          </motion.div>

          {/* Hero Content */}
          <div className="container relative mx-auto px-4 py-20 max-w-[95vw]">
            <motion.div 
              variants={staggerContainer}
              className="grid items-center lg:grid-cols-5 gap-12"
            >
              {/* Left Column */}
              <motion.div 
                variants={fadeInUp}
                className="space-y-8 col-span-3"
              >
                <motion.h1 
                  variants={heroTextVariants}
                  className="text-5xl font-bold leading-tight text-white md:text-7xl lg:text-8xl font-sora"
                >
                  {["Atomic", "Analytics that", "Matter"].map((text, i) => (
                    <motion.span
                      key={i}
                      variants={{
                        initial: { opacity: 0, y: 50 },
                        animate: { 
                          opacity: 1, 
                          y: 0,
                          transition: { duration: 0.5, delay: i * 0.2 }
                        }
                      }}
                      className="block"
                    >
                      {text}
                    </motion.span>
                  ))}
                </motion.h1>

                <motion.p
                  variants={fadeInUp}
                  className="text-lg text-[#ADA8C3]"
                >
                  Powerful community analytics to help you <br/>
                  convert, engage, and retain more users.
                </motion.p>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 text-lg font-semibold rounded-lg bg-[#9efa35] text-black hover:bg-[#9efa35]/90 transition"
                >
                  Get Started For Free
                </motion.button>
              </motion.div>

              {/* Right Column - Dashboard */}
              <motion.div
                className="flex justify-end col-span-2"
                initial={{ opacity: 0, scale: 0.8, y: 50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                  className="relative z-10 w-[32rem]"
                >
                  <CommunityDashboard />
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        <section className="container relative mx-auto px-4  py-10  max-w-[95vw]">
          <div className="grid items-start gap-12 lg:grid-cols-2">
            {/* Left Column - Content */}
            <div className="space-y-6">
              <h2 className="text-4xl font-bold leading-tight text-white md:text-5xl lg:text-7xl">
                Taming The Messaging Giants : Harnessing the Power of Billion
              </h2>
              <p className="lg:text-2xl text-lg text-gray-400">
                Active users like founders, investors and (KOLs) influencers
                manage hundreds of groups, highlighting the need for tools to
                simplify, analyze, and extract insights from overwhelming
                message volumes efficiently.
              </p>
            </div>

            {/* Right Column - Stats Grid */}
            <div className="grid gap-6 sm:grid-cols-2">
              <Card className="bg-[#0A080E] border-[#C9C9C9] border-solid border-[1px] backdrop-blur rounded-[20px] py-10">
                <CardContent className="p-6">
                  <div className="space-y-2 ">
                    <h3 className="text-4xl font-bold text-white">900M</h3>
                    <p className="text-sm text-gray-400">Telegram Users</p>
                  </div>
                </CardContent>
              </Card>

              <Card className=" bg-black/40  border-[#C9C9C9] border-solid border-[1px] backdrop-blur rounded-[20px] py-10">
                <CardContent className="p-6">
                  <div className="space-y-2">
                    <h3 className="text-4xl font-bold text-white">15B+</h3>
                    <p className="text-sm text-gray-400">Daily Messages</p>
                  </div>
                </CardContent>
              </Card>

              <Card className=" bg-black/40  border-[#C9C9C9] border-solid border-[1px] backdrop-blur rounded-[20px] py-10">
                <CardContent className="p-6">
                  <div className="space-y-2">
                    <h3 className="text-4xl font-bold text-white">100+</h3>
                    <p className="text-sm text-gray-400">
                      Communities on average per Web3 User
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-[#C9C9C9] border-solid border-[1px]  rounded-[20px] py-10 bg-black/40 backdrop-blur">
                <CardContent className="p-6">
                  <div className="space-y-2">
                    <h3 className="text-4xl font-bold text-white">80%</h3>
                    <p className="text-sm text-gray-400">
                      Messages gets Forgotten
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          <img src={background1} className="absolute top-40 -ml-10 left-0 " />
        </section>

        <section className="mt-5 px-4  py-5">
        <CirclePage/>
        </section>
       <TabSection/>
        <section className="">
          {/* <img src={background2} className="absolute ml-50 max-h-sm max-w-lg   " /> */}
          <GrowthSection />
        </section>
        <section className="container relative mx-auto px-4 py-10 mt-[450px]">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white md:text-7xl mb-6">
              Used by a large number of users <br /> around the world
            </h2>
            <p className="text-gray-400 text-lg md:text-2xl">
              Discover what our customers have to say about us.
            </p>
            <div className="mt-12">
              <img
                src={globe}
                alt="Globe"
                className="mx-auto w-[80%] md:w-[60%] lg:w-[50%] opacity-90"
              />
            </div>
          </div>

          {/* Testimonials Section */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <TestimonialCard
              quote="Saved us time and effort!"
              content="Monitoring sentiment across multiple platforms used to be a nightmare. Now, the bot does it for us in real-time, pinpointing exactly what to improve."
              author="Ethan Nguyen"
              role="Social Media Strategist"
              image={image}
            />
            <TestimonialCard
              quote="A game-changer for startups."
              content="As a founder, I love the ‘Founder Mode.’ It delivers precise analytics and actionable insights tailored to our project. It's like having a data scientist on the team 24/7."
              author="Sharry Lane"
              role="Founder"
              image={image}
            />
            <TestimonialCard
              quote="Revolutionized our community management!"
              content="Cribble gave us instant insights into why our growth had plateaued. Within weeks of implementing its recommendations, our engagement rate surged by 40%!"
              author="Elliot Gray"
              role="Community Manager"
              image="/placeholder.svg?height=48&width=48"
            />
          </div>
        </section>
 

          <PricingSection/>
          {/* <img src={background3} className="-mt-[700px] "/> */}

      
          <TeamSection/>
          <section className="relative overflow-hidden bg-[#9eff00] rounded-[32px] px-6 py-20 md:py-30 mx-10">
      {/* Left decorative pattern */}
      <div className="absolute left-0 top-0 w-1/3 h-full opacity-30">
        <img src={bgsection1} className="absolute top-0"/>
      </div>

      {/* Right decorative pattern */}
      <div className="absolute right-0 top-0 w-1/3 h-full opacity-30">
       <img src={bgsection2} className="absolute bottom-0"/>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-black mb-8 leading-tight">
          Big data analytics
          <br />
          will be used to develop
          <br />
          a thorough understanding
          <br />
          of our customers
        </h2>
        <button
          className="bg-black text-white hover:bg-black/90 text-lg px-10 py-4 h-auto rounded-xl"
        >
          Take a Tour
        </button>
      </div>
    </section>
     
        <Footer />

      </div>

    </motion.div>
  );
}
