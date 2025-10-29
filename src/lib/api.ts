import { getUploadUrl } from '@/lib/helper';

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

  return { id, title, description, event_date: event_date ?? undefined, start_date, end_date, location, photos, foundationId };
}


// }

export async function getEvents(): Promise<Event[]> {
  const data = await tryFetchJson('/api/events');
  if (Array.isArray(data)) return data.map((d) => normalizeEventDTO(d));
  return mockEvents;
}



/* seedMocks extended to accept new entities */
export function seedMocks({
  // donations,
  events,
  // videos,
  
}: {
  // donations?: Donation[];
  events?: Event[];
  // videos?: Video[];
  
}) {
  // if (donations) mockDonations = donations;
  if (events) mockEvents = events;
  // if (videos) mockVideos = videos;
  
}

export default null as unknown as Record<string, never>;