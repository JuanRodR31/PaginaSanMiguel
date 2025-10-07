import { Trophy, Users, Heart } from 'lucide-react';
// Use the existing image files in src/components/assets
import FondoHeader from '@/components/assets/niñosjugando.jpg';
import cibermeImg from '@/components/assets/patrocinadores/ciberme.png';
import goodkImg from '@/components/assets/patrocinadores/goodk.png';
import pollosImg from '@/components/assets/patrocinadores/pollos.jpg';
import sanmarcoImg from '@/components/assets/patrocinadores/sanmarco.png';
import sportgrassImg from '@/components/assets/patrocinadores/sportgrass.png';

interface HomeProps {
  onNavigate: (page: string) => void;
}

export default function Home({ onNavigate }: HomeProps) {
  const sponsors = [
    { id: 1, name: 'Ciberme', image: cibermeImg },
    { id: 2, name: 'GoodK', image: goodkImg },
    { id: 3, name: 'Pollos', image: pollosImg },
    { id: 4, name: 'San Marco', image: sanmarcoImg },
    { id: 5, name: 'Sport Grass', image: sportgrassImg },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[600px] bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-0"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center mix-blend-overlay opacity-100"
          style={{ backgroundImage: `url(${FondoHeader})` }}
        ></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="text-white max-w-3xl">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Formando campeones del futuro
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-100">
              Una fundación dedicada a desarrollar talento, construir sueños y transformar vidas con amor, deporte y esperanza.
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => onNavigate('donate')}
                className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-lg transition-all transform hover:scale-105 shadow-lg"
              >
                Donar Ahora
              </button>
              <button
                onClick={() => onNavigate('about')}
                className="bg-white hover:bg-gray-100 text-slate-900 font-bold py-3 px-8 rounded-lg transition-all transform hover:scale-105 shadow-lg"
              >
                Conocer Más
              </button>
            </div>
          </div>
        </div>
      </section>
     
      {/* Impact Section */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Nuestro Impacto</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Transformamos vidas a través del deporte, la educación y la solidaridad, generando esperanza y construyendo comunidades más fuertes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow">
              <div className="text-blue-600 mb-4">
                <Trophy className="h-12 w-12" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Formación Integral</h3>
              <p className="text-gray-600">
                Impulsamos el desarrollo de niños y jóvenes mediante el fútbol y la educación, promoviendo valores que fortalecen su crecimiento personal y social.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow">
              <div className="text-orange-600 mb-4">
                <Users className="h-12 w-12" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Oportunidades de Vida</h3>
              <p className="text-gray-600">
                Creamos espacios donde cada niño puede descubrir su talento, superar barreras y construir un futuro lleno de posibilidades.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow">
              <div className="text-red-600 mb-4">
                <Heart className="h-12 w-12" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Unidad y Esperanza</h3>
              <p className="text-gray-600">
                Fomentamos la unión, la empatía y la colaboración entre comunidades, sembrando amor y compromiso por un mundo más solidario.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sponsors Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Nos apoyan</h2>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 items-center">
            {sponsors.map((sponsor) => (
              <div 
                key={sponsor.id}
                className="flex items-center justify-center p-6 group hover:transform hover:scale-110 transition-all duration-300"
              >
                <img 
                  src={sponsor.image} 
                  alt={sponsor.name}
                  style={{ maxHeight: '100px' }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}