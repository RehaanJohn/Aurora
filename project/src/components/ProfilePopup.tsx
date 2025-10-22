import React, { useState, useRef, useEffect } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Separator } from './ui/separator';
import { User, Settings, LogOut, Bell, HelpCircle } from 'lucide-react';

interface ProfilePopupProps {
  username: string;
  avatar: string;
}

export const ProfilePopup: React.FC<ProfilePopupProps> = ({ username, avatar }) => {
  const [isOpen, setIsOpen] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative" ref={popupRef}>
      <Button
        variant="ghost"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 h-auto p-0 hover:bg-white/10 rounded-lg px-2 py-1 transition-all duration-300"
      >
        <Avatar className="w-[28.71px] h-[31.76px]">
          <AvatarImage src={avatar} alt="Profile" />
          <AvatarFallback>SF</AvatarFallback>
        </Avatar>
        <span className="[font-family:'SF_Compact_Display-Regular',Helvetica] font-normal text-white text-[13px]">
          {username}
        </span>
      </Button>

      {isOpen && (
        <Card className="absolute top-full left-0 mt-2 w-64 bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl z-50 animate-in fade-in slide-in-from-top-2 duration-200">
          <CardContent className="p-4 space-y-3">
            <div className="flex items-center gap-3 pb-3">
              <Avatar className="w-12 h-12">
                <AvatarImage src={avatar} alt="Profile" />
                <AvatarFallback>SF</AvatarFallback>
              </Avatar>
              <div>
                <p className="[font-family:'Lato',Helvetica] font-bold text-white text-sm">
                  Sophie Fortune
                </p>
                <p className="[font-family:'Lato',Helvetica] font-normal text-white/60 text-xs">
                  @{username}
                </p>
              </div>
            </div>

            <Separator className="bg-white/10" />

            <div className="space-y-1">
              <Button
                variant="ghost"
                className="w-full justify-start gap-3 px-3 py-2 hover:bg-white/10 text-white transition-all duration-300"
              >
                <User className="w-4 h-4" />
                <span className="[font-family:'Lato',Helvetica] text-sm">View Profile</span>
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start gap-3 px-3 py-2 hover:bg-white/10 text-white transition-all duration-300"
              >
                <Settings className="w-4 h-4" />
                <span className="[font-family:'Lato',Helvetica] text-sm">Settings</span>
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start gap-3 px-3 py-2 hover:bg-white/10 text-white transition-all duration-300"
              >
                <Bell className="w-4 h-4" />
                <span className="[font-family:'Lato',Helvetica] text-sm">Notifications</span>
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start gap-3 px-3 py-2 hover:bg-white/10 text-white transition-all duration-300"
              >
                <HelpCircle className="w-4 h-4" />
                <span className="[font-family:'Lato',Helvetica] text-sm">Help & Support</span>
              </Button>
            </div>

            <Separator className="bg-white/10" />

            <Button
              variant="ghost"
              className="w-full justify-start gap-3 px-3 py-2 hover:bg-red-500/20 text-red-400 transition-all duration-300"
            >
              <LogOut className="w-4 h-4" />
              <span className="[font-family:'Lato',Helvetica] text-sm">Log Out</span>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
