import { useState, useEffect } from 'react';
import { Image as ImageIcon, X, ChevronLeft, ChevronRight, Plus, Trash2, Upload } from 'lucide-react';
import { getGallery, type GalleryItem, uploadPhotosToGallery, deletePhotoFromGallery, type Gallery } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';

export default function Videos() {
  const [photos, setPhotos] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [imageError, setImageError] = useState<Set<string>>(new Set());
  const [galleryId, setGalleryId] = useState<number | null>(null);
  const [uploading, setUploading] = useState(false);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    loadGallery();
  }, []);

  const loadGallery = async () => {
    try {
      setLoading(true);
      const gallery = await getGallery();
      
      if (gallery) {
        setGalleryId(gallery.id);
        if (gallery.photos && gallery.photos.length > 0) {
          // Convierte el array de URLs a GalleryItems
          const items: GalleryItem[] = gallery.photos.map((url, index) => ({
            url,
            id: `photo-${index}`
          }));
          setPhotos(items);
        } else {
          setPhotos([]);
        }
      } else {
        // Si no hay galería, intentar obtener todas las galerías y usar la primera
        const { getGalleries } = await import('@/lib/api');
        const galleries = await getGalleries();
        if (galleries && galleries.length > 0) {
          const firstGallery = galleries[0];
          setGalleryId(firstGallery.id);
          if (firstGallery.photos && firstGallery.photos.length > 0) {
            const items: GalleryItem[] = firstGallery.photos.map((url, index) => ({
              url,
              id: `photo-${index}`
            }));
            setPhotos(items);
          } else {
            setPhotos([]);
          }
        }
      }
    } catch (error) {
      console.error('Error loading gallery:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageError = (url: string) => {
    setImageError(prev => new Set(prev).add(url));
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) {
      alert('Por favor selecciona al menos una imagen');
      return;
    }
    
    if (!galleryId) {
      alert('Error: No se encontró la galería. Por favor recarga la página.');
      return;
    }

    try {
      setUploading(true);
      const fileArray = Array.from(files);
      
      // Validar tipos de archivo en el frontend también
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
      const invalidFiles = fileArray.filter(file => !allowedTypes.includes(file.type));
      
      if (invalidFiles.length > 0) {
        alert(`Tipo de archivo no permitido. Solo se permiten: JPEG, PNG, GIF, WEBP`);
        return;
      }
      
      // Validar tamaño (10MB)
      const maxSize = 10 * 1024 * 1024; // 10MB
      const largeFiles = fileArray.filter(file => file.size > maxSize);
      
      if (largeFiles.length > 0) {
        alert(`Algunos archivos son demasiado grandes. Tamaño máximo: 10MB`);
        return;
      }
      
      const result = await uploadPhotosToGallery(galleryId, fileArray);
      
      if (result) {
        await loadGallery();
        alert('Fotos subidas exitosamente');
      } else {
        alert('Error al subir las fotos');
      }
    } catch (error) {
      console.error('Error uploading photos:', error);
      const errorMessage = error instanceof Error ? error.message : 'Error desconocido al subir las fotos';
      alert(`Error: ${errorMessage}`);
    } finally {
      setUploading(false);
      // Reset input
      if (e.target) {
        e.target.value = '';
      }
    }
  };

  const handleDeletePhoto = async (photoUrl: string) => {
    if (!window.confirm('¿Estás seguro de que deseas eliminar esta foto?')) return;
    if (!galleryId) return;

    try {
      const result = await deletePhotoFromGallery(galleryId, photoUrl);
      if (result) {
        await loadGallery();
        alert('Foto eliminada exitosamente');
      } else {
        alert('Error al eliminar la foto');
      }
    } catch (error) {
      console.error('Error deleting photo:', error);
      alert('Error al eliminar la foto');
    }
  };

  const openLightbox = (index: number) => {
    setSelectedIndex(index);
  };

  const closeLightbox = () => {
    setSelectedIndex(null);
  };

  const goToPrevious = () => {
    if (selectedIndex !== null && selectedIndex > 0) {
      setSelectedIndex(selectedIndex - 1);
    }
  };

  const goToNext = () => {
    if (selectedIndex !== null && selectedIndex < photos.length - 1) {
      setSelectedIndex(selectedIndex + 1);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') goToPrevious();
    if (e.key === 'ArrowRight') goToNext();
    if (e.key === 'Escape') closeLightbox();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-green-700 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando galería...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Galería</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Revive los mejores momentos, entrenamientos y logros de nuestra fundación.
          </p>
        </div>

        {isAuthenticated && (
          <div className="mb-6 flex justify-end">
            <label className="flex items-center space-x-2 bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-6 rounded-lg transition-all cursor-pointer">
              <Upload className="h-5 w-5" />
              <span>{uploading ? 'Subiendo...' : 'Subir Fotos'}</span>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileUpload}
                disabled={uploading}
                className="hidden"
              />
            </label>
          </div>
        )}

        {photos.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl shadow-lg">
            <ImageIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <p className="text-xl text-gray-600">Próximamente compartiremos nuestras fotos.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {photos.map((photo, index) => (
              <div
                key={photo.id}
                className="relative aspect-square bg-white rounded-lg shadow-md overflow-hidden group hover:shadow-xl transition-all duration-300"
              >
                <div
                  className="w-full h-full cursor-pointer"
                  onClick={() => openLightbox(index)}
                >
                  {!imageError.has(photo.url) ? (
                    <>
                      <img
                        src={photo.url}
                        alt={`Foto ${index + 1}`}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        onError={() => handleImageError(photo.url)}
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300" />
                    </>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-100">
                      <ImageIcon className="h-12 w-12 text-gray-400" />
                    </div>
                  )}
                </div>

                {isAuthenticated && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeletePhoto(photo.url);
                    }}
                    className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg transition-all opacity-0 group-hover:opacity-100 z-10"
                    title="Eliminar foto"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      {selectedIndex !== null && (
        <div
          className="fixed inset-0 bg-black bg-opacity-95 z-50 flex items-center justify-center"
          onClick={closeLightbox}
          onKeyDown={handleKeyDown}
          tabIndex={0}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
            aria-label="Cerrar"
          >
            <X className="h-8 w-8" />
          </button>

          {selectedIndex > 0 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                goToPrevious();
              }}
              className="absolute left-4 text-white hover:text-gray-300 z-10"
              aria-label="Anterior"
            >
              <ChevronLeft className="h-12 w-12" />
            </button>
          )}

          {selectedIndex < photos.length - 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                goToNext();
              }}
              className="absolute right-4 text-white hover:text-gray-300 z-10"
              aria-label="Siguiente"
            >
              <ChevronRight className="h-12 w-12" />
            </button>
          )}

          <div
            className="max-w-7xl max-h-screen p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={photos[selectedIndex].url}
              alt={`Foto ${selectedIndex + 1}`}
              className="max-w-full max-h-[90vh] object-contain mx-auto"
            />
            <p className="text-white text-center mt-4">
              {selectedIndex + 1} / {photos.length}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}