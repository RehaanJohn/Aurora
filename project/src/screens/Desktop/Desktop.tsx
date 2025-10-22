import React, { useState, useMemo } from "react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../components/ui/avatar";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { ScrollArea } from "../../components/ui/scroll-area";
import { Separator } from "../../components/ui/separator";
import { NavigationIcon } from "../../components/NavigationIcons";
import { ProfilePopup } from "../../components/ProfilePopup";
import {
  type Category,
  getFeaturedCommunities,
  getTrendingCommunities,
  getRecentCommunities,
} from "../../data/communityData";

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
  const [activeNav, setActiveNav] = useState<Category>("home");
  const [searchQuery, setSearchQuery] = useState("");

  // Get filtered communities based on active navigation
  const featuredCommunities = useMemo(
    () => getFeaturedCommunities(activeNav),
    [activeNav]
  );

  const popularCommunities = useMemo(
    () => getTrendingCommunities(activeNav).slice(0, 3),
    [activeNav]
  );

  const recentCommunities = useMemo(
    () => getRecentCommunities(activeNav).slice(0, 3),
    [activeNav]
  );

  const handleCommunityClick = (communityName: string) => {
    console.log(`Opening community: ${communityName}`);
  };

  const handleMemberClick = (memberName: string) => {
    console.log(`Opening member profile: ${memberName}`);
  };

  // Get category display name
  const getCategoryDisplayName = () => {
    const item = navigationItems.find((nav) => nav.icon === activeNav);
    return item?.label || "Home";
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
            <Button
              variant="ghost"
              size="icon"
              className="w-10 h-10 rounded-xl bg-white/0 hover:bg-white/10 transition-all duration-300"
            >
              <img
                className="w-10 h-10"
                alt="Group logo"
                src="/group-logo.svg"
              />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="w-10 h-10 rounded-xl bg-white/0 hover:bg-white/10 transition-all duration-300"
            >
              <img
                className="w-10 h-10"
                alt="Logo group"
                src="/logo-group-2.svg"
              />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="w-10 h-10 rounded-xl bg-white/0 hover:bg-white/10 transition-all duration-300"
            >
              <img
                className="w-10 h-10"
                alt="Logo group"
                src="/logo-group-3.svg"
              />
            </Button>
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
            className="w-[50px] h-[50px] rounded-xl bg-white/0 hover:bg-white/10 transition-all duration-300"
          >
            <img
              className="w-[50px] h-[50px]"
              alt="Explore"
              src="/explore.svg"
            />
          </Button>
        </div>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
          <img className="w-[73px] h-[79px]" alt="Blur" src="/blur.svg" />
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

        <div className="p-6">
          <div className="mb-6 bg-white/5 backdrop-blur-md rounded-xl border border-white/20 p-3 flex items-center gap-2 hover:bg-white/10 transition-all duration-300">
            <img
              className="w-3 h-3"
              alt="Icon magnifyingglass"
              src="/icon---magnifyingglass.svg"
            />
            <Input
              placeholder="Explore"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border-0 bg-transparent text-white text-[13px] [font-family:'Lato',Helvetica] placeholder:text-white/60 h-auto p-0 focus-visible:ring-0 focus-visible:ring-offset-0"
            />
          </div>

          <ScrollArea className="h-[calc(100vh-180px)]">
            <div className="space-y-8">
              <section>
                <Card className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-[20px] overflow-hidden border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-[1.02]">
                  <CardContent className="p-0 flex flex-col">
                    <div className="p-8 flex flex-col gap-2 bg-gradient-to-b from-slate-800/80 to-transparent">
                      <h2 className="[font-family:'SF_Compact_Rounded-Regular',Helvetica] font-normal text-white text-2xl text-center">
                        Find Your Community
                      </h2>
                      <h2 className="[font-family:'SF_Compact_Rounded-Regular',Helvetica] font-normal text-white text-2xl text-center">
                        on Daccord
                      </h2>
                    </div>
                    <div className="w-full h-[180px] overflow-hidden">
                      <img
                        className="w-full h-full object-cover"
                        alt="Photo"
                        src="/photo-1647351408653-d582b364bf2f.png"
                      />
                    </div>
                  </CardContent>
                </Card>
              </section>

              <section>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="[font-family:'SF_Compact_Rounded-Semibold',Helvetica] font-normal text-white text-[22px]">
                    Featured Communities
                  </h2>
                  <Button
                    variant="link"
                    className="h-auto p-0 [font-family:'SF_Compact_Rounded-Regular',Helvetica] font-normal text-[#ffffff8c] text-[15px]"
                  >
                    See all
                  </Button>
                </div>

                {featuredCommunities.length === 0 ? (
                  <div className="text-center py-12 text-white/40">
                    <p className="[font-family:'Lato',Helvetica] text-[15px]">
                      No featured communities in {getCategoryDisplayName()} yet.
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-4">
                    {featuredCommunities.map((community, index) => (
                    <Card
                      key={index}
                      onClick={() => handleCommunityClick(community.title)}
                      className="bg-white/5 backdrop-blur-xl rounded-[20px] overflow-hidden border border-white/20 shadow-xl hover:shadow-2xl hover:border-blue-400/30 transition-all duration-500 hover:scale-[1.02] relative group cursor-pointer"
                    >
                      <CardContent className="p-0 relative">
                        <div className="relative h-52">
                          <img
                            className="w-full h-full object-cover"
                            alt="Group img"
                            src={community.image}
                          />
                          <img
                            className="absolute bottom-0 left-0 w-full"
                            alt="Shape"
                            src={community.shape}
                          />
                        </div>
                        <div className="p-6 space-y-4">
                          <div className="flex items-center gap-3">
                            <img
                              className="w-[38px] h-9"
                              alt="Avatar"
                              src={community.avatar}
                            />
                            <h3 className="[font-family:'SF_Compact_Rounded-Semibold',Helvetica] font-normal text-white text-[22px]">
                              {community.title}
                            </h3>
                          </div>
                          <p className="[font-family:'Lato',Helvetica] font-normal text-[#ffffff8c] text-[13px]">
                            {community.description}
                          </p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1">
                              <span className="[font-family:'SF_Compact-Regular',Helvetica] text-[#ffffff40] text-xs font-normal">
                                􁂛
                              </span>
                              <span className="[font-family:'Lato',Helvetica] font-normal text-[#ffffff40] text-xs">
                                {community.online} Online
                              </span>
                            </div>
                            <div className="flex items-center gap-1">
                              <span className="[font-family:'SF_Compact_Display-Regular',Helvetica] text-text-colordarktertiary text-xs font-normal">
                                􀉭
                              </span>
                              <span className="[font-family:'Lato',Helvetica] font-normal text-[#ffffff40] text-xs">
                                {community.members} Members
                              </span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                )}
              </section>

              <section>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="[font-family:'SF_Compact_Rounded-Semibold',Helvetica] font-normal text-white text-[22px]">
                    Popular Right Now
                  </h2>
                  <Button
                    variant="link"
                    className="h-auto p-0 [font-family:'SF_Compact_Rounded-Regular',Helvetica] font-normal text-[#ffffff8c] text-[15px]"
                  >
                    See all
                  </Button>
                </div>

                {popularCommunities.length === 0 ? (
                  <div className="text-center py-12 text-white/40">
                    <p className="[font-family:'Lato',Helvetica] text-[15px]">
                      No popular communities in {getCategoryDisplayName()} yet.
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-3 gap-4">
                    {popularCommunities.map((community, index) => (
                    <Card
                      key={index}
                      onClick={() => handleCommunityClick(community.title)}
                      className="bg-white/5 backdrop-blur-xl rounded-[20px] overflow-hidden border border-white/20 shadow-xl hover:shadow-2xl hover:border-emerald-400/30 transition-all duration-500 hover:scale-[1.02] relative group cursor-pointer"
                    >
                      <CardContent className="p-0 relative">
                        {community.shape ? (
                          <>
                            <div className="relative h-52">
                              <img
                                className="w-full h-full object-cover"
                                alt="Photo"
                                src={community.image}
                              />
                              <img
                                className="absolute bottom-0 left-0 w-full"
                                alt="Union"
                                src={community.shape}
                              />
                            </div>
                            {community.avatar && (
                              <div className="absolute top-4 left-4">
                                <img
                                  className="w-[37.89px] h-9 rounded-xl object-cover"
                                  alt="Polygon"
                                  src={community.avatar}
                                />
                              </div>
                            )}
                            <div className="p-6 space-y-2">
                              <h3 className="[font-family:'SF_Compact_Rounded-Semibold',Helvetica] font-normal text-white text-[22px]">
                                {community.title}
                              </h3>
                              <p className="[font-family:'Lato',Helvetica] font-normal text-text-colordarksecondary text-[13px]">
                                {community.description}
                              </p>
                              <div className="flex items-center justify-between pt-2">
                                {community.online && (
                                  <div className="flex items-center gap-1">
                                    <span className="[font-family:'SF_Compact_Display-Regular',Helvetica] font-normal text-text-colordarktertiary text-xs">
                                      􁂛
                                    </span>
                                    <span className="[font-family:'Lato',Helvetica] font-normal text-text-colordarktertiary text-xs">
                                      {community.online} Online
                                    </span>
                                  </div>
                                )}
                                <div className="flex items-center gap-1">
                                  <span className="[font-family:'SF_Compact_Display-Regular',Helvetica] font-normal text-text-colordarktertiary text-xs">
                                    􀉭
                                  </span>
                                  <span className="[font-family:'Lato',Helvetica] font-normal text-text-colordarktertiary text-xs">
                                    {community.members} Members
                                  </span>
                                </div>
                              </div>
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="relative h-52">
                              <img
                                className="w-full h-full object-cover"
                                alt="Photo"
                                src={community.image}
                              />
                              {community.polygonTop && (
                                <img
                                  className="absolute top-4 left-4 w-[75px] h-20 object-cover"
                                  alt="Polygon"
                                  src={community.polygonTop}
                                />
                              )}
                              {community.polygonBottom && (
                                <img
                                  className="absolute top-4 left-4 w-[79px] h-[84px]"
                                  alt="Polygon"
                                  src={community.polygonBottom}
                                />
                              )}
                            </div>
                            <div className="absolute inset-0 rounded-[20px] overflow-hidden border border-white/30 bg-gradient-to-br from-blue-600/80 to-cyan-500/80 backdrop-blur-sm">
                              <div className="p-6 space-y-2 absolute bottom-0 left-0 right-0">
                                <h3 className="[font-family:'SF_Compact_Rounded-Semibold',Helvetica] font-normal text-white text-[22px]">
                                  {community.title}
                                </h3>
                                <p className="[font-family:'Lato',Helvetica] font-normal text-[#ffffff8c] text-[13px]">
                                  {community.description}
                                </p>
                                <div className="flex items-center gap-1">
                                  <span className="[font-family:'SF_Compact_Display-Regular',Helvetica] text-text-colordarktertiary text-xs font-normal">
                                    􀉭
                                  </span>
                                  <span className="[font-family:'Lato',Helvetica] font-normal text-[#ffffff40] text-xs">
                                    {community.members} Members
                                  </span>
                                </div>
                              </div>
                            </div>
                          </>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
                )}
              </section>

              <section>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="[font-family:'SF_Compact_Rounded-Semibold',Helvetica] font-normal text-white text-[22px]">
                    Recently Added
                  </h2>
                  <Button
                    variant="link"
                    className="h-auto p-0 [font-family:'SF_Compact_Rounded-Regular',Helvetica] font-normal text-[#ffffff8c] text-[15px]"
                  >
                    See all
                  </Button>
                </div>

                {recentCommunities.length === 0 ? (
                  <div className="text-center py-12 text-white/40">
                    <p className="[font-family:'Lato',Helvetica] text-[15px]">
                      No recent communities in {getCategoryDisplayName()} yet.
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-3 gap-4">
                    {recentCommunities.map((community, index) => (
                    <Card
                      key={index}
                      onClick={() => handleCommunityClick(community.title)}
                      className="bg-white/5 backdrop-blur-xl rounded-[20px] overflow-hidden border border-white/20 shadow-xl hover:shadow-2xl hover:border-emerald-400/30 transition-all duration-500 hover:scale-[1.02] relative group cursor-pointer"
                    >
                      <CardContent className="p-0 relative">
                        <div className="relative h-52">
                          <img
                            className="w-full h-full object-cover"
                            alt="Photo"
                            src={community.image}
                          />
                          {community.shape && (
                            <img
                              className="absolute bottom-0 left-0 w-full"
                              alt="Union"
                              src={community.shape}
                            />
                          )}
                        </div>
                        <div className="p-6 space-y-2">
                          <h3 className="[font-family:'SF_Compact_Rounded-Semibold',Helvetica] font-normal text-white text-[22px]">
                            {community.title}
                          </h3>
                          <p className="[font-family:'Lato',Helvetica] font-normal text-[#ffffff8c] text-[13px]">
                            {community.description}
                          </p>
                          <div className="flex items-center gap-1">
                            <span className="[font-family:'SF_Compact_Display-Regular',Helvetica] text-text-colordarktertiary text-xs font-normal">
                              􀉭
                            </span>
                            <span className="[font-family:'Lato',Helvetica] font-normal text-[#ffffff40] text-xs">
                              {community.members} Members
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                )}
              </section>
            </div>
          </ScrollArea>
        </div>
      </main>

      <aside className="w-[360px] bg-white/5 backdrop-blur-xl overflow-hidden border-l border-white/10 flex flex-col relative z-10">
        <header className="h-[60px] flex items-center justify-center px-6 bg-white/0 border-b border-white/10">
          <h2 className="[font-family:'Lato',Helvetica] font-semibold text-white text-[15px]">
            Activity
          </h2>
        </header>

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

      <div className="fixed bottom-6 left-6 flex flex-col gap-4">
        <Card className="bg-white/10 backdrop-blur-xl rounded-lg shadow-xl border border-white/20 hover:bg-white/15 transition-all duration-300">
          <CardContent className="p-2 flex items-center gap-2">
            <img className="w-11 h-11" alt="Group" src="/group-1293.png" />
            <a
              className="[font-family:'Lato',Helvetica] font-normal text-white text-[15px] underline"
              href="https://www.instagram.com/aksondesign/"
              rel="noopener noreferrer"
              target="_blank"
            >
              @aksondesign
            </a>
          </CardContent>
        </Card>

        <Card className="bg-white/10 backdrop-blur-xl rounded-lg shadow-xl border border-white/20 hover:bg-white/15 transition-all duration-300">
          <CardContent className="p-2 flex items-center gap-2">
            <img className="w-11 h-11" alt="Group" src="/group-1293-1.png" />
            <a
              className="[font-family:'Lato',Helvetica] font-normal text-white text-[15px] underline"
              href="https://twitter.com/aksonvady"
              rel="noopener noreferrer"
              target="_blank"
            >
              @aksonvady
            </a>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
