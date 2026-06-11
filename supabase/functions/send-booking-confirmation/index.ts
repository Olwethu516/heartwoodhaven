import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface BookingRequest {
  bookingId: string;
}

async function sendEmail(
  resendApiKey: string,
  to: string[],
  subject: string,
  html: string,
  from = "Heartwood Haven <onboarding@resend.dev>"
): Promise<{ ok: boolean; id?: string; error?: string }> {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ from, to, subject, html }),
  });

  const body = await res.json();
  if (!res.ok) {
    console.error("Resend error:", JSON.stringify(body));
    return { ok: false, error: body?.message ?? JSON.stringify(body) };
  }
  return { ok: true, id: body.id };
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const { bookingId } = (await req.json()) as BookingRequest;

    if (!bookingId) {
      return new Response(
        JSON.stringify({ error: "Booking ID is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    if (!resendApiKey) {
      console.error("RESEND_API_KEY not configured");
      return new Response(
        JSON.stringify({ error: "Email service not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

    const bookingResponse = await fetch(
      `${supabaseUrl}/rest/v1/bookings?id=eq.${bookingId}&select=*`,
      {
        headers: {
          Authorization: `Bearer ${supabaseServiceKey}`,
          apikey: supabaseServiceKey,
          "Content-Type": "application/json",
        },
      }
    );

    const bookings = await bookingResponse.json();

    if (!bookings || bookings.length === 0) {
      return new Response(
        JSON.stringify({ error: "Booking not found" }),
        { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const booking = bookings[0];

    const roomResponse = await fetch(
      `${supabaseUrl}/rest/v1/rooms?id=eq.${booking.room_id}&select=name,slug`,
      {
        headers: {
          Authorization: `Bearer ${supabaseServiceKey}`,
          apikey: supabaseServiceKey,
          "Content-Type": "application/json",
        },
      }
    );

    const rooms = await roomResponse.json();
    const roomName = rooms?.[0]?.name || "Room";

    const checkInDate = new Date(booking.check_in_date).toLocaleDateString("en-ZA", {
      weekday: "long", year: "numeric", month: "long", day: "numeric",
    });
    const checkOutDate = new Date(booking.check_out_date).toLocaleDateString("en-ZA", {
      weekday: "long", year: "numeric", month: "long", day: "numeric",
    });

    const guestEmailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="margin: 0; padding: 0; background-color: #f9f9f9;">
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background-color: white; border-radius: 12px; padding: 30px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <div style="text-align: center; margin-bottom: 30px;">
              <h1 style="color: #d97706; margin-bottom: 5px;">Heartwood Haven</h1>
              <p style="color: #666; margin: 0;">Your Home Away From Home</p>
            </div>
            <h2 style="color: #333; border-bottom: 2px solid #d97706; padding-bottom: 10px;">Booking Confirmed!</h2>
            <p style="color: #333; font-size: 16px;">Dear ${booking.guest_first_name} ${booking.guest_last_name},</p>
            <p style="color: #666; font-size: 16px; line-height: 1.6;">
              Thank you for choosing Heartwood Haven! Your booking has been confirmed and we're excited to host you.
            </p>
            <div style="background-color: #fef3c7; border-radius: 8px; padding: 20px; margin: 20px 0;">
              <h3 style="color: #92400e; margin-top: 0;">Booking Details</h3>
              <table style="width: 100%; color: #333; border-collapse: collapse;">
                <tr><td style="padding: 8px 0; font-weight: bold; width: 40%;">Booking Reference:</td><td style="padding: 8px 0;">${booking.booking_reference}</td></tr>
                <tr><td style="padding: 8px 0; font-weight: bold;">Room:</td><td style="padding: 8px 0;">${roomName}</td></tr>
                <tr><td style="padding: 8px 0; font-weight: bold;">Check-in:</td><td style="padding: 8px 0;">${checkInDate} at 2:00 PM</td></tr>
                <tr><td style="padding: 8px 0; font-weight: bold;">Check-out:</td><td style="padding: 8px 0;">${checkOutDate} at 10:00 AM</td></tr>
                <tr><td style="padding: 8px 0; font-weight: bold;">Guests:</td><td style="padding: 8px 0;">${booking.number_of_guests}</td></tr>
                <tr><td style="padding: 8px 0; font-weight: bold;">Total Amount:</td><td style="padding: 8px 0; color: #d97706; font-size: 18px; font-weight: bold;">R${Number(booking.total_amount).toLocaleString()}</td></tr>
                <tr><td style="padding: 8px 0; font-weight: bold;">Payment:</td><td style="padding: 8px 0;">${booking.payment_method === "pay_at_checkin" ? "Pay at Check-in" : "Paid Online"}</td></tr>
              </table>
            </div>
            <div style="background-color: #f3f4f6; border-radius: 8px; padding: 20px; margin: 20px 0;">
              <h3 style="color: #333; margin-top: 0;">Location</h3>
              <p style="color: #666; margin: 0;">
                <strong>Heartwood Haven</strong><br>
                137 Edgar Road<br>
                Boksburg, South Africa<br><br>
                Phone: 072 310 6330 / 078 063 8115<br>
                Email: Heartwoodgava@gmail.com
              </p>
            </div>
            <p style="color: #666; font-size: 14px; line-height: 1.6;">
              If you need to make changes, please contact us at Heartwoodgava@gmail.com or call 072 310 6330 / 078 063 8115.
            </p>
            <p style="color: #333; margin-top: 30px;">We look forward to welcoming you!</p>
            <p style="color: #666;">Best regards,<br>The Heartwood Haven Team</p>
          </div>
        </div>
      </body>
      </html>
    `;

    const ownerEmailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="margin: 0; padding: 0; background-color: #f9f9f9;">
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background-color: white; border-radius: 12px; padding: 30px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <h1 style="color: #d97706; margin-bottom: 20px;">New Booking Received</h1>
            <div style="background-color: #fef3c7; border-radius: 8px; padding: 20px; margin: 20px 0;">
              <h3 style="color: #92400e; margin-top: 0;">Guest Information</h3>
              <table style="width: 100%; color: #333; border-collapse: collapse;">
                <tr><td style="padding: 8px 0; font-weight: bold; width: 40%;">Name:</td><td style="padding: 8px 0;">${booking.guest_first_name} ${booking.guest_last_name}</td></tr>
                <tr><td style="padding: 8px 0; font-weight: bold;">Email:</td><td style="padding: 8px 0;">${booking.guest_email}</td></tr>
                <tr><td style="padding: 8px 0; font-weight: bold;">Phone:</td><td style="padding: 8px 0;">${booking.guest_phone}</td></tr>
                ${booking.guest_country ? `<tr><td style="padding: 8px 0; font-weight: bold;">Country:</td><td style="padding: 8px 0;">${booking.guest_country}</td></tr>` : ""}
              </table>
            </div>
            <div style="background-color: #f3f4f6; border-radius: 8px; padding: 20px; margin: 20px 0;">
              <h3 style="color: #333; margin-top: 0;">Booking Details</h3>
              <table style="width: 100%; color: #333; border-collapse: collapse;">
                <tr><td style="padding: 8px 0; font-weight: bold; width: 40%;">Reference:</td><td style="padding: 8px 0;">${booking.booking_reference}</td></tr>
                <tr><td style="padding: 8px 0; font-weight: bold;">Room:</td><td style="padding: 8px 0;">${roomName}</td></tr>
                <tr><td style="padding: 8px 0; font-weight: bold;">Check-in:</td><td style="padding: 8px 0;">${checkInDate}</td></tr>
                <tr><td style="padding: 8px 0; font-weight: bold;">Check-out:</td><td style="padding: 8px 0;">${checkOutDate}</td></tr>
                <tr><td style="padding: 8px 0; font-weight: bold;">Nights:</td><td style="padding: 8px 0;">${booking.nights}</td></tr>
                <tr><td style="padding: 8px 0; font-weight: bold;">Guests:</td><td style="padding: 8px 0;">${booking.number_of_guests}</td></tr>
                <tr><td style="padding: 8px 0; font-weight: bold;">Total:</td><td style="padding: 8px 0; color: #d97706; font-size: 18px; font-weight: bold;">R${Number(booking.total_amount).toLocaleString()}</td></tr>
                <tr><td style="padding: 8px 0; font-weight: bold;">Payment Method:</td><td style="padding: 8px 0;">${booking.payment_method === "pay_at_checkin" ? "Pay at Check-in" : "Paid Online"}</td></tr>
              </table>
            </div>
            ${booking.special_requests ? `
            <div style="background-color: #fef2f2; border-radius: 8px; padding: 20px; margin: 20px 0;">
              <h3 style="color: #991b1b; margin-top: 0;">Special Requests</h3>
              <p style="color: #333; margin: 0;">${booking.special_requests}</p>
            </div>
            ` : ""}
            <p style="color: #666; font-size: 12px;">Received on: ${new Date().toLocaleString()}</p>
          </div>
        </div>
      </body>
      </html>
    `;

    const [guestResult, ownerResult] = await Promise.all([
      sendEmail(
        resendApiKey,
        [booking.guest_email],
        `Booking Confirmed - ${booking.booking_reference}`,
        guestEmailHtml
      ),
      sendEmail(
        resendApiKey,
        ["Heartwoodgava@gmail.com"],
        `New Booking: ${booking.booking_reference} - ${booking.guest_first_name} ${booking.guest_last_name}`,
        ownerEmailHtml
      ),
    ]);

    const errors: string[] = [];
    if (!guestResult.ok) errors.push(`Guest email: ${guestResult.error}`);
    if (!ownerResult.ok) errors.push(`Owner email: ${ownerResult.error}`);

    if (errors.length > 0) {
      return new Response(
        JSON.stringify({ error: "One or more emails failed to send", details: errors }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ success: true, guestEmailId: guestResult.id, ownerEmailId: ownerResult.id }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error processing booking notification:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error", details: error.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
