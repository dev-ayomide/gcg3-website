import { NextRequest, NextResponse } from 'next/server';

const WP_BASE = process.env.NEXT_PUBLIC_WP_URL ?? 'https://gcg3official.com';
const FORM_ID = process.env.CF7_CONTACT_FORM_ID ?? '1';

export async function POST(req: NextRequest) {
  let body: Record<string, string>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  const { name, email, phone, subject, message } = body;

  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return NextResponse.json({ error: 'Name, email, and message are required.' }, { status: 400 });
  }

  const data = new FormData();
  // CF7 internal fields required for REST API submission
  data.append('_wpcf7', FORM_ID);
  data.append('_wpcf7_version', '5.9');
  data.append('_wpcf7_locale', 'en_US');
  data.append('_wpcf7_unit_tag', `wpcf7-f${FORM_ID}-p0-o1`);
  data.append('_wpcf7_container_post', '0');
  // Form fields (must match field names in your CF7 form)
  data.append('your-name', name.trim());
  data.append('your-email', email.trim());
  if (phone?.trim()) data.append('your-phone', phone.trim());
  if (subject?.trim()) data.append('your-subject', subject.trim());
  data.append('your-message', message.trim());

  try {
    const wpRes = await fetch(
      `${WP_BASE}/wp-json/contact-form-7/v1/contact-forms/${FORM_ID}/feedback`,
      { method: 'POST', body: data },
    );

    const result = await wpRes.json();

    if (result.status === 'mail_sent') {
      return NextResponse.json({ success: true, message: result.message });
    }

    // CF7 returns validation_failed or spam etc.
    return NextResponse.json(
      { success: false, error: result.message ?? 'Submission failed. Please try again.' },
      { status: 422 },
    );
  } catch {
    return NextResponse.json(
      { error: 'Could not reach WordPress. Please try again later.' },
      { status: 502 },
    );
  }
}
