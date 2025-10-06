import { useState, useEffect } from 'react';
import { Heart, DollarSign, CheckCircle } from 'lucide-react';
import { supabase, Donation } from '../lib/supabase';

export default function Donate() {
  const [donorName, setDonorName] = useState('');
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [recentDonations, setRecentDonations] = useState<Donation[]>([]);
  const [totalDonations, setTotalDonations] = useState(0);

  const suggestedAmounts = [10, 25, 50, 100];

  useEffect(() => {
    loadRecentDonations();
    loadTotalDonations();
  }, []);

  async function loadRecentDonations() {
    try {
      const { data, error } = await supabase
        .from('donations')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(10);

      if (error) throw error;
      setRecentDonations(data || []);
    } catch (error) {
      console.error('Error loading donations:', error);
    }
  }

  async function loadTotalDonations() {
    try {
      const { data, error } = await supabase
        .from('donations')
        .select('amount');

      if (error) throw error;

      const total = data?.reduce((sum, donation) => sum + Number(donation.amount), 0) || 0;
      setTotalDonations(total);
    } catch (error) {
      console.error('Error loading total donations:', error);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!amount || Number(amount) <= 0) {
      alert('Por favor ingresa una cantidad válida');
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase.from('donations').insert([
        {
          donor_name: donorName || 'Anónimo',
          amount: Number(amount),
          message: message,
        },
      ]);

      if (error) throw error;

      setShowSuccess(true);
      setDonorName('');
      setAmount('');
      setMessage('');

      await loadRecentDonations();
      await loadTotalDonations();

      setTimeout(() => setShowSuccess(false), 5000);
    } catch (error) {
      console.error('Error submitting donation:', error);
      alert('Hubo un error al procesar tu donación. Por favor intenta de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <div className="bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-xl transition-shadow">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
              <Heart className="h-8 w-8 text-green-700" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">${totalDonations.toLocaleString()}</h3>
            <p className="text-gray-600">Total Recaudado</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-xl transition-shadow">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-100 rounded-full mb-4">
              <DollarSign className="h-8 w-8 text-yellow-700" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">{recentDonations.length}</h3>
            <p className="text-gray-600">Donaciones Recientes</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-xl transition-shadow">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
              <CheckCircle className="h-8 w-8 text-red-700" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">100%</h3>
            <p className="text-gray-600">Va a los Jugadores</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Hacer una Donación</h2>

            {showSuccess && (
              <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg flex items-center">
                <CheckCircle className="h-5 w-5 mr-2" />
                <span className="font-semibold">¡Gracias por tu generosa donación!</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="donorName" className="block text-sm font-semibold text-gray-700 mb-2">
                  Tu Nombre (Opcional)
                </label>
                <input
                  type="text"
                  id="donorName"
                  value={donorName}
                  onChange={(e) => setDonorName(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  placeholder="Anónimo"
                />
              </div>

              <div>
                <label htmlFor="amount" className="block text-sm font-semibold text-gray-700 mb-2">
                  Cantidad *
                </label>
                <div className="grid grid-cols-4 gap-2 mb-3">
                  {suggestedAmounts.map((suggestedAmount) => (
                    <button
                      key={suggestedAmount}
                      type="button"
                      onClick={() => setAmount(suggestedAmount.toString())}
                      className={`py-2 px-4 rounded-lg font-semibold transition-all ${
                        amount === suggestedAmount.toString()
                          ? 'bg-green-700 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      ${suggestedAmount}
                    </button>
                  ))}
                </div>
                <div className="relative">
                  <span className="absolute left-4 top-3.5 text-gray-500 font-semibold">$</span>
                  <input
                    type="number"
                    id="amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    placeholder="Otra cantidad"
                    min="1"
                    step="0.01"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                  Mensaje (Opcional)
                </label>
                <textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  rows={4}
                  placeholder="Deja un mensaje de apoyo..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold py-4 px-6 rounded-lg transition-all transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isSubmitting ? 'Procesando...' : 'Donar Ahora'}
              </button>
            </form>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">¿Cómo Ayudan las Donaciones?</h2>

            <div className="space-y-6">
              <div className="flex items-start">
                <div className="bg-green-100 rounded-full p-3 mr-4 flex-shrink-0">
                  <CheckCircle className="h-6 w-6 text-green-700" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-lg mb-1">Equipamiento</h3>
                  <p className="text-gray-600">
                    Proporcionamos uniformes, balones, conos y todo el equipo necesario para entrenamientos de calidad.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-yellow-100 rounded-full p-3 mr-4 flex-shrink-0">
                  <CheckCircle className="h-6 w-6 text-yellow-700" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-lg mb-1">Instalaciones</h3>
                  <p className="text-gray-600">
                    Mantenemos y mejoramos nuestras canchas y espacios de entrenamiento para ofrecer las mejores condiciones.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-red-100 rounded-full p-3 mr-4 flex-shrink-0">
                  <CheckCircle className="h-6 w-6 text-red-700" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-lg mb-1">Becas</h3>
                  <p className="text-gray-600">
                    Apoyamos a jóvenes talentosos de familias con recursos limitados para que puedan continuar entrenando.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-blue-100 rounded-full p-3 mr-4 flex-shrink-0">
                  <CheckCircle className="h-6 w-6 text-blue-700" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-lg mb-1">Torneos</h3>
                  <p className="text-gray-600">
                    Cubrimos costos de inscripción, transporte y alojamiento para participar en competencias.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 p-6 bg-gradient-to-r from-green-50 to-green-100 rounded-lg border border-green-200">
              <p className="text-gray-800 italic">
                "Cada donación, sin importar el monto, marca una diferencia real en la vida de nuestros jóvenes
                atletas. Tu generosidad les da la oportunidad de perseguir sus sueños."
              </p>
            </div>
          </div>
        </div>

        {recentDonations.length > 0 && (
          <div className="mt-12 bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Donaciones Recientes</h2>
            <div className="space-y-4">
              {recentDonations.slice(0, 5).map((donation) => (
                <div key={donation.id} className="border-b border-gray-200 pb-4 last:border-0">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-semibold text-gray-900">{donation.donor_name || 'Anónimo'}</p>
                      <p className="text-sm text-gray-500">{formatDate(donation.created_at)}</p>
                    </div>
                    <span className="text-xl font-bold text-green-700">${Number(donation.amount).toLocaleString()}</span>
                  </div>
                  {donation.message && (
                    <p className="text-gray-600 italic text-sm">"{donation.message}"</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
