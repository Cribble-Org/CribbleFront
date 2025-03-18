import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../config/store";
import { useEffect, useState } from "react";
import { getAccessToken } from "../utility/session";
import { getUserAPI } from "../redux/user/userAPI";
import { getAllChats, getChatChannelWithMessages } from "../redux/chat/chatAPI";
import { AI_BOT_URL } from "../constants/constants";

export const useChatSidebar = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { chatList, chatHistory } = useSelector((state: RootState) => state.chatData);

  const [expandedCommunities, setExpandedCommunities] = useState<{ [key: string]: boolean }>({});
  const navigate = useNavigate()

  useEffect(() => {
    if (getAccessToken()) {
      dispatch(getUserAPI())
    }
  }, [dispatch])

  useEffect(() => {
    dispatch(getChatChannelWithMessages())
  }, [dispatch])

  useEffect(() => {
    dispatch(getAllChats())
  }, [dispatch])

  const toggleExpand = (id: string) => {
    setExpandedCommunities((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const [expandedSections, setExpandedSections] = useState<{ [key: string]: boolean }>({
    pinned: true,
    communities: true
  })

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }

  const toggleChat = (chatId?: string) => {
    navigate(chatId ? `/chat/${chatId}` : chatId === AI_BOT_URL ? `/chat/${chatId}` : '/chat', { replace: true })
  }

  const handleBotClick = () => {
    const chatId = (chatHistory.filter((chat) => chat.chatType === AI_BOT_URL)[0]?.chatType) || AI_BOT_URL
    toggleChat(chatId)
  }

  return {
    expandedCommunities,
    toggleExpand,
    expandedSections,
    toggleSection,
    toggleChat,
    handleBotClick,
    chatList,
    chatHistory
  }
}