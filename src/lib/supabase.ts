import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Player {
  id: string;
  name: string;
  position: string;
  age: number;
  photo_url: string;
  bio: string;
  achievements: string;
  created_at: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  event_date: string;
  location: string;
  photos: string[];
  created_at: string;
}

export interface Video {
  id: string;
  title: string;
  description: string;
  video_url: string;
  thumbnail_url: string;
  created_at: string;
}

export interface Donation {
  id: string;
  donor_name: string;
  amount: number;
  message: string;
  created_at: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  photo_url: string;
  bio: string;
  order_index: number;
  created_at: string;
}
