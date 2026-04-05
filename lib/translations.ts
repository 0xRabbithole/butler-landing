// Butler — translations dictionary
// Every user-facing string on the landing site lives here.
// When you add a new string to the UI, add its English source AND its
// Spanish translation. The t() helper will throw loudly in development
// if a key is missing, so nothing ships half-translated.
//
// Voice rules (same as the plain-language cheat sheet):
//  - Warm, quiet, never clinical.
//  - Spanish uses "tú" — Butler speaks to you like a kind neighbor,
//    not a formal assistant.
//  - Banned words carry across languages: no "rastrear", "monitorear",
//    "vigilar", "supervisar". Prefer "ayudar", "acompañar", "recordar".

export type Locale = "en" | "es";

export const LOCALES: Locale[] = ["en", "es"];

export const LOCALE_LABELS: Record<Locale, string> = {
  en: "English",
  es: "Español",
};

// Flat dot-keyed dictionary — easiest to grep, easiest to diff.
export type Dictionary = Record<string, string>;

export const translations: Record<Locale, Dictionary> = {
  en: {
    // Meta
    "meta.title": "Butler — A little helper for the things you'd rather not forget",
    "meta.description":
      "Butler remembers so you don't have to — and helps the people who love you help you. From morning pills to your daughter's birthday.",
    "meta.og.title": "Butler",
    "meta.og.description": "A little helper for the things you'd rather not forget.",

    // Nav
    "nav.story": "The story",
    "nav.how": "How it works",
    "nav.together": "Together",
    "nav.pricing": "Pricing",
    "nav.cta": "Open Butler",
    "nav.languageLabel": "Language",

    // Hero
    "hero.eyebrow": "A little helper, arriving soon",
    "hero.title.butler": "Butler",
    "hero.title.remembers": "remembers.",
    "hero.title.so": "So",
    "hero.title.you": "you",
    "hero.title.dont": "don\u2019t",
    "hero.title.have": "have",
    "hero.title.to": "to.",
    "hero.subtitle":
      "A little helper for the things you\u2019d rather not forget — from your morning pills to your daughter\u2019s birthday. Butler keeps it all, quietly, and nudges you at exactly the right moment.",
    "hero.cta.primary": "Open Butler",
    "hero.cta.secondary": "or meet Tato first",
    "hero.socialProof": "Quietly helping people remember the things that matter.",
    "hero.phoneCard.tag": "IN 10 MINUTES",
    "hero.phoneCard.title": "Take the blue pills with water",
    "hero.phoneCard.sub": "Butler\u2019s been holding this for you.",

    // Marquee
    "marquee.a": "remember the small things",
    "marquee.b": "be there for the people who love you",
    "marquee.c": "never miss the appointment that matters",

    // How it works
    "how.eyebrow": "What Butler does",
    "how.title.1": "Four small jobs,",
    "how.title.2": "done perfectly.",

    "how.feature1.title": "Remembers the small things",
    "how.feature1.body":
      "Tell Butler once. Butler holds it — the pharmacy hours, the name of that nurse, the story you loved last Tuesday.",
    "how.feature2.title": "Reminds you at the right moment",
    "how.feature2.body":
      "A gentle nudge by phone, email, and text — with confirmation it actually arrived. No missed appointments. Ever.",
    "how.feature3.title": "Helps the people who love you",
    "how.feature3.body":
      "Share Butler with one person you trust — or a whole family. They can help without hovering.",
    "how.feature4.title": "Stays out of the way",
    "how.feature4.body":
      "Butler never asks more than it needs. It never guesses. It doesn't track your every move. It just shows up when it matters.",

    // Tato story
    "tato.eyebrow": "The story",
    "tato.title.1": "Built for Tato.",
    "tato.title.2": "And for you.",
    "tato.portrait.name": "Tato",
    "tato.portrait.caption": "78, lives next door to JRP",
    "tato.portrait.badge": "meet the reason",
    "tato.body.1":
      "Tato is JRP\u2019s neighbor. He\u2019s 78. He has a daughter who loves him, a lot of prescriptions, and a calendar full of appointments he didn\u2019t ask for.",
    "tato.body.2":
      "He\u2019s also sharp, kind, and very ready to tell you when something feels like too much. The existing apps on his phone felt like too much. He deleted them.",
    "tato.quote":
      "I just want someone to remind me, quietly, when it\u2019s time. And I want my daughter to know I\u2019m okay without her having to call me every day.",
    "tato.body.3":
      "We built Butler for Tato. Which means we built it for anyone who wants a little help remembering the things that matter — and for the people who love them.",

    // Together
    "together.eyebrow": "Better together",
    "together.title.1": "One Butler.",
    "together.title.2": "The people who love you.",
    "together.subtitle":
      "Share Butler with your daughter, your son, your best friend. They see what you choose to share. They help when they can. You stay the one in charge — always.",
    "together.word": "together",

    "together.card1.title": "Tato is always in charge",
    "together.card1.body":
      "The account is his. He decides what's shared, what's private, and can pull back access at any time with one tap.",
    "together.card2.title": "His daughter helps without hovering",
    "together.card2.body":
      "She sees his appointments, his medication reminders — only what he's chosen to share. She gets a nudge if something important was missed.",
    "together.card3.title": "No one feels watched",
    "together.card3.body":
      "Butler never narrates Tato's day. No 'he went here, he did that.' Just gentle help, from people he trusts.",

    // Pricing
    "pricing.eyebrow": "Simple, like Butler",
    "pricing.title.1": "Two plans.",
    "pricing.title.2": "That\u2019s it.",

    "pricing.starter.tag": "Butler",
    "pricing.starter.name": "For you",
    "pricing.starter.badge": "Free",
    "pricing.starter.price": "$0",
    "pricing.starter.period": "forever",
    "pricing.starter.f1": "Everything Butler does",
    "pricing.starter.f2": "Reliable reminders by phone, email, and text",
    "pricing.starter.f3": "Room to remember the things that matter",
    "pricing.starter.f4": "Quiet by design — never in your face",
    "pricing.starter.cta": "Start with Butler — it\u2019s free",

    "pricing.pro.ribbon": "for the people who love you",
    "pricing.pro.tag": "Butler Pro",
    "pricing.pro.name": "For you and yours",
    "pricing.pro.badge": "$15/mo",
    "pricing.pro.price": "$15",
    "pricing.pro.period": "/ month",
    "pricing.pro.yearly": "save 33% yearly",
    "pricing.pro.f1": "Everything in Butler",
    "pricing.pro.f2": "Invite the people who love you — as many as you want",
    "pricing.pro.f3": "More room for Butler to remember",
    "pricing.pro.f4": "14 days free to try it",
    "pricing.pro.cta": "Try Butler Pro free for 14 days",

    "pricing.promise":
      "Reminders are never paywalled. The important things stay the same on every plan. That\u2019s a promise.",

    // Big CTA
    "bigcta.title.1": "Let Butler",
    "bigcta.title.2": "remember.",
    "bigcta.body": "Two minutes to set up. Nothing to install. Your Butler is waiting.",
    "bigcta.button": "Open Butler",

    // Footer
    "footer.story": "The story",
    "footer.how": "How it works",
    "footer.together": "Together",
    "footer.pricing": "Pricing",
    "footer.contact": "Say hello",
    "footer.privacy": "Privacy",
    "footer.madeWith": "Made with care by Rabbithole.",
    "footer.copyright": "Butler.",

    // Phone mockup
    "phone.today": "Today",
    "phone.forDad": "For Dad",
    "phone.greeting.friend": "Hi, friend \u2726",
    "phone.greeting.tato": "Hi, Tato \u2726",
    "phone.greeting.daughter": "Dad has 3 things",
    "phone.sub.default": "Three small things today.",
    "phone.sub.daughter": "He\u2019s doing great today.",
    "phone.reminder1.title": "Morning pills",
    "phone.reminder1.sub": "With water. You\u2019ve got this.",
    "phone.reminder2.title": "Dr. Reyes — checkup",
    "phone.reminder2.sub": "Bring the blue folder.",
    "phone.reminder3.title": "Call your daughter",
    "phone.reminder3.sub": "It\u2019s her Tuesday.",
    "phone.footer.default": "Butler\u2019s got you",
    "phone.footer.daughter": "All quiet — Butler\u2019s got it",
  },

  es: {
    // Meta
    "meta.title":
      "Butler — Un pequeño ayudante para las cosas que prefieres no olvidar",
    "meta.description":
      "Butler recuerda por ti — y ayuda a las personas que te quieren a cuidar de ti. Desde las pastillas de la mañana hasta el cumpleaños de tu hija.",
    "meta.og.title": "Butler",
    "meta.og.description":
      "Un pequeño ayudante para las cosas que prefieres no olvidar.",

    // Nav
    "nav.story": "La historia",
    "nav.how": "Cómo funciona",
    "nav.together": "Juntos",
    "nav.pricing": "Precios",
    "nav.cta": "Abrir Butler",
    "nav.languageLabel": "Idioma",

    // Hero
    "hero.eyebrow": "Un pequeño ayudante, muy pronto",
    "hero.title.butler": "Butler",
    "hero.title.remembers": "recuerda.",
    "hero.title.so": "Para",
    "hero.title.you": "que",
    "hero.title.dont": "tú",
    "hero.title.have": "no",
    "hero.title.to": "tengas que hacerlo.",
    "hero.subtitle":
      "Un pequeño ayudante para las cosas que prefieres no olvidar — desde las pastillas de la mañana hasta el cumpleaños de tu hija. Butler lo guarda todo, en silencio, y te avisa en el momento justo.",
    "hero.cta.primary": "Abrir Butler",
    "hero.cta.secondary": "o conoce primero a Tato",
    "hero.socialProof":
      "Ayudando a las personas, en silencio, a recordar lo que importa.",
    "hero.phoneCard.tag": "EN 10 MINUTOS",
    "hero.phoneCard.title": "Toma las pastillas azules con agua",
    "hero.phoneCard.sub": "Butler lo estaba guardando por ti.",

    // Marquee
    "marquee.a": "recuerda las pequeñas cosas",
    "marquee.b": "acompaña a las personas que te quieren",
    "marquee.c": "nunca pierdas la cita que importa",

    // How it works
    "how.eyebrow": "Lo que hace Butler",
    "how.title.1": "Cuatro pequeñas tareas,",
    "how.title.2": "hechas a la perfección.",

    "how.feature1.title": "Recuerda las pequeñas cosas",
    "how.feature1.body":
      "Se lo dices a Butler una vez. Butler lo guarda — el horario de la farmacia, el nombre de esa enfermera, la historia que te encantó el martes pasado.",
    "how.feature2.title": "Te avisa en el momento justo",
    "how.feature2.body":
      "Un aviso suave por teléfono, correo y mensaje de texto — con confirmación de que llegó. Ninguna cita olvidada. Jamás.",
    "how.feature3.title": "Ayuda a las personas que te quieren",
    "how.feature3.body":
      "Comparte Butler con una persona de confianza — o con toda la familia. Pueden ayudarte sin agobiarte.",
    "how.feature4.title": "No estorba",
    "how.feature4.body":
      "Butler nunca pide más de lo necesario. Nunca adivina. No sigue cada uno de tus pasos. Solo aparece cuando hace falta.",

    // Tato story
    "tato.eyebrow": "La historia",
    "tato.title.1": "Hecho para Tato.",
    "tato.title.2": "Y para ti.",
    "tato.portrait.name": "Tato",
    "tato.portrait.caption": "78 años, vecino de JRP",
    "tato.portrait.badge": "conoce el porqué",
    "tato.body.1":
      "Tato es el vecino de JRP. Tiene 78 años. Tiene una hija que lo quiere, muchas recetas médicas y una agenda llena de citas que él no pidió.",
    "tato.body.2":
      "También es lúcido, amable y muy capaz de decirte cuando algo le parece demasiado. Las aplicaciones que tenía en el teléfono le parecieron demasiado. Las borró.",
    "tato.quote":
      "Solo quiero que alguien me recuerde, con calma, cuando sea la hora. Y quiero que mi hija sepa que estoy bien sin tener que llamarme todos los días.",
    "tato.body.3":
      "Hicimos Butler para Tato. Lo que significa que lo hicimos para cualquier persona que quiera un poco de ayuda recordando las cosas que importan — y para las personas que la quieren.",

    // Together
    "together.eyebrow": "Mejor juntos",
    "together.title.1": "Un Butler.",
    "together.title.2": "Las personas que te quieren.",
    "together.subtitle":
      "Comparte Butler con tu hija, tu hijo, tu mejor amiga. Ven solo lo que tú decidas compartir. Ayudan cuando pueden. Tú sigues al mando — siempre.",
    "together.word": "juntos",

    "together.card1.title": "Tato siempre está al mando",
    "together.card1.body":
      "La cuenta es suya. Él decide qué se comparte, qué es privado y puede retirar el acceso en cualquier momento con un toque.",
    "together.card2.title": "Su hija ayuda sin agobiar",
    "together.card2.body":
      "Ella ve las citas de su papá y sus recordatorios de medicamentos — solo lo que él ha decidido compartir. Recibe un aviso si algo importante se pasó.",
    "together.card3.title": "Nadie se siente observado",
    "together.card3.body":
      "Butler nunca narra el día de Tato. Nada de \u201cfue aquí, hizo aquello\u201d. Solo una ayuda suave, de las personas en quienes confía.",

    // Pricing
    "pricing.eyebrow": "Simple, como Butler",
    "pricing.title.1": "Dos planes.",
    "pricing.title.2": "Eso es todo.",

    "pricing.starter.tag": "Butler",
    "pricing.starter.name": "Para ti",
    "pricing.starter.badge": "Gratis",
    "pricing.starter.price": "$0",
    "pricing.starter.period": "para siempre",
    "pricing.starter.f1": "Todo lo que hace Butler",
    "pricing.starter.f2":
      "Avisos confiables por teléfono, correo y mensaje de texto",
    "pricing.starter.f3": "Espacio para recordar lo que importa",
    "pricing.starter.f4": "Silencioso por diseño — nunca en tu cara",
    "pricing.starter.cta": "Empieza con Butler — es gratis",

    "pricing.pro.ribbon": "para las personas que te quieren",
    "pricing.pro.tag": "Butler Pro",
    "pricing.pro.name": "Para ti y los tuyos",
    "pricing.pro.badge": "$15/mes",
    "pricing.pro.price": "$15",
    "pricing.pro.period": "/ mes",
    "pricing.pro.yearly": "ahorra 33% al año",
    "pricing.pro.f1": "Todo lo de Butler",
    "pricing.pro.f2":
      "Invita a las personas que te quieren — a todas las que quieras",
    "pricing.pro.f3": "Más espacio para que Butler recuerde",
    "pricing.pro.f4": "14 días gratis para probarlo",
    "pricing.pro.cta": "Prueba Butler Pro gratis 14 días",

    "pricing.promise":
      "Los recordatorios nunca se cobran. Las cosas importantes son iguales en todos los planes. Es una promesa.",

    // Big CTA
    "bigcta.title.1": "Deja que Butler",
    "bigcta.title.2": "recuerde.",
    "bigcta.body":
      "Dos minutos para configurarlo. Nada que instalar. Tu Butler te está esperando.",
    "bigcta.button": "Abrir Butler",

    // Footer
    "footer.story": "La historia",
    "footer.how": "Cómo funciona",
    "footer.together": "Juntos",
    "footer.pricing": "Precios",
    "footer.contact": "Saluda",
    "footer.privacy": "Privacidad",
    "footer.madeWith": "Hecho con cariño por Rabbithole.",
    "footer.copyright": "Butler.",

    // Phone mockup
    "phone.today": "Hoy",
    "phone.forDad": "Para papá",
    "phone.greeting.friend": "Hola, amigo \u2726",
    "phone.greeting.tato": "Hola, Tato \u2726",
    "phone.greeting.daughter": "Papá tiene 3 cosas",
    "phone.sub.default": "Tres pequeñas cosas hoy.",
    "phone.sub.daughter": "Hoy está muy bien.",
    "phone.reminder1.title": "Pastillas de la mañana",
    "phone.reminder1.sub": "Con agua. Tú puedes.",
    "phone.reminder2.title": "Dr. Reyes — chequeo",
    "phone.reminder2.sub": "Lleva la carpeta azul.",
    "phone.reminder3.title": "Llama a tu hija",
    "phone.reminder3.sub": "Es su martes.",
    "phone.footer.default": "Butler te acompaña",
    "phone.footer.daughter": "Todo tranquilo — Butler está pendiente",
  },
};
