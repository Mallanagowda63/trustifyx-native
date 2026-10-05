import { CONTACT_EMAIL } from './company';

// Starting-point policies written for this site. Have them reviewed by a legal
// professional before relying on them.

export type LegalId = 'privacy' | 'terms' | 'compliance';

export type LegalSection = {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
};

export type LegalDoc = {
  id: LegalId;
  title: string;
  summary: string;
  updated: string;
  sections: LegalSection[];
};

const UPDATED = 'October 5, 2026';

export const LEGAL_DOCS: Record<LegalId, LegalDoc> = {
  privacy: {
    id: 'privacy',
    title: 'Privacy Policy',
    summary:
      'How TrustifyX collects, uses and protects the personal information you share with us through this website, our contact form and our job and internship applications.',
    updated: UPDATED,
    sections: [
      {
        heading: '1. Who we are',
        paragraphs: [
          'TrustifyX is a registered Indian software company that builds digital products for clients and runs internship programs for aspiring technology professionals. In this policy, "TrustifyX", "we" and "us" refer to the company, and "you" refers to anyone who visits this website or contacts us.',
          'We handle personal data in line with the Digital Personal Data Protection Act, 2023 and the Information Technology Act, 2000, along with the rules made under them.',
        ],
      },
      {
        heading: '2. Information we collect',
        paragraphs: ['We only collect information that you choose to give us, such as:'],
        bullets: [
          'Contact form details: your name, email address, phone number, the type of inquiry and your message.',
          'Job and internship applications: your resume or CV, cover letter, portfolio or GitHub links, availability, and any other details you include in your email.',
          'Ordinary correspondence: anything you send us by email or phone.',
        ],
      },
      {
        heading: '3. How we use your information',
        bullets: [
          'To reply to your questions and discuss projects you ask us about.',
          'To review job and internship applications and contact candidates about them.',
          'To keep records of our communication with you.',
          'To meet our legal and regulatory obligations.',
        ],
        paragraphs: ['We do not sell your personal information, and we do not use it for advertising.'],
      },
      {
        heading: '4. How your information is sent to us',
        paragraphs: [
          'This website does not store form submissions on its own servers. When you submit the contact form or choose "Apply via Email", your own email app opens with the message ready to send, and the information reaches us by email only after you send it.',
        ],
      },
      {
        heading: '5. Sharing your information',
        paragraphs: ['We share personal information only when it is needed:'],
        bullets: [
          'With service providers that help us operate, such as our email and website hosting providers, who may only use it to provide their service to us.',
          'When the law requires it, or to protect the rights and safety of TrustifyX, our clients or others.',
        ],
      },
      {
        heading: '6. How long we keep it',
        paragraphs: [
          'We keep inquiries for as long as needed to respond and to follow up on any resulting work. We keep job and internship applications for up to 12 months after the hiring decision, unless you ask us to delete them sooner or we are legally required to keep them longer.',
        ],
      },
      {
        heading: '7. Your rights',
        paragraphs: ['Subject to applicable law, you can ask us to:'],
        bullets: [
          'Tell you what personal information we hold about you.',
          'Correct or update information that is inaccurate or incomplete.',
          'Delete your information when it is no longer needed.',
          'Withdraw consent you have given us.',
        ],
      },
      {
        heading: '8. Security',
        paragraphs: [
          'We use reasonable technical and organisational safeguards to protect your information, including access controls and encrypted connections. No method of sending or storing data is completely secure, so we cannot guarantee absolute security.',
        ],
      },
      {
        heading: '9. Changes to this policy',
        paragraphs: [
          'We may update this policy from time to time. The "Last updated" date at the top shows when it last changed.',
        ],
      },
      {
        heading: '10. Contact us',
        paragraphs: [
          `For privacy questions, or to use any of the rights above, email us at ${CONTACT_EMAIL}. We aim to respond within 30 days.`,
        ],
      },
    ],
  },

  terms: {
    id: 'terms',
    title: 'Terms of Service',
    summary: 'The rules for using the TrustifyX website and the information on it.',
    updated: UPDATED,
    sections: [
      {
        heading: '1. Accepting these terms',
        paragraphs: [
          'By using this website, you agree to these terms. If you do not agree with them, please do not use the website.',
        ],
      },
      {
        heading: '2. About this website',
        paragraphs: [
          'This website provides information about TrustifyX, our software services and products, and our job and internship opportunities. It is for general information only and does not form a contract for any service.',
        ],
      },
      {
        heading: '3. Services and projects',
        paragraphs: [
          'Any software development, consulting or other work we do for you is governed by a separate written agreement that sets out its scope, timelines, fees and responsibilities. Descriptions of our services and typical timelines on this website are general guidance, not commitments.',
        ],
      },
      {
        heading: '4. Jobs and internships',
        paragraphs: [
          'Job and internship listings describe opportunities that may change or close without notice. Submitting an application does not guarantee an interview, an offer or a placement. Internship stipends are performance-based, and their terms are confirmed in writing in an offer letter.',
        ],
      },
      {
        heading: '5. Intellectual property',
        paragraphs: [
          'The TrustifyX name and logo, the Legally Talk name and logo, and the text, graphics and design of this website belong to TrustifyX or its licensors. You may view and share pages for personal or internal business use, but you may not copy, modify or reuse our branding or content for commercial purposes without our written permission.',
        ],
      },
      {
        heading: '6. Acceptable use',
        paragraphs: ['When using this website, you agree not to:'],
        bullets: [
          'Use it for anything unlawful or fraudulent.',
          'Try to gain unauthorised access to the website or the systems behind it.',
          'Interfere with its normal operation, for example by introducing malicious code.',
          'Send spam or misleading information through our contact channels.',
        ],
      },
      {
        heading: '7. Links to other websites',
        paragraphs: [
          'This website may link to websites run by others. We are not responsible for their content or their privacy practices.',
        ],
      },
      {
        heading: '8. Disclaimer',
        paragraphs: [
          'We work to keep the information on this website accurate and up to date, but it is provided "as is", without warranties of any kind. We do not guarantee that the website will always be available or free of errors.',
        ],
      },
      {
        heading: '9. Limitation of liability',
        paragraphs: [
          'To the fullest extent permitted by law, TrustifyX is not liable for any indirect or consequential loss arising from your use of this website. Nothing in these terms limits liability that cannot be limited under applicable law.',
        ],
      },
      {
        heading: '10. Governing law',
        paragraphs: [
          'These terms are governed by the laws of India, and the courts of Bengaluru, Karnataka have jurisdiction over any dispute about them.',
        ],
      },
      {
        heading: '11. Changes to these terms',
        paragraphs: [
          'We may update these terms from time to time. The "Last updated" date at the top shows when they last changed. Continuing to use the website after a change means you accept the updated terms.',
        ],
      },
      {
        heading: '12. Contact us',
        paragraphs: [`Questions about these terms can be sent to ${CONTACT_EMAIL}.`],
      },
    ],
  },

  compliance: {
    id: 'compliance',
    title: 'Compliance Guidelines',
    summary:
      'The standards TrustifyX staff, interns and partners follow to keep client work secure, lawful and ethical.',
    updated: UPDATED,
    sections: [
      {
        heading: '1. Purpose',
        paragraphs: [
          'These guidelines set out the standards everyone working with TrustifyX is expected to follow, including employees, interns, contractors and partners. They help us protect our clients, the people whose data we handle, and each other.',
        ],
      },
      {
        heading: '2. Data protection',
        bullets: [
          'Collect only the personal data a project actually needs, and use it only for that purpose.',
          'Handle personal data in line with the Digital Personal Data Protection Act, 2023 and our Privacy Policy.',
          'Never copy client or user data to personal devices or personal accounts.',
          'Delete or return data when a project ends, as agreed with the client.',
        ],
      },
      {
        heading: '3. Information security',
        bullets: [
          'Use strong, unique passwords and turn on two-factor authentication wherever it is available.',
          'Grant access on a least-privilege basis, and remove it promptly when someone changes role or leaves.',
          'Keep secrets such as API keys and credentials out of source code; use a secrets manager instead.',
          'Encrypt data in transit, and encrypt sensitive data at rest.',
          'Keep devices, dependencies and systems up to date with security patches.',
        ],
      },
      {
        heading: '4. Secure development',
        bullets: [
          'Every code change is reviewed by another engineer before it is merged.',
          'Automated tests and security checks run before code is deployed to production.',
          'Production systems are changed only through approved deployment pipelines.',
          'Third-party libraries are checked for known vulnerabilities and acceptable licences.',
        ],
      },
      {
        heading: '5. Confidentiality and intellectual property',
        bullets: [
          'Client information, source code and business details are confidential unless the client says otherwise.',
          'Staff and interns sign confidentiality agreements before working on client projects.',
          'Work created for a client is handled according to the ownership terms in that client’s agreement.',
        ],
      },
      {
        heading: '6. Interns and mentorship',
        bullets: [
          'Interns work on real projects under the supervision of an assigned mentor.',
          'Interns get access only to the systems and data their tasks require.',
          'Internship terms, including performance-based stipends, are confirmed in writing in an offer letter.',
          'Interns receive regular feedback and a clear point of contact for questions or concerns.',
        ],
      },
      {
        heading: '7. Workplace conduct',
        bullets: [
          'Treat colleagues, interns and clients with respect. Discrimination and harassment are not tolerated.',
          'We follow the Sexual Harassment of Women at Workplace (Prevention, Prohibition and Redressal) Act, 2013.',
          'Avoid conflicts of interest, and disclose any that may arise.',
          'Do not offer or accept bribes, kickbacks or improper gifts.',
        ],
      },
      {
        heading: '8. Incident reporting',
        paragraphs: [
          'Anyone who suspects a security incident, data breach or breach of these guidelines should report it right away. We investigate reports promptly, notify affected clients and authorities where the law requires it, and do not tolerate retaliation against anyone who reports a concern in good faith.',
        ],
      },
      {
        heading: '9. Review',
        paragraphs: [
          'We review these guidelines at least once a year, and whenever the law or our way of working changes.',
        ],
      },
      {
        heading: '10. Contact',
        paragraphs: [`Report concerns or ask questions about these guidelines at ${CONTACT_EMAIL}.`],
      },
    ],
  },
};

export const LEGAL_ORDER: LegalId[] = ['privacy', 'terms', 'compliance'];
