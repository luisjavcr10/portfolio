import type { Dictionary } from "./es";

const en: Dictionary = {
  meta: {
    title: "Luis Castillo · Website, bookings and a system for your business",
    description:
      "Website, online bookings and a management system with your brand, for businesses in Trujillo: salons, gyms and vet clinics.",
  },
  nav: {
    solutions: "Solutions",
    includes: "What's included",
    how: "How we work",
    projects: "Projects",
    about: "About",
    cta: "Let's work together",
    theme: "Toggle theme",
    language: "Language",
  },
  hero: {
    eyebrow: "Digital solutions for businesses",
    title: "Your business, ready to attract and serve more customers.",
    lead: "Website, bookings and a management system with your brand, for businesses in Trujillo.",
    credentials: "Software Engineer at Scotiabank · Trujillo, Peru",
    available: "Available for projects",
    primaryCta: "Let's work together",
    secondaryCta: "See demos",
    photoAlt: "Portrait of Luis Castillo",
  },
  solutions: {
    eyebrow: "Demos by industry",
    title: "See how it would look in your business.",
    lead: "Three demos with fictional Trujillo businesses. Each one adapts to your brand and the way you work.",
    prev: "Previous",
    next: "Next",
    hint: "← → to navigate",
    demo: "View live demo",
    want: "I want this",
    comingSoon: "Demo in progress",
    includesLabel: "Includes",
    sampleFigures: "Sample figures",
    mockup: { laptop: "dashboard", phone: "booking" },
    items: {
      casabruma: {
        industry: "Salons",
        title: "Clients book on their own and show up on time.",
        benefits: [
          { title: "Booking by stylist", text: "They pick service, stylist and time from their phone." },
          { title: "WhatsApp reminders", text: "Fewer missed visits, no calling one by one." },
          { title: "Clients and daily sales", text: "Service history and cash in one place." },
        ],
        metrics: [
          { value: "24/7", label: "online bookings" },
          { value: "+30%", label: "returning clients" },
        ],
        parts: ["Website", "Bookings", "Reminders", "Dashboard"],
      },
      fitmoche: {
        industry: "Gyms",
        title: "Memberships, attendance and classes in one panel.",
        benefits: [
          { title: "QR check-in", text: "Attendance logged in seconds." },
          { title: "Booking from the phone", text: "Class capacity and waitlists." },
          { title: "Plans and renewals", text: "Payments and notices before expiry." },
        ],
        metrics: [
          { value: "−30%", label: "late payments" },
          { value: "+25%", label: "class occupancy" },
        ],
        parts: ["Website", "Bookings", "Memberships", "Dashboard"],
      },
      clinica: {
        industry: "Vet clinics",
        title: "Pets come back on time for their shots.",
        benefits: [
          { title: "Bookings with the pet's record", text: "Owners book for their pet and it lands in your system." },
          { title: "Digital vaccine card", text: "Vaccines, deworming and weight in one record." },
          { title: "WhatsApp reminders", text: "Remind owners before every vaccine in one tap." },
        ],
        metrics: [
          { value: "68%", label: "come back for check-ups" },
          { value: "1 min", label: "to book a visit" },
        ],
        parts: ["Website", "Bookings", "Vaccine card", "Reminders"],
      },
    },
  },
  includes: {
    eyebrow: "What's included",
    title: "Everything your business needs, in one place.",
    items: [
      { title: "A website with your brand", text: "Your services, photos, hours and location, with your logo and colors." },
      { title: "Online bookings around the clock", text: "Clients pick a day and time from their phone, without calling you." },
      { title: "Clients, appointments and payments system", text: "Your calendar, your clients and what they owe, in one dashboard." },
      { title: "Automatic reminders", text: "WhatsApp notices before each appointment so nobody misses it." },
      { title: "Google Maps and reviews", text: "An optimized profile, a QR code for your place and more Google reviews." },
    ],
    summary: "Five connected pieces, ready for your business.",
    cta: "I want this for my business",
    note: "Only need one part? We can build that too.",
  },
  how: {
    eyebrow: "How we work",
    title: "From the first visit to launch, in four steps.",
    steps: [
      { title: "We visit your business", text: "We learn how you work today." },
      { title: "Photos and brand", text: "We photograph your place and use your logo and colors." },
      { title: "We set it up", text: "We show you your website and system before launch." },
      { title: "Launch and promote", text: "Google Maps, social media and reviews." },
    ],
  },
  projects: {
    eyebrow: "Real projects",
    title: "Production systems for real clients.",
    links: { github: "GitHub", demo: "Live demo" },
    items: {
      coplacont:
        "Accounting system for firms: purchases, sales, payroll and fixed assets, with automatic entries, ledgers and financial reports.",
      smarttalent: "HR platform for verification requests and recruitment processes.",
      digenio: "OKR, startup and team management, with sprint and task tracking.",
      auditai:
        "AI-powered audit automation (DeepSeek): checks data against standards like SOX and GDPR and builds dashboards of findings.",
    },
  },
  about: {
    eyebrow: "About me",
    title: "Hi, I'm Luis. I work with you, at your business.",
    text: "I'm a systems engineer from UNT and work as a Software Engineer at Scotiabank. With Trujillo businesses I do the same as at the bank: I learn how you work before building, and deliver something you and your team can use from day one.",
    photoAlt: "Luis Castillo",
    timeline: [
      { label: "Current", title: "Scotiabank", text: "Software Engineer" },
      { label: "Freelance", title: "Full Stack Developer", text: "Coplacont, SmartTalent, Digenio and Damaris Salón" },
      { label: "Education", title: "Universidad Nacional de Trujillo", text: "Systems Engineering" },
    ],
  },
  contact: {
    eyebrow: "Contact",
    title: "Shall we talk about your business?",
    lead: "I reply within 24 hours.",
    cta: "Let's work together",
  },
  contactPanel: {
    eyebrow: "Let's work together",
    title: "Tell me about your business",
    lead: "I'll reply within 24 hours.",
    close: "Close",
    businessQuestion: "What kind of business do you have?",
    optional: "Optional",
    messageLabel: "Your message",
    whatsapp: "Message me on WhatsApp",
    email: "Prefer email?",
    emailSubject: "Information for my business",
    /** {business} is replaced with the chosen option's phrase. */
    messageWithBusiness: "Hi Luis, I have {business} and would like information for my business",
    message: "Hi Luis, I would like information for my business",
    businesses: [
      { id: "salon", label: "Salon or barbershop", phrase: "a salon" },
      { id: "gym", label: "Gym", phrase: "a gym" },
      { id: "veterinaria", label: "Vet clinic", phrase: "a vet clinic" },
      { id: "otro", label: "Other", phrase: "" },
    ],
    privacy: "I only use your details to reply.",
    privacyLink: "Privacy",
  },
  footer: {
    madeIn: "Made in Trujillo, La Libertad",
    cv: "CV",
    legal: "Privacy and legal",
  },
  legal: {
    meta: {
      title: "Privacy and legal notice · Luis Castillo",
      description: "What data I receive and why, why this site uses no cookies, and what the demos are.",
    },
    eyebrow: "Legal",
    title: "Privacy and legal notice",
    updatedLabel: "Last updated:",
    updated: "October 11, 2026",
    summary:
      "In short: this site uses no cookies or tracking tools, and it doesn't store what you type. If you message me on WhatsApp or by email, I only use your details to reply. The demos are made-up businesses.",
    back: "Back to home",
    sections: [
      {
        id: "responsable",
        title: "Who is responsible",
        body: [
          "Luis Javier Castillo Rabanal, independent software developer in Trujillo, La Libertad, Peru. For anything about this page, write to me at {email}.",
        ],
      },
      {
        id: "privacidad",
        title: "What data I receive and why",
        body: [
          "This site has no forms that send data to a server. The contact buttons open WhatsApp or your email app with a message you review before sending.",
          "If you write to me, I receive whatever you choose to share: usually your name, your phone number or email, and what you tell me about your business. I only use it to reply, prepare a proposal and follow up on the conversation. I don't use it for advertising or add you to broadcast lists.",
          "I process it with your consent, given when you write to me, under Peru's Personal Data Protection Law (Law No. 29733) and its regulations.",
        ],
      },
      {
        id: "terceros",
        title: "Who it is shared with",
        body: [
          "I don't sell or hand over your data. Messages travel through the service you choose (WhatsApp or your email provider), which has its own privacy policy.",
          "The site is hosted on Vercel. Like any web server, it logs technical data about visits, such as IP address and browser, for security and to keep the site running. These providers may process data outside Peru.",
        ],
      },
      {
        id: "plazo",
        title: "How long I keep it",
        body: [
          "For as long as we keep talking or working together. If we don't end up working together, I delete the conversation no later than one year after our last contact, or sooner if you ask.",
        ],
      },
      {
        id: "derechos",
        title: "Your rights",
        body: [
          "You can ask me to access, correct or delete your data, or object to its use (ARCO rights), by writing to {email}. I'll reply within the time limits set by law.",
          "If you're not satisfied with my reply, you can file a complaint with Peru's National Authority for Personal Data Protection, part of the Ministry of Justice and Human Rights.",
        ],
      },
      {
        id: "cookies",
        title: "Cookies and storage in your browser",
        body: [
          "I don't use cookies or analytics or advertising tools, which is why you won't see a cookie banner.",
          "The site does keep a few things in your browser (localStorage): the light or dark theme you chose and, in the demos, the sample data and whether you closed their tips. It never leaves your device. You can clear it from your browser settings or with the demo's reset button.",
        ],
      },
      {
        id: "demos",
        title: "The demos are fictional",
        body: [
          "Casa Bruma, FitMoche and KusiVet are made-up businesses that show how a system like this would work. Their names, staff, clients, pets, reviews, ratings, prices and figures are fictional. Any resemblance to real businesses or people is a coincidence.",
          "Streets are mentioned only to suggest an area, with no exact address, and the phone numbers are not real.",
          "What you type when booking in a demo stays in your browser. If you tap a WhatsApp button inside a demo, it only opens WhatsApp with a sample message: nothing is sent unless you send it.",
        ],
      },
      {
        id: "ia",
        title: "AI-generated images",
        body: [
          "The demo photos (venues, people and pets) were generated with artificial intelligence (Google Gemini). They don't show real places or people.",
        ],
      },
      {
        id: "aviso",
        title: "Figures, trademarks and content",
        body: [
          "The figures on the solution cards are examples of what a system like this can achieve, not guaranteed results.",
          "Trademarks I mention, such as WhatsApp, Google, Vercel or Scotiabank, belong to their owners and appear only as references.",
          "The design, code and copy of this site and its demos are my own work. Feel free to share the links, but don't copy them to present as your own.",
        ],
      },
      {
        id: "cambios",
        title: "Changes",
        body: ["If I change anything important on this page, I'll update the date above."],
      },
    ],
  },
};

export default en;
