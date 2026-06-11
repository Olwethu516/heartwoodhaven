import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Room = {
  id: string;
  name: string;
  slug: string;
  description: string;
  short_description: string | null;
  price_per_night: number;
  capacity: number;
  bed_type: string;
  size_sqm: number | null;
  amenities: string[];
  images: string[];
  featured: boolean;
  sort_order: number;
  is_active: boolean;
};

export type Booking = {
  id: string;
  booking_reference: string;
  room_id: string;
  guest_first_name: string;
  guest_last_name: string;
  guest_email: string;
  guest_phone: string;
  guest_country: string | null;
  special_requests: string | null;
  number_of_guests: number;
  check_in_date: string;
  check_out_date: string;
  nights: number;
  room_price_per_night: number;
  subtotal: number;
  cleaning_fee: number;
  total_amount: number;
  payment_method: 'online' | 'pay_at_checkin';
  payment_status: 'pending' | 'paid' | 'failed' | 'refunded';
  stripe_payment_intent_id: string | null;
  stripe_checkout_session_id: string | null;
  paid_at: string | null;
  booking_status: 'pending' | 'confirmed' | 'checked_in' | 'checked_out' | 'cancelled';
  confirmed_at: string | null;
  cancelled_at: string | null;
  cancellation_reason: string | null;
  created_at: string;
  room?: Room;
};
