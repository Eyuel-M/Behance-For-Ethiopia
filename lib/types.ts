export type PortfolioItem = {
  id: string;
  title: string;
  category: string;
  gradient: string; // tailwind gradient utility classes
};

export type Designer = {
  id: string;
  name: string;
  slug: string;
  category: string;
  skills: string[];
  experience: number; // years
  location: string;
  rate: number; // USD per hour
  rating: number;
  reviewCount: number;
  bio: string;
  available: boolean;
  portfolio: PortfolioItem[];
  photoUrl?: string; // optional — initials shown as fallback
  avatarColor: string; // tailwind bg class
  avatarText: string; // tailwind text class
};
