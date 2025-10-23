import { useState } from "react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../components/ui/avatar";
import { Button } from "../../components/ui/button";
import { ScrollArea } from "../../components/ui/scroll-area";
import { Separator } from "../../components/ui/separator";
import { NavigationIcon } from "../../components/NavigationIcons";
import { ProfilePopup } from "../../components/ProfilePopup";
import { AuthModal } from "../../components/AuthModal";
import { UserMenu } from "../../components/UserMenu";
import { WalletConnect } from "../../components/WalletConnect";
import { useAuth } from "../../contexts/AuthContext";
import { Explore } from "../Explore";
import { Chat } from "../Chat";
import { type Category } from "../../data/communityData";

type Screen = "explore" | "home" | "chat";

interface Server {
  id: string;
  name: string;
  icon: string;
}

const servers: Server[] = [
  { id: "1", name: "Gaming Hub", icon: "/group-logo.svg" },
  { id: "2", name: "Design Community", icon: "/logo-group-2.svg" },
  { id: "3", name: "Dev Squad", icon: "/logo-group-3.svg" },
];

const navigationItems: Array<{ icon: Category; label: string }> = [
  { icon: "home", label: "Home" },
  { icon: "music", label: "Music" },
  { icon: "gaming", label: "Gaming" },
  { icon: "education", label: "Education" },
  { icon: "tech", label: "Science & Tech" },
  { icon: "entertainment", label: "Entertainment" },
  { icon: "hubs", label: "Student Hubs" },
];

const newMembers = [
  {
    name: "Anne Couture",
    time: "5 min ago",
    avatar: "/user-profil-1.png",
  },
  {
    name: "Miriam Soleil",
    time: "20 min ago",
    avatar: "/polygon-1-1.png",
  },
  {
    name: "Marie Laval",
    time: "35 min ago",
    avatar: "/polygon-1-2.png",
  },
  {
    name: "Mark Morain",
    time: "40 min ago",
    avatar: "/polygon-1-3.png",
  },
];

export const Desktop = (): JSX.Element => {
  const { user } = useAuth();
  const [activeNav, setActiveNav] = useState<Category>("home");
  const [activeScreen, setActiveScreen] = useState<Screen>("explore");
  const [activeServer, setActiveServer] = useState<Server | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const handleServerClick = (server: Server) => {
    setActiveServer(server);
    setActiveScreen("chat");
  };

  const handleMemberClick = (memberName: string) => {
    console.log(`Opening member profile: ${memberName}`);
  };

  return (
    <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 w-full min-w-[1920px] min-h-[960px] flex relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-emerald-900/20"></div>
      <div className="absolute inset-0 backdrop-blur-[100px]"></div>
      <aside className="w-[87px] bg-white/5 backdrop-blur-xl border-r border-white/10 flex flex-col items-center py-6 gap-8 relative z-10">
        <div className="flex flex-col items-center gap-6">
          <div className="w-10 h-10 relative">
            <img className="w-10 h-10" alt="Group" src="/group-29.png" />
          </div>

          <Separator className="w-[50px] bg-white/10" />

          <nav className="flex flex-col items-center gap-4">
            {servers.map((server) => (
              <Button
                key={server.id}
                variant="ghost"
                size="icon"
                onClick={() => handleServerClick(server)}
                className="w-10 h-10 rounded-xl bg-white/0 hover:bg-white/10 transition-all duration-300"
              >
                <img
                  className="w-10 h-10"
                  alt={server.name}
                  src={server.icon}
                />
              </Button>
            ))}
          </nav>

          <Separator className="w-[50px] bg-white/10" />

          <Button
            variant="ghost"
            size="icon"
            className="w-10 h-10 rounded-full bg-white/0 hover:bg-white/10 relative transition-all duration-300"
          >
            <img className="w-10 h-10" alt="Oval" src="/oval.svg" />
            <img
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[18px] h-[18px]"
              alt="Symbol"
              src="/symbol.svg"
            />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setActiveScreen("explore")}
            className="w-[50px] h-[50px] rounded-xl bg-white/0 hover:bg-white/10 transition-all duration-300"
          >
            <img
              className="w-[50px] h-[50px]"
              alt="Explore"
              src="/explore.svg"
            />
          </Button>
        </div>
      </aside>

      <div className="w-[280px] bg-white/5 backdrop-blur-xl flex flex-col relative z-10">
        <header className="h-[60px] flex items-center px-6 bg-white/0 border-b border-white/10">
          <h1 className="font-bold text-[17px] [font-family:'Lato',Helvetica] text-white tracking-[0] leading-[normal]">
            Explore
          </h1>
        </header>

        <ScrollArea className="flex-1 px-4 py-6">
          <nav className="flex flex-col gap-2">
            {navigationItems.map((item, index) => (
              <Button
                key={index}
                variant="ghost"
                onClick={() => setActiveNav(item.icon)}
                className={`h-auto justify-start gap-3 px-3 py-2.5 rounded-lg ${
                  activeNav === item.icon
                    ? "bg-white/10 backdrop-blur-sm shadow-lg"
                    : "bg-transparent hover:bg-white/5"
                } transition-all duration-300`}
              >
                <NavigationIcon
                  type={item.icon}
                  className={`w-5 h-5 ${
                    activeNav === item.icon ? "text-white" : "text-white/60"
                  }`}
                />
                <span
                  className={`[font-family:'Lato',Helvetica] text-[15px] tracking-[0.36px] ${
                    activeNav === item.icon
                      ? "font-semibold text-white"
                      : "font-normal text-white/80"
                  }`}
                >
                  {item.label}
                </span>
              </Button>
            ))}
          </nav>
        </ScrollArea>

        <div className="p-4">
          <img className="w-full h-auto" alt="Frame" src="/frame-7.svg" />
        </div>
      </div>

      <main className="flex-1 bg-transparent flex flex-col relative z-10">
        <header className="h-[60px] bg-white/5 backdrop-blur-xl border-b border-white/10 flex items-center justify-between px-6">
          <ProfilePopup username="sophiefortune" avatar="/user-profil.png" />

          <div className="flex items-center gap-2">
            <span className="text-white/60 text-sm font-medium">Daccord</span>
          </div>
        </header>

        {activeScreen === "explore" && <Explore activeNav={activeNav} />}
        {activeScreen === "chat" && activeServer && <Chat server={activeServer} />}
      </main>

      <aside className="w-[360px] bg-white/5 backdrop-blur-xl overflow-hidden border-l border-white/10 flex flex-col relative z-10">
        <div className="p-6 border-b border-white/10">
          <WalletConnect />
        </div>

        <ScrollArea className="flex-1 p-6">
          <div className="space-y-6">
            <div className="flex flex-col items-center gap-4">
              <div className="relative">
                <img
                  className="w-[111px] h-[121px] rounded-[22px] border-2 border-white/20 shadow-lg"
                  alt="User profile"
                  src="/user-profil.png"
                />
              </div>

              <div className="text-center">
                <h3 className="[font-family:'Lato',Helvetica] font-bold text-white text-[17px]">
                  Sophie Fortune
                </h3>
                <p className="[font-family:'Lato',Helvetica] font-normal text-[#ffffff40] text-[15px]">
                  @sophiefortune
                </p>
              </div>
            </div>

            <section>
              <div className="flex items-center justify-between px-0 py-2 mb-2">
                <h3 className="[font-family:'Lato',Helvetica] font-normal text-[#ffffff8c] text-[15px]">
                  New Members
                </h3>
                <Button
                  variant="link"
                  className="h-auto p-0 [font-family:'Lato',Helvetica] font-normal text-[#ffffff40] text-[15px]"
                >
                  See all
                </Button>
              </div>

              <div className="space-y-2">
                {newMembers.map((member, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    onClick={() => handleMemberClick(member.name)}
                    className="w-full h-auto justify-start gap-2 px-2 py-2 rounded-lg bg-white/10 backdrop-blur-sm hover:bg-white/15 transition-all duration-300"
                  >
                    <Avatar className="w-[39.11px] h-[41.29px] rounded-xl">
                      <AvatarImage
                        src={member.avatar}
                        alt={member.name}
                        className="object-cover"
                      />
                      <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col items-start gap-1">
                      <span className="[font-family:'Lato',Helvetica] font-normal text-white text-[15px] leading-[15px]">
                        {member.name}
                      </span>
                      <span className="[font-family:'Lato',Helvetica] font-normal text-[#ffffff40] text-[13px] leading-[13px]">
                        {member.time}
                      </span>
                    </div>
                  </Button>
                ))}
              </div>
            </section>

            <section>
              <div className="flex items-center justify-between px-0 py-2">
                <h3 className="[font-family:'Lato',Helvetica] font-normal text-[#ffffff8c] text-[15px]">
                  Follow me
                </h3>
              </div>
            </section>
          </div>
        </ScrollArea>
      </aside>

      <div className="fixed bottom-6 left-[19px] z-50">
        {user ? (
          <UserMenu />
        ) : (
          <Button
            onClick={() => setIsAuthModalOpen(true)}
            className="h-11 w-[50px] bg-[#1e1f22] hover:bg-[#2b2d31] text-white font-semibold rounded-xl transition-all duration-200 flex items-center justify-center focus-visible:ring-0 focus-visible:ring-offset-0"
          >
            <span className="[font-family:'Lato',Helvetica] text-[13px]">
              Sign In
            </span>
          </Button>
        )}
      </div>

      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </div>
  );
};
