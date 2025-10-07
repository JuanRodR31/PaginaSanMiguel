import { useState, useEffect } from 'react';

interface Player {
  id: number;
  name: string;
  position: string;
  photo_key: string;
  age: number;
  bio?: string;
  achievements?: string;
}

import jairPhoto from '../components/assets/TarjetasOK/jair.jpg';
import miguelMPhoto from '../components/assets/TarjetasOK/miguelM.jpg';
import juverneyPhoto from '../components/assets/TarjetasOK/juverney.jpg';
import mateoPhoto from '../components/assets/TarjetasOK/mateo.jpg';
import jsebastianPhoto from '../components/assets/TarjetasOK/jsebastian.jpg';
import michellePhoto from '../components/assets/TarjetasOK/michelle.jpg';
import miguelPhoto from '../components/assets/TarjetasOK/miguel.jpg';
import jacoPhoto from '../components/assets/TarjetasOK/jaco.jpg';
import jdavidPhoto from '../components/assets/TarjetasOK/jdavid.jpg';
import dannaPhoto from '../components/assets/TarjetasOK/danna.jpg';
import danielPhoto from '../components/assets/TarjetasOK/daniel.jpg';
import dylanPhoto from '../components/assets/TarjetasOK/dylan.jpg';

const photoMap: Record<string, string> = {
  jair: jairPhoto,
  miguelM: miguelMPhoto,
  juverney: juverneyPhoto,
  mateo: mateoPhoto,
  jsebastian: jsebastianPhoto,
  michelle: michellePhoto,
  miguel: miguelPhoto,
  jaco: jacoPhoto,
  jdavid: jdavidPhoto,
  danna: dannaPhoto,
  daniel: danielPhoto,
  dylan: dylanPhoto,
};

const localPlayers: Player[] = [
  { id: 1,  name: 'Miguel Martínez', position: 'Mediocampista',     photo_key: 'miguelM',    age: 17 },
  { id: 2,  name: 'Jair Restrepo',   position: 'Delantero',         photo_key: 'jair',       age: 16 },
  { id: 3,  name: 'Michelle Rojas',  position: 'Defensa Central',   photo_key: 'michelle',   age: 18 },
  { id: 4,  name: 'Juverney G.',     position: 'Lateral Izquierdo', photo_key: 'juverney',   age: 15 },
  { id: 5,  name: 'Mateo Osorio',    position: 'Portero',           photo_key: 'mateo',      age: 17 },
  { id: 6,  name: 'J. Sebastián P.', position: 'Volante Creativo',  photo_key: 'jsebastian', age: 16 },
  { id: 7,  name: 'Miguel López',    position: 'Defensa',           photo_key: 'miguel',     age: 15 },
  { id: 8,  name: 'Jaco M.',         position: 'Mediocampista',     photo_key: 'jaco',       age: 14 },
  { id: 9,  name: 'J. David R.',     position: 'Delantero',         photo_key: 'jdavid',     age: 16 },
  { id: 10, name: 'Danna V.',        position: 'Extremo',           photo_key: 'danna',      age: 17 },
  { id: 11, name: 'Daniel L.',       position: 'Defensa Lateral',   photo_key: 'daniel',     age: 15 },
  { id: 12, name: 'Dylan R.',        position: 'Delantero',         photo_key: 'dylan',      age: 14 },
];

export default function Players() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);

  // When a player modal is open, lock body scroll
  useEffect(() => {
    if (selectedPlayer) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedPlayer]);

  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => {
      setPlayers(localPlayers);
      setLoading(false);
    }, 800);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Nuestros Jugadores</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Conoce a los talentosos atletas que forman parte de nuestra fundación.
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className="aspect-[3/4] rounded-xl bg-slate-200 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {players.map((player) => {
              const src = photoMap[player.photo_key];
              return (
                <button
                  key={player.id}
                  onClick={() => setSelectedPlayer(player)}
                  className="group relative rounded-xl overflow-hidden bg-white shadow-md ring-1 ring-slate-200 transition-all hover:shadow-xl hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-sky-500"
                  aria-label={`${player.name} — ${player.position}`}
                >
                  {/* Imagen */}
                  <div className="relative w-full aspect-[3/4]">
                    {src ? (
                      <img
                        src={src}
                        alt={`${player.name} — ${player.position}`}
                        loading="lazy"
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center bg-slate-100 text-slate-500">
                        Foto no disponible
                      </div>
                    )}
                    {/* Overlay para texto */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent" />
                  </div>

                  {/* Nombre / Posición (oculto en tarjetas; accesible vía aria-label) */}
                </button>
              );
            })}
          </div>
        )}

        {/* Modal */}
        {selectedPlayer && (
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedPlayer(null)}
          >
            <div
              className="relative max-w-4xl w-full rounded-2xl overflow-hidden shadow-2xl bg-white"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-4 flex items-start justify-between">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">{selectedPlayer.name}</h2>
                <button
                  onClick={() => setSelectedPlayer(null)}
                  className="text-gray-500 hover:text-gray-700 text-3xl font-bold ml-4"
                  aria-label="Cerrar"
                >
                  ×
                </button>
              </div>

              {/* Imagen grande con tamaño controlado */}
              <div className="w-full flex items-center justify-center bg-slate-100">
                <img
                  src={photoMap[selectedPlayer.photo_key]}
                  alt={selectedPlayer.name}
                  style={{ maxHeight: '70vh', width: 'auto' }}
                  className="object-contain"
                />
              </div>

              {/* Info: solo nombre (ya mostrado en header) -- mantener espacio si se necesita */}
              <div className="p-4" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
