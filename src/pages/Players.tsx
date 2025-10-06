import { useState, useEffect } from 'react';
import { User, Award } from 'lucide-react';
import { supabase, Player } from '../lib/supabase';

export default function Players() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPlayers();
  }, []);

  async function loadPlayers() {
    try {
      const { data, error } = await supabase
        .from('players')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPlayers(data || []);
    } catch (error) {
      console.error('Error loading players:', error);
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
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Nuestros Jugadores</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Conoce a los talentosos atletas que forman parte de nuestra fundación y están escribiendo su historia en el fútbol.
          </p>
        </div>

        {players.length === 0 ? (
          <div className="text-center py-16">
            <User className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <p className="text-xl text-gray-600">Próximamente añadiremos perfiles de jugadores.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {players.map((player) => (
              <div
                key={player.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow transform hover:-translate-y-2 duration-300"
              >
                <div className="relative h-64 bg-gradient-to-br from-green-500 to-green-700 overflow-hidden">
                  <img
                    src={player.photo_url}
                    alt={player.name}
                    className="w-full h-full object-cover mix-blend-overlay opacity-80"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                    <h3 className="text-2xl font-bold text-white">{player.name}</h3>
                    <p className="text-yellow-400 font-semibold">{player.position}</p>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center text-gray-600">
                      <User className="h-5 w-5 mr-2 text-green-700" />
                      <span className="font-semibold">{player.age} años</span>
                    </div>
                  </div>

                  {player.bio && (
                    <p className="text-gray-700 mb-4 leading-relaxed">{player.bio}</p>
                  )}

                  {player.achievements && (
                    <div className="border-t border-gray-200 pt-4">
                      <div className="flex items-start">
                        <Award className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0 mt-1" />
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-1">Logros</h4>
                          <p className="text-sm text-gray-600">{player.achievements}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
