import { useState, useEffect } from "react";
import {
  Target,
  Heart,
  Users,
  Award,
  TrendingUp,
  Globe,
  Globe2,
  Scale,
  Star,
  Flame,
} from "lucide-react";
import aboutus from "@/components/assets/aboutus.jpeg";
import SandraPhoto from "../components/assets/sandra.jpg";
import LeonardoPhoto from "../components/assets/leonardo.jpg";
import DanielaPhoto from "../components/assets/daniela.jpg";
import entrenamiento from "@/components/assets/entrenando.jpeg";

interface TeamMember {
  id: number;
  name: string;
  role: string;
  photo_url: string; // La URL ahora será el path de la imagen importada
}

// Datos locales de ejemplo (simulando la carga de la base de datos)
const localTeamMembers: TeamMember[] = [
  {
    id: 1,
    name: "Sandra Torres",
    role: "Fundador & CEO",
    photo_url: SandraPhoto,
  },
  {
    id: 2,
    name: "Leonardo Martinez",
    role: "Fundador y Entrenador",
    photo_url: LeonardoPhoto,
  },
  {
    id: 3,
    name: "Daniela Moreno",
    role: "Entrenadora",
    photo_url: DanielaPhoto,
  },
];

export default function About() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Función local para cargar los datos simulados
    const loadLocalTeamMembers = () => {
      setLoading(true);
      setTimeout(() => {
        // Simula la carga de datos locales
        const sortedMembers = localTeamMembers.sort((a, b) => a.id - b.id);
        setTeamMembers(sortedMembers);
        setLoading(false);
      }, 800); // Retardo simulado de 800ms
    };

    loadLocalTeamMembers();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Sección 1: Encabezado */}
      <section className="relative h-[400px] bg-gradient-to-r from-slate-700 to-slate-900 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center mix-blend-overlay opacity-75"
          style={{ backgroundImage: `url(${aboutus})` }}
        ></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="text-white">
            <h1 className="text-5xl md:text-6xl font-bold mb-4">
              Sobre Nosotros
            </h1>
            <p className="text-xl md:text-2xl text-gray-100">
              En la Fundación San Miguel promovemos valores que inspiran amor,
              resiliencia y trabajo en equipo, construyendo un entorno donde
              cada niño y joven pueda crecer con esperanza.
            </p>
          </div>
        </div>
      </section>

      {/* Sección 2: Historia */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Nuestra esencia
            </h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                Nuestra escuela de fútbol nació del sueño de crear oportunidades
                para niños y jóvenes apasionados por el deporte, brindándoles
                las herramientas necesarias para desarrollar su máximo
                potencial.
              </p>
              <p>
                Creemos que el deporte puede ser un camino hacia la esperanza,
                la disciplina y la unión. Cada entrenamiento, sonrisa y logro
                reflejan nuestro compromiso con los niños y jóvenes que buscan
                un futuro mejor. En cada jugada sembramos valores, construimos
                comunidad y demostramos que el verdadero triunfo está en crecer
                juntos.
              </p>
            </div>
          </div>

          <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl">
            <img
              src={entrenamiento}
              alt="Entrenamiento"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Sección 3: Misión y Visión (sin cambios) */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow">
              <div className="flex items-center mb-6">
                <div className="bg-blue-100 rounded-full p-4">
                  <Target className="h-8 w-8 text-blue-700" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 ml-4">
                  Nuestra Misión
                </h3>
              </div>
              <p className="text-gray-700 text-lg leading-relaxed">
                En la Fundación San Miguel brindamos a niños y jóvenes un
                espacio seguro y acogedor donde el fútbol trasciende el juego
                para convertirse en una herramienta de desarrollo personal,
                superación y formación en valores. A través de la disciplina, el
                trabajo en equipo y la alegría del deporte, inspiramos fuerza,
                esperanza y amor, ayudando a cada niño a crecer, aprender y
                soñar sin límites.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow">
              <div className="flex items-center mb-6">
                <div className="bg-orange-100 rounded-full p-4">
                  <Award className="h-8 w-8 text-orange-700" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 ml-4">
                  Nuestra Visión
                </h3>
              </div>
              <p className="text-gray-700 text-lg leading-relaxed">
                Ser una luz de transformación y esperanza para la niñez y la
                juventud, utilizando el fútbol como medio de cambio social y
                crecimiento humano. Aspiramos a llegar a más comunidades,
                impulsando oportunidades que fortalezcan la inclusión, la
                solidaridad y el desarrollo integral, hasta convertirnos en un
                referente en la formación de valores y liderazgo a través del
                deporte.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sección 4: Valores (sin cambios) */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Nuestros Valores
          </h2>
          <p className="text-xl text-gray-600">
            Principios que nos inspiran a formar con amor, disciplina y
            compromiso a los niños y jóvenes que confían en nosotros.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Pasión */}
          <div className="text-center p-6 hover:transform hover:scale-105 transition-all">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
              <Flame className="h-8 w-8 text-red-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Pasión</h3>
            <p className="text-gray-600">
              Vivimos el fútbol con amor y entrega, inspirando a cada niño y
              joven a dar lo mejor de sí dentro y fuera de la cancha.
            </p>
          </div>

          {/* Trabajo en Equipo */}
          <div className="text-center p-6 hover:transform hover:scale-105 transition-all">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
              <Users className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Trabajo en Equipo
            </h3>
            <p className="text-gray-600">
              Creemos en la fuerza de la unión. Cada jugador, entrenador y
              colaborador aporta para crecer juntos y alcanzar metas comunes.
            </p>
          </div>

          {/* Excelencia */}
          <div className="text-center p-6 hover:transform hover:scale-105 transition-all">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-100 rounded-full mb-4">
              <Star className="h-8 w-8 text-yellow-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Excelencia</h3>
            <p className="text-gray-600">
              Buscamos siempre ser mejores, fomentando la disciplina, el
              esfuerzo y la mejora continua en cada entrenamiento y acción.
            </p>
          </div>

          {/* Integridad */}
          <div className="text-center p-6 hover:transform hover:scale-105 transition-all">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-4">
              <Scale className="h-8 w-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Integridad</h3>
            <p className="text-gray-600">
              Actuamos con honestidad, respeto y responsabilidad, siendo ejemplo
              de coherencia y valores dentro y fuera del campo.
            </p>
          </div>

          {/* Inclusión */}
          <div className="text-center p-6 hover:transform hover:scale-105 transition-all">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-teal-100 rounded-full mb-4">
              <Globe2 className="h-8 w-8 text-teal-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Inclusión</h3>
            <p className="text-gray-600">
              Abrimos nuestras puertas a todos sin distinción, celebrando la
              diversidad y construyendo un espacio donde todos se sientan parte.
            </p>
          </div>

          {/* Compromiso */}
          <div className="text-center p-6 hover:transform hover:scale-105 transition-all">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
              <Target className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Compromiso</h3>
            <p className="text-gray-600">
              Nos entregamos con dedicación y constancia al desarrollo de
              nuestros jugadores, manteniendo viva nuestra misión de transformar
              vidas.
            </p>
          </div>
        </div>
      </section>

      {/* =================================================================
          SECCIÓN 5: NUESTRO EQUIPO (Cargando desde datos locales)
          ================================================================= */}
      <section className="py-16 bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Nuestro Equipo
            </h2>
            <p className="text-xl text-gray-600">
              Conoce a las personas comprometidas con el desarrollo de nuestros
              jóvenes atletas
            </p>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-16">
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-slate-700"></div>
            </div>
          ) : teamMembers.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-xl shadow-lg">
              <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <p className="text-xl text-gray-600">
                Próximamente presentaremos a nuestro equipo.
              </p>
            </div>
          ) : (
            // Grid de Miembros del Equipo
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {teamMembers.map((member) => (
                <div
                  key={member.id}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all transform hover:-translate-y-2 duration-300"
                >
                  <div className="relative h-72 bg-gradient-to-br from-slate-300 to-slate-400 overflow-hidden">
                    {/* El src apunta a la imagen importada localmente */}
                    <img
                      src={member.photo_url}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="p-6">
                    {/* Nombre y Rol mostrados debajo de la imagen */}
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      {member.name}
                    </h3>
                    <p className="text-orange-600 font-semibold mb-4">
                      {member.role}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
