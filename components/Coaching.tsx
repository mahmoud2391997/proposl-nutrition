import React, { useState } from 'react';
import { Coach } from '../types';
import { Calendar, Clock, Check, Star, User } from 'lucide-react';

const coaches: Coach[] = [
  {
    id: '1',
    name: 'Dr. Emily Carter',
    specialty: 'Sports Nutrition',
    bio: 'Specializing in high-performance diets for athletes. 10+ years experience with Olympians.',
    rate: 150,
    imageUrl: 'https://picsum.photos/200/200?random=1',
    availableSlots: ['09:00 AM', '11:00 AM', '02:00 PM']
  },
  {
    id: '2',
    name: 'Marcus Thorne',
    specialty: 'Weight Loss & Keto',
    bio: 'Helping clients achieve sustainable weight loss through metabolic flexibility and ketosis.',
    rate: 120,
    imageUrl: 'https://picsum.photos/200/200?random=2',
    availableSlots: ['10:00 AM', '01:00 PM', '04:00 PM']
  },
  {
    id: '3',
    name: 'Sarah Jenkins',
    specialty: 'Vegan & Plant-Based',
    bio: 'Certified holistic nutritionist focused on plant-based healing and gut health.',
    rate: 100,
    imageUrl: 'https://picsum.photos/200/200?random=3',
    availableSlots: ['09:30 AM', '12:30 PM', '03:30 PM']
  }
];

const Coaching: React.FC = () => {
  const [selectedCoach, setSelectedCoach] = useState<Coach | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedSlot, setSelectedSlot] = useState<string>('');
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const handleBook = () => {
    if (selectedCoach && selectedDate && selectedSlot) {
      setBookingSuccess(true);
      setTimeout(() => {
        // Reset after success "animation"
        setBookingSuccess(false);
        setSelectedCoach(null);
        setSelectedDate('');
        setSelectedSlot('');
      }, 3000);
    }
  };

  // Simple date generation for next 5 days
  const dates = Array.from({ length: 5 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i + 1);
    return d.toISOString().split('T')[0];
  });

  if (bookingSuccess) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] animate-fade-in">
        <div className="bg-emerald-100 p-6 rounded-full mb-6">
          <Check className="w-16 h-16 text-emerald-600" />
        </div>
        <h2 className="text-3xl font-bold text-slate-900 mb-2">Booking Confirmed!</h2>
        <p className="text-slate-600 text-center max-w-md">
          You are booked with {selectedCoach?.name} on {selectedDate} at {selectedSlot}.
          Check your email for the link.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-slate-900 mb-4">Expert One-on-One Coaching</h2>
        <p className="text-slate-600 max-w-2xl mx-auto">
          Accelerate your results with personalized guidance. Choose from our elite roster of certified nutritionists.
        </p>
      </div>

      {!selectedCoach ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {coaches.map(coach => (
            <div key={coach.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all overflow-hidden border border-slate-100 group">
              <div className="h-48 overflow-hidden">
                <img src={coach.imageUrl} alt={coach.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-slate-800">{coach.name}</h3>
                  <div className="flex items-center text-yellow-500">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="text-sm font-bold ml-1">5.0</span>
                  </div>
                </div>
                <p className="text-emerald-600 font-medium text-sm mb-4">{coach.specialty}</p>
                <p className="text-slate-500 text-sm mb-6 line-clamp-3">{coach.bio}</p>
                
                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                  <span className="text-2xl font-bold text-slate-900">${coach.rate}<span className="text-sm font-normal text-slate-500">/hr</span></span>
                  <button
                    onClick={() => setSelectedCoach(coach)}
                    className="bg-slate-900 text-white px-6 py-2 rounded-lg font-medium hover:bg-slate-800 transition-colors"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100 flex flex-col md:flex-row">
          {/* Summary Sidebar */}
          <div className="bg-slate-50 p-8 md:w-1/3 border-r border-slate-100">
            <button onClick={() => setSelectedCoach(null)} className="text-sm text-slate-500 hover:text-slate-800 mb-6 flex items-center gap-1">
              &larr; Back to coaches
            </button>
            
            <img src={selectedCoach.imageUrl} alt={selectedCoach.name} className="w-24 h-24 rounded-full object-cover mb-4 border-4 border-white shadow-sm" />
            <h3 className="text-xl font-bold text-slate-800">{selectedCoach.name}</h3>
            <p className="text-emerald-600 font-medium text-sm mb-6">{selectedCoach.specialty}</p>
            
            <div className="space-y-3 text-sm text-slate-600">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>Video Consultation</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>60 Minutes</span>
              </div>
            </div>
          </div>

          {/* Booking Form */}
          <div className="p-8 md:w-2/3">
            <h3 className="text-xl font-bold text-slate-900 mb-6">Select a Time</h3>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-slate-700 mb-3">Date</label>
              <div className="flex gap-2 overflow-x-auto pb-2">
                {dates.map(date => (
                  <button
                    key={date}
                    onClick={() => setSelectedDate(date)}
                    className={`flex-shrink-0 px-4 py-3 rounded-xl border text-sm font-medium transition-all ${
                      selectedDate === date 
                        ? 'border-emerald-500 bg-emerald-50 text-emerald-700' 
                        : 'border-slate-200 text-slate-600 hover:border-emerald-300'
                    }`}
                  >
                    <span className="block text-xs text-slate-400 uppercase mb-1">{new Date(date).toLocaleDateString('en-US', { weekday: 'short' })}</span>
                    <span className="block text-lg font-bold">{new Date(date).getDate()}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <label className="block text-sm font-medium text-slate-700 mb-3">Available Slots</label>
              <div className="grid grid-cols-3 gap-3">
                {selectedCoach.availableSlots.map(slot => (
                  <button
                    key={slot}
                    onClick={() => setSelectedSlot(slot)}
                    disabled={!selectedDate}
                    className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all ${
                      !selectedDate 
                        ? 'opacity-50 cursor-not-allowed border-slate-100 bg-slate-50' 
                        : selectedSlot === slot 
                          ? 'bg-slate-900 text-white border-slate-900' 
                          : 'border-slate-200 text-slate-700 hover:border-emerald-400'
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleBook}
              disabled={!selectedDate || !selectedSlot}
              className={`w-full py-4 rounded-xl font-bold text-lg transition-all ${
                !selectedDate || !selectedSlot
                  ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  : 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-lg hover:shadow-xl'
              }`}
            >
              Confirm Booking
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Coaching;