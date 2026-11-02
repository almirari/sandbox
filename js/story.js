// ✏️ Content for the scroll intro (after the "about" text): experience timeline + achievements.
// Descriptions marked "draft" are written from your LinkedIn / intro facts. Please rewrite them in your own voice.
// Order = order on screen (newest first). Reverse the array if you prefer oldest first.

export const CV_FILE = 'textures/cv.pdf';

export const EXPERIENCE = [
  {
    when: 'Jan 2026 – Sep 2026',
    role: 'Technology & Consulting Intern',
    org: 'Accenture Southeast Asia · Central Jakarta',
    desc: 'Ran systematic API contract testing on pre-production systems and caught 15+ critical defects before release.',
    tags: ['API testing', 'Quality'],
  },
  {
    when: 'Jul 2025 – Sep 2025',
    role: 'Data Analyst Intern',
    org: 'PT Bank Syariah Indonesia Tbk. · Central Jakarta',
    desc: 'Built a repayment behavior analysis pipeline that improved collections efficiency by 12%.',
    tags: ['Data analysis', 'Pipelines'],
  },
  {
    when: 'Mar 2025 – Present',
    role: 'Research Assistant',
    org: 'Institut Teknologi Sepuluh Nopember (ITS)',
    desc: 'Researching knowledge distillation for oil palm ripeness classification. Compressed a vision model to 2.23M parameters while keeping 95.64% accuracy, published at ICTS 2025.',
    tags: ['Knowledge distillation', 'Edge AI'],
  },
  {
    when: 'May 2024 – Aug 2026',
    role: 'Laboratory Administrator',   // draft
    org: 'Laboratorium Komputasi Cerdas dan Visi (KCV) · Surabaya',
    desc: 'Supported day-to-day lab operations and programs, including Lab Based Education 2024.',
    tags: [],
  },
  {
    when: 'Mar 2024 – Dec 2025',
    role: 'Head of Visual Media',   // draft
    org: 'ANARGYA ITS Team',
    desc: 'Led visual media for the ITS Formula EV team, including content for FSAE Australasia.',
    tags: [],
  },
];

// icon = any emoji. note is optional.
export const ACHIEVEMENTS = [
  { icon: '🏅', title: 'Honorable Mention, ICT Scientific Writing',
    meta: 'GEMASTIK XVIII 2025 · MoECRT', note: 'Top 4 of 386 teams' },
  { icon: '🏎️', title: '3rd Place, Presentation Event',
    meta: 'Formula SAE Japan 2024', note: '' },
  { icon: '📄', title: 'Published at ICTS 2025',
    meta: 'Knowledge distillation for ordinal classification', note: '2.23M params · 95.64% accuracy' },
  { icon: '🎓', title: '3.61 / 4.00 GPA',
    meta: 'Informatics Engineering, ITS · 2022 – 2026', note: '' },
  // add more here (your LinkedIn lists 6 honors in total)
];

// [label, href, isDownload]
export const QUICK_LINKS = [
  ['Download CV', CV_FILE, true],
  ['LinkedIn', 'https://www.linkedin.com/in/almira-ri'],
  ['GitHub', 'https://github.com/almirari'],
  ['Email', 'mailto:almirari004@gmail.com'],
];