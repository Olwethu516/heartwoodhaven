import { useEffect, useState } from 'react';
import { supabase, type Room, type Booking } from '../lib/supabase';
import { AlertCircle, Loader2 } from 'lucide-react';

interface BookingFormProps {
  room: Room;
  prefillDates?: { checkIn: string; checkOut: string };
  onComplete: (booking: Booking) => void;
  onCancel: () => void;
}

export default function BookingForm({ room, prefillDates, onComplete, onCancel }: BookingFormProps) {
  const [checkIn, setCheckIn] = useState(prefillDates?.checkIn || '');
  const [checkOut, setCheckOut] = useState(prefillDates?.checkOut || '');
  const [guests, setGuests] = useState(1);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isAvailable, setIsAvailable] = useState(false);
  const [availabilityChecked, setAvailabilityChecked] = useState(false);

  const today = new Date().toISOString().split('T')[0];

  const nights =
    checkIn && checkOut
      ? Math.ceil((new Date(checkOut).getTime() - new Date(checkIn).getTime()) / 86400000)
      : 0;

  const total = nights * room.price_per_night;

  useEffect(() => {
    if (!checkIn || !checkOut || nights <= 0) {
      setAvailabilityChecked(false);
      return;
    }
    supabase
      .from('bookings')
      .select('check_in_date, check_out_date')
      .eq('room_id', room.id)
      .neq('booking_status', 'cancelled')
      .then(({ data }) => {
        if (!data) return;
        const overlap = data.some((b) => {
          const ein = new Date(b.check_in_date);
          const eout = new Date(b.check_out_date);
          return new Date(checkIn) < eout && new Date(checkOut) > ein;
        });
        setIsAvailable(!overlap);
        setAvailabilityChecked(true);
      });
  }, [checkIn, checkOut, room.id, nights]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const { data, error: err } = await supabase
        .from('bookings')
        .insert({
          room_id: room.id,
          guest_first_name: firstName,
          guest_last_name: lastName,
          guest_email: email,
          guest_phone: phone,
          special_requests: specialRequests || null,
          number_of_guests: guests,
          check_in_date: checkIn,
          check_out_date: checkOut,
          nights,
          room_price_per_night: room.price_per_night,
          subtotal: total,
          total_amount: total,
          payment_method: 'pay_at_checkin',
          payment_status: 'pending',
          booking_status: 'confirmed',
        })
        .select()
        .single();

      if (err) throw err;
      if (data) {
        const { error: emailError } = await supabase.functions.invoke('send-booking-confirmation', {
          body: { bookingId: data.id },
        });
        if (emailError) console.error('Email error:', emailError);
        onComplete(data as Booking);
      }
    } catch (err) {
      console.error(err);
      setError('Unable to complete booking. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const isValid = checkIn && checkOut && nights > 0 && firstName && lastName && email && phone && isAvailable;

  const inputClass = "w-full px-4 py-3 bg-charcoal-50 border border-charcoal-100 text-sm font-sans text-charcoal-900 focus:outline-none focus:border-gold-500 focus:bg-white transition-colors placeholder:text-charcoal-200";
  const labelClass = "block text-[10px] tracking-widest uppercase font-sans text-charcoal-800/40 mb-1.5";

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className={labelClass}>Check-in</label>
          <input type="date" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} min={today} className={inputClass} required />
        </div>
        <div>
          <label className={labelClass}>Check-out</label>
          <input type="date" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} min={checkIn || today} className={inputClass} required />
        </div>
      </div>

      {availabilityChecked && !isAvailable && (
        <div className="flex items-center gap-2 p-3 bg-red-50 text-red-700 text-xs font-sans border border-red-200">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          Not available for these dates.
        </div>
      )}

      <div>
        <label className={labelClass}>Guests</label>
        <select value={guests} onChange={(e) => setGuests(+e.target.value)} className={inputClass}>
          {Array.from({ length: room.capacity }, (_, i) => i + 1).map((n) => (
            <option key={n} value={n}>{n} {n === 1 ? 'Guest' : 'Guests'}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className={labelClass}>First Name</label>
          <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} className={inputClass} required />
        </div>
        <div>
          <label className={labelClass}>Last Name</label>
          <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} className={inputClass} required />
        </div>
      </div>

      <div>
        <label className={labelClass}>Email</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className={inputClass} required />
      </div>

      <div>
        <label className={labelClass}>Phone</label>
        <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="072 XXX XXXX" className={inputClass} required />
      </div>

      <div>
        <label className={labelClass}>Special Requests</label>
        <textarea value={specialRequests} onChange={(e) => setSpecialRequests(e.target.value)} rows={2} className={inputClass} placeholder="Optional" />
      </div>

      {nights > 0 && (
        <div className="bg-charcoal-50 border border-charcoal-100 p-4">
          <div className="flex justify-between text-xs font-sans text-charcoal-800/50 mb-2">
            <span>R{Number(room.price_per_night).toLocaleString()} × {nights} night{nights > 1 ? 's' : ''}</span>
            <span>R{total.toLocaleString()}</span>
          </div>
          <div className="flex justify-between font-sans text-sm font-medium text-charcoal-900 pt-2 border-t border-charcoal-100">
            <span>Due at check-in</span>
            <span className="text-gold-600">R{total.toLocaleString()}</span>
          </div>
        </div>
      )}

      {error && (
        <div className="flex items-center gap-2 p-3 bg-red-50 text-red-700 text-xs font-sans border border-red-200">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          {error}
        </div>
      )}

      <div className="flex gap-3 pt-2">
        <button type="button" onClick={onCancel} className="flex-1 py-3 border border-charcoal-200 text-charcoal-800/60 text-xs tracking-widest uppercase font-sans hover:border-charcoal-900 hover:text-charcoal-900 transition-colors">
          Cancel
        </button>
        <button
          type="submit"
          disabled={!isValid || loading}
          className="flex-1 py-3 bg-gold-500 text-white text-xs tracking-widest uppercase font-sans hover:bg-gold-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
        >
          {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Booking…</> : 'Confirm Booking'}
        </button>
      </div>
    </form>
  );
}
