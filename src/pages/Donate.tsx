import { Heart, Mail, Phone } from 'lucide-react';

export default function Donate() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Heart className="h-16 w-16 text-red-600 mx-auto mb-4" />
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Apoya Nuestra Misión</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Tu donación nos ayuda a continuar formando jóvenes atletas y transformando vidas a través del fútbol.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-8 lg:p-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">¿Cómo Puedes Ayudar?</h2>

            <div className="mb-8">
              <p className="text-lg text-gray-700 leading-relaxed text-center mb-6">
                Tus donaciones nos ayudan a organizar eventos deportivos y brindar posibles ayudas para los niños de nuestra fundación. 
                Cada aporte contribuye a crear oportunidades para que nuestros jóvenes atletas puedan desarrollar su potencial.
              </p>
            </div>

            <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-lg border border-green-200 p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Contáctanos para Realizar tu Donación</h3>
              
              <div className="space-y-4 max-w-md mx-auto">
                <div className="flex items-center bg-white p-4 rounded-lg shadow-sm">
                  <div className="bg-orange-100 rounded-full p-3 mr-4 flex-shrink-0">
                    <Mail className="h-6 w-6 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-semibold">Correo Electrónico</p>
                    <a href="mailto:fundacionsanmiguel_26@gmail.com" className="text-gray-900 hover:text-orange-600 transition-colors">
                      fundacionsanmiguel_26@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center bg-white p-4 rounded-lg shadow-sm">
                  <div className="bg-orange-100 rounded-full p-3 mr-4 flex-shrink-0">
                    <Phone className="h-6 w-6 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-semibold">Teléfono</p>
                    <a href="tel:+573023273311" className="text-gray-900 hover:text-orange-600 transition-colors">
                      +57 302 3273311
                    </a>
                  </div>
                </div>

                <div className="flex items-center bg-white p-4 rounded-lg shadow-sm">
                  <div className="bg-orange-100 rounded-full p-3 mr-4 flex-shrink-0">
                    <Phone className="h-6 w-6 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-semibold">Teléfono</p>
                    <a href="tel:+573138733907" className="text-gray-900 hover:text-orange-600 transition-colors">
                      +57 313 8733907
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 p-6 bg-gray-50 rounded-lg border border-gray-200">
              <p className="text-gray-700 text-center italic">
                "Cada donación, sin importar el monto, marca una diferencia real en la vida de nuestros jóvenes
                atletas. Tu generosidad les da la oportunidad de perseguir sus sueños."
              </p>
            </div>

            <div className="mt-8 text-center">
              <p className="text-gray-600">
                Estamos agradecidos por el apoyo de nuestra comunidad y trabajamos cada día para honrar la confianza 
                que depositan en nosotros. No dudes en contactarnos para conocer más sobre cómo tu aporte puede hacer la diferencia.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}