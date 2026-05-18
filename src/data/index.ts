export const personalInfo = {
  name: "Usman Kadai",
  title: "Full Stack Developer",
  taglines: [
    "Building beautiful web experiences",
    "Turning ideas into products",
    "Crafting scalable systems",
    "Open source enthusiast",
  ],
  bio: "Passionate full stack developer with a love for clean code, elegant UIs, and solving hard problems. I build products that people actually enjoy using.",
  location: "London, UK",
  email: "usmankadai@gmail.com",
  github: "https://github.com/usmankadai",
  linkedin: "https://linkedin.com/in/usman-muhammad-kadai",
  twitter: "https://twitter.com/usmankadai",
  resumeUrl: "#",
  avatarGradient: "from-indigo-500 via-purple-500 to-pink-500",
};

export const skills = [
  // Row 1 — Frontend & frameworks
  { name: "React", icon: "⚛️", category: "Frontend" },
  { name: "Next.js", icon: "▲", category: "Frontend" },
  { name: "TypeScript", icon: "🔷", category: "Language" },
  { name: "Tailwind CSS", icon: "🎨", category: "Styling" },
  { name: "Framer Motion", icon: "🎞️", category: "Animation" },
  { name: "Vue.js", icon: "💚", category: "Frontend" },
  { name: "GraphQL", icon: "◈", category: "API" },
  { name: "Redux", icon: "🔄", category: "State" },
  // Row 2 — Backend & infra
  { name: "Node.js", icon: "🟢", category: "Backend" },
  { name: "Express.js", icon: "⚡", category: "Backend" },
  { name: "Socket.IO", icon: "🔌", category: "Realtime" },
  { name: "Python", icon: "🐍", category: "Language" },
  { name: "PostgreSQL", icon: "🐘", category: "Database" },
  { name: "MongoDB", icon: "🍃", category: "Database" },
  { name: "Docker", icon: "🐳", category: "DevOps" },
  { name: "AWS", icon: "☁️", category: "Cloud" },
  { name: "Prisma", icon: "◆", category: "ORM" },
  { name: "Redis", icon: "🔴", category: "Cache" },
];

export const projects = [
  {
    title: "Scrabble",
    description:
      "Browser-based Scrabble game with single-player and real-time multiplayer via Socket.IO. Features drag-and-drop tiles, correct bonus-square scoring, dictionary API word validation, and turn enforcement across clients.",
    tags: ["JavaScript", "Node.js", "Socket.IO", "Express"],
    github: "https://github.com/usmankadai/scrabble",
    live: "https://scrabble.usmankadai.dev/",
    image: "/projects/scrabble.gif",
    gradient: "from-indigo-600 via-purple-600 to-pink-600",
    featured: true,
  },
  {
    title: "E-commerce Platform",
    description:
      "Full-featured e-commerce store with Stripe payments, inventory management, and a custom CMS for product listings.",
    tags: ["React", "Node.js", "MongoDB", "Stripe"],
    github: "https://github.com/usmankadai",
    live: "#",
    gradient: "from-cyan-500 via-blue-600 to-indigo-700",
    featured: true,
  },
  {
    title: "Deep Neural Network for Automatic Detection of Humans and Livestock In Aerial Images",
    description:
      "Computer vision system trained to detect and count humans and livestock in drone footage. Built to combat cattle rustling — the model processes aerial imagery and sends location-specific alerts, reducing the need to put personnel in dangerous situations.",
    tags: ["Python", "Deep Learning", "Computer Vision", "Jupyter"],
    github: "https://github.com/usmankadai/FYP",
    live: "#",
    image: "/projects/aerial.gif",
    gradient: "from-emerald-500 via-teal-600 to-cyan-700",
    featured: true,
  },
  {
    title: "DevOps Pipeline Tool",
    description:
      "CLI + web UI for managing CI/CD pipelines, with GitHub Actions integration and live deployment logs.",
    tags: ["Python", "Docker", "AWS", "React"],
    github: "https://github.com/usmankadai",
    live: "#",
    gradient: "from-orange-500 via-red-600 to-pink-700",
    featured: false,
  },
  {
    title: "UK House Prices: Find Your Area",
    description:
      "Interactive choropleth map and price-history chart showing UK house price trends since 2015, powered by the HM Land Registry API. Enter a postcode to jump straight to your region, with editorial annotations marking Brexit, COVID, and the 2022 mini-budget.",
    tags: ["React", "TypeScript", "D3.js", "Vite"],
    github: "https://github.com/usmankadai/uk-house-prices-by-region",
    live: "https://uk-house-prices.usmankadai.dev/",
    image: "/projects/uk-house-price.gif",
    gradient: "from-violet-600 via-purple-700 to-indigo-800",
    featured: false,
  },
  {
    title: "Movie DB",
    description:
      "Fetches trending movies from the TMDB API and presents them in an interactive UI. Browse a randomised selection, click through for full details — overview, cast, rating, runtime, genres — and get similar movie recommendations.",
    tags: ["JavaScript", "Node.js", "TMDB API", "Vercel"],
    github: "https://github.com/usmankadai/movie_db",
    live: "https://movies.usmankadai.dev/",
    image: "/projects/movie.gif",
    gradient: "from-rose-500 via-pink-600 to-purple-700",
    featured: false,
  },
];

export const career = [
  {
    year: "2024 – Present",
    role: "Senior Full Stack Developer",
    company: "TechCorp Ltd",
    location: "London, UK",
    description:
      "Leading the development of a B2B SaaS platform serving 50k+ users. Architected microservices migration, cutting p99 latency by 40%.",
    tags: ["Next.js", "AWS", "Postgres", "Redis"],
    type: "work",
  },
  {
    year: "2022 – 2024",
    role: "Full Stack Developer",
    company: "Startup XYZ",
    location: "Remote",
    description:
      "Built the company's core product from scratch — 0 to 10k monthly active users in 18 months. Owned the entire frontend and API layer.",
    tags: ["React", "Node.js", "MongoDB"],
    type: "work",
  },
  {
    year: "2021 – 2022",
    role: "Frontend Developer",
    company: "Agency ABC",
    location: "Manchester, UK",
    description:
      "Delivered 15+ client projects spanning e-commerce, marketing sites, and web apps. Introduced Storybook and design-system standards.",
    tags: ["React", "Vue.js", "Tailwind"],
    type: "work",
  },
  {
    year: "2021",
    role: "BSc Computer Science",
    company: "University of Manchester",
    location: "Manchester, UK",
    description:
      "First-class honours. Dissertation on distributed systems and consensus algorithms. Active member of the Hackathon Society.",
    tags: ["Algorithms", "Systems", "Research"],
    type: "education",
  },
  {
    year: "2020",
    role: "Software Engineering Intern",
    company: "BigCo",
    location: "London, UK",
    description:
      "Contributed to internal tooling used by 200+ engineers. Built a developer metrics dashboard still in production today.",
    tags: ["Python", "React", "Grafana"],
    type: "work",
  },
];

export const testimonials = [
  {
    name: "Sarah Chen",
    role: "CTO",
    company: "TechCorp Ltd",
    avatar: "SC",
    avatarGradient: "from-pink-500 to-rose-600",
    text: "Usman is one of the most talented engineers I've worked with. He delivered a mission-critical feature ahead of schedule and the code quality was exceptional. He's become indispensable to our team.",
    rating: 5,
  },
  {
    name: "James Okafor",
    role: "Founder & CEO",
    company: "Startup XYZ",
    avatar: "JO",
    avatarGradient: "from-cyan-500 to-blue-600",
    text: "From day one, Usman took full ownership of the product. His ability to move fast without breaking things is rare. He shipped our entire MVP in 6 weeks and the UX was miles ahead of our competitors.",
    rating: 5,
  },
  {
    name: "Priya Sharma",
    role: "Lead Designer",
    company: "Agency ABC",
    avatar: "PS",
    avatarGradient: "from-violet-500 to-purple-600",
    text: "Working with Usman was a dream. He translated my Figma designs pixel-perfectly and always brought creative ideas to the table. The animations he added made our product feel truly premium.",
    rating: 5,
  },
  {
    name: "Tom Williams",
    role: "Engineering Manager",
    company: "BigCo",
    avatar: "TW",
    avatarGradient: "from-emerald-500 to-teal-600",
    text: "Usman's internship project is still running in production two years later — that says everything. He writes clean, self-documenting code and is always proactive about communicating blockers.",
    rating: 5,
  },
];

export const stats = [
  { label: "Years of Experience", value: "4+" },
  { label: "Projects Shipped", value: "30+" },
  { label: "Happy Clients", value: "20+" },
  { label: "GitHub Stars", value: "500+" },
];
