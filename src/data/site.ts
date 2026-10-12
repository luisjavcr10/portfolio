/**
 * Public origin used for canonical, hreflang and social-preview URLs. Vercel sets
 * VERCEL_PROJECT_PRODUCTION_URL on every build (previews included), so shared links
 * always point at production; local builds fall back to localhost.
 */
const productionHost = process.env.VERCEL_PROJECT_PRODUCTION_URL;

export const site = {
  name: "Luis Castillo",
  url: new URL(productionHost ? `https://${productionHost}` : "http://localhost:3000"),
  initials: "LC",
  email: "lcastillorabanal@icloud.com",
  linkedin: {
    url: "https://www.linkedin.com/in/luisjaviercastillorabanal/",
    handle: "luisjaviercastillorabanal",
  },
  github: {
    url: "https://github.com/luisjavcr10",
    handle: "luisjavcr10",
  },
  /** International format without "+" or spaces, e.g. "51987654321". Leave empty to hide the WhatsApp button. */
  whatsapp: "51943721646",
  cvPath: "/docs/Full Stack Developer - Castillo R. Luis J..pdf",
};
