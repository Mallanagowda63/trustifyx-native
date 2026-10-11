// Single source for company contact details — change them here and the whole site updates.
export const CONTACT_EMAIL = 'infotrustifyx@gmail.com';
export const PHONE = '+91 99015 36003';

// Until this moment visitors see the Coming Soon page; the site opens itself when it passes.
export const LAUNCH_AT = new Date('2026-10-12T00:00:00+05:30').getTime();
export const LAUNCH_LABEL = '12 Oct 2026 · 12:00 AM IST';

// Paste the Google Business Profile "Ask for reviews" link here (looks like https://g.page/r/.../review).
// Until then the button opens a Google search for TrustifyX, where the review box appears once the profile is live.
export const GOOGLE_REVIEW_URL = '';
export const GOOGLE_REVIEW_FALLBACK = 'https://www.google.com/search?q=TrustifyX+Bengaluru';

export const SOCIAL_LINKS = {
  x: 'https://x.com/home',
  linkedin: 'https://www.linkedin.com/in/trustify-x-0b0215443/',
  instagram: 'https://www.instagram.com/trustify_x',
};

export const INQUIRY_TYPES = [
  'Software Development Service',
  'Web & Mobile Apps',
  'Cloud Solutions',
  'QA & Testing',
  'IT Consulting',
  'DevOps & Infrastructure',
  'Internship Inquiry',
  'Other',
];

export const FAQS = [
  {
    q: 'How long does it take to deploy a custom software project?',
    a: 'Typically, standard web and mobile systems take between 6 and 12 weeks from custom design mapping to secure cloud delivery, following rigorous testing protocols.',
  },
  {
    q: 'Are your internships paid, and do you offer placement guarantees?',
    a: 'Yes, our immersive internship cohorts receive performance-based stipends. We provide direct placement services, pairing participants with senior leads to align careers with industry partners.',
  },
  {
    q: 'What security compliance frameworks does TrustifyX follow?',
    a: 'As an ISO 9001:2015 certified company, we strictly implement military-grade authentication, HTTPS/SSL protocols, regular vulnerability audits, and strict compliance guidelines.',
  },
  {
    q: 'Can we request a dedicated team of developers for our enterprise cloud systems?',
    a: 'Absolutely. We supply custom backend tooling, databases, and microservices overseen by our CTO Dr. Aradhana Sen and senior architects with 24/7 support availability.',
  },
];
