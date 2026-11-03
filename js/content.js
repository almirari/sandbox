// ✏️ Edit your content here
export const ABOUT = `Fresh graduate of Informatics Engineering at ITS (3.61/4.00 GPA) with a foundation in machine learning and analytics. I like turning technical analysis into decisions people can act on. My work ranges from compressing vision models for edge devices (published at ICTS 2025) to analyzing 2M+ repayment records at Bank Syariah Indonesia and catching 15+ critical pre-production defects through API contract testing at Accenture. Outside of code: Formula EV team, museums, and race cars.`;

// TODO: yang bertanda "draft" ditulis dari nama repo saja. Koreksi supaya sesuai isi aslinya.
export const PROJECTS = [
  {
    title: 'Knowledge Distillation for Oil Palm Ripeness',
    desc: 'Teacher–student framework (ResNet50 → MobileNetV2) for ordinal ripeness classification. 95.64% accuracy with 2.23M parameters, 91% fewer than ResNet101. Published at ICTS 2025.',
    tags: ['PyTorch', 'Knowledge distillation', 'Edge AI'],
    img: 'textures/proj-ffb.jpg',
    links: [
      { label: 'Paper', url: 'https://doi.org/10.1109/ICTS67612.2025.11369518' },
      { label: 'GitHub', url: 'https://github.com/almirari/ffb-classification' },   // TODO: cek repo ini yang benar
    ],
  },
  {
    title: 'Knowledge Distillation on Audio Spectrograms',
    desc: 'Distilling a larger model into a lightweight one for audio spectrogram classification.',   // draft
    tags: ['Python', 'Knowledge distillation', 'Audio'],
    img: 'textures/proj-audio.jpg',
    links: [{ label: 'GitHub', url: 'https://github.com/almirari/kd-audio-spectrograms' }],
  },
  {
    title: 'TanyaRasa Chatbot',
    desc: 'A chatbot project built in Jupyter. Starred and forked by other developers.',   // draft: tambahkan fungsi chatbot-nya
    tags: ['Python', 'NLP'],
    img: 'textures/proj-tanyarasa.jpg',
    links: [{ label: 'GitHub', url: 'https://github.com/almirari/TanyaRasa-Chatbot' }],
  },
  {
    title: 'Classification Study (dr-classification)',
    desc: 'Image classification experiments in Jupyter.',   // draft: sebut dataset dan hasilnya
    tags: ['Python', 'Deep learning'],
    img: 'textures/proj-dr.jpg',
    links: [{ label: 'GitHub', url: 'https://github.com/almirari/dr-classification' }],
  },
  {
    title: 'EV Charging Station Placement Analysis',
    desc: 'Data analysis on where to place EV charging stations. Most Innovative Paper at the Youth Idea Competition NBRI 2023.',
    tags: ['Data analysis', 'Research'],
    img: 'textures/proj-ev.jpg',
    links: [],
  },
  {
    title: 'Repayment Behavior Pipeline @ Bank Syariah Indonesia',
    desc: 'Automated cleaning of 2M+ repayment records (70% faster) and built a behavior analysis pipeline behind a reported 12% gain in collections efficiency.',
    tags: ['Python', 'Data pipelines', 'Analytics'],
    img: 'textures/proj-bsi.jpg',
    links: [],
  },
  {
    title: 'Sasya’s Sandbox (this site)',
    desc: 'The 3D room you are standing in, with a scroll intro, a working desktop and a guestbook, built from scratch.',
    tags: ['Three.js', 'JavaScript'],
    img: 'textures/proj-room.jpg',
    links: [{ label: 'GitHub', url: 'https://github.com/almirari/sandbox' }],
  },
];

export const PAPER = {
  type: 'Conference Paper',
  date: 'November 2025',
  title: 'Knowledge Distillation for Efficient Ordinal Classification of Oil Palm Ripeness Level',
  venue: '2025 15th International Conference on Information & Communication Technology and System (ICTS)',
  doi: '10.1109/ICTS67612.2025.11369518',
  link: 'https://doi.org/10.1109/ICTS67612.2025.11369518',
  alt: {
    label: 'ResearchGate',
    url: 'https://www.researchgate.net/publication/400516851_Knowledge_Distillation_for_Efficient_Ordinal_Classification_of_Oil_Palm_Ripeness_Level',
  },
  authors: [
    { name: 'Almira Raisa Izzatina',  org: 'Sepuluh Nopember Institute of Technology', me: true },
    { name: 'Imam Mustafa Kamal',     org: 'Pusan National University' },
    { name: 'Dini Adni Navastara',    org: 'Sepuluh Nopember Institute of Technology' },
    { name: 'Aldinata Rizky Revanda', org: 'Sepuluh Nopember Institute of Technology' },
  ],
  highlights: [
    ['95.64%', 'accuracy (± 0.63%)'],
    ['91%', 'fewer parameters than ResNet101'],
    ['2.23M', 'parameters'],
  ],
  abs: 'Accurate classification of oil palm fresh fruit bunch (FFB) ripeness is essential to ensure palm oil quality and enhance production efficiency. Conventional manual grading is labor-intensive and prone to inconsistency, while many automated approaches rely on computationally heavy deep learning models that are impractical for resource-constrained environments. To address this, we propose a knowledge distillation-based framework for ordinal ripeness classification, where ResNet18, ResNet34, ResNet50, and ResNet101 serve as teacher models and MobileNetV2 acts as the lightweight student network. The framework enables the student model to inherit discriminative features from deeper networks while preserving efficiency, making it well-suited for real-time deployment. Experimental results demonstrate that the proposed method, derived from the distillation process where ResNet50 acts as the teacher model and MobileNetV2 as the student model, achieves 95.64% ± 0.63% accuracy, outperforming standalone MobileNetV2 while reducing parameter size by 91% compared to ResNet101. These findings highlight the potential of the proposed method to support sustainable palm oil production through reliable, low-cost, and scalable ripeness assessment in field conditions.',
  keywords: ['Oil palm classification', 'Lightweight deep learning', 'Knowledge distillation', 'Ordinal classification'],
};

export const CONTACT = [
  ['LinkedIn', 'https://www.linkedin.com/in/almira-ri'],
  ['GitHub', 'https://github.com/almirari'],
  ['Email', 'mailto:almirari004@gmail.com'],
];