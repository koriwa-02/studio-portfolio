export const navLinks = [
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "Studio", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export const services = [
  {
    index: "01",
    title: "Brand Identity",
    description:
      "Naming, logo systems, visual identity and guidelines built to hold up across every touchpoint.",
    engagementType: "Custom Proposal",
  },
  {
    index: "02",
    title: "Web Design & Dev",
    description:
      "Motion-first websites and product interfaces — designed, built and shipped in-house.",
    engagementType: "Custom Proposal",
  },
  {
    index: "03",
    title: "Campaigns & Ads",
    description:
      "Paid campaigns and ad creative built to convert — from concept to media buying and performance tracking.",
    engagementType: "Custom Proposal",
  },
  {
    index: "04",
    title: "Graphic Design",
    description:
      "Print collateral and packaging design that make products and campaigns impossible to ignore.",
    engagementType: "Custom Proposal",
  },
  {
    index: "05",
    title: "Social Media Management",
    description:
      "Content calendars, community management and platform strategy that keep the brand showing up daily.",
    engagementType: "Custom Proposal",
  },
];

export function workSlug(title: string, category: string) {
  return `${title}-${category}`
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export const workItems = [
  {
    title: "Zidalum Catalog",
    category: "Print / Graphic Design",
    year: "2025",
    color: "#ff2e17",
    image: "/work/catalog-design.jpg",
    beforeImage: "/work/zidalum-before.jpg",
    details:
      "A full product catalog designed for Zidalum — layout system, typography and photography direction built to make every page easy to scan and hard to put down.",
    challenge:
      "Zidalum's existing catalog was a mess — cluttered layout, inconsistent typography and a design that did their products no favors.",
    approach:
      "We rebuilt it from the ground up with a clean, minimalist layout system — consistent typography, deliberate spacing and photography direction that let the products speak for themselves.",
    results:
      "The redesigned catalog now feels minimal and premium, giving Zidalum a piece they can confidently put in front of any client.",
    services: ["Print Design", "Layout System", "Art Direction"],
  },
  {
    title: "Spectra",
    category: "Website / Web Design",
    year: "2025",
    color: "#0a0a0a",
    image: "/work/spectra.jpg",
    demoVideo: "/work/spectra-scroll.mp4",
    details:
      "A motion-first marketing site for Spectra — designed and built in-house, with a custom component system and animation throughout to match the brand's energy.",
    challenge:
      "Spectra needed to reach more clients online and build a real presence that could get them booked directly — their old site had no contact form, no converting design and no clean layout.",
    approach:
      "We redesigned the site from the ground up: added SEO, built detailed pages for every product, and included an easy-to-use contact form so leads could get in touch in seconds.",
    results:
      "The new site now works as a 24/7 showroom — Spectra is getting discovered and booked by clients across Morocco, not just Casablanca.",
    services: ["Web Design", "Development", "Motion Design"],
  },
  {
    title: "AMZ Singer",
    category: "Social Media / Reel",
    year: "2024",
    color: "#ff2e17",
    image: "/work/amz-singer.jpg",
    video: "/work/amz-singer.mp4",
    details:
      "A short-form reel produced for recording artist AMZ Singer — concept, shoot and edit built for maximum scroll-stopping power on social.",
    challenge:
      "AMZ Singer wanted a clean, cinematic teaser that moved people — something that carried the feeling of the soundtrack, not just promoted it.",
    approach:
      "After studying the message and aesthetic of the track, we built a cinematic reel shot entirely on iPhone — proof that real emotion on screen doesn't need a full production budget behind it.",
    services: ["Concept & Direction", "Videography", "Editing"],
  },
  {
    title: "Global El Koukh",
    category: "Website / Web Design",
    year: "2024",
    color: "#0a0a0a",
    image: "/work/global-el-koukh.jpg",
    demoVideo: "/work/global-el-koukh-scroll.mp4",
    details:
      "A corporate website for Global El Koukh — clean information architecture and a design system built to scale across every service line.",
    challenge:
      "Global El Koukh needed an online presence that matched the scale of their business — something that could reach clients beyond Kinetra and give every service line its own clear, professional home.",
    approach:
      "We built a custom design system with tailored animations throughout, and enhanced the site's content with AI-generated visuals crafted to look completely realistic — giving every page a polished, professional feel.",
    results:
      "The new site now reaches clients well beyond Kinetra, giving Global El Koukh a professional digital presence across their entire service area.",
    services: ["Web Design", "Development", "Brand Application"],
  },
  {
    title: "Asna Joyería",
    category: "Social Media / Posts",
    year: "2024",
    color: "#ff2e17",
    image: "/work/asna-joyeria.jpg",
    video: "/work/asna-joyeria.mp4",
    details:
      "An ongoing content system for jewelry brand Asna Joyería — product photography direction and post design built to keep the feed cohesive and on-brand.",
    challenge:
      "Asna Joyería needed a social presence that matched the value of the pieces they sell — something premium and luxurious, not just another feed of product photos.",
    approach:
      "We took over full social media management — a cohesive calendar of posts, reels and stories built around a premium, editorial aesthetic that lets every piece feel as luxurious online as it does in person.",
    results:
      "Asna's feed now reads as a true luxury brand — consistent, polished content that keeps followers engaged and builds trust before a client ever walks through the door.",
    services: ["Content Strategy", "Post Design", "Photo Direction"],
  },
  {
    title: "Spectra Catalog",
    category: "Print / Graphic Design",
    year: "2025",
    color: "#0a0a0a",
    image: "/work/spectra-catalog.jpg",
    beforeImage: "/work/spectra-catalog-before.jpg",
    details:
      "A product catalog for Spectra — extending their digital identity into a print system that carries the same energy onto the page.",
    challenge:
      "Spectra didn't have a product catalog at all — and the photos they did have were low quality, nowhere close to the clean, minimalist feel of their new website.",
    approach:
      "We took their existing photos and generated enhanced, higher-quality versions, then designed a minimalist catalog that carries the same visual language as the website — backed by a full set of brand guidelines to keep everything consistent going forward.",
    results:
      "Spectra now has a catalog that feels like a natural extension of their website, with brand guidelines in place to keep every future piece on-brand.",
    services: ["Print Design", "Layout System", "Brand Application"],
  },
  {
    title: "Asna Joyería",
    category: "Campaigns & Ads",
    year: "2025",
    color: "#ff2e17",
    image: "/work/asna-joyeria-ads-1.jpg",
    gallery: [
      "/work/asna-joyeria-ads-1.jpg",
      "/work/asna-joyeria-ads-2.jpg",
      "/work/asna-joyeria-ads-3.jpg",
    ],
    details:
      "A paid campaign system for Asna Joyería — ad creative, testing and reporting built on top of their content to turn spend into predictable sales.",
    challenge:
      "Asna Joyería's organic content was working, but they had no paid strategy in place to reach new customers beyond their existing followers.",
    approach:
      "We built a paid campaign system on top of their content engine — targeted ad creative and structured testing to reach new, high-intent shoppers.",
    results:
      "Paid campaigns are now driving new customers beyond their organic reach, with ad spend converting predictably.",
    services: ["Ad Creative", "Campaign Strategy", "Performance Reporting"],
  },
  {
    title: "Bimo",
    category: "Campaigns & Ads",
    year: "2025",
    color: "#0a0a0a",
    image: "/work/bimo-1.jpg",
    gallery: ["/work/bimo-1.jpg", "/work/bimo-2.jpg", "/work/bimo-3.jpg", "/work/bimo-4.jpg"],
    details:
      "A paid campaign for Bimo — ad creative built to stand out in a crowded snack aisle and connect with a younger audience online.",
    challenge:
      "Bimo needed ad creative that could cut through a crowded snack category and connect with a younger, scroll-first audience.",
    approach:
      "We developed bold, scroll-stopping ad creative built specifically for paid social, with messaging tuned for quick attention spans.",
    results:
      "A campaign built to turn impressions into recall — and recall into sales at the shelf.",
    services: ["Ad Creative", "Campaign Strategy", "Performance Reporting"],
  },
  {
    title: "Atlas Lions",
    category: "Photography / Brand Shoot",
    year: "2025",
    color: "#ff2e17",
    image: "/work/atlas-lions-1.jpg",
    gallery: [
      "/work/atlas-lions-1.jpg",
      "/work/atlas-lions-2.jpg",
      "/work/atlas-lions-3.jpg",
      "/work/atlas-lions-4.jpg",
    ],
    details:
      "A brand photoshoot celebrating Morocco's football journey — imagery built to capture the energy and pride of the moment.",
    challenge:
      "Capturing the energy around Morocco's football success needed imagery that felt as big as the moment itself.",
    approach:
      "We planned and shot a brand photoshoot built to capture raw energy and emotion, with direction tuned for maximum impact on social.",
    results:
      "A set of images that captured the moment authentically — content built to travel far, right when the whole country was watching.",
    services: ["Photo Direction", "Creative Concept", "Art Direction"],
  },
  {
    title: "Al Barad",
    category: "Packaging / Graphic Design",
    year: "2025",
    color: "#0a0a0a",
    image: "/work/al-barad-1.jpg",
    gallery: [
      "/work/al-barad-1.jpg",
      "/work/al-barad-2.jpg",
      "/work/al-barad-3.jpg",
      "/work/al-barad-4.jpg",
    ],
    details:
      "Packaging design for Al Barad — visual identity translated onto product packaging built to stand out on shelf.",
    challenge:
      "Al Barad needed packaging that could stand out on a crowded shelf while staying true to their brand identity.",
    approach:
      "We designed a packaging system that carries their visual identity through to the product itself — bold, consistent, and built to catch the eye at first glance.",
    results:
      "Packaging that doesn't just hold the product — it sells it, right from the shelf.",
    services: ["Packaging Design", "Print Design", "Brand Application"],
  },
];

export type WorkItem = (typeof workItems)[number] & {
  beforeImage?: string;
  afterImage?: string;
};

export const helpPoints = [
  "Build an online presence that actually gets you noticed.",
  "Get a website designed to convert visitors into paying clients.",
  "Stay consistently visible with content that brings new followers and clients every month.",
  "Elevate your brand image so you can finally charge what you're worth.",
];

export const processSteps = [
  {
    index: "01",
    title: "Say Hello",
    description:
      "Tell us what you're building. We set up a short call within 48 hours to hear the goals and the timeline.",
  },
  {
    index: "02",
    title: "Get The Plan",
    description:
      "A free audit and a proposal, scoped and priced in plain terms before you commit to anything.",
  },
  {
    index: "03",
    title: "Build Together",
    description:
      "Design and development run in tight loops, with you seeing real progress at every stage.",
  },
  {
    index: "04",
    title: "Launch & Support",
    description:
      "The project ships, and we stay close after: tuning, fixing, and building on what's working.",
  },
];

export const stats = [
  { value: "32", label: "Projects shipped" },
  { value: "5", label: "Brands built" },
  { value: "100K+", label: "Content views driven" },
  { value: "3", label: "Years in business" },
];

export const marqueeItems = [
  "BRAND IDENTITY",
  "WEB DESIGN",
  "CONTENT & UGC",
  "FILM & MOTION",
  "KORIWA STUDIO",
];
