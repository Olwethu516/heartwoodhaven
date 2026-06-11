import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Clock, Check } from 'lucide-react';

export function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 900));
    setLoading(false);
    setSubmitted(true);
  };

  const inputClass = "w-full px-4 py-3.5 bg-charcoal-50 border border-charcoal-100 text-sm font-sans text-charcoal-900 focus:outline-none focus:border-gold-500 focus:bg-white transition-colors placeholder:text-charcoal-200";
  const labelClass = "block text-[10px] tracking-widest uppercase font-sans text-charcoal-800/40 mb-1.5";

  if (submitted) {
    return (
      <div className="min-h-screen bg-charcoal-50 flex items-center justify-center p-6">
        <div className="bg-white p-12 max-w-md w-full text-center shadow-sm">
          <div className="w-14 h-14 border border-gold-400/40 flex items-center justify-center mx-auto mb-6">
            <Check className="w-6 h-6 text-gold-500" />
          </div>
          <h1 className="font-serif text-3xl font-light text-charcoal-900 mb-3">Message Sent</h1>
          <p className="text-charcoal-800/50 text-sm font-sans mb-8">
            Thank you for reaching out. We will be in touch within 24 hours.
          </p>
          <Link to="/" className="btn-gold justify-center w-full">Return Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-charcoal-50">
      {/* Header */}
      <section className="relative h-64 flex items-end overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/WhatsApp_Image_2026-06-09_at_15.42.31_%282%29.jpeg')" }}
        />
        <div className="absolute inset-0 bg-charcoal-950/65" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full pb-12">
          <p className="section-label text-gold-400 mb-3">Get in Touch</p>
          <h1 className="font-serif text-5xl font-light text-white">Contact</h1>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Info */}
            <div className="lg:col-span-2 space-y-10">
              <div>
                <p className="section-label mb-6">Contact Details</p>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 border border-gold-400/30 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-4 h-4 text-gold-500" />
                    </div>
                    <div>
                      <p className="text-[10px] tracking-widest uppercase text-charcoal-800/40 font-sans mb-1">Address</p>
                      <p className="text-sm font-sans text-charcoal-800/70">
                        137 Edgar Road<br />Boksburg, South Africa
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 border border-gold-400/30 flex items-center justify-center flex-shrink-0">
                      <Phone className="w-4 h-4 text-gold-500" />
                    </div>
                    <div>
                      <p className="text-[10px] tracking-widest uppercase text-charcoal-800/40 font-sans mb-1">Phone</p>
                      <a href="tel:+27723106330" className="block text-sm font-sans text-charcoal-800/70 hover:text-gold-500 transition-colors">
                        072 310 6330
                      </a>
                      <a href="tel:+27780638115" className="block text-sm font-sans text-charcoal-800/70 hover:text-gold-500 transition-colors">
                        078 063 8115
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 border border-gold-400/30 flex items-center justify-center flex-shrink-0">
                      <Clock className="w-4 h-4 text-gold-500" />
                    </div>
                    <div>
                      <p className="text-[10px] tracking-widest uppercase text-charcoal-800/40 font-sans mb-1">Hours</p>
                      <p className="text-sm font-sans text-charcoal-800/70">Check-in: 14:00</p>
                      <p className="text-sm font-sans text-charcoal-800/70">Check-out: 10:00</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-charcoal-900 p-8">
                <p className="text-[10px] tracking-widest uppercase text-gold-400 font-sans mb-3">Quick Booking</p>
                <p className="font-serif text-2xl text-white font-light mb-4">Ready to stay with us?</p>
                <p className="text-white/50 text-sm font-sans mb-6">View our rooms and reserve your stay directly online.</p>
                <Link to="/rooms" className="btn-gold text-sm">
                  View Rooms
                </Link>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-3">
              <div className="bg-white p-10 shadow-sm">
                <p className="section-label mb-2">Send a Message</p>
                <h2 className="font-serif text-3xl font-light text-charcoal-900 mb-8">We'd Love to Hear From You</h2>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <label className={labelClass}>Your Name</label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className={inputClass}
                        required
                      />
                    </div>
                    <div>
                      <label className={labelClass}>Email Address</label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className={inputClass}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className={labelClass}>Subject</label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className={inputClass}
                      required
                    >
                      <option value="">Select a subject</option>
                      <option value="booking">Booking Enquiry</option>
                      <option value="availability">Availability</option>
                      <option value="feedback">Feedback</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className={labelClass}>Message</label>
                    <textarea
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      rows={5}
                      className={inputClass}
                      placeholder="How can we help you?"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-gold w-full justify-center disabled:opacity-60"
                  >
                    {loading ? (
                      <><div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" /> Sending…</>
                    ) : 'Send Message'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
