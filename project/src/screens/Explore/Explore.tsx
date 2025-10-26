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
      <div className="mb-6 bg-white/5 backdrop-blur-md rounded-xl border border-white/20 p-3 flex items-center gap-2 hover:bg-white/10 transition-all duration-300 flex-shrink-0">
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

      <ScrollArea className="flex-1 min-h-0">
        <div className="space-y-8 pb-6">
          <section>
            <Card className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-[20px] overflow-hidden border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-[1.01]">
              <CardContent className="p-0 flex flex-col">
                <div className="p-8 flex flex-col gap-2 bg-gradient-to-b from-slate-800/80 to-transparent">
                  <h2 className="[font-family:'SF_Compact_Rounded-Regular',Helvetica] font-normal text-white text-2xl text-center drop-shadow-lg">
                    Find Your Community
                  </h2>
                  <h2 className="[font-family:'SF_Compact_Rounded-Regular',Helvetica] font-normal text-white text-2xl text-center drop-shadow-lg">
                    on Daccord
                  </h2>
                </div>
                <div className="w-full h-[200px] overflow-hidden">
                  <img
                    className="w-full h-full object-cover object-center"
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
                    className="bg-white/5 backdrop-blur-xl rounded-[20px] overflow-hidden border border-white/20 shadow-xl hover:shadow-2xl hover:border-blue-400/30 transition-all duration-500 hover:scale-[1.01] relative group cursor-pointer"
                  >
                    <CardContent className="p-0 relative">
                      <div className="relative h-[240px] overflow-hidden">
                        <img
                          className="w-full h-full object-cover object-center"
                          alt="Group img"
                          src={community.image}
                        />
                        {community.shape && (
                          <img
                            className="absolute bottom-0 left-0 w-full h-auto"
                            alt="Shape"
                            src={community.shape}
                          />
                        )}
                      </div>
                      <div className="p-6 space-y-4 bg-gradient-to-t from-slate-900/50 to-transparent">
                        <div className="flex items-center gap-3">
                          {community.avatar && (
                            <img
                              className="w-[38px] h-9 object-contain"
                              alt="Avatar"
                              src={community.avatar}
                            />
                          )}
                          <h3 className="[font-family:'SF_Compact_Rounded-Semibold',Helvetica] font-normal text-white text-[22px] drop-shadow-md">
                            {community.title}
                          </h3>
                        </div>
                        <p className="[font-family:'Lato',Helvetica] font-normal text-white/70 text-[13px] leading-relaxed">
                          {community.description}
                        </p>
                        <div className="flex items-center justify-between pt-2">
                          <div className="flex items-center gap-1">
                            <span className="[font-family:'SF_Compact-Regular',Helvetica] text-white/50 text-xs font-normal">
                              􁂛
                            </span>
                            <span className="[font-family:'Lato',Helvetica] font-normal text-white/50 text-xs">
                              {community.online} Online
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <span className="[font-family:'SF_Compact_Display-Regular',Helvetica] text-white/50 text-xs font-normal">
                              􀉭
                            </span>
                            <span className="[font-family:'Lato',Helvetica] font-normal text-white/50 text-xs">
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
                    className="bg-white/5 backdrop-blur-xl rounded-[20px] overflow-hidden border border-white/20 shadow-xl hover:shadow-2xl hover:border-emerald-400/30 transition-all duration-500 hover:scale-[1.01] relative group cursor-pointer"
                  >
                    <CardContent className="p-0 relative">
                      {community.shape ? (
                        <>
                          <div className="relative h-[220px] overflow-hidden">
                            <img
                              className="w-full h-full object-cover object-center"
                              alt="Photo"
                              src={community.image}
                            />
                            {community.shape && (
                              <img
                                className="absolute bottom-0 left-0 w-full h-auto"
                                alt="Union"
                                src={community.shape}
                              />
                            )}
                          </div>
                          {community.avatar && (
                            <div className="absolute top-4 left-4 bg-black/30 backdrop-blur-sm rounded-xl p-1">
                              <img
                                className="w-[37.89px] h-9 rounded-xl object-cover"
                                alt="Polygon"
                                src={community.avatar}
                              />
                            </div>
                          )}
                          <div className="p-5 space-y-2 bg-gradient-to-t from-slate-900/50 to-transparent">
                            <h3 className="[font-family:'SF_Compact_Rounded-Semibold',Helvetica] font-normal text-white text-[20px] drop-shadow-md">
                              {community.title}
                            </h3>
                            <p className="[font-family:'Lato',Helvetica] font-normal text-white/70 text-[13px] leading-relaxed line-clamp-2">
                              {community.description}
                            </p>
                            <div className="flex items-center justify-between pt-2">
                              {community.online && (
                                <div className="flex items-center gap-1">
                                  <span className="[font-family:'SF_Compact_Display-Regular',Helvetica] font-normal text-white/50 text-xs">
                                    􁂛
                                  </span>
                                  <span className="[font-family:'Lato',Helvetica] font-normal text-white/50 text-xs">
                                    {community.online} Online
                                  </span>
                                </div>
                              )}
                              <div className="flex items-center gap-1">
                                <span className="[font-family:'SF_Compact_Display-Regular',Helvetica] font-normal text-white/50 text-xs">
                                  􀉭
                                </span>
                                <span className="[font-family:'Lato',Helvetica] font-normal text-white/50 text-xs">
                                  {community.members} Members
                                </span>
                              </div>
                            </div>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="relative h-[220px] overflow-hidden">
                            <img
                              className="w-full h-full object-cover object-center"
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
                            <div className="p-5 space-y-2 absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/40 to-transparent">
                              <h3 className="[font-family:'SF_Compact_Rounded-Semibold',Helvetica] font-normal text-white text-[20px] drop-shadow-lg">
                                {community.title}
                              </h3>
                              <p className="[font-family:'Lato',Helvetica] font-normal text-white/90 text-[13px] leading-relaxed line-clamp-2">
                                {community.description}
                              </p>
                              <div className="flex items-center gap-1 pt-1">
                                <span className="[font-family:'SF_Compact_Display-Regular',Helvetica] text-white/70 text-xs font-normal">
                                  􀉭
                                </span>
                                <span className="[font-family:'Lato',Helvetica] font-normal text-white/70 text-xs">
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
                    className="bg-white/5 backdrop-blur-xl rounded-[20px] overflow-hidden border border-white/20 shadow-xl hover:shadow-2xl hover:border-emerald-400/30 transition-all duration-500 hover:scale-[1.01] relative group cursor-pointer"
                  >
                    <CardContent className="p-0 relative">
                      <div className="relative h-[220px] overflow-hidden">
                        <img
                          className="w-full h-full object-cover object-center"
                          alt="Photo"
                          src={community.image}
                        />
                        {community.shape && (
                          <img
                            className="absolute bottom-0 left-0 w-full h-auto"
                            alt="Union"
                            src={community.shape}
                          />
                        )}
                      </div>
                      <div className="p-5 space-y-2 bg-gradient-to-t from-slate-900/50 to-transparent">
                        <h3 className="[font-family:'SF_Compact_Rounded-Semibold',Helvetica] font-normal text-white text-[20px] drop-shadow-md">
                          {community.title}
                        </h3>
                        <p className="[font-family:'Lato',Helvetica] font-normal text-white/70 text-[13px] leading-relaxed line-clamp-2">
                          {community.description}
                        </p>
                        <div className="flex items-center gap-1 pt-1">
                          <span className="[font-family:'SF_Compact_Display-Regular',Helvetica] text-white/50 text-xs font-normal">
                            􀉭
                          </span>
                          <span className="[font-family:'Lato',Helvetica] font-normal text-white/50 text-xs">
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
  );
};
