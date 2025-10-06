import { Trophy, Mail, MapPin, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-slate-900 to-slate-950 text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <Trophy className="h-8 w-8 text-orange-500" />
              <span className="ml-2 text-xl font-bold">Fundación San Miguel </span>
            </div>
            <p className="text-gray-300 text-sm">
              Formando campeones dentro y fuera de la cancha, construyendo un futuro mejor a través del deporte.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-orange-400">Contacto</h3>
            <div className="space-y-3">
              <div className="flex items-center text-sm text-gray-300">
                <Mail className="h-4 w-4 mr-2 text-orange-400" />
                <span>fundacionsanmiguel_26@gmail.com</span>
              </div>
              <div className="flex items-center text-sm text-gray-300">
                <Phone className="h-4 w-4 mr-2 text-orange-400" />
                <span>+57 302 3273311</span>
              </div>
              <div className="flex items-center text-sm text-gray-300">
                <Phone className="h-4 w-4 mr-2 text-orange-400" />
                <span>+57 322 3374913</span>
              </div>
              <div className="flex items-center text-sm text-gray-300">
                <MapPin className="h-4 w-4 mr-2 text-orange-400" />
                <span>La Capellania, Cajica , Cundianamarca</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-orange-400">Nuestra Misión</h3>
            <p className="text-gray-300 text-sm">
              Brindar oportunidades de desarrollo deportivo y personal a jóvenes talentosos,
              promoviendo valores de disciplina, trabajo en equipo y excelencia.
            </p>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} Fundación San Miguel. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
