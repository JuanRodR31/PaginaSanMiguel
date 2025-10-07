// Lightweight API wrapper to replace Supabase calls.
// Exports functions that pages use; currently try to call /api endpoints (if present),
// otherwise fallback to in-memory mock data so the UI keeps working until the real
// backend is integrated.

export interface Donation {
  id: number;
  donor_name?: string;
  amount: number;
  message?: string;
  created_at?: string;
}

export interface Event {
  id: number;
  title: string;
  description?: string;
  event_date?: string;
  location?: string;
  photos?: string[];
}

export interface Video {
  id: number;
  title: string;
  description?: string;
  thumbnail_url?: string;
  video_url?: string;
}

// In-memory mocks
let mockDonations: Donation[] = [];
let mockEvents: Event[] = [];
let mockVideos: Video[] = [];

async function tryFetchJson(url: string, opts?: RequestInit) {
  try {
    const resp = await fetch(url, opts);
    if (!resp.ok) throw new Error('Network response was not ok');
    return await resp.json();
  } catch (err) {
    return null;
  }
}

export async function getDonations(): Promise<Donation[]> {
  const data = await tryFetchJson('/api/donations');
  if (Array.isArray(data)) return data;
  // fallback: return mock data sorted by created_at desc
  return mockDonations.slice().sort((a, b) => {
    const ta = a.created_at ? new Date(a.created_at).getTime() : 0;
    const tb = b.created_at ? new Date(b.created_at).getTime() : 0;
    return tb - ta;
  });
}

export async function getTotalDonations(): Promise<number> {
  const donations = await getDonations();
  return donations.reduce((sum, d) => sum + Number(d.amount), 0);
}

export async function insertDonation(payload: { donor_name?: string; amount: number; message?: string }): Promise<{ success: boolean; donation?: Donation; error?: any }> {
  // try backend
  const resp = await tryFetchJson('/api/donations', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (resp && resp.id) return { success: true, donation: resp };

  // fallback: push into mockDonations
  const newDonation: Donation = {
    id: Date.now(),
    donor_name: payload.donor_name,
    amount: payload.amount,
    message: payload.message,
    created_at: new Date().toISOString(),
  };
  mockDonations.unshift(newDonation);
  return { success: true, donation: newDonation };
}

export async function getEvents(): Promise<Event[]> {
  const data = await tryFetchJson('/api/events');
  if (Array.isArray(data)) return data;
  return mockEvents;
}

export async function getVideos(): Promise<Video[]> {
  const data = await tryFetchJson('/api/videos');
  if (Array.isArray(data)) return data;
  return mockVideos;
}

export function seedMocks({ donations, events, videos }: { donations?: Donation[]; events?: Event[]; videos?: Video[] }) {
  if (donations) mockDonations = donations;
  if (events) mockEvents = events;
  if (videos) mockVideos = videos;
}

export default null as unknown as Record<string, never>;
