import { useState } from "react";
import { Input } from "../../components/ui/input";
import { ScrollArea } from "../../components/ui/scroll-area";
import { Button } from "../../components/ui/button";
import { useAccount } from "wagmi";
import { useCheckMembership } from "../../lib/contracts";
import {
  Hash,
  Volume2,
  Send,
  Plus,
  Smile,
  Gift,
  Paperclip,
  TrendingUp,
} from "lucide-react";

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
  isStaked?: boolean;
}

interface ChatProps {
  server: Server;
  onOpenStakingModal: () => void;
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
    isStaked: true,
  },
  {
    id: "2",
    author: "Anne Couture",
    avatar: "/user-profil-1.png",
    content: "Thanks! Excited to be here!",
    timestamp: "Today at 10:32 AM",
    isStaked: false,
  },
  {
    id: "3",
    author: "Miriam Soleil",
    avatar: "/polygon-1-1.png",
    content: "This looks amazing! Great work on the setup.",
    timestamp: "Today at 10:35 AM",
    isStaked: true,
  },
];

export const Chat = ({
  server,
  onOpenStakingModal,
}: ChatProps): JSX.Element => {
  const { address } = useAccount();
  const { isMember } = useCheckMembership(server.id);
  const [activeChannel, setActiveChannel] = useState(mockChannels[0]);
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [messageInput, setMessageInput] = useState("");

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
    <div className="flex h-full w-full bg-transparent overflow-hidden">
      <div className="flex h-full w-full overflow-hidden">
        {/* Sidebar */}
        <aside className="w-[280px] flex-shrink-0 backdrop-blur-xl bg-white/5 border-r border-white/10 flex flex-col overflow-hidden">
          <div className="h-[60px] flex items-center justify-between px-6 border-b border-white/10 flex-shrink-0">
            <h2 className="[font-family:'Lato',Helvetica] font-bold text-white text-[17px] truncate">
              {server.name}
            </h2>
          </div>

          <ScrollArea className="flex-1 px-4 py-6 overflow-y-auto">
            <div className="space-y-6">
              <div>
                <span className="[font-family:'Lato',Helvetica] font-normal text-[#ffffff8c] text-[15px] mb-2 block">
                  TEXT CHANNELS
                </span>
                <div className="space-y-1">
                  {mockChannels
                    .filter((ch) => ch.type === "text")
                    .map((ch) => (
                      <button
                        key={ch.id}
                        onClick={() => setActiveChannel(ch)}
                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-300
                          ${
                            activeChannel.id === ch.id
                              ? "bg-white/10 backdrop-blur-sm shadow-lg"
                              : "bg-transparent hover:bg-white/5"
                          }`}
                      >
                        <Hash
                          className={`w-5 h-5 ${
                            activeChannel.id === ch.id
                              ? "text-white"
                              : "text-white/60"
                          }`}
                        />
                        <span
                          className={`[font-family:'Lato',Helvetica] text-[15px] ${
                            activeChannel.id === ch.id
                              ? "font-semibold text-white"
                              : "font-normal text-white/80"
                          }`}
                        >
                          {ch.name}
                        </span>
                      </button>
                    ))}
                </div>
              </div>

              <div>
                <span className="[font-family:'Lato',Helvetica] font-normal text-[#ffffff8c] text-[15px] mb-2 block">
                  VOICE CHANNELS
                </span>
                <div className="space-y-1">
                  {mockChannels
                    .filter((ch) => ch.type === "voice")
                    .map((ch) => (
                      <div
                        key={ch.id}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-white/5 transition-all duration-300 cursor-pointer"
                      >
                        <Volume2 className="w-5 h-5 text-white/60" />
                        <span className="[font-family:'Lato',Helvetica] font-normal text-white/80 text-[15px]">
                          {ch.name}
                        </span>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </ScrollArea>
        </aside>

        {/* Main Chat */}
        <main className="flex-1 flex flex-col bg-transparent overflow-hidden min-h-0">
          <header className="h-[60px] flex items-center justify-between px-6 border-b border-white/10 backdrop-blur-xl bg-white/5 flex-shrink-0">
            <div className="flex items-center">
              <Hash className="w-5 h-5 text-white/60 mr-2" />
              <h3 className="[font-family:'Lato',Helvetica] font-bold text-white text-[17px]">
                {activeChannel.name}
              </h3>
            </div>
            {!isMember && address && (
              <Button
                onClick={onOpenStakingModal}
                className="h-9 px-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white text-sm font-semibold rounded-lg flex items-center gap-2"
              >
                <TrendingUp className="w-4 h-4" />
                Stake to Support
              </Button>
            )}
            {isMember && (
              <div className="px-3 py-1.5 bg-green-500/20 border border-green-500/30 rounded-lg">
                <span className="text-green-400 text-xs font-semibold">
                  ✓ Staked Member
                </span>
              </div>
            )}
          </header>

          <ScrollArea className="flex-1 min-h-0">
            <div className="space-y-4 px-6 py-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-3 items-start p-4 rounded-lg backdrop-blur-sm transition-all duration-300 ${
                    msg.isStaked
                      ? "bg-gradient-to-r from-blue-500/15 to-purple-500/15 border border-blue-500/20 hover:border-blue-500/30"
                      : "bg-white/10 hover:bg-white/15"
                  }`}
                >
                  <img
                    src={msg.avatar}
                    alt={msg.author}
                    className="w-10 h-10 rounded-xl"
                  />
                  <div className="flex-1">
                    <div className="flex items-baseline gap-2 mb-1">
                      <span
                        className={`[font-family:'Lato',Helvetica] font-normal text-[15px] ${
                          msg.isStaked
                            ? "text-blue-300 font-semibold"
                            : "text-white"
                        }`}
                      >
                        {msg.author}
                      </span>
                      {msg.isStaked && (
                        <span className="px-2 py-0.5 bg-blue-500/20 border border-blue-500/30 rounded text-blue-300 text-[10px] font-bold">
                          STAKED
                        </span>
                      )}
                      <span className="[font-family:'Lato',Helvetica] font-normal text-[#ffffff40] text-[13px]">
                        {msg.timestamp}
                      </span>
                    </div>
                    <p className="[font-family:'Lato',Helvetica] font-normal text-white/80 text-[15px] leading-relaxed">
                      {msg.content}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          <footer className="px-6 py-4 backdrop-blur-xl bg-white/5 border-t border-white/10 flex items-center gap-3 flex-shrink-0">
            <button className="p-2 rounded-lg hover:bg-white/10 transition-all duration-300">
              <Plus className="w-5 h-5 text-white/60" />
            </button>
            <Input
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={`Message #${activeChannel.name}`}
              className="flex-1 bg-white/10 border-none rounded-lg [font-family:'Lato',Helvetica] text-[15px] text-white placeholder:text-white/40 focus-visible:ring-1 focus-visible:ring-white/20 h-11"
            />
            <div className="flex items-center gap-2">
              {[Gift, Paperclip, Smile].map((Icon, i) => (
                <button
                  key={i}
                  className="p-2 rounded-lg hover:bg-white/10 transition-all duration-300"
                >
                  <Icon className="w-5 h-5 text-white/60" />
                </button>
              ))}
              <button
                onClick={handleSendMessage}
                className="px-4 py-2 bg-white/10 hover:bg-white/15 text-white rounded-lg transition-all duration-300 flex items-center gap-2"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
};
