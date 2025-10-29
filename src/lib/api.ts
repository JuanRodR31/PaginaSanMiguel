import { getUploadUrl } from '@/lib/helper';
/* API helper adapted to current backend: donations and videos commented out because backend doesn't provide them yet. */

// export interface Donation {
//   id: number;
//   donor_name?: string;
//   amount: number;
//   message?: string;
//   created_at?: string;
// }

export interface Event {
  id: number;
  title: string;
  description?: string;
  event_date?: string;
  start_date?: string;
  end_date?: string;
  location?: string;
  photos?: string[];
  foundationId?: number | string | null;
}
// export interface Video {
//   id: number;
//   title: string;
//   description?: string;
//   thumbnail_url?: string;
//   video_url?: string;
// }


export interface EventDTO {
  id: number | string;
  title: string;
  description?: string;
  event_date?: string | null; 
  start_date?: string | null;
  end_date?: string | null;
  location?: string;
  photos?: string[]; 
  foundationId?: number | string | null;
}

export interface MemberDTO {
  id: number | string;
  name?: string;
  position?: string;
  responsibilities?: string;
  photo?: string;
  email?: string;
  phone?: string;
  foundationId?: number | string | null;
}

export interface FoundationDTO {
  id: number | string;
  name?: string;
  mission?: string;
  vision?: string;
  history?: string;
  memberIds?: (number | string)[];
  eventIds?: (number | string)[];
  sportsClassIds?: (number | string)[];
}

export interface SportsClassDTO {
  id: number | string;
  name?: string;
  description?: string;
  schedule?: string;
  foundationId?: number | string | null;
}

// export interface VideoDTO {
//   id: number | string;
//   title?: string;
//   description?: string;
//   thumbnail_url?: string;
//   video_url?: string;
// }

/* In-memory mocks */
// let mockDonations: Donation[] = [];
let mockEvents: Event[] = [];
// let mockVideos: Video[] = [];
let mockMembers: MemberDTO[] = [];
let mockFoundations: FoundationDTO[] = [];
let mockSportsClasses: SportsClassDTO[] = [];

async function tryFetchJson(url: string, opts?: RequestInit) {
  try {
    const resp = await fetch(url, opts);
    if (!resp.ok) throw new Error('Network response was not ok');
    return await resp.json();
  } catch (err) {
    return null;
  }
}

/* Helpers to normalize backend DTOs (accepts snake_case or camelCase) */
function toNumberId(id: any): number {
  return id == null ? Date.now() : Number(id);
}

function normalizeEventDTO(d: any): Event {
  const id = toNumberId(d.id ?? d.eventId ?? d.event_id);
  const title = d.title ?? d.name ?? '';
  const description = d.description ?? d.desc ?? '';

  const event_date = d.event_date ?? d.eventDate ?? d.date ?? undefined;
  const start_date = d.start_date ?? d.startDate ?? d.start ?? undefined;
  const end_date = d.end_date ?? d.endDate ?? d.end ?? undefined;

  const location = d.location ?? d.loc ?? d.venue ?? '';

  let photosRaw: any[] = [];
  if (Array.isArray(d.photos)) photosRaw = d.photos.slice();
  else if (d.photos) photosRaw = [d.photos];

  const promo = d.promotionalImage ?? d.promotional_image ?? d.image ?? d.cover;
  if (promo && !photosRaw.includes(promo)) photosRaw.unshift(promo);

  const photos = photosRaw
    .map((p) => {
      if (!p) return undefined;
      if (typeof p === 'string' && /^https?:\/\//i.test(p)) return p;
      return getUploadUrl(p) ?? String(p);
    })
    .filter(Boolean) as string[];

  const status = d.status ?? d.state ?? d.event_status ?? d.eventStatus ?? undefined;
  const link = d.link ?? d.url ?? d.event_url ?? undefined;
  const foundationId = d.foundationId ?? d.foundation_id ?? (d.foundation && (d.foundation.id ?? d.foundationId)) ?? undefined;

  return { id, title, description, event_date: event_date ?? undefined, start_date, end_date, location, photos, status, link, foundationId };
}

// function normalizeVideoDTO(d: any): Video {
//   const id = toNumberId(d.id ?? d.videoId ?? d.video_id);
//   const title = d.title ?? '';
//   const description = d.description ?? '';
//   const video_url = d.video_url ?? d.videoUrl ?? d.url ?? d.video;
//   const thumbnail_url = d.thumbnail_url ?? d.thumbnailUrl ?? d.thumbnail ?? d.thumb;
//   return { id, title, description, video_url, thumbnail_url };
// }

// function normalizeDonationDTO(d: any): Donation {
//   const id = toNumberId(d.id ?? d.donationId ?? d.donation_id);
//   return {
//     id,
//     donor_name: d.donor_name ?? d.donorName ?? d.name,
//     amount: Number(d.amount ?? 0),
//     message: d.message ?? '',
//     created_at: d.created_at ?? d.createdAt ?? undefined,
//   };
// }

/* Exported API functions used by pages (keeps signatures) */

// export async function getDonations(): Promise<Donation[]> {
//   const data = await tryFetchJson('/api/donations');
//   if (Array.isArray(data)) return data.map(normalizeDonationDTO);
//   // fallback: return mock data sorted by created_at desc
//   return mockDonations.slice().sort((a, b) => {
//     const ta = a.created_at ? new Date(a.created_at).getTime() : 0;
//     const tb = b.created_at ? new Date(b.created_at).getTime() : 0;
//     return tb - ta;
//   });
// }

// export async function getTotalDonations(): Promise<number> {
//   const donations = await getDonations();
//   return donations.reduce((sum, d) => sum + Number(d.amount), 0);
// }

// export async function insertDonation(payload: { donor_name?: string; amount: number; message?: string }): Promise<{ success: boolean; donation?: Donation; error?: any }> {
//   // try backend
//   const resp = await tryFetchJson('/api/donations', {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(payload),
//   });
//   if (resp && (resp.id || resp.donationId)) {
//     return { success: true, donation: normalizeDonationDTO(resp) };
//   }

//   // fallback: push into mockDonations
//   const newDonation: Donation = {
//     id: Date.now(),
//     donor_name: payload.donor_name,
//     amount: payload.amount,
//     message: payload.message,
//     created_at: new Date().toISOString(),
//   };
//   mockDonations.unshift(newDonation);
//   return { success: true, donation: newDonation };
// }

export async function getEvents(): Promise<Event[]> {
  const data = await tryFetchJson('/api/events');
  if (Array.isArray(data)) return data.map((d) => normalizeEventDTO(d));
  return mockEvents;
}

// export async function getVideos(): Promise<Video[]> {
//   const data = await tryFetchJson('/api/videos');
//   if (Array.isArray(data)) return data.map((d) => normalizeVideoDTO(d));
//   return mockVideos;
// }

/* New helpers to fetch members/foundations/sports classes (matching DTOs) */
export async function getMembers(): Promise<MemberDTO[]> {
  const data = await tryFetchJson('/api/members');
  if (Array.isArray(data)) return data;
  return mockMembers;
}

export async function getFoundations(): Promise<FoundationDTO[]> {
  const data = await tryFetchJson('/api/foundations');
  if (Array.isArray(data)) return data;
  return mockFoundations;
}

export async function getSportsClasses(): Promise<SportsClassDTO[]> {
  const data = await tryFetchJson('/api/sports-classes');
  if (Array.isArray(data)) return data;
  return mockSportsClasses;
}

/* seedMocks extended to accept new entities */
export function seedMocks({
  // donations,
  events,
  // videos,
  members,
  foundations,
  sportsClasses,
}: {
  // donations?: Donation[];
  events?: Event[];
  // videos?: Video[];
  members?: MemberDTO[];
  foundations?: FoundationDTO[];
  sportsClasses?: SportsClassDTO[];
}) {
  // if (donations) mockDonations = donations;
  if (events) mockEvents = events;
  // if (videos) mockVideos = videos;
  if (members) mockMembers = members;
  if (foundations) mockFoundations = foundations;
  if (sportsClasses) mockSportsClasses = sportsClasses;
}

export default null as unknown as Record<string, never>;