// ✏️ Edit your content here
export const ABOUT="Hi, I’m Sasya! Write a short bio: what you study, what you build, what you love.";
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
export const PROJECTS=["Project one — one-line description","Project two — one-line description","Project three — one-line description"];
