import { useState, useEffect } from 'react';
import { Play, Video as VideoIcon } from 'lucide-react';
import { Video, getVideos } from '../lib/api';

export default function Videos() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

  useEffect(() => {
    loadVideos();
  }, []);

  async function loadVideos() {
    try {
      const data = await getVideos();
      setVideos(data || []);
    } catch (error) {
      console.error('Error loading videos:', error);
    } finally {
      setLoading(false);
    }
  }

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
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Galería de Videos</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Revive los mejores momentos, entrenamientos y logros de nuestra fundación.
          </p>
        </div>

        {videos.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl shadow-lg">
            <VideoIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <p className="text-xl text-gray-600">Próximamente compartiremos nuestros videos.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {videos.map((video) => (
              <div
                key={video.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all transform hover:-translate-y-2 duration-300 cursor-pointer"
                onClick={() => setSelectedVideo(video)}
              >
                <div className="relative h-48 bg-gray-900 overflow-hidden group">
                  <img
                    src={video.thumbnail_url}
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-30 transition-all flex items-center justify-center">
                    <div className="bg-white bg-opacity-90 rounded-full p-4 group-hover:scale-110 transition-transform">
                      <Play className="h-8 w-8 text-green-700" fill="currentColor" />
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">{video.title}</h3>
                  <p className="text-gray-600 text-sm line-clamp-3">{video.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {selectedVideo && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedVideo(null)}
        >
          <div
            className="bg-white rounded-xl max-w-5xl w-full overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-xl font-bold text-gray-900">{selectedVideo.title}</h3>
              <button
                onClick={() => setSelectedVideo(null)}
                className="text-gray-500 hover:text-gray-700 text-3xl font-bold"
              >
                &times;
              </button>
            </div>

            <div className="relative" style={{ paddingTop: '56.25%' }}>
              <iframe
                src={selectedVideo.video_url}
                title={selectedVideo.title}
                className="absolute inset-0 w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            <div className="p-6 bg-gray-50">
              <p className="text-gray-700">{selectedVideo.description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
