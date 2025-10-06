import { Trophy, Users, Heart, Target } from 'lucide-react';

import FondoHeader from '../components/assets/niñosjugando.jpg';

interface HomeProps {
  onNavigate: (page: string) => void;
}

export default function Home({ onNavigate }: HomeProps) {
  return (
    <div className="min-h-screen">
      <section className="relative h-[600px] bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-0"></div>
         <div 
                    className="absolute inset-0 bg-cover bg-center mix-blend-overlay opacity-100"
                    style={{ backgroundImage: `url(${FondoHeader})` }} // <-- ¡AQUÍ ESTÁ EL CAMBIO!
          ></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="text-white max-w-3xl">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Formando Campeones del Futuro
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-100">
              Una fundación dedicada a desarrollar talento, construir sueños y transformar vidas a través del fútbol.
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

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center group hover:transform hover:scale-105 transition-all">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4 group-hover:bg-blue-200 transition-colors">
                <Trophy className="h-8 w-8 text-blue-700" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">150+</h3>
              <p className="text-gray-600">Jugadores Formados</p>
            </div>

            <div className="text-center group hover:transform hover:scale-105 transition-all">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-full mb-4 group-hover:bg-orange-200 transition-colors">
                <Users className="h-8 w-8 text-orange-700" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">25</h3>
              <p className="text-gray-600">Entrenadores Certificados</p>
            </div>

            <div className="text-center group hover:transform hover:scale-105 transition-all">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4 group-hover:bg-red-200 transition-colors">
                <Heart className="h-8 w-8 text-red-700" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">500+</h3>
              <p className="text-gray-600">Familias Apoyadas</p>
            </div>

            <div className="text-center group hover:transform hover:scale-105 transition-all">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-slate-100 rounded-full mb-4 group-hover:bg-slate-200 transition-colors">
                <Target className="h-8 w-8 text-slate-700" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">10</h3>
              <p className="text-gray-600">Años de Trayectoria</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Nuestro Impacto</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Transformamos vidas a través del deporte, creando oportunidades y desarrollando valores fundamentales.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow">
              <div className="text-blue-600 mb-4">
                <Trophy className="h-12 w-12" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Excelencia Deportiva</h3>
              <p className="text-gray-600">
                Entrenamiento profesional con metodologías de vanguardia para desarrollar el máximo potencial de cada jugador.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow">
              <div className="text-orange-600 mb-4">
                <Users className="h-12 w-12" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Desarrollo Personal</h3>
              <p className="text-gray-600">
                Formamos personas íntegras con valores de disciplina, respeto, trabajo en equipo y liderazgo.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow">
              <div className="text-red-600 mb-4">
                <Heart className="h-12 w-12" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Impacto Social</h3>
              <p className="text-gray-600">
                Creamos oportunidades para jóvenes de diferentes comunidades, promoviendo la inclusión y el desarrollo social.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-r from-slate-800 to-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Únete a Nuestra Misión</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-gray-100">
            Tu apoyo nos ayuda a seguir transformando vidas. Cada donación cuenta y hace la diferencia.
          </p>
          <button
            onClick={() => onNavigate('donate')}
            className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-10 rounded-lg transition-all transform hover:scale-105 shadow-lg text-lg"
          >
            Apoyar Ahora
          </button>
        </div>
      </section>
    </div>
  );
}
