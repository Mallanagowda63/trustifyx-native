export type Job = {
  title: string;
  team: string;
  location: string;
  type: string;
};

export type Internship = {
  tag: string;
  meta: string;
  title: string;
  team: string;
  location: string;
  duration: string;
  body: string;
  pay: string;
};

export const VALUES = [
  {
    title: 'Continuous Learning',
    body: 'Structured architectural syncs, research presentations, and immediate upskilling setups built directly into sprints.',
  },
  {
    title: 'Radical Transparency',
    body: 'No opaque corporate silos. Clear documentation, clear specs, and honest retrospectives.',
  },
  {
    title: 'Code Excellence',
    body: 'Rigorous testing suites, performance metrics tracking, and military-grade compliance parameters.',
  },
  {
    title: 'Sane Sprints',
    body: 'Automated workloads paired with healthy timelines, respecting your focus and private calendar.',
  },
  {
    title: 'High Bandwidth',
    body: 'Direct cross-functional channels across designers, cloud engineers, and product clients.',
  },
  {
    title: 'Active Mentoring',
    body: 'Sharing knowledge is built directly into lead engineer promotion parameters.',
  },
];

export const JOBS: Job[] = [
  { title: 'Senior DevOps Engineer', team: 'Infrastructure', location: 'Karnataka, India (Hybrid)', type: 'Full-Time' },
  { title: 'Lead Full-Stack Developer', team: 'Engineering Suite', location: 'Noida, UP (Onsite)', type: 'Full-Time' },
  { title: 'SaaS Product Designer', team: 'UI/UX Design', location: 'Remote (India)', type: 'Contract' },
  { title: 'QA Automation Lead', team: 'Systems Verification', location: 'Karnataka, India (Hybrid)', type: 'Full-Time' },
];

export const INTERNSHIPS: Internship[] = [
  {
    tag: 'Featured',
    meta: 'Full-time',
    title: 'UI/UX Design Intern',
    team: 'Product Design Team · Tata Digital Studio',
    location: 'Mumbai, MH',
    duration: '12 weeks',
    body: 'Support wireframes, prototypes, and usability testing for web and mobile experiences. Collaborate with product managers and designers to turn feedback into polished interface improvements.',
    pay: '₹45,000 / month stipend',
  },
  {
    tag: 'Engineering',
    meta: 'Summer 2025',
    title: 'Frontend Developer Intern',
    team: 'Web Platform Team · Infosys Labs',
    location: 'Hyderabad, TS',
    duration: '10 weeks',
    body: 'Build responsive interfaces using React, TypeScript, and modern CSS workflows. Help ship bug fixes, accessibility improvements, and small feature enhancements across the product suite.',
    pay: '₹50,000 / month stipend',
  },
  {
    tag: 'Growth',
    meta: 'Hybrid',
    title: 'Marketing Intern',
    team: 'Brand & Growth Team · Zee Media',
    location: 'Bengaluru, KA',
    duration: '8 weeks',
    body: 'Assist with campaign planning, social content calendars, email outreach, and performance reporting. Support research, copywriting, and creative coordination for upcoming launches.',
    pay: '₹35,000 / month stipend',
  },
];

export const STEPS = [
  { num: '01', title: 'Online Screening', body: 'Submit your profile and complete our structured code optimization test sandbox.' },
  { num: '02', title: 'Technical Round', body: 'Join senior architects for a live coding review analyzing performance, logic, and design.' },
  { num: '03', title: 'Orientation', body: 'Access code environments, receive secure dev credentials, and join active sprint standups.' },
];
