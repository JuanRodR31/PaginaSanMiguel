import { useState, useEffect } from 'react';
import { Calendar, MapPin, Image as ImageIcon } from 'lucide-react';
import { supabase, Event } from '../lib/supabase';

export default function Events() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  useEffect(() => {
    loadEvents();
  }, []);

  async function loadEvents() {
    try {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .order('event_date', { ascending: false });

      if (error) throw error;
      setEvents(data || []);
    } catch (error) {
      console.error('Error loading events:', error);
    } finally {
      setLoading(false);
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-green-700"></div>
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
          <div className="space-y-8">
            {events.map((event) => (
              <div
                key={event.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow"
              >
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
                  <div className="lg:col-span-2">
                    <div className="flex items-start justify-between mb-4">
                      <h2 className="text-3xl font-bold text-gray-900">{event.title}</h2>
                    </div>

                    <div className="flex flex-wrap gap-4 mb-4">
                      <div className="flex items-center text-gray-600">
                        <Calendar className="h-5 w-5 mr-2 text-green-700" />
                        <span>{formatDate(event.event_date)}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <MapPin className="h-5 w-5 mr-2 text-green-700" />
                        <span>{event.location}</span>
                      </div>
                    </div>

                    <p className="text-gray-700 leading-relaxed mb-6">{event.description}</p>

                    {event.photos && event.photos.length > 0 && (
                      <button
                        onClick={() => setSelectedEvent(event)}
                        className="flex items-center text-green-700 hover:text-green-900 font-semibold transition-colors"
                      >
                        <ImageIcon className="h-5 w-5 mr-2" />
                        Ver fotos del evento ({event.photos.length})
                      </button>
                    )}
                  </div>

                  <div className="lg:col-span-1">
                    {event.photos && event.photos.length > 0 ? (
                      <div className="relative h-64 lg:h-full rounded-lg overflow-hidden shadow-md">
                        <img
                          src={event.photos[0]}
                          alt={event.title}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                        {event.photos.length > 1 && (
                          <div className="absolute bottom-4 right-4 bg-black bg-opacity-70 text-white px-3 py-1 rounded-full text-sm font-semibold">
                            +{event.photos.length - 1} fotos
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="h-64 lg:h-full bg-gradient-to-br from-green-500 to-green-700 rounded-lg flex items-center justify-center">
                        <Calendar className="h-16 w-16 text-white opacity-50" />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {selectedEvent && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedEvent(null)}
        >
          <div
            className="bg-white rounded-xl max-w-6xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-2xl font-bold text-gray-900">{selectedEvent.title}</h3>
              <button
                onClick={() => setSelectedEvent(null)}
                className="text-gray-500 hover:text-gray-700 text-3xl font-bold"
              >
                &times;
              </button>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {selectedEvent.photos.map((photo, index) => (
                  <div key={index} className="relative h-64 rounded-lg overflow-hidden shadow-lg">
                    <img
                      src={photo}
                      alt={`${selectedEvent.title} - Foto ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
