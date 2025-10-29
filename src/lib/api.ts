import { getUploadUrl } from '@/lib/helper';

// ======== EVENTOS ========

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

let mockEvents: Event[] = [];

async function tryFetchJson(url: string, opts?: RequestInit) {
  try {
    const resp = await fetch(url, {
      ...opts,
      credentials: 'include', // <-- AGREGAR ESTA LÍNEA
      headers: {
        'Content-Type': 'application/json',
        ...opts?.headers,
      },
    });

    // Manejo explícito de 401: no lanzar, registrar y opcionalmente redirigir a login
    if (resp.status === 401) {
      console.warn(`Unauthorized (401) when requesting ${url}`);
      // Si la app es cliente y queremos forzar login:
      if (typeof window !== 'undefined') {
        const path = window.location.pathname || '/';
        if (!path.startsWith('/login')) {
          // redirige al login para re-autenticación (evita bucles)
          window.location.assign('/login');
        }
      }
      return null;
    }

    // Otros códigos no ok: registrar y devolver null (no lanzar)
    if (!resp.ok) {
      const body = await resp.text().catch(() => null);
      console.error(`HTTP ${resp.status} when fetching ${url}:`, body);
      return null;
    }

    // No content
    if (resp.status === 204) return null;

    const contentType = resp.headers.get('content-type') ?? '';
    if (contentType.includes('application/json')) {
      return await resp.json();
    }

    // Fallback: devolver texto si no es JSON
    return await resp.text();
  } catch (err) {
    console.error('Fetch error:', err);
    return null;
  }
}

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

  const foundationId = d.foundationId ?? d.foundation_id ?? (d.foundation && (d.foundation.id ?? d.foundationId)) ?? undefined;

  return { id, title, description, event_date: event_date ?? undefined, start_date, end_date, location, photos, foundationId };
}

export async function getEvents(): Promise<Event[]> {
  const data = await tryFetchJson('/api/events');
  if (Array.isArray(data)) return data.map((d) => normalizeEventDTO(d));
  return mockEvents;
}

export function seedMocks({
  events,
}: {
  events?: Event[];
}) {
  if (events) mockEvents = events;
}

// ======== GALERÍA ========

/**
 * Modelo de galería que corresponde a la entidad Gallery del backend
 * { galleryId: number, photos: string[] }
 */
export interface Gallery {
  id: number;
  photos: string[];
}

/**
 * Modelo para un item individual de galería con su URL procesada
 */
export interface GalleryItem {
  url: string;
  id?: string;
}

// Mocks para galería
let mockGalleries: Gallery[] = [];
let mockGalleryItems: GalleryItem[] = [];

/**
 * Normaliza la respuesta del backend a un objeto Gallery
 * Acepta: { galleryId, photos } o { id, photos }
 */
function normalizeGallery(d: any): Gallery | null {
  if (!d) return null;
  
  // Prioriza 'id' que es lo que envía el backend
  const idRaw = d.id ?? d.galleryId ?? d.gallery_id ?? d.galleryID;
  if (idRaw == null) return null;
  const id = Number(idRaw);

  // El resto permanece igual...
  const rawPhotos: any[] = Array.isArray(d.photos) ? d.photos : [];
  
  const photos = rawPhotos
    .map((p) => {
      if (!p) return undefined;
      if (typeof p === 'string' && /^https?:\/\//i.test(p)) return p;
      return getUploadUrl(p) ?? String(p);
    })
    .filter(Boolean) as string[];

  return { id, photos };
}
/**
 * Normaliza una lista de items de galería
 * Acepta: [{ url }] o ["filename.jpg"]
 */
function normalizeGalleryItems(data: any): GalleryItem[] {
  if (!Array.isArray(data)) return [];
  
  return data
    .map((d, index) => {
      // Puede ser un string directo o un objeto { url }
      const rawUrl = typeof d === 'string' ? d : d?.url;
      if (!rawUrl) return null;
      
      // Procesa la URL
      const url =
        typeof rawUrl === 'string' && /^https?:\/\//i.test(rawUrl)
          ? rawUrl
          : getUploadUrl(rawUrl) ?? String(rawUrl);
      
      // Genera un ID único si no existe
      const id = typeof d === 'object' && d?.id ? String(d.id) : `item-${index}`;
      
      return { url, id } as GalleryItem;
    })
    .filter(Boolean) as GalleryItem[];
}

/**
 * GET /api/gallery -> Obtiene LA galería principal
 * Retorna: { galleryId, photos: [...] } o null
 */
export async function getGallery(): Promise<Gallery | null> {
  const data = await tryFetchJson('/api/gallery');
  if (data) {
    const g = normalizeGallery(data);
    if (g) return g;
  }
  // Fallback a mock si no hay respuesta del backend
  return mockGalleries.length ? mockGalleries[0] : null;
}

/**
 * GET /api/galleries -> Obtiene todas las galerías
 * Retorna: [{ galleryId, photos: [...] }, ...]
 */
export async function getGalleries(): Promise<Gallery[]> {
  const data = await tryFetchJson('/api/galleries');
  if (Array.isArray(data)) {
    return data.map((d) => normalizeGallery(d)).filter(Boolean) as Gallery[];
  }
  return mockGalleries;
}

/**
 * GET /api/gallery/items -> Obtiene items de galería como lista plana
 * Retorna: [{ url, id }, ...]
 */
export async function getGalleryItems(): Promise<GalleryItem[]> {
  const data = await tryFetchJson('/api/gallery/items');
  if (Array.isArray(data)) return normalizeGalleryItems(data);
  return mockGalleryItems;
}

/**
 * Obtiene todas las fotos de todas las galerías como lista plana
 * Útil para mostrar una galería unificada
 */
export async function getAllGalleryPhotos(): Promise<GalleryItem[]> {
  const galleries = await getGalleries();
  const allPhotos: GalleryItem[] = [];
  
  galleries.forEach((gallery, galleryIndex) => {
    gallery.photos.forEach((url, photoIndex) => {
      allPhotos.push({
        url,
        id: `gallery-${gallery.id}-photo-${photoIndex}`
      });
    });
  });
  
  return allPhotos;
}

/**
 * Seeding para mocks de galería (útil para desarrollo)
 */
export function seedGalleryMocks({
  galleries,
  items,
}: {
  galleries?: Gallery[];
  items?: GalleryItem[];
}) {
  if (galleries) mockGalleries = galleries;
  if (items) mockGalleryItems = items;
}

export default null as unknown as Record<string, never>;