import React from 'react';
import { Home, Music, Gamepad2, GraduationCap, Cpu, Film, Users } from 'lucide-react';

interface NavigationIconProps {
  type: 'home' | 'music' | 'gaming' | 'education' | 'tech' | 'entertainment' | 'hubs';
  className?: string;
}

export const NavigationIcon: React.FC<NavigationIconProps> = ({ type, className = "w-5 h-5" }) => {
  const icons = {
    home: <Home className={className} />,
    music: <Music className={className} />,
    gaming: <Gamepad2 className={className} />,
    education: <GraduationCap className={className} />,
    tech: <Cpu className={className} />,
    entertainment: <Film className={className} />,
    hubs: <Users className={className} />,
  };

  return icons[type] || icons.home;
};
