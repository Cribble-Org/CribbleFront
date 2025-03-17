import logo from "./../assets/Images/o bg.webp";

import { Search, Settings, ChevronDown, ChevronRight, X, Pencil, ArrowRight } from 'lucide-react'
import Avatar from './Avatar';
import { useParams } from 'react-router-dom';
import { useChatSidebar } from '../hooks/useChatSidebar';
import { AI_BOT_URL } from "../constants/constants";

interface ChatSidebarProps {
  onClose?: () => void
}
export default function ChatSidebar({ onClose }: ChatSidebarProps) {
  const { expandedCommunities, expandedSections, toggleChat, toggleExpand, toggleSection, handleBotClick, chatList, chatHistory } = useChatSidebar()
  const param = useParams()

  return (
    <div className="w-80  text-white h-screen flex flex-col bg-black lg:bg-transparent ">
      {/* Header */}
      <div className="p-4 flex items-center justify-between border-b border-[#252134] mt-8 lg:mt-0">
        <h1 className="text-xl font-semibold hidden lg:block ">Chats</h1>
        <div className="flex gap-2">
          <button className="p-2 bg-[#252134] rounded-lg hidden lg:block">
            <Search className="w-5 h-5 text-gray-400" />
          </button>
          <button className="p-2 bg-[#252134] rounded-lg hidden lg:block">
            <Settings className="w-5 h-5 text-gray-400" />
          </button>
          {onClose && (
            <button
              onClick={onClose}
              className="lg:hidden"
              aria-label="Close sidebar"
            >
              <X className="h-6 w-6" />
            </button>
          )}
        </div>
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto border-r border-[#252134] ">
        {/* Pinned Section */}
        <div className="px-2 py-1">
          <button
            className="w-full flex items-center justify-between gap-2 px-2 py-1 rounded-lg cursor-default"
          >
            <div
              onClick={() => toggleSection("pinned")}
              className="flex items-center gap-2 cursor-pointer">
              {expandedSections.pinned ? (
                <ChevronDown className="w-4 h-4" />
              ) : (
                <ChevronRight className="w-4 h-4" />
              )}
              <span className="text-sm text-gray-400">Pinned</span>
            </div>
            <Pencil
              onClick={() => toggleChat()}
              className="w-4 h-4 text-gray-400 cursor-pointer" />
          </button>

          {expandedSections.pinned && (
            <div className="space-y-1 mt-1">
              <div className="bg-[#15131D] rounded-lg">
                <button
                  className={`w-full flex items-center gap-3 px-1 py-2 rounded-lg rounded-lg ${
                    param.chatId === AI_BOT_URL  ? "bg-[#252134]" : "bg-[#15131D]" }`} onClick={handleBotClick} >
                  <div className="w-10 h-10 flex items-center justify-center rounded-full">
                    <img
                      src={logo}
                      className="w-10 h-10 rounded-full flex items-center justify-center"
                    />
                  </div>
                  <div className="flex-1 text-left">
                    <div className="text-sm">Cribby AI Bot</div>
                  </div>
                </button>
              </div>
              {chatHistory
                .filter((chat) => chat.chatType === "normal")
                .map((chat) => (
                  <div key={chat._id} className="bg-[#15131D] rounded-lg">
                    <button
                      onClick={() => toggleChat(chat._id)}
                      className={`w-full flex items-center gap-3 px-1 py-2 rounded-lg ${param.chatId === chat._id ? "bg-[#252134]" : "bg-[#15131D]"
                        }`}
                    >
                      <Avatar name={chat.channelName} />
                      <div className="flex-1 text-left">
                        <div className="text-sm">{chat.channelName}</div>
                      </div>
                      {chat.messages && chat.messages.length > 0 &&
                        <ChevronDown
                          onClick={() => toggleExpand(chat._id)}
                          className={`w-5 h-5 bg-[#252134] rounded-full p-1 transition-transform ${expandedCommunities[chat._id] ? "rotate-180" : ""
                            }`}
                        />
                      }
                    </button>
                    {/* Extended Chat Section */}
                    {expandedCommunities[chat._id] && (
                      <div className="mt-1 ml-12 space-y-1">
                        {chat.messages.map((message, index) => (
                          <button
                            key={index}
                            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-gray-300"
                            onClick={() => toggleExpand(chat._id)}
                          >
                            <ArrowRight className="w-4 h-4 flex-shrink-0" />
                            <span title={message.message} className="truncate text-left">{message.content}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
            </div>
          )}
        </div>

        {/* Communities Section */}
        <div className="px-2 py-1">
          <button
            onClick={() => toggleSection('communities')}
            className="w-full flex items-center gap-2 px-2 py-1  rounded-lg"
          >
            {expandedSections.communities ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
            <span className="text-sm text-gray-400">All Communities</span>
          </button>

          {expandedSections?.communities && (
            <div className="space-y-1 mt-1 ">
              {chatList.map((community) => (
                <div key={community.id}>
                  <button
                    className={`w-full flex items-center gap-3 px-1 py-2 rounded-lg ${param.chatId && (param.chatId === community?.id || param.chatId === community?.chatId)
                      ? 'bg-[#252134]'
                      : 'bg-[#15131D]'
                      }`} onClick={() => toggleChat(community.id)}
                  >
                    <Avatar name={community.title} />
                    <div className="flex-1 text-left">
                      <div className="text-sm">{community.title}</div>
                    </div>
                    {community.messages.length > 0 &&
                      <ChevronDown
                        onClick={() => toggleExpand(community.id)}
                        className={`w-5 h-5 bg-[#252134] rounded-full p-1 transition-transform ${expandedCommunities[community.id] ? "rotate-180" : ""
                          }`}
                      />
                    }
                  </button>

                  {/* Extended Chat Section */}
                  {expandedCommunities[community.id] && (
                    <div className="mt-1 ml-12 space-y-1">
                      {community.messages.map((message, index) => (
                        <button
                          key={index}
                          className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-gray-300"
                          onClick={() => toggleExpand(community.id)}
                        >
                          <ArrowRight className="w-4 h-4 flex-shrink-0" />
                          <span title={message.message} className="truncate text-left">{message.content}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

