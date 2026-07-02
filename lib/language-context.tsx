"use client"

<<<<<<< HEAD
import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { type Language, translations, type Translation } from "@/lib/translations"

interface LanguageContextValue {
  language: Language
  setLanguage: (lang: Language) => void
  t: Translation
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en")

  useEffect(() => {
    const stored = typeof window !== "undefined" ? window.localStorage.getItem("language") : null
    if (stored === "en" || stored === "ua" || stored === "de") {
      setLanguageState(stored)
    }
  }, [])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    if (typeof window !== "undefined") {
      window.localStorage.setItem("language", lang)
    }
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t: translations[language] }}>
=======
import { createContext, useContext, useState, type ReactNode } from "react"

type Language = "en" | "uk" | "de"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Hero
    "hero.title": "Anastasiia Buda",
    "hero.subtitle": "Filmmaker / Editor / AI Visionary",
    "hero.aboutMe": "About Me",
    
    // About Modal
    "about.title": "About Me",
    "about.p1": "Hi, I'm Anastasiia, a filmmaker and director with a passion for unconventional, whimsical, and fantastical storytelling. I create visuals that blend humor, surrealism, and immersive aesthetics, crafting narratives that are both visually striking and emotionally engaging.",
    "about.p2": "Traveling and exploring different cultures continually inspires and enriches my cinematic vision. I graduated in 2019 with a Bachelor's degree in Film Directing from Kyiv National University of Theatre, Cinema and Television.",
    "about.p3": "From 2017 to 2022, I gained extensive experience on large-scale productions with Starlightmedia, Film.ua, No Stars Production, IQ Production, etc. working in complex shooting environments and developing the skills to guide teams under challenging conditions. After this, I directed my own projects, including short films and music videos, managing teams of over 20 people and overseeing full-cycle production from concept development to final post-production.",
    "about.p4": "Between 2020 and 2022, I worked as a Director at Cinema Friends, overseeing projects and guiding creative decisions to deliver high-quality, visually thoughtful content.",
    "about.p5": "Since 2022, I have expanded my practice as a free auditor at the Leon Schiller National Film School in Lodz and later relocated to Switzerland, where I created experimental photography and AI-integrated film projects.",
    "about.p6": "My work was recognized as runner-up in the 2025 Genero Creative Challenge, reflecting my ability to merge imagination, personal style, and technological innovation into compelling visual narratives.",
    
    // Portfolio
    "portfolio.title": "Portfolio",
    "portfolio.about": "About",
    "portfolio.myRole": "My Role",
    
    // Project: Funeral Agency
    "project.funeral.title": "Funeral Agency of the Future",
    "project.funeral.description": "Conceptual advertising video created specifically for the Genero AI Creative Challenge.\nSelected as a Runner-Up.\nA speculative vision of a funeral agency of the future, rethinking rituals of farewell through design, technology, and changing cultural values.",
    "project.funeral.role": "Concept, Creative Direction, Visual Narrative, AI Prompting, Editing",
    
    // Project: Music Video
    "project.music.title": "Music Video",
    "project.music.description": "Directed from concept to final vision, shaping story, visuals, and aesthetic inspired by mythological themes, while leading the creative team.",
    "project.music.role": "Director & Creative Lead, Concept & Production Oversight",
    
    // Creative Sprint
    "sprint.title": "Creative Sprint",
    "sprint.description": "Selected works from a video marathon.\n40 short-form videos shot and edited in two weeks under expedition conditions, based on assigned themes.\nWinning team.",
    "sprint.role": "Concept & Creative Direction, Story & Visual Development, Team Leadership, Editing & Post-Production Oversight",
    
    // Sprint Videos
    "sprint.alien.title": "Alien Dance",
    "sprint.alien.description": "Atmospheric experimental dance video.",
    "sprint.sands.title": "Sands of Silence",
    "sprint.sands.description": "Experimental short reflecting on time, filmed in a desert landscape.",
    "sprint.treasure.title": "Treasure Hunt",
    "sprint.treasure.description": "Experimental Western-comedy short, imagining a playful concept for a lipstick ad.",
    
    // Contact
    "contact.title": "Let's Build Worlds Together",
    "contact.subtitle": "Ready to create something extraordinary?",
    "contact.name": "Your Name",
    "contact.email": "Your Email",
    "contact.message": "Your Message",
    "contact.send": "Send Message",
    "contact.connect": "Connect with me",
  },
  uk: {
    // Hero
    "hero.title": "Анастасія Буда",
    "hero.subtitle": "Режисерка / Монтажерка / AI Візіонерка",
    "hero.aboutMe": "Про мене",
    
    // About Modal
    "about.title": "Про мене",
    "about.p1": "Привіт, я Анастасія — режисерка з пристрастю до нетипового, химерного та фантастичного сторітелінгу. Я створюю візуали, що поєднують гумор, сюрреалізм та імерсивну естетику, формуючи наративи, які є водночас візуально вражаючими та емоційно захопливими.",
    "about.p2": "Подорожі та дослідження різних культур постійно надихають і збагачують моє кінематографічне бачення. У 2019 році я отримала ступінь бакалавра з кінорежисури в Київському національному університеті театру, кіно і телебачення імені І. К. Карпенка-Карого.",
    "about.p3": "З 2017 по 2022 рік я набула великого досвіду на масштабних продакшенах з Starlightmedia, Film.ua, No Stars Production, IQ Production та ін., працюючи в складних умовах зйомок та розвиваючи навички керування командами в непростих обставинах. Після цього я режисувала власні проекти, включаючи короткометражні фільми та музичні відео, керуючи командами понад 20 людей та контролюючи повний цикл виробництва від розробки концепції до фінального пост-продакшену.",
    "about.p4": "Між 2020 та 2022 роками я працювала режисеркою в Cinema Friends, керуючи проектами та приймаючи креативні рішення для створення високоякісного, візуально продуманого контенту.",
    "about.p5": "З 2022 року я розширила свою практику як вільний слухач у Національній кіношколі імені Леона Шиллера в Лодзі, а пізніше переїхала до Швейцарії, де створювала експериментальну фотографію та кінопроекти з інтеграцією AI.",
    "about.p6": "Моя робота була відзначена як runner-up на 2025 Genero Creative Challenge, що відображає мою здатність поєднувати уяву, особистий стиль та технологічні інновації у переконливих візуальних наративах.",
    
    // Portfolio
    "portfolio.title": "Портфоліо",
    "portfolio.about": "Опис",
    "portfolio.myRole": "Моя роль",
    
    // Project: Funeral Agency
    "project.funeral.title": "Похоронне агентство майбутнього",
    "project.funeral.description": "Концептуальне рекламне відео, створене спеціально для Genero AI Creative Challenge.\nВідзначено як Runner-Up.\nСпекулятивне бачення похоронного агентства майбутнього, переосмислення ритуалів прощання через дизайн, технології та зміну культурних цінностей.",
    "project.funeral.role": "Концепт, Креативна режисура, Візуальний наратив, AI Промптинг, Монтаж",
    
    // Project: Music Video
    "project.music.title": "Музичне відео",
    "project.music.description": "Режисура від концепції до фінального бачення, формування історії, візуалів та естетики, натхненної міфологічними темами, з керуванням креативною командою.",
    "project.music.role": "Режисерка та Креативний лід, Концепт та Нагляд за продакшеном",
    
    // Creative Sprint
    "sprint.title": "Креативний Спринт",
    "sprint.description": "Вибрані роботи з відео-марафону.\n40 коротких відео, знятих та змонтованих за два тижні в експедиційних умовах, за заданими темами.\nКоманда-переможець.",
    "sprint.role": "Концепт та Креативна режисура, Розробка історії та візуалів, Лідерство команди, Монтаж та Нагляд за пост-продакшеном",
    
    // Sprint Videos
    "sprint.alien.title": "Інопланетний танець",
    "sprint.alien.description": "Атмосферне експериментальне танцювальне відео.",
    "sprint.sands.title": "Піски тиші",
    "sprint.sands.description": "Експериментальний короткометражний фільм про час, знятий у пустельному ландшафті.",
    "sprint.treasure.title": "Полювання за скарбами",
    "sprint.treasure.description": "Експериментальний вестерн-комедійний короткометражний фільм, що уявляє грайливу концепцію реклами помади.",
    
    // Contact
    "contact.title": "Давайте створювати світи разом",
    "contact.subtitle": "Готові створити щось надзвичайне?",
    "contact.name": "Ваше ім'я",
    "contact.email": "Ваш Email",
    "contact.message": "Ваше повідомлення",
    "contact.send": "Надіслати",
    "contact.connect": "Зв'яжіться зі мною",
  },
  de: {
    // Hero
    "hero.title": "Anastasiia Buda",
    "hero.subtitle": "Filmemacherin / Editorin / AI Visionarin",
    "hero.aboutMe": "Uber mich",
    
    // About Modal
    "about.title": "Uber mich",
    "about.p1": "Hallo, ich bin Anastasiia, eine Filmemacherin und Regisseurin mit einer Leidenschaft fur unkonventionelles, skurriles und fantastisches Storytelling. Ich kreiere Visuals, die Humor, Surrealismus und immersive Asthetik verbinden und Narrative schaffen, die visuell beeindruckend und emotional fesselnd sind.",
    "about.p2": "Reisen und das Erkunden verschiedener Kulturen inspirieren und bereichern standig meine filmische Vision. 2019 habe ich meinen Bachelor in Filmregie an der Kiewer Nationalen Universitat fur Theater, Film und Fernsehen abgeschlossen.",
    "about.p3": "Von 2017 bis 2022 sammelte ich umfangreiche Erfahrungen bei Grossproduktionen mit Starlightmedia, Film.ua, No Stars Production, IQ Production usw., arbeitete in komplexen Drehbedingungen und entwickelte die Fahigkeiten, Teams unter herausfordernden Bedingungen zu fuhren. Danach fuhrte ich Regie bei eigenen Projekten, darunter Kurzfilme und Musikvideos, leitete Teams von uber 20 Personen und uberwachte die gesamte Produktion von der Konzeptentwicklung bis zur finalen Postproduktion.",
    "about.p4": "Zwischen 2020 und 2022 arbeitete ich als Regisseurin bei Cinema Friends, leitete Projekte und traf kreative Entscheidungen fur hochwertigen, visuell durchdachten Content.",
    "about.p5": "Seit 2022 habe ich meine Praxis als freie Horerin an der Leon Schiller Nationalen Filmhochschule in Lodz erweitert und bin spater in die Schweiz gezogen, wo ich experimentelle Fotografie und KI-integrierte Filmprojekte entwickelte.",
    "about.p6": "Meine Arbeit wurde als Runner-up bei der 2025 Genero Creative Challenge ausgezeichnet, was meine Fahigkeit widerspiegelt, Vorstellungskraft, personlichen Stil und technologische Innovation zu uberzeugenden visuellen Narrativen zu vereinen.",
    
    // Portfolio
    "portfolio.title": "Portfolio",
    "portfolio.about": "Info",
    "portfolio.myRole": "Meine Rolle",
    
    // Project: Funeral Agency
    "project.funeral.title": "Bestattungsagentur der Zukunft",
    "project.funeral.description": "Konzeptuelles Werbevideo, speziell fur die Genero AI Creative Challenge erstellt.\nAusgewahlt als Runner-Up.\nEine spekulative Vision einer Bestattungsagentur der Zukunft, die Abschiedsrituale durch Design, Technologie und sich wandelnde kulturelle Werte neu denkt.",
    "project.funeral.role": "Konzept, Kreative Leitung, Visuelles Narrativ, AI Prompting, Schnitt",
    
    // Project: Music Video
    "project.music.title": "Musikvideo",
    "project.music.description": "Regie vom Konzept bis zur finalen Vision, Gestaltung von Geschichte, Visuals und Asthetik inspiriert von mythologischen Themen, wahrend ich das kreative Team leitete.",
    "project.music.role": "Regisseurin & Kreative Leitung, Konzept & Produktionsuberwachung",
    
    // Creative Sprint
    "sprint.title": "Kreativer Sprint",
    "sprint.description": "Ausgewahlte Arbeiten aus einem Video-Marathon.\n40 Kurzvideos, die in zwei Wochen unter Expeditionsbedingungen nach vorgegebenen Themen gedreht und geschnitten wurden.\nSiegerteam.",
    "sprint.role": "Konzept & Kreative Leitung, Story & visuelle Entwicklung, Teamfuhrung, Schnitt & Postproduktionsuberwachung",
    
    // Sprint Videos
    "sprint.alien.title": "Alien-Tanz",
    "sprint.alien.description": "Atmospharisches experimentelles Tanzvideo.",
    "sprint.sands.title": "Sand der Stille",
    "sprint.sands.description": "Experimenteller Kurzfilm uber Zeit, gedreht in einer Wustenlandschaft.",
    "sprint.treasure.title": "Schatzsuche",
    "sprint.treasure.description": "Experimenteller Western-Comedy-Kurzfilm, der ein verspieltes Konzept fur eine Lippenstift-Werbung vorstellt.",
    
    // Contact
    "contact.title": "Lass uns gemeinsam Welten erschaffen",
    "contact.subtitle": "Bereit, etwas Aussergewohnliches zu schaffen?",
    "contact.name": "Ihr Name",
    "contact.email": "Ihre E-Mail",
    "contact.message": "Ihre Nachricht",
    "contact.send": "Nachricht senden",
    "contact.connect": "Kontaktieren Sie mich",
  },
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")

  const t = (key: string): string => {
    return translations[language][key] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
>>>>>>> origin/main
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
<<<<<<< HEAD
  const ctx = useContext(LanguageContext)
  if (!ctx) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return ctx
=======
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
>>>>>>> origin/main
}
