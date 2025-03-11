import { useState, useEffect, useRef } from 'react';
import { Search, MoreVertical, Send, ArrowRight } from 'lucide-react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Button } from './ui/button';
import { Input } from './ui/input';
import logo from './../assets/Images/o bg.webp';
import handleAppEvents from '../utility/toast';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../config/store';
import { getChatChannelWithMessages, getChatHistory, initiateChat } from '../redux/chat/chatAPI';
import { SuggestionQuestions } from '../constants/constants';
import { ChatType } from '../types/chatTypes';

export default function ChatInterface() {
  const [message, setMessage] = useState('');
  const [channelName, setChannelName] = useState('Cribble');
  const [currentDateTime, setCurrentDateTime] = useState('');
  const [chatMessages, setChatMessages] = useState<Array<{ role: 'user' | 'assistant'; content: string }>>([]);
  const [loading, setLoading] = useState(false);
  const [channelDetails, setChannelDetails] = useState<ChatType | null>(null);
  const [typingMessage, setTypingMessage] = useState('');
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const typingIntervalRef = useRef<number | null>(null);
  const { userData } = useSelector((state: RootState) => state.userData);

  const dispatch = useDispatch<AppDispatch>()
  const param = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const resetChatsForNew = () => {
    setChatMessages([])
    setChannelName('Cribble')
    setMessage('')
    setLoading(false)
    setTypingMessage('')
    setChannelDetails(null)
  }

  useEffect(() => {
    if (!location?.state?.newChat) {
      if (param?.chatId) {
        dispatch(getChatHistory({ sessionId: param.chatId })).then((response) => {
          if (response.type === "getChatHistory/fulfilled" && response.payload?.success) {
            setChannelDetails(response.payload?.data[0])
            scrollToBottom()
            setChannelName(response.payload?.data[0]?.channelName || "Cribble")
            setChatMessages(response.payload?.data[0]?.messages || [])
            return
          }
          resetChatsForNew()
        })
      } else {
        resetChatsForNew()
      }
    }

    return () => {
      if (param?.chatId) {
        clearTypingInterval();
        if (loading) {
          resetChatsForNew()
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, param?.chatId])

  useEffect(() => {
    const now = new Date();
    setCurrentDateTime(now.toLocaleString('en-US', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    }));
  }, []);

  const checkForTelegramAccount = () => {
    if (!userData?.telegramConnected) {
      handleAppEvents("Connect your telegram account first", "error");
      return false;
    }
    return true;
  };

  const handleSendMessage = async (msg = message) => {
    if (!checkForTelegramAccount()) return; // Stop execution if Telegram is not connected
    scrollToBottom()
    let responseText = ''
    const isNewCommunityChat = userData && userData.allChannels.includes(param.chatId || "")

    if (!msg.trim()) return;
    setChatMessages(prev => [...prev, { role: 'user', content: msg }]);
    setMessage('');

    setLoading(true);

    const params = {
      chatId: channelDetails?._id ?? param?.chatId,
      query: msg,
      chatType: chatMessages.length > 0 ? undefined : (isNewCommunityChat ? "community" : "normal")
    };

    await dispatch(initiateChat(params)).then((response) => {
      if (response.type === "initiateChat/fulfilled") {
        navigate(`/chat/${response?.payload?.data?.chatId}`, { state: { newChat: response?.payload?.data?.newChannel } })
        if (!channelDetails?._id) {
          dispatch(getChatChannelWithMessages())
        }
        responseText = response?.payload?.data?.aiResponse
        animateTyping(responseText);
        return
      }
      handleAppEvents(response.payload.error, "error")
    }).finally(() => {
      setLoading(false);
    })
    setTypingMessage('');
  };

  const animateTyping = (responseText: string = '') => {
    clearTypingInterval(); // Ensure previous animation is cleared
    let index = 0;
    let tempMessage = '';
    setTypingMessage('');

    typingIntervalRef.current = setInterval(() => {
      if (index < responseText.length) {
        tempMessage += responseText.substring(index, index + 5);
        setTypingMessage(tempMessage.trim());
        index += 5;
        scrollToBottom();
      } else {
        clearTypingInterval();
        setChatMessages((prev) => [...prev, { role: 'assistant', content: responseText.trim() }]);
        setTypingMessage('');
        scrollToBottom();
      }
    }, 50);
  };

  const clearTypingInterval = () => {
    if (typingIntervalRef.current) {
      clearInterval(typingIntervalRef.current);
      typingIntervalRef.current = null;
      setTypingMessage('')
    }
  };

  const scrollToBottom = () => {
    setTimeout(() => {
      if (chatContainerRef.current) {
        chatContainerRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }, 30);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !loading) {
      handleSendMessage();
    }
  };

  const handleSuggestionClick = async (question: string) => {
    setMessage(question)
    handleSendMessage(question)
  };

  return (
    <div className="flex flex-col h-screen text-white">
      <header className="lg:flex items-center justify-between px-4 py-3 border-b border-[#252134] hidden">
        <div className="flex items-center gap-3">
          <img src={logo} className="w-10 h-10 rounded-full" />
          <div>
            <h1 className="text-lg font-semibold flex items-center gap-2">
              {channelName} <span className="w-2 h-2 rounded-full bg-green-500"></span>
            </h1>
            <p className="text-xs text-gray-400">Master Bot</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" className="text-gray-400 hover:text-white">
            <Search className="w-5 h-5" />
          </Button>
          <Button variant="ghost" className="text-gray-400 hover:text-white">
            <MoreVertical className="w-5 h-5" />
          </Button>
        </div>
      </header>
      <main className="flex-1 overflow-y-auto p-6">
        <div className="text-center text-gray-400 text-sm mb-8">{currentDateTime}</div>
        <div className="mx-auto space-y-6">
          {chatMessages.map((msg, idx) => (
            <div key={idx} className={msg.role === 'user' ? 'text-right' : 'text-left flex'}>
              {msg.role !== 'user' && <img src={logo} className="w-10 h-10 rounded-full mt-2" />}
              <div
                className={`inline-block max-w-[80%] p-3 rounded-lg ${msg.role === 'user' ? 'bg-[#2A2A3C]' : ''}`}
                style={{ fontFamily: '"Inter", sans-serif' }} // Apply font family
              >
                <div
                  className="text-white font-jakartaSans" // Adjust text size and spacing
                  dangerouslySetInnerHTML={{
                    __html: msg.content.replace(/\n/g, "<br/>").replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
                  }}
                />
              </div>
            </div>
          ))}
          {typingMessage && (
            <div className='text-left flex'>
              <img src={logo} className="w-10 h-10 rounded-full mt-2" />
              <div
                className={`inline-block max-w-[80%] p-3 rounded-lg`}
                style={{ fontFamily: '"Inter", sans-serif' }} // Apply font family
              >
                <div
                  className="text-white font-jakartaSans"
                  dangerouslySetInnerHTML={{
                    __html: typingMessage.replace(/\n/g, "<br/>").replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
                  }}
                />
              </div>
            </div>
          )}
          {loading && (
            <div className='text-left flex'>
              <img src={logo} className="w-10 h-10 rounded-full mt-2" />
              <div className="inline-block max-w-[80%] p-3 rounded-lg bg-gray-700 animate-pulse">
                <div className="text-white">Thinking...</div>
              </div>
            </div>
          )}
          <div ref={chatContainerRef} />
        </div>
        {chatMessages.length === 0 && (
          <div className='max-w-3xl mx-auto mt-40'>
            <h2 className="text-2xl font-semibold mb-6">What can I help with?</h2>
            <div className="grid grid-cols-2 gap-4">
              {SuggestionQuestions.map((question, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestionClick(question)}
                  className="flex items-center justify-between p-4 bg-[#15131D] rounded-lg hover:bg-[#2A2A3C]/80 transition-colors text-left group"
                >
                  <span className="text-sm text-gray-300">{question}</span>
                  <ArrowRight className="w-4 h-4 text-gray-500 group-hover:text-white transition-colors" />
                </button>
              ))}
            </div>
          </div>
        )}
      </main>


      <footer className="border-t border-[#252134] p-4">
        <div className="mx-auto flex items-center gap-2 bg-[#15131D] rounded-lg p-4">
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => !(loading || typingMessage.length > 0) && handleKeyDown(e)}
            placeholder="Send Your Message..."
            className="flex bg-transparent border-0 py-2 text-white placeholder:text-gray-400 outline-none"
          />
          <button onClick={() => handleSendMessage()} disabled={loading || typingMessage.length > 0}>
            <Send className={`w-4 h-4 ${(loading || typingMessage.length > 0) ? 'text-gray-400' : 'text-[#B3FF53]'}`} />
          </button>
        </div>
      </footer>
    </div>
  );
}
