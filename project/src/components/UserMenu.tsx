import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Separator } from './ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Settings, LogOut, User, HelpCircle, Sparkles } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export const UserMenu: React.FC = () => {
  const { user, signOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
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

  const handleSignOut = async () => {
    try {
      await signOut();
      setIsOpen(false);
    } catch (error) {
      console.error('Sign out failed:', error);
    }
  };

  const getUserDisplayName = () => {
    return user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'User';
  };

  const getUserAvatar = () => {
    return user?.user_metadata?.avatar_url || user?.user_metadata?.picture;
  };

  return (
    <div className="relative" ref={menuRef}>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 hover:opacity-90 transition-all duration-300 shadow-lg hover:shadow-xl relative group"
      >
        <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400 blur-lg opacity-50 group-hover:opacity-70 transition-opacity"></div>
        <Sparkles className="w-6 h-6 text-white relative z-10" />
      </Button>

      {isOpen && (
        <Card className="absolute bottom-full left-0 mb-3 w-72 bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl z-50 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <CardContent className="p-4 space-y-3">
            <div className="flex items-center gap-3 pb-3">
              <Avatar className="w-12 h-12 border-2 border-white/20">
                <AvatarImage src={getUserAvatar()} alt={getUserDisplayName()} />
                <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white">
                  {getUserDisplayName().charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="[font-family:'Lato',Helvetica] font-bold text-white text-sm truncate">
                  {getUserDisplayName()}
                </p>
                <p className="[font-family:'Lato',Helvetica] font-normal text-white/60 text-xs truncate">
                  {user?.email}
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
                <HelpCircle className="w-4 h-4" />
                <span className="[font-family:'Lato',Helvetica] text-sm">Help & Support</span>
              </Button>
            </div>

            <Separator className="bg-white/10" />

            <Button
              variant="ghost"
              onClick={handleSignOut}
              className="w-full justify-start gap-3 px-3 py-2 hover:bg-red-500/20 text-red-400 hover:text-red-300 transition-all duration-300"
            >
              <LogOut className="w-4 h-4" />
              <span className="[font-family:'Lato',Helvetica] text-sm">Sign Out</span>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
