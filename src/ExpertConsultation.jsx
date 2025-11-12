import React, { useState, useContext } from 'react';
import { Video, Phone, MessageCircle, Calendar, DollarSign, Star } from 'lucide-react';
import { useLanguage } from './LanguageContext';

const ExpertConsultation = () => {
  const { language } = useLanguage();
  const [selectedExpert, setSelectedExpert] = useState(null);
  const [consultType, setConsultType] = useState('video');

  const experts = [
    {
      id: 1,
      name: 'Dr. Maria Rodriguez',
      title: 'PhD Soil Fertility & Plant Nutrition',
      specialty: 'Soil Health, NPK Optimization, Organic Farming',
      experience: '18 years',
      rating: 4.9,
      reviews: 127,
      rate: 150,
      availability: 'Next: Tomorrow 10:00 AM',
      photo: '👩‍🔬'
    },
    {
      id: 2,
      name: 'Dr. Carlos Mendez',
      title: 'PhD Water Quality & Irrigation',
      specialty: 'Water Management, Drip Systems, Salinity Control',
      experience: '22 years',
      rating: 4.8,
      reviews: 94,
      rate: 140,
      availability: 'Next: Today 3:00 PM',
      photo: '👨‍🌾'
    },
    {
      id: 3,
      name: 'Dr. Ana Silva',
      title: 'PhD Crop Nutrition & Physiology',
      specialty: 'Foliar Application, Micronutrients, Yield Optimization',
      experience: '15 years',
      rating: 5.0,
      reviews: 81,
      rate: 175,
      availability: 'Next: Tomorrow 2:00 PM',
      photo: '👩‍🌾'
    },
    {
      id: 4,
      name: 'Dr. Miguel Torres',
      title: 'PhD Organic Certification & Compliance',
      specialty: 'USDA/EU Organic, GlobalGAP, Audit Preparation',
      experience: '20 years',
      rating: 4.7,
      reviews: 103,
      rate: 130,
      availability: 'Next: Friday 9:00 AM',
      photo: '👨‍🔬'
    }
  ];

  const t = {
    en: {
      title: 'Expert Consultation',
      subtitle: 'Book live sessions with certified agronomists',
      perHour: '/hour',
      experience: 'Experience',
      specialty: 'Specialty',
      availability: 'Availability',
      rating: 'Rating',
      reviews: 'reviews',
      consultType: 'Consultation Type',
      videoCall: 'Video Call',
      phoneCall: 'Phone Call',
      liveChat: 'Live Chat',
      bookNow: 'Book Now',
      popular: 'Most Popular'
    },
    es: {
      title: 'Consulta Experta',
      subtitle: 'Reserva sesiones con agrónomos certificados',
      perHour: '/hora',
      experience: 'Experiencia',
      specialty: 'Especialidad',
      availability: 'Disponibilidad',
      rating: 'Calificación',
      reviews: 'reseñas',
      consultType: 'Tipo de Consulta',
      videoCall: 'Videollamada',
      phoneCall: 'Llamada',
      liveChat: 'Chat en Vivo',
      bookNow: 'Reservar Ahora',
      popular: 'Más Popular'
    }
  };

  const text = t[language];

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #7c3aed 0%, #5b21b6 100%)',
      padding: '40px 20px'
    }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', color: 'white', marginBottom: '40px' }}>
          <h1 style={{ fontSize: '3rem', marginBottom: '10px' }}>{text.title}</h1>
          <p style={{ fontSize: '1.2rem', opacity: 0.9 }}>{text.subtitle}</p>
        </div>

        {/* Consultation Type Selector */}
        <div style={{
          background: 'white',
          borderRadius: '15px',
          padding: '25px',
          marginBottom: '30px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
        }}>
          <h3 style={{ fontSize: '1.3rem', marginBottom: '20px', color: '#7c3aed' }}>
            {text.consultType}:
          </h3>
          <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
            <button
              onClick={() => setConsultType('video')}
              style={{
                padding: '15px 30px',
                background: consultType === 'video' ? '#7c3aed' : '#f3f4f6',
                color: consultType === 'video' ? 'white' : '#666',
                border: 'none',
                borderRadius: '10px',
                cursor: 'pointer',
                fontWeight: 'bold',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                fontSize: '1rem'
              }}
            >
              <Video size={20} />
              {text.videoCall}
              <span style={{
                background: '#fef3c7',
                color: '#92400e',
                padding: '3px 8px',
                borderRadius: '12px',
                fontSize: '0.75rem',
                marginLeft: '5px'
              }}>
                {text.popular}
              </span>
            </button>

            <button
              onClick={() => setConsultType('phone')}
              style={{
                padding: '15px 30px',
                background: consultType === 'phone' ? '#7c3aed' : '#f3f4f6',
                color: consultType === 'phone' ? 'white' : '#666',
                border: 'none',
                borderRadius: '10px',
                cursor: 'pointer',
                fontWeight: 'bold',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                fontSize: '1rem'
              }}
            >
              <Phone size={20} />
              {text.phoneCall}
            </button>

            <button
              onClick={() => setConsultType('chat')}
              style={{
                padding: '15px 30px',
                background: consultType === 'chat' ? '#7c3aed' : '#f3f4f6',
                color: consultType === 'chat' ? 'white' : '#666',
                border: 'none',
                borderRadius: '10px',
                cursor: 'pointer',
                fontWeight: 'bold',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                fontSize: '1rem'
              }}
            >
              <MessageCircle size={20} />
              {text.liveChat}
            </button>
          </div>
        </div>

        {/* Experts Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
          gap: '25px'
        }}>
          {experts.map(expert => (
            <div
              key={expert.id}
              style={{
                background: 'white',
                borderRadius: '15px',
                padding: '30px',
                boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
                transition: 'transform 0.3s',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              {/* Expert Photo & Name */}
              <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                <div style={{ fontSize: '5rem', marginBottom: '10px' }}>
                  {expert.photo}
                </div>
                <h3 style={{ fontSize: '1.5rem', color: '#7c3aed', marginBottom: '5px' }}>
                  {expert.name}
                </h3>
                <p style={{ color: '#666', fontSize: '0.95rem' }}>
                  {expert.title}
                </p>
              </div>

              {/* Rating */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                marginBottom: '20px',
                padding: '10px',
                background: '#fef3c7',
                borderRadius: '8px'
              }}>
                <Star size={20} color="#f59e0b" fill="#f59e0b" />
                <span style={{ fontSize: '1.3rem', fontWeight: 'bold', color: '#92400e' }}>
                  {expert.rating}
                </span>
                <span style={{ color: '#92400e' }}>
                  ({expert.reviews} {text.reviews})
                </span>
              </div>

              {/* Details */}
              <div style={{ marginBottom: '20px' }}>
                <div style={{ marginBottom: '12px' }}>
                  <div style={{ fontSize: '0.85rem', color: '#999', marginBottom: '5px' }}>
                    {text.specialty}:
                  </div>
                  <div style={{ fontSize: '0.95rem', color: '#333', lineHeight: '1.5' }}>
                    {expert.specialty}
                  </div>
                </div>

                <div style={{ marginBottom: '12px' }}>
                  <div style={{ fontSize: '0.85rem', color: '#999', marginBottom: '5px' }}>
                    {text.experience}:
                  </div>
                  <div style={{ fontSize: '0.95rem', color: '#333', fontWeight: 'bold' }}>
                    {expert.experience}
                  </div>
                </div>

                <div style={{ marginBottom: '12px' }}>
                  <div style={{ fontSize: '0.85rem', color: '#999', marginBottom: '5px' }}>
                    {text.availability}:
                  </div>
                  <div style={{ fontSize: '0.95rem', color: '#10b981', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Calendar size={16} />
                    {expert.availability}
                  </div>
                </div>
              </div>

              {/* Price & Book Button */}
              <div style={{
                borderTop: '2px solid #e5e7eb',
                paddingTop: '20px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px'
                }}>
                  <DollarSign size={24} color="#7c3aed" />
                  <span style={{ fontSize: '2rem', fontWeight: 'bold', color: '#7c3aed' }}>
                    {expert.rate}
                  </span>
                  <span style={{ color: '#666', fontSize: '0.9rem' }}>
                    {text.perHour}
                  </span>
                </div>

                <button
                  onClick={() => setSelectedExpert(expert)}
                  style={{
                    padding: '12px 25px',
                    background: '#7c3aed',
                    color: 'white',
                    border: 'none',
                    borderRadius: '10px',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    fontSize: '1rem',
                    boxShadow: '0 4px 12px rgba(124, 58, 237, 0.3)'
                  }}
                >
                  {text.bookNow}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Booking Confirmation (if expert selected) */}
        {selectedExpert && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000
          }}
            onClick={() => setSelectedExpert(null)}
          >
            <div
              style={{
                background: 'white',
                borderRadius: '20px',
                padding: '40px',
                maxWidth: '500px',
                textAlign: 'center'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div style={{ fontSize: '4rem', marginBottom: '20px' }}>
                {selectedExpert.photo}
              </div>
              <h2 style={{ fontSize: '1.8rem', color: '#7c3aed', marginBottom: '10px' }}>
                {language === 'en' ? 'Booking Confirmed!' : '¡Reserva Confirmada!'}
              </h2>
              <p style={{ fontSize: '1.1rem', color: '#666', marginBottom: '20px' }}>
                {language === 'en' ? 'You will receive a confirmation email shortly.' : 'Recibirás un email de confirmación pronto.'}
              </p>
              <div style={{
                background: '#f3f4f6',
                padding: '20px',
                borderRadius: '10px',
                marginBottom: '25px',
                textAlign: 'left'
              }}>
                <div style={{ marginBottom: '10px' }}>
                  <strong>{language === 'en' ? 'Expert:' : 'Experto:'}</strong> {selectedExpert.name}
                </div>
                <div style={{ marginBottom: '10px' }}>
                  <strong>{language === 'en' ? 'Type:' : 'Tipo:'}</strong> {text[consultType === 'video' ? 'videoCall' : consultType === 'phone' ? 'phoneCall' : 'liveChat']}
                </div>
                <div style={{ marginBottom: '10px' }}>
                  <strong>{language === 'en' ? 'Time:' : 'Hora:'}</strong> {selectedExpert.availability}
                </div>
                <div>
                  <strong>{language === 'en' ? 'Cost:' : 'Costo:'}</strong> ${selectedExpert.rate}/hr
                </div>
              </div>
              <button
                onClick={() => setSelectedExpert(null)}
                style={{
                  padding: '15px 40px',
                  background: '#7c3aed',
                  color: 'white',
                  border: 'none',
                  borderRadius: '10px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  fontSize: '1.1rem'
                }}
              >
                {language === 'en' ? 'Close' : 'Cerrar'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExpertConsultation;
