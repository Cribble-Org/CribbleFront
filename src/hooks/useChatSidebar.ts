import { useDispatch } from "react-redux";
import { AppDispatch } from "../config/store";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAccessToken } from "../utility/session";
import { getUserAPI } from "../redux/user/userAPI";
import { getAllChats, getChatChannelWithMessages } from "../redux/chat/chatAPI";

export const useChatSidebar = () => {
  const dispatch = useDispatch<AppDispatch>()

  const [expandedCommunities, setExpandedCommunities] = useState<{ [key: string]: boolean }>({});
  const navigate = useNavigate()

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
    navigate(chatId ? `/chat/${chatId}` : '/chat', { replace: true })
  }

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

  return {
    expandedCommunities,
    toggleExpand,
    expandedSections,
    toggleSection,
    toggleChat
  }
}