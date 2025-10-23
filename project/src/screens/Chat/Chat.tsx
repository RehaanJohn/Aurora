import { useState } from "react";
import { Button } from "../../components/ui/button";
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

  const handleSendMessage = () => {
    if (!messageInput.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      author: "You",
      avatar: "/user-profil.png",
      content: messageInput,
      timestamp: "Today at " + new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" }),
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
    <div className="flex h-full">
      {/* Channels Sidebar */}
      <div className="w-60 bg-[#2b2d31] flex flex-col">
        {/* Server Name */}
        <div className="h-12 px-4 flex items-center border-b border-black/20 shadow-sm">
          <h2 className="[font-family:'Lato',Helvetica] font-bold text-white text-[15px] truncate">
            {server.name}
          </h2>
        </div>

        {/* Channels List */}
        <ScrollArea className="flex-1 px-2 py-2">
          <div className="space-y-0.5">
            <div className="px-2 py-1.5">
              <span className="[font-family:'Lato',Helvetica] text-[#949ba4] text-xs font-semibold uppercase tracking-wide">
                Text Channels
              </span>
            </div>
            {mockChannels
              .filter((channel) => channel.type === "text")
              .map((channel) => (
                <Button
                  key={channel.id}
                  variant="ghost"
                  onClick={() => setActiveChannel(channel)}
                  className={`w-full justify-start gap-1.5 px-2 py-1.5 h-auto rounded-md ${
                    activeChannel.id === channel.id
                      ? "bg-[#404249] text-white"
                      : "text-[#949ba4] hover:bg-[#35373c] hover:text-[#dbdee1]"
                  } transition-all duration-150`}
                >
                  <Hash className="w-5 h-5" />
                  <span className="[font-family:'Lato',Helvetica] text-[15px]">{channel.name}</span>
                </Button>
              ))}

            <div className="px-2 py-1.5 mt-4">
              <span className="[font-family:'Lato',Helvetica] text-[#949ba4] text-xs font-semibold uppercase tracking-wide">
                Voice Channels
              </span>
            </div>
            {mockChannels
              .filter((channel) => channel.type === "voice")
              .map((channel) => (
                <Button
                  key={channel.id}
                  variant="ghost"
                  className="w-full justify-start gap-1.5 px-2 py-1.5 h-auto rounded-md text-[#949ba4] hover:bg-[#35373c] hover:text-[#dbdee1] transition-all duration-150"
                >
                  <Volume2 className="w-5 h-5" />
                  <span className="[font-family:'Lato',Helvetica] text-[15px]">{channel.name}</span>
                </Button>
              ))}
          </div>
        </ScrollArea>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col bg-[#313338]">
        {/* Channel Header */}
        <div className="h-12 px-4 flex items-center border-b border-black/20 shadow-sm">
          <Hash className="w-6 h-6 text-[#80848e] mr-2" />
          <span className="[font-family:'Lato',Helvetica] font-bold text-white text-[16px]">
            {activeChannel.name}
          </span>
        </div>

        {/* Messages Area */}
        <ScrollArea className="flex-1 px-4 py-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div key={message.id} className="flex gap-4 hover:bg-[#2e3035] px-4 py-2 -mx-4 rounded">
                <img
                  src={message.avatar}
                  alt={message.author}
                  className="w-10 h-10 rounded-full flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="[font-family:'Lato',Helvetica] font-semibold text-white text-[15px]">
                      {message.author}
                    </span>
                    <span className="[font-family:'Lato',Helvetica] text-[#949ba4] text-xs">
                      {message.timestamp}
                    </span>
                  </div>
                  <p className="[font-family:'Lato',Helvetica] text-[#dbdee1] text-[15px] leading-[1.375rem] break-words">
                    {message.content}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        {/* Message Input */}
        <div className="px-4 pb-6">
          <div className="bg-[#383a40] rounded-lg px-4 py-3 flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 text-[#b5bac1] hover:text-[#dbdee1] hover:bg-transparent"
            >
              <Plus className="h-5 w-5" />
            </Button>
            <Input
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={`Message #${activeChannel.name}`}
              className="flex-1 bg-transparent border-0 text-white text-[15px] [font-family:'Lato',Helvetica] placeholder:text-[#6d6f78] h-auto p-0 focus-visible:ring-0 focus-visible:ring-offset-0"
            />
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 text-[#b5bac1] hover:text-[#dbdee1] hover:bg-transparent"
              >
                <Gift className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 text-[#b5bac1] hover:text-[#dbdee1] hover:bg-transparent"
              >
                <Paperclip className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 text-[#b5bac1] hover:text-[#dbdee1] hover:bg-transparent"
              >
                <Smile className="h-5 w-5" />
              </Button>
              <Button
                onClick={handleSendMessage}
                size="icon"
                className="h-8 w-8 bg-[#5865f2] hover:bg-[#4752c4] text-white rounded-md"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
