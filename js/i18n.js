const translations = {
  en: {
    nav: {
      about: 'About',
      experience: 'Experience',
      projects: 'Projects',
      skills: 'Skills',
      education: 'Education',
      contact: 'Contact',
    },
    hero: {
      greeting: "Hey, I'm",
      role: 'Software Developer',
      tagline: 'Java · Python · Kotlin · SQL · HTML · CSS',
      viewWork: 'View Work',
      getInTouch: 'Get in Touch',
    },
    about: {
      p1: 'Junior Software Developer with a strong interest in project architecture, with more than 3 full-stack projects in my portfolio, focused on scalable and modular code and architecture. Currently focused on improving knowledge of technologies and problem-solving.',
      p2: 'Looking for an opportunity to immediately contribute with my skills and grow my capabilities.',
    },
    sections: {
      about: 'About',
      experience: 'Experience',
      projects: 'Projects',
      skills: 'Skills',
      education: 'Education',
      contact: 'Get in Touch',
    },
    experience: {
      proj1date: 'In development',
      proj1title: 'Personal Full Stack Projects',
      proj1company: 'Independent Portfolio',
      proj1b1: 'Development of more than 3 full-stack applications from scratch',
      proj1b2: 'Focus on scalable, modular architecture and clean code',
      proj1b3: 'Using Java, Python, Kotlin, SQL, HTML and CSS',
    },
    projects: {
      p1title: 'GadoApp',
      p1desc: 'Full-stack cattle farm management system with a multi-client architecture: JavaFX desktop, Spring Boot REST API, React Native Android app and web page. Features JWT authentication, multi-tenancy, 60+ JPA entities and PDF report generation.',
      p2title: 'RealGames',
      p2desc: 'Personalised game recommendation web platform using Machine Learning (SVD, Random Forest, SVM). Includes a rating system, personal library and analytics dashboard for developers.',
      p3title: 'Parking Space CNN',
      p3desc: 'Convolutional Neural Network (CNN) that classifies parking spaces as occupied or empty, trained on real-world images under varying weather conditions (sunny, cloudy, rainy).',
    },
    skills: {
      lang: 'Languages',
      tools: 'Tools & Other',
      soft: 'Soft Skills',
    },
    softskills: {
      s1: 'Problem Solving',
      s2: 'Teamwork',
      s3: 'Fast Learner',
    },
    education: {
      date: '2022 – Present',
      degree: 'BSc in Computer Engineering (in progress)',
    },
    contact: {
      sub: 'Open to opportunities, collaborations and new challenges.',
    },
    footer: {
      builtBy: 'Built by',
    },
  },

  pt: {
    nav: {
      about: 'Sobre',
      experience: 'Experiência',
      projects: 'Projetos',
      skills: 'Competências',
      education: 'Educação',
      contact: 'Contacto',
    },
    hero: {
      greeting: 'Olá, sou o',
      role: 'Software Developer',
      tagline: 'Java · Python · Kotlin · SQL · HTML · CSS',
      viewWork: 'Ver Projetos',
      getInTouch: 'Entrar em Contacto',
    },
    about: {
      p1: 'Programador Software Junior com grande interesse na arquitetura de projetos, com mais de 3 projetos full stack no meu portefólio, com foco em código e arquitetura escalável e modular. Atualmente focado em melhorar o seu conhecimento de tecnologias e resolução de problemas.',
      p2: 'Procuro uma oportunidade para poder contribuir imediatamente com as minhas competências e evoluir as minhas capacidades.',
    },
    sections: {
      about: 'Sobre',
      experience: 'Experiência',
      projects: 'Projetos',
      skills: 'Competências',
      education: 'Educação',
      contact: 'Entrar em Contacto',
    },
    experience: {
      proj1date: 'Em desenvolvimento',
      proj1title: 'Projetos Full Stack Pessoais',
      proj1company: 'Portfolio Independente',
      proj1b1: 'Desenvolvimento de mais de 3 aplicações full stack do zero',
      proj1b2: 'Foco em arquitetura escalável, modular e código limpo',
      proj1b3: 'Utilização de Java, Python, Kotlin, SQL, HTML e CSS',
    },
    projects: {
      p1title: 'GadoApp',
      p1desc: 'Sistema full-stack de gestão de explorações bovinas com arquitetura multi-cliente: desktop JavaFX, REST API Spring Boot, app Android em React Native e página web. Inclui autenticação JWT, multi-tenancy, 60+ entidades JPA e geração de relatórios PDF.',
      p2title: 'RealGames',
      p2desc: 'Plataforma web de recomendação de jogos personalizada com Machine Learning (SVD, Random Forest, SVM). Inclui sistema de avaliações, biblioteca pessoal e dashboard de analytics para developers.',
      p3title: 'Parking Space CNN',
      p3desc: 'Rede neuronal convolucional (CNN) que classifica lugares de estacionamento como ocupados ou livres, treinada com imagens reais em condições meteorológicas variadas (sol, nuvens, chuva).',
    },
    skills: {
      lang: 'Linguagens',
      tools: 'Ferramentas & Outros',
      soft: 'Soft Skills',
    },
    softskills: {
      s1: 'Resolução de Problemas',
      s2: 'Trabalho em Equipa',
      s3: 'Aprendizagem Rápida',
    },
    education: {
      date: '2022 – Presente',
      degree: 'A tirar licenciatura em Engenharia Informática',
    },
    contact: {
      sub: 'Disponível para oportunidades, colaborações e novos desafios.',
    },
    footer: {
      builtBy: 'Feito por',
    },
  },
};

// Button shows the language to switch TO
const langMeta = {
  en: { flag: 'assets/BandeiraInglaterra.png', label: 'EN' },
  pt: { flag: 'assets/BandeiraPTPT.png',       label: 'PT' },
};

const STORAGE_KEY = 'cv-lang';

function getCurrentLang() {
  return localStorage.getItem(STORAGE_KEY) || 'pt';
}

function updateButton(currentLang) {
  const next = currentLang === 'pt' ? 'en' : 'pt';
  const meta = langMeta[next];
  const flag  = document.getElementById('lang-flag');
  const label = document.getElementById('lang-label');
  if (flag)  { flag.src = meta.flag; flag.alt = meta.label; }
  if (label) label.textContent = meta.label;
}

function applyTranslations(lang) {
  const t = translations[lang];
  document.documentElement.lang = lang;

  // Nav links
  const navLinkMap = {
    '#about':      t.nav.about,
    '#experience': t.nav.experience,
    '#projects':   t.nav.projects,
    '#skills':     t.nav.skills,
    '#education':  t.nav.education,
    '#contact':    t.nav.contact,
  };
  document.querySelectorAll('.nav__links a[href^="#"]').forEach(a => {
    const key = a.getAttribute('href');
    if (navLinkMap[key]) a.textContent = navLinkMap[key];
  });

  // Hero
  const applyHero = (attr, value) => {
    const el = document.querySelector(`[data-i18n-hero="${attr}"]`);
    if (el) el.textContent = value;
  };
  applyHero('greeting',   t.hero.greeting);
  applyHero('role',       t.hero.role);
  applyHero('tagline',    t.hero.tagline);
  applyHero('viewWork',   t.hero.viewWork);
  applyHero('getInTouch', t.hero.getInTouch);

  // About paragraphs
  document.querySelectorAll('[data-i18n-about]').forEach(el => {
    const key = el.getAttribute('data-i18n-about');
    if (t.about[key]) el.textContent = t.about[key];
  });

  // Section titles
  document.querySelectorAll('[data-i18n-section]').forEach(el => {
    const key = el.getAttribute('data-i18n-section');
    if (t.sections[key]) el.textContent = t.sections[key];
  });

  // Experience
  document.querySelectorAll('[data-i18n-exp]').forEach(el => {
    const key = el.getAttribute('data-i18n-exp');
    if (t.experience[key]) el.textContent = t.experience[key];
  });

  // Projects
  document.querySelectorAll('[data-i18n-proj]').forEach(el => {
    const key = el.getAttribute('data-i18n-proj');
    if (t.projects[key]) el.textContent = t.projects[key];
  });

  // Skills categories
  document.querySelectorAll('[data-i18n-skills]').forEach(el => {
    const key = el.getAttribute('data-i18n-skills');
    if (t.skills[key]) el.textContent = t.skills[key];
  });

  // Soft skills badges
  document.querySelectorAll('[data-i18n-softskill]').forEach(el => {
    const key = el.getAttribute('data-i18n-softskill');
    if (t.softskills[key]) el.textContent = t.softskills[key];
  });

  // Education
  document.querySelectorAll('[data-i18n-edu]').forEach(el => {
    const key = el.getAttribute('data-i18n-edu');
    if (t.education[key]) el.textContent = t.education[key];
  });

  // Contact subtitle
  document.querySelectorAll('[data-i18n-contact]').forEach(el => {
    const key = el.getAttribute('data-i18n-contact');
    if (t.contact[key]) el.textContent = t.contact[key];
  });

  // Footer
  const footerBuilt = document.querySelector('[data-i18n-footer]');
  if (footerBuilt) footerBuilt.textContent = t.footer.builtBy;

  // Update button to show next language
  updateButton(lang);
}

function toggleLang() {
  const next = getCurrentLang() === 'pt' ? 'en' : 'pt';
  localStorage.setItem(STORAGE_KEY, next);
  applyTranslations(next);
}

document.addEventListener('DOMContentLoaded', () => {
  applyTranslations(getCurrentLang());
  const btn = document.getElementById('lang-toggle');
  if (btn) btn.addEventListener('click', toggleLang);
});
