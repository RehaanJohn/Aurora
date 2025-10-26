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
import { StakingModal } from "../../components/StakingModal";
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
  const [isStakingModalOpen, setIsStakingModalOpen] = useState(false);
  const [pendingServer, setPendingServer] = useState<Server | null>(null);

  const handleServerClick = (server: Server) => {
    // Directly enter the server without requiring staking
    setActiveServer(server);
    setActiveScreen("chat");
  };

  const handleOpenStakingModal = (server: Server) => {
    // Open staking modal for the current server
    setPendingServer(server);
    setIsStakingModalOpen(true);
  };

  const handleStakingSuccess = () => {
    // After successful staking, close modal
    setIsStakingModalOpen(false);
    setPendingServer(null);
  };

  const handleMemberClick = (memberName: string) => {
    console.log(`Opening member profile: ${memberName}`);
  };

  return (
    <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 w-full min-w-[1920px] h-screen flex relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-emerald-900/20"></div>
      <div className="absolute inset-0 backdrop-blur-[100px]"></div>
      <aside className="w-[87px] bg-white/5 backdrop-blur-xl border-r border-white/10 flex flex-col items-center py-6 gap-8 relative z-10">
        <div className="flex flex-col items-center gap-6">
          <div className="w-10 h-10 relative">
            <div className="text-4xl">🦀</div>
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

      {activeScreen !== "chat" && (
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
      )}

      <main className="flex-1 bg-transparent flex flex-col relative z-10">
        <header className="h-[60px] bg-gradient-to-r from-white/5 via-white/10 to-white/5 backdrop-blur-2xl border-b border-white/10 flex items-center justify-between px-6 shadow-lg">
          <ProfilePopup username="rehaan" avatar="/user-profil.png" />

          <div className="flex items-center gap-3">
            <div className="px-4 py-1.5 bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-md rounded-full border border-white/20">
              <span className="text-white text-sm font-semibold tracking-wide bg-gradient-to-r from-blue-200 to-purple-200 bg-clip-text text-transparent">
                Aurora
              </span>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-hidden">
          {activeScreen === "explore" && <Explore activeNav={activeNav} />}
          {activeScreen === "chat" && activeServer && (
            <Chat
              server={activeServer}
              onOpenStakingModal={() => handleOpenStakingModal(activeServer)}
            />
          )}
        </div>
      </main>

      {user && (
        <aside className="w-[360px] bg-gradient-to-b from-white/5 via-white/3 to-white/5 backdrop-blur-2xl overflow-hidden border-l border-white/10 flex flex-col relative z-10 shadow-2xl">
          <div className="p-6 border-b border-white/10 bg-gradient-to-br from-white/5 to-transparent">
            <WalletConnect />
          </div>

          <ScrollArea className="flex-1 p-6">
            <div className="space-y-6">
              <div className="flex flex-col items-center gap-4 p-6 rounded-2xl bg-gradient-to-br from-white/10 via-white/5 to-transparent backdrop-blur-xl border border-white/20 shadow-2xl">
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full blur-2xl opacity-60 group-hover:opacity-90 transition-opacity duration-500 animate-pulse"></div>
                  <div className="relative w-[120px] h-[120px] rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 p-1 backdrop-blur-sm">
                    <div className="w-full h-full rounded-full bg-gradient-to-br from-slate-800 to-slate-900 p-1 ring-2 ring-white/20 ring-offset-2 ring-offset-slate-800/50">
                      <img
                        className="w-full h-full rounded-full object-cover border-2 border-white/10 shadow-2xl"
                        alt="User profile"
                        src="/user-profil.png"
                      />
                    </div>
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full border-4 border-slate-800 shadow-lg">
                    <div className="w-full h-full rounded-full bg-green-400 animate-pulse"></div>
                  </div>
                </div>

                <div className="text-center space-y-2">
                  <h3 className="[font-family:'Lato',Helvetica] font-bold text-white text-[20px] tracking-wide bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 bg-clip-text text-transparent">
                    Rehaan
                  </h3>
                  <p className="[font-family:'Lato',Helvetica] font-normal text-white/50 text-[14px] tracking-wider">
                    @rehaan
                  </p>
                  <div className="flex items-center gap-2 justify-center pt-2">
                    <div className="px-4 py-1.5 bg-gradient-to-r from-blue-500/30 to-purple-500/30 backdrop-blur-md rounded-full border border-blue-400/40 shadow-lg">
                      <span className="text-blue-200 text-xs font-bold tracking-wide">
                        ✨ Premium
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <section className="relative overflow-hidden p-5 rounded-2xl bg-gradient-to-br from-white/10 via-white/5 to-transparent backdrop-blur-2xl border border-white/20 shadow-2xl">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-3xl"></div>
                <div className="relative">
                  <div className="flex items-center justify-between px-2 py-2 mb-4">
                    <h3 className="[font-family:'Lato',Helvetica] font-bold text-white text-[16px] tracking-wide">
                      New Members
                    </h3>
                    <Button
                      variant="link"
                      className="h-auto p-0 [font-family:'Lato',Helvetica] font-medium text-blue-400/80 hover:text-blue-300 text-[13px]"
                    >
                      See all →
                    </Button>
                  </div>

                  <div className="space-y-2.5">
                    {newMembers.map((member, index) => (
                      <Button
                        key={index}
                        variant="ghost"
                        onClick={() => handleMemberClick(member.name)}
                        className="w-full h-auto justify-start gap-3 px-3 py-3 rounded-xl bg-gradient-to-r from-white/5 to-transparent backdrop-blur-md hover:from-white/10 hover:to-white/5 border border-white/10 hover:border-white/30 transition-all duration-300 group"
                      >
                        <div className="relative">
                          <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full blur-md opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
                          <Avatar className="relative w-[42px] h-[42px] rounded-full ring-2 ring-white/20 group-hover:ring-white/40 transition-all">
                            <AvatarImage
                              src={member.avatar}
                              alt={member.name}
                              className="object-cover"
                            />
                            <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-bold text-sm">
                              {member.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                        </div>
                        <div className="flex flex-col items-start gap-1 flex-1">
                          <span className="[font-family:'Lato',Helvetica] font-semibold text-white text-[14px] leading-tight group-hover:text-blue-200 transition-colors">
                            {member.name}
                          </span>
                          <span className="[font-family:'Lato',Helvetica] font-normal text-white/40 text-[12px] leading-tight">
                            {member.time}
                          </span>
                        </div>
                        <div className="w-2 h-2 rounded-full bg-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </Button>
                    ))}
                  </div>
                </div>
              </section>

              <section className="relative overflow-hidden p-5 rounded-2xl bg-gradient-to-br from-white/10 via-white/5 to-transparent backdrop-blur-2xl border border-white/20 shadow-2xl">
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-purple-500/10 to-pink-500/10 rounded-full blur-3xl"></div>
                <div className="relative">
                  <div className="flex items-center justify-between px-2 py-2 mb-4">
                    <h3 className="[font-family:'Lato',Helvetica] font-bold text-white text-[16px] tracking-wide">
                      Connect
                    </h3>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <button className="relative overflow-hidden p-3.5 rounded-xl bg-gradient-to-br from-blue-500/20 to-blue-600/10 backdrop-blur-md border border-blue-400/30 hover:border-blue-300/50 transition-all duration-300 group">
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-400/0 to-blue-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <span className="relative text-blue-200 text-sm font-bold group-hover:text-white transition-colors">
                        Twitter
                      </span>
                    </button>
                    <button className="relative overflow-hidden p-3.5 rounded-xl bg-gradient-to-br from-purple-500/20 to-purple-600/10 backdrop-blur-md border border-purple-400/30 hover:border-purple-300/50 transition-all duration-300 group">
                      <div className="absolute inset-0 bg-gradient-to-br from-purple-400/0 to-purple-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <span className="relative text-purple-200 text-sm font-bold group-hover:text-white transition-colors">
                        GitHub
                      </span>
                    </button>
                  </div>
                </div>
              </section>
            </div>
          </ScrollArea>
        </aside>
      )}

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

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />

      <StakingModal
        isOpen={isStakingModalOpen}
        onClose={() => {
          setIsStakingModalOpen(false);
          setPendingServer(null);
        }}
        onSuccess={handleStakingSuccess}
        serverName={pendingServer?.name || ""}
        serverId={pendingServer?.id || ""}
      />
    </div>
  );
};
