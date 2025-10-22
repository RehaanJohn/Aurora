// Mock data for communities organized by category

export type Category = 'home' | 'music' | 'gaming' | 'education' | 'tech' | 'entertainment' | 'hubs';

export interface Community {
  id: string;
  title: string;
  description: string;
  category: Category;
  image: string;
  shape?: string;
  avatar?: string;
  polygonTop?: string;
  polygonBottom?: string;
  online?: string;
  members: string;
  featured?: boolean;
  trending?: boolean;
}

export const communityData: Community[] = [
  // HOME / ALL CATEGORIES
  {
    id: '1',
    title: 'Virtual Reality',
    description: 'A community for VR enthusiasts and novices alike, regular and friendly chat.',
    category: 'tech',
    image: '/group-img.png',
    shape: '/shape-1.svg',
    avatar: '/avatar.svg',
    online: '5,678',
    members: '345,678',
    featured: true,
    trending: true,
  },
  {
    id: '2',
    title: 'NFT Collectors',
    description: 'An NFT community where everyone can share their collections and discoveries.',
    category: 'tech',
    image: '/7.png',
    polygonTop: '/polygon-1-4.svg',
    polygonBottom: '/polygon-2.svg',
    members: '887,789',
    featured: true,
    trending: true,
  },

  // MUSIC
  {
    id: '3',
    title: 'Electronic Beats',
    description: 'Share and discover electronic music from around the world.',
    category: 'music',
    image: '/photo-1539140953823-8de95668cb0e-1.png',
    shape: '/union-1.svg',
    avatar: '/polygon-1.png',
    online: '12,453',
    members: '234,567',
    featured: true,
    trending: true,
  },
  {
    id: '4',
    title: 'Indie Artists Hub',
    description: 'A space for independent musicians to collaborate and share their work.',
    category: 'music',
    image: '/photo-1634986666676-ec8fd927c23d-1.png',
    online: '8,234',
    members: '156,789',
    trending: true,
  },
  {
    id: '5',
    title: 'Classical Music Society',
    description: 'Discuss and appreciate classical compositions from all eras.',
    category: 'music',
    image: '/photo-1651211305258-0c08f09097b3-1.png',
    members: '89,456',
  },
  {
    id: '6',
    title: 'Hip Hop Culture',
    description: 'Everything hip hop - music, culture, and lifestyle.',
    category: 'music',
    image: '/photo-1539140953823-8de95668cb0e-1-1.png',
    shape: '/union.svg',
    online: '15,678',
    members: '445,234',
  },
  {
    id: '7',
    title: 'Jazz Lounge',
    description: 'Smooth jazz discussions and listening sessions.',
    category: 'music',
    image: '/photo-1539140953823-8de95668cb0e-1-2.png',
    shape: '/union-2.svg',
    members: '67,890',
  },

  // GAMING
  {
    id: '8',
    title: 'Game Play',
    description: 'Always a new challenge. Great place to make new gaming friends.',
    category: 'gaming',
    image: '/photo-1539140953823-8de95668cb0e-1.png',
    shape: '/union-1.svg',
    avatar: '/polygon-1.png',
    online: '28,628',
    members: '527,955',
    featured: true,
    trending: true,
  },
  {
    id: '9',
    title: 'Esports Arena',
    description: 'Competitive gaming discussions, tournaments, and team formation.',
    category: 'gaming',
    image: '/photo-1634986666676-ec8fd927c23d-1.png',
    online: '45,123',
    members: '892,456',
    featured: true,
    trending: true,
  },
  {
    id: '10',
    title: 'Retro Gaming',
    description: 'Celebrate classic games and gaming history.',
    category: 'gaming',
    image: '/photo-1651211305258-0c08f09097b3-1.png',
    members: '178,234',
  },
  {
    id: '11',
    title: 'RPG Masters',
    description: 'For lovers of role-playing games, from tabletop to video games.',
    category: 'gaming',
    image: '/photo-1539140953823-8de95668cb0e-1-1.png',
    shape: '/union.svg',
    online: '23,456',
    members: '312,789',
    trending: true,
  },
  {
    id: '12',
    title: 'Game Developers',
    description: 'Share your game dev projects and get feedback from the community.',
    category: 'gaming',
    image: '/photo-1539140953823-8de95668cb0e-1-2.png',
    shape: '/union-2.svg',
    members: '98,765',
  },

  // EDUCATION
  {
    id: '13',
    title: 'Web3 Academy',
    description: 'Learn about blockchain, crypto, and decentralized technologies.',
    category: 'education',
    image: '/group-img.png',
    shape: '/shape-1.svg',
    avatar: '/avatar.svg',
    online: '6,789',
    members: '234,567',
    featured: true,
    trending: true,
  },
  {
    id: '14',
    title: 'Code Learners',
    description: 'A supportive community for those learning to code.',
    category: 'education',
    image: '/photo-1539140953823-8de95668cb0e-1.png',
    shape: '/union-1.svg',
    online: '18,234',
    members: '456,789',
    trending: true,
  },
  {
    id: '15',
    title: 'Data Science Hub',
    description: 'Explore data analysis, machine learning, and AI together.',
    category: 'education',
    image: '/photo-1634986666676-ec8fd927c23d-1.png',
    members: '187,654',
  },
  {
    id: '16',
    title: 'Language Exchange',
    description: 'Practice languages with native speakers from around the world.',
    category: 'education',
    image: '/photo-1651211305258-0c08f09097b3-1.png',
    online: '9,876',
    members: '278,345',
  },
  {
    id: '17',
    title: 'Digital Marketing Pro',
    description: 'Master the art of digital marketing and social media.',
    category: 'education',
    image: '/photo-1539140953823-8de95668cb0e-1-1.png',
    shape: '/union.svg',
    members: '134,567',
  },

  // SCIENCE & TECH
  {
    id: '18',
    title: 'AI Innovators',
    description: 'Discuss the latest in artificial intelligence and machine learning.',
    category: 'tech',
    image: '/photo-1539140953823-8de95668cb0e-1.png',
    shape: '/union-1.svg',
    avatar: '/polygon-1.png',
    online: '14,567',
    members: '389,234',
    featured: true,
    trending: true,
  },
  {
    id: '19',
    title: '3D Art Studio',
    description: 'A creative space to discuss 3D modeling, rendering, and animation.',
    category: 'tech',
    image: '/photo-1634986666676-ec8fd927c23d-1.png',
    polygonTop: '/polygon-16.svg',
    polygonBottom: '/polygon-17.svg',
    members: '345,678',
    trending: true,
  },
  {
    id: '20',
    title: 'Space Exploration',
    description: 'A community for space enthusiasts and astronomy lovers.',
    category: 'tech',
    image: '/photo-1539140953823-8de95668cb0e-1-2.png',
    shape: '/union-2.svg',
    members: '267,890',
  },
  {
    id: '21',
    title: 'Robotics Lab',
    description: 'Build, program, and discuss robotics projects.',
    category: 'tech',
    image: '/photo-1651211305258-0c08f09097b3-1.png',
    online: '5,432',
    members: '123,456',
  },
  {
    id: '22',
    title: 'Quantum Computing',
    description: 'Explore the future of computing with quantum technology.',
    category: 'tech',
    image: '/photo-1539140953823-8de95668cb0e-1-1.png',
    shape: '/union.svg',
    members: '78,901',
  },

  // ENTERTAINMENT
  {
    id: '23',
    title: 'Movie Buffs',
    description: 'Discuss your favorite movies, TV shows, and cinema.',
    category: 'entertainment',
    image: '/photo-1651211305258-0c08f09097b3-1.png',
    online: '22,345',
    members: '567,890',
    featured: true,
    trending: true,
  },
  {
    id: '24',
    title: 'Anime Community',
    description: 'Share and discuss anime, manga, and Japanese culture.',
    category: 'entertainment',
    image: '/photo-1539140953823-8de95668cb0e-1.png',
    shape: '/union-1.svg',
    online: '34,567',
    members: '723,456',
    trending: true,
  },
  {
    id: '25',
    title: 'Book Club',
    description: 'Monthly book discussions and reading recommendations.',
    category: 'entertainment',
    image: '/photo-1634986666676-ec8fd927c23d-1.png',
    members: '189,234',
  },
  {
    id: '26',
    title: 'Comedy Central',
    description: 'Share jokes, memes, and funny content.',
    category: 'entertainment',
    image: '/photo-1539140953823-8de95668cb0e-1-1.png',
    shape: '/union.svg',
    online: '18,765',
    members: '434,567',
  },
  {
    id: '27',
    title: 'Photography Art',
    description: 'Share your photos and learn from professional photographers.',
    category: 'entertainment',
    image: '/photo-1539140953823-8de95668cb0e-1-2.png',
    shape: '/union-2.svg',
    members: '298,765',
  },

  // STUDENT HUBS
  {
    id: '28',
    title: 'University Connect',
    description: 'Connect with students from universities around the world.',
    category: 'hubs',
    image: '/group-img.png',
    shape: '/shape-1.svg',
    avatar: '/avatar.svg',
    online: '8,901',
    members: '178,234',
    featured: true,
    trending: true,
  },
  {
    id: '29',
    title: 'Study Groups',
    description: 'Form study groups and collaborate on assignments.',
    category: 'hubs',
    image: '/photo-1539140953823-8de95668cb0e-1.png',
    shape: '/union-1.svg',
    online: '12,345',
    members: '234,567',
    trending: true,
  },
  {
    id: '30',
    title: 'Research Papers',
    description: 'Share and discuss academic research papers.',
    category: 'hubs',
    image: '/photo-1634986666676-ec8fd927c23d-1.png',
    members: '89,012',
  },
  {
    id: '31',
    title: 'Career Advice',
    description: 'Get guidance on internships, jobs, and career paths.',
    category: 'hubs',
    image: '/photo-1651211305258-0c08f09097b3-1.png',
    online: '6,543',
    members: '156,789',
  },
  {
    id: '32',
    title: 'Student Startups',
    description: 'Connect with student entrepreneurs and build your startup.',
    category: 'hubs',
    image: '/photo-1539140953823-8de95668cb0e-1-1.png',
    shape: '/union.svg',
    members: '123,456',
  },
];

// Helper function to get communities by category
export const getCommunitiesByCategory = (category: Category): Community[] => {
  if (category === 'home') {
    return communityData;
  }
  return communityData.filter(community => community.category === category);
};

// Helper function to get featured communities by category
export const getFeaturedCommunities = (category: Category): Community[] => {
  const communities = getCommunitiesByCategory(category);
  return communities.filter(community => community.featured);
};

// Helper function to get trending communities by category
export const getTrendingCommunities = (category: Category): Community[] => {
  const communities = getCommunitiesByCategory(category);
  return communities.filter(community => community.trending);
};

// Helper function to get recent communities by category
export const getRecentCommunities = (category: Category): Community[] => {
  const communities = getCommunitiesByCategory(category);
  return communities.slice(-5).reverse(); // Get last 5 communities
};
