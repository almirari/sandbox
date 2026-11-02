// ✏️ Content for the scroll intro (after the "about" text): experience timeline + achievements.
// Descriptions marked "draft" are written from your LinkedIn / intro facts. Please rewrite them in your own voice.
// Order = order on screen (newest first). Reverse the array if you prefer oldest first.

export const CV_FILE = 'textures/cv.pdf';

export const EXPERIENCE = [
  {
    when: 'Mar 2024 – Dec 2025',
    role: 'Head of Visual Media',
    org: 'ANARGYA ITS Team',
    desc: 'Led visual media for the ITS Formula EV team, including content for FSAE Australasia.',
    tags: [],
  },
  {
    when: 'May 2024 – Aug 2026',
    role: 'Laboratory Administrator',
    org: 'Intelligent Computation & Vision Laboratory (KCV) · Surabaya',
    desc: 'Organized introductory machine learning workshops for freshmen covering regression, classification, and clustering, with hands-on programming exercises.',
    tags: ['Teaching', 'Machine learning'],
  },
  {
    when: 'Feb 2025 – Present',
    role: 'Assistant Researcher',
    org: 'Intelligent Computation & Vision Laboratory · ITS',
    desc: 'Published a teacher–student knowledge distillation framework at ICTS 2025: a vision model compressed to 2.23M parameters at 95.64% accuracy, built for low-power field deployment without GPUs.',
    tags: ['Knowledge distillation', 'Edge AI', 'PyTorch'],
  },
  {
    when: 'Jul 2025 – Sep 2025',
    role: 'Data Analyst Intern',
    org: 'PT Bank Syariah Indonesia · Collections Strategy & Performance',
    desc: 'Automated cleaning of 2M+ repayment records (70% faster) and built a behavior analysis pipeline behind a reported 12% gain in collections efficiency.',
    tags: ['Python', 'Data pipelines'],
  },
  {
    when: 'Jan 2026 – Sep 2026',
    role: 'Technology & Consulting Intern',
    org: 'Accenture Southeast Asia · Central Jakarta',
    desc: 'Validated production reliability across 3 microservice domains for a telecom serving 50M+ subscribers. Caught 15+ critical pre-production defects via API contract testing.',
    tags: ['API testing', 'OpenShift', 'SQL'],
  },
];

// oldest first. logo = file in textures/, by = issuer (first letter shows until the logo exists)
export const ACHIEVEMENTS = [
  { logo: 'textures/issuer-formulabharat.png', by: 'Formula Bharat',
    title: '1st Place, Overall Event',
    meta: 'Formula Bharat Pi-EV · India · Jul 2023', note: '' },
  { logo: 'textures/issuer-nbri.png', by: 'National Battery Research Institute',
    title: 'Most Innovative Paper',
    meta: 'Youth Idea Competition NBRI 2023 · Aug 2023', note: 'EV charging station placement analysis' },
  { logo: 'textures/issuer-fsae.png', by: 'Formula SAE',
    title: '3rd Place, Presentation Event',
    meta: 'Formula SAE Japan 2023 · Sep 2023', note: 'Top 3 of 77 teams' },
  { logo: 'textures/issuer-ui.png', by: 'Universitas Indonesia',
    title: 'Top 10 Team, UI/UX Competition',
    meta: 'VWO UI 2023 · Universitas Indonesia · Nov 2023', note: 'Led user research and UI design' },
  { logo: 'textures/issuer-fsae.png', by: 'Formula SAE',
    title: '3rd Place, Presentation Event',
    meta: 'Formula SAE Japan 2024 · Sep 2024', note: 'Top 3 of 75 teams' },
  { logo: 'textures/issuer-kemdikbud.png', by: 'Kemdikbudristek',
    title: 'Honorable Mention, ICT Scientific Writing',
    meta: 'GEMASTIK XVIII 2025 · MoECRT · Oct 2025', note: 'Top 4 of 386 teams' },
  { logo: 'textures/issuer-ieee.png', by: 'IEEE',
    title: 'Published at ICTS 2025',
    meta: 'Knowledge distillation for ordinal classification', note: '2.23M params · 95.64% accuracy' },
];