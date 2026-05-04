import { NextRequest, NextResponse } from 'next/server';

const WP_BASE = process.env.NEXT_PUBLIC_WP_URL ?? 'https://gcg3official.com';
const FORM_ID = process.env.CF7_REGISTRATION_FORM_ID ?? '2';

export async function POST(req: NextRequest) {
  let body: Record<string, string>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  const { childName, parentName, email, phone, eventName, performanceType, ageGroup, notes } = body;

  if (!childName?.trim() || !parentName?.trim() || !email?.trim() || !phone?.trim()) {
    return NextResponse.json(
      { error: "Child's name, parent name, email, and phone are required." },
      { status: 400 },
    );
  }

  const data = new FormData();
  // CF7 internal fields required for REST API submission
  data.append('_wpcf7', FORM_ID);
  data.append('_wpcf7_version', '5.9');
  data.append('_wpcf7_locale', 'en_US');
  data.append('_wpcf7_unit_tag', `wpcf7-f${FORM_ID}-p0-o1`);
  data.append('_wpcf7_container_post', '0');
  // Registration-specific fields (must match field names in your CF7 form)
  data.append('child-name', childName.trim());
  data.append('parent-name', parentName.trim());
  data.append('your-email', email.trim());
  data.append('your-phone', phone.trim());
  data.append('event-name', eventName?.trim() ?? '');
  data.append('performance-type', performanceType?.trim() ?? '');
  data.append('age-group', ageGroup?.trim() ?? '');
  data.append('your-message', notes?.trim() ?? '');

  try {
    const wpRes = await fetch(
      `${WP_BASE}/wp-json/contact-form-7/v1/contact-forms/${FORM_ID}/feedback`,
      { method: 'POST', body: data },
    );

    const result = await wpRes.json();

    if (result.status === 'mail_sent') {
      return NextResponse.json({ success: true, message: result.message });
    }

    return NextResponse.json(
      { success: false, error: result.message ?? 'Registration failed. Please try again.' },
      { status: 422 },
    );
  } catch {
    return NextResponse.json(
      { error: 'Could not reach WordPress. Please try again later.' },
      { status: 502 },
    );
  }
}
