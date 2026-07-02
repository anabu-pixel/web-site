export type Language = "en" | "ua" | "de"

export const languages: { code: Language; label: string }[] = [
  { code: "en", label: "EN" },
  { code: "ua", label: "UA" },
  { code: "de", label: "DE" },
]

export interface SubProject {
  id: string
  title: string
  description: string
  videoId: string
}

export interface Project {
  id: string
  title: string
  videoId: string
  about: string
  role: string
}

export interface Translation {
  nav: {
    aboutMe: string
  }
  hero: {
    subtitle: string
  }
  about: {
    title: string
    paragraphs: string[]
  }
  labels: {
    about: string
    role: string
  }
  projects: Project[]
  creativeSprint: {
    title: string
    description: string
    role: string
    videos: SubProject[]
  }
  contact: {
    title: string
    subtitle: string
    name: string
    email: string
    message: string
    send: string
    connect: string
  }
  footer: string
}

export const translations: Record<Language, Translation> = {
  en: {
    nav: { aboutMe: "ABOUT ME" },
    hero: { subtitle: "FILMMAKER / EDITOR / AI VISIONARY" },
    about: {
      title: "About Me",
      paragraphs: [
        "Hi, I'm Anastasiia, a filmmaker and director with a passion for unconventional, whimsical, and fantastical storytelling. I create visuals that blend humor, surrealism, and immersive aesthetics, crafting narratives that are both visually striking and emotionally engaging.",
        "Traveling and exploring different cultures continually inspires and enriches my cinematic vision. I graduated in 2019 with a Bachelor's degree in Film Directing from Kyiv National University of Theatre, Cinema and Television.",
        "From 2017 to 2022, I gained extensive experience on large-scale productions with Starlightmedia, Film.ua, No Stars Production, IQ Production, etc. working in complex shooting environments and developing the skills to guide teams under challenging conditions. After this, I directed my own projects, including short films and music videos, managing teams of over 20 people and overseeing full-cycle production from concept development to final post-production.",
        "Between 2020 and 2022, I worked as a Director at Cinema Friends, overseeing projects and guiding creative decisions to deliver high-quality, visually thoughtful content.",
        "Since 2022, I have expanded my practice as a free auditor at the Leon Schiller National Film School in Lodz and later relocated to Switzerland, where I created experimental photography and AI-integrated film projects.",
        "My work was recognized as runner-up in the 2025 Genero Creative Challenge, reflecting my ability to merge imagination, personal style, and technological innovation into compelling visual narratives.",
      ],
    },
    labels: { about: "ABOUT", role: "MY ROLE" },
    projects: [
      {
        id: "funeral",
        title: "Funeral Agency of the Future",
        videoId: "1158573071",
        about:
          "Conceptual advertising video created specifically for the Genero AI Creative Challenge.\nSelected as a Runner-Up.\nA speculative vision of a funeral agency of the future, rethinking rituals of farewell through design, technology, and changing cultural values.",
        role: "Concept, Creative Direction, Visual Narrative, AI Prompting, Editing",
      },
      {
        id: "music-video",
        title: "Music Video",
        videoId: "470076153",
        about:
          "Directed from concept to final vision, shaping story, visuals, and aesthetic inspired by mythological themes, while leading the creative team.",
        role: "Director & Creative Lead, Concept & Production Oversight",
      },
    ],
    creativeSprint: {
      title: "Creative Sprint",
      description:
        "Selected works from a video marathon.\n40 short-form videos shot and edited in two weeks under expedition conditions, based on assigned themes.\nWinning team.",
      role: "Concept & Creative Direction, Story & Visual Development, Team Leadership, Editing & Post-Production Oversight",
      videos: [
        {
          id: "alien-dance",
          title: "Alien Dance",
          description: "Atmospheric experimental dance video.",
          videoId: "1158561564",
        },
        {
          id: "sands",
          title: "Sands of Silence",
          description: "Experimental short reflecting on time, filmed in a desert landscape.",
          videoId: "1158980432",
        },
        {
          id: "treasure",
          title: "Treasure Hunt",
          description: "Experimental Western-comedy short, imagining a playful concept for a lipstick ad.",
          videoId: "806273077",
        },
      ],
    },
    contact: {
      title: "Let's Build Worlds Together",
      subtitle: "Ready to create something extraordinary?",
      name: "Your Name",
      email: "Your Email",
      message: "Your Message",
      send: "Send Message",
      connect: "Connect with me",
    },
    footer: "© 2025 Anastasiia Buda",
  },

  ua: {
    nav: { aboutMe: "ПРО МЕНЕ" },
    hero: { subtitle: "РЕЖИСЕРКА / МОНТАЖЕРКА / AI-ВІЗІОНЕРКА" },
    about: {
      title: "Про мене",
      paragraphs: [
        "Привіт, я Анастасія — режисерка та кінематографістка, захоплена нестандартним, химерним і фантастичним оповіданням. Я створюю візуальні образи, що поєднують гумор, сюрреалізм та занурювальну естетику, формуючи історії, які водночас візуально вражають і емоційно зачіпають.",
        "Подорожі та дослідження різних культур постійно надихають і збагачують моє кінематографічне бачення. У 2019 році я здобула ступінь бакалавра з кінорежисури в Київському національному університеті театру, кіно і телебачення.",
        "З 2017 по 2022 рік я отримала великий досвід на масштабних продакшнах зі Starlightmedia, Film.ua, No Stars Production, IQ Production та іншими, працюючи в складних знімальних умовах і розвиваючи навички керування командами у непростих обставинах. Згодом я почала знімати власні проєкти — короткометражні фільми та музичні кліпи, керуючи командами понад 20 людей і контролюючи повний цикл виробництва від розробки концепції до фінального постпродакшну.",
        "Між 2020 і 2022 роками я працювала режисеркою в Cinema Friends, курувала проєкти та ухвалювала творчі рішення для створення якісного, візуально продуманого контенту.",
        "З 2022 року я розширила свою практику як вільна слухачка Національної кіношколи імені Леона Шиллера в Лодзі, а згодом переїхала до Швейцарії, де створювала експериментальну фотографію та кінопроєкти з інтеграцією AI.",
        "Мою роботу було відзначено як фіналістку конкурсу Genero Creative Challenge 2025, що відображає мою здатність поєднувати уяву, особистий стиль і технологічні інновації в переконливі візуальні наративи.",
      ],
    },
    labels: { about: "ОПИС", role: "МОЯ РОЛЬ" },
    projects: [
      {
        id: "funeral",
        title: "Похоронне агентство майбутнього",
        videoId: "1158573071",
        about:
          "Концептуальний рекламний ролик, створений спеціально для Genero AI Creative Challenge.\nОбрано як фіналіста.\nСпекулятивне бачення похоронного агентства майбутнього, що переосмислює ритуали прощання через дизайн, технології та зміну культурних цінностей.",
        role: "Концепція, творча режисура, візуальний наратив, AI-промптинг, монтаж",
      },
      {
        id: "music-video",
        title: "Музичний кліп",
        videoId: "470076153",
        about:
          "Режисура від концепції до фінального бачення: формування історії, візуального стилю та естетики, натхненної міфологічними темами, разом із керуванням творчою командою.",
        role: "Режисерка та творча керівниця, концепція та контроль виробництва",
      },
    ],
    creativeSprint: {
      title: "Creative Sprint",
      description:
        "Обрані роботи з відеомарафону.\n40 короткометражних відео, знятих і змонтованих за два тижні в експедиційних умовах на задані теми.\nКоманда-переможець.",
      role: "Концепція та творча режисура, розробка історії та візуалу, керування командою, монтаж і контроль постпродакшну",
      videos: [
        {
          id: "alien-dance",
          title: "Alien Dance",
          description: "Атмосферне експериментальне танцювальне відео.",
          videoId: "1158561564",
        },
        {
          id: "sands",
          title: "Sands of Silence",
          description: "Експериментальна короткометражка про час, знята в пустельному ландшафті.",
          videoId: "1158980432",
        },
        {
          id: "treasure",
          title: "Treasure Hunt",
          description: "Експериментальна вестерн-комедія — грайлива концепція реклами помади.",
          videoId: "806273077",
        },
      ],
    },
    contact: {
      title: "Творімо світи разом",
      subtitle: "Готові створити щось надзвичайне?",
      name: "Ваше ім'я",
      email: "Ваш email",
      message: "Ваше повідомлення",
      send: "Надіслати повідомлення",
      connect: "Зв'яжіться зі мною",
    },
    footer: "© 2025 Анастасія Буда",
  },

  de: {
    nav: { aboutMe: "ÜBER MICH" },
    hero: { subtitle: "FILMEMACHERIN / CUTTERIN / KI-VISIONÄRIN" },
    about: {
      title: "Über mich",
      paragraphs: [
        "Hallo, ich bin Anastasiia, eine Filmemacherin und Regisseurin mit einer Leidenschaft für unkonventionelles, skurriles und fantastisches Erzählen. Ich schaffe Bildwelten, die Humor, Surrealismus und immersive Ästhetik verbinden, und gestalte Geschichten, die visuell beeindruckend und emotional fesselnd zugleich sind.",
        "Reisen und das Erkunden verschiedener Kulturen inspirieren und bereichern meine filmische Vision immer wieder. 2019 schloss ich mein Bachelorstudium in Filmregie an der Nationalen Universität für Theater, Film und Fernsehen in Kyjiw ab.",
        "Von 2017 bis 2022 sammelte ich umfangreiche Erfahrung bei Großproduktionen mit Starlightmedia, Film.ua, No Stars Production, IQ Production usw., arbeitete in komplexen Drehumgebungen und entwickelte die Fähigkeit, Teams unter anspruchsvollen Bedingungen zu führen. Danach realisierte ich eigene Projekte, darunter Kurzfilme und Musikvideos, leitete Teams von über 20 Personen und überwachte die gesamte Produktion von der Konzeptentwicklung bis zur finalen Postproduktion.",
        "Zwischen 2020 und 2022 arbeitete ich als Regisseurin bei Cinema Friends, betreute Projekte und traf kreative Entscheidungen, um hochwertige, visuell durchdachte Inhalte zu liefern.",
        "Seit 2022 habe ich meine Praxis als freie Gasthörerin an der Leon-Schiller-Filmhochschule in Łódź erweitert und bin später in die Schweiz gezogen, wo ich experimentelle Fotografie und KI-integrierte Filmprojekte geschaffen habe.",
        "Meine Arbeit wurde 2025 als Runner-Up der Genero Creative Challenge ausgezeichnet, was meine Fähigkeit widerspiegelt, Fantasie, persönlichen Stil und technologische Innovation zu überzeugenden visuellen Erzählungen zu verbinden.",
      ],
    },
    labels: { about: "BESCHREIBUNG", role: "MEINE ROLLE" },
    projects: [
      {
        id: "funeral",
        title: "Bestattungsagentur der Zukunft",
        videoId: "1158573071",
        about:
          "Konzeptioneller Werbefilm, der speziell für die Genero AI Creative Challenge erstellt wurde.\nAls Runner-Up ausgewählt.\nEine spekulative Vision einer Bestattungsagentur der Zukunft, die Abschiedsrituale durch Design, Technologie und sich wandelnde kulturelle Werte neu denkt.",
        role: "Konzept, Kreativregie, visuelle Erzählung, KI-Prompting, Schnitt",
      },
      {
        id: "music-video",
        title: "Musikvideo",
        videoId: "470076153",
        about:
          "Von der Idee bis zur finalen Vision inszeniert – Geschichte, Bildsprache und Ästhetik inspiriert von mythologischen Themen, bei gleichzeitiger Leitung des kreativen Teams.",
        role: "Regie & kreative Leitung, Konzept & Produktionsaufsicht",
      },
    ],
    creativeSprint: {
      title: "Creative Sprint",
      description:
        "Ausgewählte Arbeiten aus einem Video-Marathon.\n40 Kurzvideos, in zwei Wochen unter Expeditionsbedingungen zu vorgegebenen Themen gedreht und geschnitten.\nGewinnerteam.",
      role: "Konzept & Kreativregie, Geschichts- & Bildentwicklung, Teamleitung, Schnitt & Postproduktionsaufsicht",
      videos: [
        {
          id: "alien-dance",
          title: "Alien Dance",
          description: "Atmosphärisches experimentelles Tanzvideo.",
          videoId: "1158561564",
        },
        {
          id: "sands",
          title: "Sands of Silence",
          description: "Experimenteller Kurzfilm über die Zeit, gedreht in einer Wüstenlandschaft.",
          videoId: "1158980432",
        },
        {
          id: "treasure",
          title: "Treasure Hunt",
          description: "Experimentelle Western-Komödie – eine verspielte Idee für einen Lippenstift-Werbespot.",
          videoId: "806273077",
        },
      ],
    },
    contact: {
      title: "Lass uns Welten erschaffen",
      subtitle: "Bereit, etwas Außergewöhnliches zu schaffen?",
      name: "Dein Name",
      email: "Deine E-Mail",
      message: "Deine Nachricht",
      send: "Nachricht senden",
      connect: "Vernetze dich mit mir",
    },
    footer: "© 2025 Anastasiia Buda",
  },
}

export const LINKEDIN_URL = "https://www.linkedin.com/in/anastasiia-buda-film"
