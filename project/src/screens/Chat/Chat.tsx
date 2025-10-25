import { useState, useEffect } from "react";
import { Input } from "../../components/ui/input";
import { ScrollArea } from "../../components/ui/scroll-area";
import { Hash, Volume2, Send, Plus, Smile, Gift, Paperclip } from "lucide-react";

interface Server {
  id: string;
  name: string;
  icon: string;
}

interface Channel {
  id: string;
  name: string;
  type: "text" | "voice";
}

interface Message {
  id: string;
  author: string;
  avatar: string;
  content: string;
  timestamp: string;
}

interface ChatProps {
  server: Server;
}

const mockChannels: Channel[] = [
  { id: "1", name: "general", type: "text" },
  { id: "2", name: "announcements", type: "text" },
  { id: "3", name: "random", type: "text" },
  { id: "4", name: "General Voice", type: "voice" },
  { id: "5", name: "Gaming", type: "voice" },
];

const mockMessages: Message[] = [
  {
    id: "1",
    author: "Sophie Fortune",
    avatar: "/user-profil.png",
    content: "Hey everyone! Welcome to the server 👋",
    timestamp: "Today at 10:30 AM",
  },
  {
    id: "2",
    author: "Anne Couture",
    avatar: "/user-profil-1.png",
    content: "Thanks! Excited to be here!",
    timestamp: "Today at 10:32 AM",
  },
  {
    id: "3",
    author: "Miriam Soleil",
    avatar: "/polygon-1-1.png",
    content: "This looks amazing! Great work on the setup.",
    timestamp: "Today at 10:35 AM",
  },
];

export const Chat = ({ server }: ChatProps): JSX.Element => {
  const [activeChannel, setActiveChannel] = useState(mockChannels[0]);
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [messageInput, setMessageInput] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  const handleSendMessage = () => {
    if (!messageInput.trim()) return;
    const newMessage: Message = {
      id: Date.now().toString(),
      author: "You",
      avatar: "/user-profil.png",
      content: messageInput,
      timestamp:
        "Today at " +
        new Date().toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
        }),
    };
    setMessages([...messages, newMessage]);
    setMessageInput("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex justify-center items-center h-screen w-screen bg-gradient-to-br from-[#b5caff] via-[#a7bdfc] to-[#c6d6ff] dark:from-[#0b0f17] dark:via-[#121827] dark:to-[#0d111a] text-gray-800 dark:text-gray-100 overflow-hidden">
      <div className="flex h-[95vh] w-full max-w-[1400px] scale-[0.95] rounded-2xl overflow-hidden shadow-xl backdrop-blur-xl bg-white/10 dark:bg-[#1b1f2e]/10 border border-white/10">
        
        {/* Sidebar */}
        <aside className="w-56 flex-shrink-0 backdrop-blur-md bg-white/20 dark:bg-[#1b1f2e]/30 border-r border-white/10 dark:border-white/10 flex flex-col">
          <div className="h-12 flex items-center justify-between px-4 border-b border-white/10 dark:border-white/10">
            <h2 className="font-semibold truncate text-gray-900 dark:text-gray-100">{server.name}</h2>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="text-base text-gray-700 dark:text-gray-200 hover:scale-110 transition"
            >
              {darkMode ? "☀️" : "🌙"}
            </button>
          </div>

          <ScrollArea className="flex-1 p-3">
            <div className="space-y-4">
              <div>
                <span className="text-xs uppercase tracking-wider text-gray-600 dark:text-gray-400 mb-2 block">Text Channels</span>
                {mockChannels
                  .filter((ch) => ch.type === "text")
                  .map((ch) => (
                    <button
                      key={ch.id}
                      onClick={() => setActiveChannel(ch)}
                      className={`w-full flex items-center gap-2 px-2 py-1.5 rounded-md transition text-sm
                        ${
                          activeChannel.id === ch.id
                            ? "bg-white/50 dark:bg-white/10 text-blue-600 dark:text-blue-300 font-medium"
                            : "hover:bg-white/30 dark:hover:bg-white/5 text-gray-700 dark:text-gray-300"
                        }`}
                    >
                      <Hash className="w-4 h-4 opacity-70" />
                      {ch.name}
                    </button>
                  ))}
              </div>

              <div>
                <span className="text-xs uppercase tracking-wider text-gray-600 dark:text-gray-400 mb-2 block">Voice Channels</span>
                {mockChannels
                  .filter((ch) => ch.type === "voice")
                  .map((ch) => (
                    <div
                      key={ch.id}
                      className="flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-white/30 dark:hover:bg-white/5 text-sm text-gray-700 dark:text-gray-300"
                    >
                      <Volume2 className="w-4 h-4 opacity-70" />
                      {ch.name}
                    </div>
                  ))}
              </div>
            </div>
          </ScrollArea>
        </aside>

        {/* Main Chat */}
        <main className="flex-1 flex flex-col">
          <header className="h-12 flex items-center px-5 border-b border-white/10 dark:border-white/10 backdrop-blur-md bg-white/20 dark:bg-[#1b1f2e]/20">
            <Hash className="w-4 h-4 text-gray-500 dark:text-gray-400 mr-2" />
            <h3 className="font-semibold text-gray-800 dark:text-gray-100 text-sm">{activeChannel.name}</h3>
          </header>

          <ScrollArea className="flex-1 p-4 overflow-y-auto">
            <div className="space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className="flex gap-3 items-start p-3 rounded-xl backdrop-blur-md bg-white/30 dark:bg-white/10 hover:shadow-md transition"
                >
                  <img src={msg.avatar} alt={msg.author} className="w-8 h-8 rounded-full" />
                  <div>
                    <div className="flex items-baseline gap-2 mb-0.5">
                      <span className="font-medium text-gray-900 dark:text-gray-100 text-sm">{msg.author}</span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">{msg.timestamp}</span>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 text-[14px] leading-snug">{msg.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          <footer className="p-3 backdrop-blur-md bg-white/20 dark:bg-[#1b1f2e]/20 border-t border-white/10 dark:border-white/10 flex items-center gap-2">
            <button className="p-1.5 rounded-full hover:bg-white/30 dark:hover:bg-white/10 transition">
              <Plus className="w-4 h-4 text-gray-600 dark:text-gray-300" />
            </button>
            <Input
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={`Message #${activeChannel.name}`}
              className="flex-1 bg-white/50 dark:bg-white/10 border-none rounded-lg text-[14px] text-gray-800 dark:text-gray-100 focus-visible:ring-0"
            />
            <div className="flex items-center gap-1.5">
              {[Gift, Paperclip, Smile].map((Icon, i) => (
                <button key={i} className="p-1.5 rounded-full hover:bg-white/30 dark:hover:bg-white/10 transition text-gray-600 dark:text-gray-300">
                  <Icon className="w-4 h-4" />
                </button>
              ))}
              <button
                onClick={handleSendMessage}
                className="p-2 bg-gradient-to-br from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white rounded-lg shadow transition"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
};
