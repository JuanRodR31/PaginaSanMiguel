import { useState, useEffect } from 'react';
import { Calendar, MapPin, Plus, Edit, Trash2, X } from 'lucide-react';
import { Event, getEvents, createEvent, updateEvent, deleteEvent, EventDTO } from '../lib/api';
import { useAuth } from '@/context/AuthContext';

export default function Events() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const { isAuthenticated } = useAuth();

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    start_date: '',
    end_date: '',
    location: '',
  });

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

  const handleCreateClick = () => {
    setEditingEvent(null);
    setFormData({
      title: '',
      description: '',
      start_date: '',
      end_date: '',
      location: '',
    });
    setShowModal(true);
  };

  const handleEditClick = (event: Event) => {
    setEditingEvent(event);
    setFormData({
      title: event.title || '',
      description: event.description || '',
      start_date: event.start_date || event.event_date || '',
      end_date: event.end_date || '',
      location: event.location || '',
    });
    setShowModal(true);
  };

  const handleDeleteClick = async (eventId: number | string) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este evento?')) {
      try {
        const success = await deleteEvent(eventId);
        if (success) {
          await loadEvents();
        } else {
          alert('Error al eliminar el evento');
        }
      } catch (error) {
        console.error('Error deleting event:', error);
        alert('Error al eliminar el evento');
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const eventData: Partial<EventDTO> = {
        title: formData.title,
        description: formData.description,
        start_date: formData.start_date,
        end_date: formData.end_date,
        location: formData.location,
      };

      if (editingEvent) {
        const updated = await updateEvent(editingEvent.id, eventData);
        if (updated) {
          await loadEvents();
          setShowModal(false);
        } else {
          alert('Error al actualizar el evento');
        }
      } else {
        const created = await createEvent(eventData);
        if (created) {
          await loadEvents();
          setShowModal(false);
        } else {
          alert('Error al crear el evento');
        }
      }
    } catch (error) {
      console.error('Error saving event:', error);
      alert('Error al guardar el evento');
    }
  };

  const parseDateSafe = (dateInput?: string | number | null) => {
    if (!dateInput && dateInput !== 0) return null;
    
    if (typeof dateInput === "number") return new Date(dateInput);
    
    const dateString = String(dateInput);
    
    if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
      const [year, month, day] = dateString.split('-').map(Number);
      return new Date(year, month - 1, day);
    }
    
    const d = new Date(dateString);
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

  const formatDateRange = (start?: string | null, end?: string | null) => {
    const ds = parseDateSafe(start);
    const de = parseDateSafe(end);
    
    if (ds && de) {
      if (ds.getFullYear() === de.getFullYear() && 
          ds.getMonth() === de.getMonth() && 
          ds.getDate() === de.getDate()) {
        return formatDate(start);
      }
      
      const sameMonth = ds.getMonth() === de.getMonth() && ds.getFullYear() === de.getFullYear();
      const opts: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
      if (sameMonth) {
        const startDay = ds.toLocaleDateString('es-ES', { day: 'numeric' });
        const tail = de.toLocaleDateString('es-ES', { ...opts });
        return `${startDay} - ${tail}`;
      }
      return `${ds.toLocaleDateString('es-ES', opts)} - ${de.toLocaleDateString('es-ES', opts)}`;
    }
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

        {isAuthenticated && (
          <div className="mb-6 flex justify-end">
            <button
              onClick={handleCreateClick}
              className="flex items-center space-x-2 bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-6 rounded-lg transition-all"
            >
              <Plus className="h-5 w-5" />
              <span>Agregar Evento</span>
            </button>
          </div>
        )}

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

              const startRaw = (event as any).start_date ?? (event as any).startDate ?? event.event_date ?? null;
              const endRaw = (event as any).end_date ?? (event as any).endDate ?? null;

              const humanDate = formatDateRange(startRaw || event.event_date, endRaw);
              const isoDateAttr =
                parseDateSafe(event.event_date)?.toISOString() ??
                parseDateSafe(startRaw)?.toISOString() ??
                parseDateSafe(endRaw)?.toISOString() ??
                undefined;

              return (
                <article
                  key={event.id}
                  className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 relative"
                >
                  {isAuthenticated && (
                    <div className="absolute top-2 right-2 flex space-x-2 z-10">
                      <button
                        onClick={() => handleEditClick(event)}
                        className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg transition-all"
                        title="Editar"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteClick(event.id)}
                        className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg transition-all"
                        title="Eliminar"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  )}

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

      {/* Modal para crear/editar evento */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-900">
                  {editingEvent ? 'Editar Evento' : 'Nuevo Evento'}
                </h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Título *
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Descripción
                  </label>
                  <textarea
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    rows={4}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Fecha Inicio *
                    </label>
                    <input
                      type="date"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                      value={formData.start_date}
                      onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Fecha Fin *
                    </label>
                    <input
                      type="date"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                      value={formData.end_date}
                      onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Ubicación *
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  />
                </div>

                <div className="flex justify-end space-x-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-md"
                  >
                    {editingEvent ? 'Actualizar' : 'Crear'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}