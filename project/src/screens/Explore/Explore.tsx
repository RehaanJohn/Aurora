import { useState, useMemo } from "react";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { ScrollArea } from "../../components/ui/scroll-area";
import {
  type Category,
  getFeaturedCommunities,
  getTrendingCommunities,
  getRecentCommunities,
} from "../../data/communityData";

interface ExploreProps {
  activeNav: Category;
}

export const Explore = ({ activeNav }: ExploreProps): JSX.Element => {
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
    console.log(`Viewing community: ${communityName}`);
  };

  // Get category display name
  const navigationItems: Array<{ icon: Category; label: string }> = [
    { icon: "home", label: "Home" },
    { icon: "music", label: "Music" },
    { icon: "gaming", label: "Gaming" },
    { icon: "education", label: "Education" },
    { icon: "tech", label: "Science & Tech" },
    { icon: "entertainment", label: "Entertainment" },
    { icon: "hubs", label: "Student Hubs" },
  ];

  const getCategoryDisplayName = () => {
    const item = navigationItems.find((nav) => nav.icon === activeNav);
    return item?.label || "Home";
  };

  return (
    <div className="h-full flex flex-col p-6 overflow-hidden">
      <div className="mb-6 bg-gradient-to-r from-white/10 via-white/5 to-white/10 backdrop-blur-2xl rounded-2xl border border-white/20 p-4 flex items-center gap-3 hover:border-white/30 transition-all duration-300 flex-shrink-0 shadow-lg">
        <img
          className="w-4 h-4 opacity-60"
          alt="Icon magnifyingglass"
          src="/icon---magnifyingglass.svg"
        />
        <Input
          placeholder="Search communities, topics, or members..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border-0 bg-transparent text-white text-[14px] [font-family:'Lato',Helvetica] placeholder:text-white/50 h-auto p-0 focus-visible:ring-0 focus-visible:ring-offset-0 font-medium"
        />
      </div>

      <ScrollArea className="flex-1 min-h-0">
        <div className="space-y-8 pb-6">
          <section>
            <Card className="relative overflow-hidden bg-gradient-to-br from-slate-800/90 via-slate-900/80 to-slate-800/90 backdrop-blur-2xl rounded-[24px] border border-white/20 shadow-2xl hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] transition-all duration-500 hover:scale-[1.005] group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-50"></div>
              <CardContent className="p-0 flex flex-col relative">
                <div className="relative p-10 flex flex-col gap-3 bg-gradient-to-b from-slate-800/60 via-transparent to-transparent">
                  <h2 className="[font-family:'SF_Compact_Rounded-Semibold',Helvetica] font-bold text-white text-3xl text-center drop-shadow-2xl tracking-tight">
                    Find Your Community
                  </h2>
                  <h2 className="[font-family:'SF_Compact_Rounded-Regular',Helvetica] font-normal text-white text-3xl text-center drop-shadow-2xl tracking-tight">
                    on Daccord
                  </h2>
                  <p className="text-white/60 text-center text-sm mt-2 [font-family:'Lato',Helvetica]">
                    Connect with like-minded people and grow together
                  </p>
                </div>
                <div className="w-full h-[220px] overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent z-10"></div>
                  <img
                    className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700"
                    alt="Community Hero"
                    src="/photo-1647351408653-d582b364bf2f.png"
                  />
                </div>
              </CardContent>
            </Card>
          </section>

          <section>
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="[font-family:'SF_Compact_Rounded-Semibold',Helvetica] font-bold text-white text-[24px] tracking-tight">
                  Featured Communities
                </h2>
                <p className="text-white/50 text-sm mt-1 [font-family:'Lato',Helvetica]">
                  Handpicked communities you might love
                </p>
              </div>
              <Button
                variant="link"
                className="h-auto p-0 [font-family:'Lato',Helvetica] font-semibold text-blue-400 hover:text-blue-300 text-[14px] flex items-center gap-1"
              >
                See all
                <span>→</span>
              </Button>
            </div>

            {featuredCommunities.length === 0 ? (
              <div className="text-center py-16 px-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10">
                <p className="[font-family:'Lato',Helvetica] text-white/40 text-[15px]">
                  No featured communities in {getCategoryDisplayName()} yet.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-5">
                {featuredCommunities.map((community, index) => (
                  <Card
                    key={index}
                    onClick={() => handleCommunityClick(community.title)}
                    className="relative overflow-hidden bg-gradient-to-br from-slate-800/60 to-slate-900/60 backdrop-blur-2xl rounded-[24px] border border-white/20 shadow-xl hover:shadow-2xl hover:border-blue-400/40 transition-all duration-500 hover:scale-[1.008] group cursor-pointer"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <CardContent className="p-0 relative">
                      <div className="relative h-[260px] overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent z-10"></div>
                        <img
                          className="w-full h-full object-cover object-center transform group-hover:scale-110 transition-transform duration-700"
                          alt="Community banner"
                          src={community.image}
                        />
                        {community.shape && (
                          <img
                            className="absolute bottom-0 left-0 w-full h-auto z-20"
                            alt="Shape overlay"
                            src={community.shape}
                          />
                        )}
                        {community.avatar && (
                          <div className="absolute top-4 left-4 z-20">
                            <div className="relative">
                              <div className="absolute inset-0 bg-blue-500/50 rounded-2xl blur-xl"></div>
                              <img
                                className="relative w-[48px] h-[48px] object-contain rounded-2xl bg-slate-900/80 backdrop-blur-sm p-2 border-2 border-white/20"
                                alt="Community icon"
                                src={community.avatar}
                              />
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="p-6 space-y-4 bg-gradient-to-t from-slate-900/80 to-slate-900/40 backdrop-blur-sm">
                        <div className="flex items-start justify-between gap-3">
                          <h3 className="[font-family:'SF_Compact_Rounded-Semibold',Helvetica] font-bold text-white text-[24px] drop-shadow-lg leading-tight group-hover:text-blue-100 transition-colors">
                            {community.title}
                          </h3>
                        </div>
                        <p className="[font-family:'Lato',Helvetica] font-normal text-white/70 text-[14px] leading-relaxed line-clamp-2">
                          {community.description}
                        </p>
                        <div className="flex items-center gap-6 pt-2">
                          <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10">
                            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                            <span className="[font-family:'Lato',Helvetica] font-semibold text-white/80 text-xs">
                              {community.online} Online
                            </span>
                          </div>
                          <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10">
                            <span className="[font-family:'SF_Compact_Display-Regular',Helvetica] text-white/60 text-xs">
                              👥
                            </span>
                            <span className="[font-family:'Lato',Helvetica] font-semibold text-white/80 text-xs">
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
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="[font-family:'SF_Compact_Rounded-Semibold',Helvetica] font-bold text-white text-[24px] tracking-tight">
                  Popular Right Now
                </h2>
                <p className="text-white/50 text-sm mt-1 [font-family:'Lato',Helvetica]">
                  Trending communities with active discussions
                </p>
              </div>
              <Button
                variant="link"
                className="h-auto p-0 [font-family:'Lato',Helvetica] font-semibold text-blue-400 hover:text-blue-300 text-[14px] flex items-center gap-1"
              >
                See all
                <span>→</span>
              </Button>
            </div>

            {popularCommunities.length === 0 ? (
              <div className="text-center py-16 px-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10">
                <p className="[font-family:'Lato',Helvetica] text-[15px]">
                  No popular communities in {getCategoryDisplayName()} yet.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-3 gap-5">
                {popularCommunities.map((community, index) => (
                  <Card
                    key={index}
                    onClick={() => handleCommunityClick(community.title)}
                    className="relative overflow-hidden bg-gradient-to-br from-slate-800/60 to-slate-900/60 backdrop-blur-2xl rounded-[20px] border border-white/20 shadow-xl hover:shadow-2xl hover:border-purple-400/40 transition-all duration-500 hover:scale-[1.02] group cursor-pointer"
                  >
                    <CardContent className="p-0 relative">
                      {community.shape ? (
                        <>
                          <div className="relative h-[220px] overflow-hidden rounded-t-[20px]">
                            <img
                              className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
                              alt="Photo"
                              src={community.image}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            {community.shape && (
                              <img
                                className="absolute bottom-0 left-0 w-full h-auto"
                                alt="Union"
                                src={community.shape}
                              />
                            )}
                          </div>
                          {community.avatar && (
                            <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-xl rounded-xl p-1 border border-white/20 shadow-lg">
                              <img
                                className="w-[37.89px] h-9 rounded-xl object-cover"
                                alt="Polygon"
                                src={community.avatar}
                              />
                            </div>
                          )}
                          <div className="p-5 space-y-2.5 bg-gradient-to-br from-slate-800/40 to-slate-900/40">
                            <h3 className="[font-family:'SF_Compact_Rounded-Semibold',Helvetica] font-bold text-white text-[20px] tracking-tight drop-shadow-lg group-hover:text-purple-300 transition-colors duration-300">
                              {community.title}
                            </h3>
                            <p className="[font-family:'Lato',Helvetica] font-normal text-white/60 text-[13px] leading-relaxed line-clamp-2">
                              {community.description}
                            </p>
                            <div className="flex items-center justify-between pt-2 border-t border-white/10">
                              {community.online && (
                                <div className="flex items-center gap-1.5">
                                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                                  <span className="[font-family:'Lato',Helvetica] font-semibold text-white/70 text-xs">
                                    {community.online} Online
                                  </span>
                                </div>
                              )}
                              <div className="flex items-center gap-1.5">
                                <span className="[font-family:'SF_Compact_Display-Regular',Helvetica] text-white/40 text-sm font-normal">
                                  􀉭
                                </span>
                                <span className="[font-family:'Lato',Helvetica] font-semibold text-white/70 text-xs">
                                  {community.members} Members
                                </span>
                              </div>
                            </div>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="relative h-[220px] overflow-hidden rounded-t-[20px]">
                            <img
                              className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
                              alt="Photo"
                              src={community.image}
                            />
                          </div>
                          <div className="absolute inset-0 rounded-[20px] overflow-hidden border border-white/30 bg-gradient-to-br from-blue-600/80 to-cyan-500/80 backdrop-blur-sm">
                            {community.polygonTop && (
                              <img
                                className="absolute top-4 left-4 w-[75px] h-20 object-contain opacity-50"
                                alt="Polygon"
                                src={community.polygonTop}
                              />
                            )}
                            {community.polygonBottom && (
                              <img
                                className="absolute top-4 left-4 w-[79px] h-[84px] object-contain"
                                alt="Polygon"
                                src={community.polygonBottom}
                              />
                            )}
                            <div className="p-5 space-y-2.5 absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent">
                              <h3 className="[font-family:'SF_Compact_Rounded-Semibold',Helvetica] font-bold text-white text-[20px] tracking-tight drop-shadow-lg">
                                {community.title}
                              </h3>
                              <p className="[font-family:'Lato',Helvetica] font-normal text-white/90 text-[13px] leading-relaxed line-clamp-2">
                                {community.description}
                              </p>
                              <div className="flex items-center gap-1.5 pt-2">
                                <span className="[font-family:'SF_Compact_Display-Regular',Helvetica] text-white/70 text-sm font-normal">
                                  􀉭
                                </span>
                                <span className="[font-family:'Lato',Helvetica] font-semibold text-white/80 text-xs">
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
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="[font-family:'SF_Compact_Rounded-Semibold',Helvetica] font-bold text-white text-[24px] tracking-tight">
                  Recently Added
                </h2>
                <p className="text-white/50 text-sm mt-1 [font-family:'Lato',Helvetica]">
                  Fresh communities waiting to be discovered
                </p>
              </div>
              <Button
                variant="link"
                className="h-auto p-0 [font-family:'Lato',Helvetica] font-semibold text-blue-400 hover:text-blue-300 text-[14px] flex items-center gap-1"
              >
                See all
                <span>→</span>
              </Button>
            </div>

            {recentCommunities.length === 0 ? (
              <div className="text-center py-16 px-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10">
                <p className="[font-family:'Lato',Helvetica] text-white/40 text-[15px]">
                  No recent communities in {getCategoryDisplayName()} yet.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-3 gap-5">
                {recentCommunities.map((community, index) => (
                  <Card
                    key={index}
                    onClick={() => handleCommunityClick(community.title)}
                    className="relative overflow-hidden bg-gradient-to-br from-slate-800/60 to-slate-900/60 backdrop-blur-2xl rounded-[20px] border border-white/20 shadow-xl hover:shadow-2xl hover:border-emerald-400/40 transition-all duration-500 hover:scale-[1.02] group cursor-pointer"
                  >
                    <CardContent className="p-0 relative">
                      <div className="relative h-[220px] overflow-hidden rounded-t-[20px]">
                        <img
                          className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
                          alt="Photo"
                          src={community.image}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        {community.shape && (
                          <img
                            className="absolute bottom-0 left-0 w-full h-auto"
                            alt="Union"
                            src={community.shape}
                          />
                        )}
                        <div className="absolute top-3 right-3 flex items-center gap-2 bg-black/40 backdrop-blur-xl px-3 py-1.5 rounded-full border border-white/20">
                          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                          <span className="[font-family:'Lato',Helvetica] text-white text-xs font-medium">
                            {community.online ||
                              Math.floor(Math.random() * 500) + 100}{" "}
                            online
                          </span>
                        </div>
                      </div>
                      <div className="p-5 space-y-2.5 bg-gradient-to-br from-slate-800/40 to-slate-900/40">
                        <h3 className="[font-family:'SF_Compact_Rounded-Semibold',Helvetica] font-bold text-white text-[20px] tracking-tight drop-shadow-lg group-hover:text-emerald-300 transition-colors duration-300">
                          {community.title}
                        </h3>
                        <p className="[font-family:'Lato',Helvetica] font-normal text-white/60 text-[13px] leading-relaxed line-clamp-2">
                          {community.description}
                        </p>
                        <div className="flex items-center justify-between pt-2 border-t border-white/10">
                          <div className="flex items-center gap-1.5">
                            <span className="[font-family:'SF_Compact_Display-Regular',Helvetica] text-white/40 text-sm font-normal">
                              􀉭
                            </span>
                            <span className="[font-family:'Lato',Helvetica] font-semibold text-white/70 text-xs">
                              {community.members} Members
                            </span>
                          </div>
                          <div className="px-2.5 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20">
                            <span className="[font-family:'Lato',Helvetica] text-emerald-400 text-[10px] font-bold uppercase tracking-wider">
                              New
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
        </div>
      </ScrollArea>
    </div>
  );
};
