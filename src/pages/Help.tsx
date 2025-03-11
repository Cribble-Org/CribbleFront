import { useState } from "react";
import MobileNav from "../components/Header/NavMenu";
import Sidebar from "../components/Sidebar/Sidebar";


export default function Help() {
  const [currentInterval, setCurrentInterval] = useState(0);
  const [isIntervalSelected, setIsIntervalSelected] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen)

  return (
    <div className="flex h-screen ">
      <div className="hidden lg:block">
        <Sidebar />
      </div>
      <div className="lg:hidden">
      <MobileNav
        currentInterval={currentInterval}
        setCurrentInterval={setCurrentInterval}
        isIntervalSelected={isIntervalSelected}
        setIsIntervalSelected={setIsIntervalSelected}
      />       
      </div>

      <div className="m-auto">
        <p>Coming Soon</p>
      </div>
      
      {/* Main Chat Area */}
      
      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-10 lg:hidden"
          onClick={toggleSidebar}
        />
      )}
    </div>
  )
}

