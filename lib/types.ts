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
  photoUrl?: string; // optional — initials shown as fallback
  avatarColor: string; // tailwind bg class
  avatarText: string; // tailwind text class
};
