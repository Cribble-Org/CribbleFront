import { useState } from "react";
import ChatSidebar from "../components/Chat";
import ChatInterface from "../components/ChatInterface";
import MobileNav from "../components/Header/NavMenu";
import Sidebar from "../components/Sidebar/Sidebar";
import { SidebarToggle } from "../components/ui/chatBarToggle";


export default function ChatPage() {
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
      <div className={`flex-shrink-0 w-80  fixed inset-y-0 left-0 z-20 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0`}>
        <ChatSidebar />
      </div>
      
      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        <div className="flex items-center p-4  lg:hidden mt-20">
          <SidebarToggle onClick={toggleSidebar} />
        </div>
        <div className="flex-1 overflow-hidden">
          <ChatInterface />
        </div>
      </div>
      
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

