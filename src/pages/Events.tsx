import { useState, useEffect } from 'react';
import { Calendar, MapPin } from 'lucide-react';
import { Event, getEvents } from '../lib/api';

export default function Events() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadEvents();
  }, []);

  async function loadEvents() {
    try {
      const data = await getEvents();
      setEvents(data || []);
    } catch (error) {
      console.error('Error loading events:', error);
    } finally {
      setLoading(false);
    }
  }

    const parseDateSafe = (dateInput?: string | number | null) => {
    if (!dateInput && dateInput !== 0) return null;
    // Si ya es número (timestamp) o Date-like
    if (typeof dateInput === "number") return new Date(dateInput);
    // Normalizar si viene como "2025-12-15" (YYYY-MM-DD)
    const dateString = String(dateInput);
    const normalized = /^\d{4}-\d{2}-\d{2}$/.test(dateString)
      ? `${dateString}T00:00:00Z`
      : dateString;
    const d = new Date(normalized);
    return Number.isNaN(d.getTime()) ? null : d;
  };

  const formatDate = (dateString?: string | null) => {
    const d = parseDateSafe(dateString);
    if (!d) return dateString ?? null;
    return d.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  // Si algún evento tiene inicio/fin, se mostrará "10–12 de junio de 2024".
  const formatDateRange = (start?: string | null, end?: string | null) => {
    const ds = parseDateSafe(start);
    const de = parseDateSafe(end);
    if (ds && de) {
      const sameMonth = ds.getMonth() === de.getMonth() && ds.getFullYear() === de.getFullYear();
      const opts: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
      if (sameMonth) {
        const startDay = ds.toLocaleDateString('es-ES', { day: 'numeric' });
        const tail = de.toLocaleDateString('es-ES', { ...opts });
        // tail ya incluye "de junio de 2024", así que concatenamos "10–12 de junio de 2024"
        return `${startDay}–${tail}`;
      }
      return `${ds.toLocaleDateString('es-ES', opts)} – ${de.toLocaleDateString('es-ES', opts)}`;
    }
    // Fallback a una sola fecha (event_date)
    return formatDate(start || end || undefined);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-900" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Nuestros Eventos</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Descubre las actividades, torneos y momentos especiales que hemos compartido con nuestra comunidad.
          </p>
        </div>

        {events.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl shadow-lg">
            <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <p className="text-xl text-gray-600">Próximamente compartiremos nuestros eventos.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => {
              const cover =
                event.photos && event.photos.length > 0 ? event.photos[0] : undefined;

              // Soporta event.event_date o (event.start_date / event.end_date) si existieran:
              const startRaw = (event as any).start_date ?? (event as any).startDate ?? event.event_date ?? null;
              const endRaw = (event as any).end_date ?? (event as any).endDate ?? null;

              // Soporta event.event_date o (event.start_date / event.end_date) si existieran:
              const humanDate = formatDateRange(startRaw || event.event_date, endRaw);
               const isoDateAttr =
                parseDateSafe(event.event_date)?.toISOString() ??
                parseDateSafe(startRaw)?.toISOString() ??
                parseDateSafe(endRaw)?.toISOString() ??
                undefined;

              return (
                <article
                  key={event.id}
                  className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
                >
                  {/* Imagen principal */}
                  <div className="relative w-full h-56 bg-gray-100">
                    {cover ? (
                      <img
                        src={cover}
                        alt={event.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-gray-300">
                        <Calendar className="h-16 w-16" />
                      </div>
                    )}

                    {/* Píldora con la fecha (superpuesta) */}
                    {humanDate && (
                      <div className="absolute top-3 left-3 bg-white/90 backdrop-blur px-3 py-1.5 rounded-full shadow text-sm font-semibold text-gray-800">
                        <time dateTime={isoDateAttr}>{humanDate}</time>
                      </div>
                    )}
                  </div>

                  {/* Contenido de la tarjeta */}
                  <div className="p-5">
                    <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight">
                      {event.title}
                    </h3>

                    <div className="space-y-2 mb-3">
                      {humanDate && (
                        <div className="flex items-center text-gray-600 text-sm">
                          <Calendar className="h-4 w-4 mr-2 text-blue-900 flex-shrink-0" />
                          <span><time dateTime={isoDateAttr}>{humanDate}</time></span>
                        </div>
                      )}

                      {event.location && (
                        <div className="flex items-center text-gray-600 text-sm">
                          <MapPin className="h-4 w-4 mr-2 text-blue-900 flex-shrink-0" />
                          <span>{event.location}</span>
                        </div>
                      )}
                    </div>

                    {event.description && (
                      <p className="text-gray-700 text-sm leading-relaxed line-clamp-3">
                        {event.description}
                      </p>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
