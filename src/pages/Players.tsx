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

const photoMap: { [key: string]: string } = {
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
  { id: 1, name: 'Miguel Martínez', position: 'Mediocampista', photo_key: 'miguelM', age: 17 },
  { id: 2, name: 'Jair Restrepo', position: 'Delantero', photo_key: 'jair', age: 16 },
  { id: 3, name: 'Michelle Rojas', position: 'Defensa Central', photo_key: 'michelle', age: 18 },
  { id: 4, name: 'Juverney G.', position: 'Lateral Izquierdo', photo_key: 'juverney', age: 15 },
  { id: 5, name: 'Mateo Osorio', position: 'Portero', photo_key: 'mateo', age: 17 },
  { id: 6, name: 'J. Sebastián Pérez', position: 'Volante Creativo', photo_key: 'jsebastian', age: 16 },
  { id: 7, name: 'Miguel López', position: 'Defensa', photo_key: 'miguel', age: 15 },
  { id: 8, name: 'Jaco M.', position: 'Mediocampista', photo_key: 'jaco', age: 14 },
  { id: 9, name: 'J. David R.', position: 'Delantero', photo_key: 'jdavid', age: 16 },
  { id: 10, name: 'Danna V.', position: 'Extremo', photo_key: 'danna', age: 17 },
  { id: 11, name: 'Daniel L.', position: 'Defensa Lateral', photo_key: 'daniel', age: 15 },
  { id: 12, name: 'Dylan R.', position: 'Delantero', photo_key: 'dylan', age: 14 },
];

export default function Players() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setPlayers(localPlayers);
      setLoading(false);
    }, 800);
  }, []);

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
            Conoce a los talentosos atletas que forman parte de nuestra fundación.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {players.map((player) => (
            <div
              key={player.id}
              className="flex items-center justify-center bg-white rounded-xl shadow-md overflow-hidden"
            >
              <img
                src={photoMap[player.photo_key]}
                alt={player.name}
                className="w-full h-auto max-h-80 object-contain transform transition-transform duration-500 hover:scale-110"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
