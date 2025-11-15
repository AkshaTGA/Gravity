import type { Wing, Member, Event, Project, BlogPost } from "./types"

export const wings: Wing[] = [
  {
    id: "1",
    name: "Competitive Coding",
    description: "Master algorithms and data structures through contests",
    icon: "⚡",
    color: "from-blue-500 to-cyan-500",
  },
  {
    id: "2",
    name: "Web Development",
    description: "Build modern web applications with cutting-edge technologies",
    icon: "🌐",
    color: "from-green-500 to-emerald-500",
  },
  {
    id: "3",
    name: "Design",
    description: "Create stunning visual experiences and UI/UX designs",
    icon: "🎨",
    color: "from-pink-500 to-rose-500",
  },
  {
    id: "4",
    name: "FOSS",
    description: "Contribute to open-source software and communities",
    icon: "🔓",
    color: "from-yellow-500 to-orange-500",
  },
  {
    id: "5",
    name: "Private AI",
    description: "Explore privacy-preserving AI and machine learning",
    icon: "🤖",
    color: "from-purple-500 to-violet-500",
  },
  {
    id: "6",
    name: "Blockchain",
    description: "Build decentralized applications and smart contracts",
    icon: "⛓️",
    color: "from-orange-500 to-red-500",
  },
  {
    id: "7",
    name: "Metaverse",
    description: "Create immersive virtual reality and metaverse experiences",
    icon: "🌌",
    color: "from-indigo-500 to-purple-500",
  },
]

export const defaultMembers: Member[] = [
  {
    id: "1",
    name: "Dr. Rajendra Singh",
    role: "coordinator",
    wing: "Overall",
    bio: "Faculty Advisor & Society Head",
    // Use absolute path so Next.js resolves the asset from /public correctly.
    // Relative "./public/..." caused requests like /admin/public/placeholder-avatar.svg (404) and repeated fetch attempts.
    image: "/placeholder-avatar.svg",
    isOverallCoordinator: true,
    socials: {
      github: "#",
      linkedin: "#",
      twitter: "#",
    },
  },
  {
    id: "9",
    name: "Dr. Meera Nair",
    role: "coordinator",
    wing: "Overall",
    bio: "Faculty Coordinator",
    image: "/placeholder-avatar.svg",
    isFacultyCoordinator: true,
    socials: {
      github: "#",
      linkedin: "#",
      twitter: "#",
    },
  },
  {
    id: "10",
    name: "Dr. Arvind Menon",
    role: "coordinator",
    wing: "Overall",
    bio: "Faculty Coordinator",
    image: "/placeholder-avatar.svg",
    isFacultyCoordinator: true,
    socials: {
      github: "#",
      linkedin: "#",
      twitter: "#",
    },
  },
  {
    id: "2",
    name: "Aditya Sharma",
    role: "coordinator",
    wing: "Competitive Coding",
    bio: "Passionate about algorithms and problem-solving",
  // Missing asset; fallback to existing placeholder to stop repeated 404 fetch attempts.
  image: "/placeholder-avatar.svg",
     isOverallCoordinator: true,
    socials: {
      github: "#",
      linkedin: "#",
      twitter: "#",
    },
  },
  {
    id: "3",
    name: "Priya Verma",
    role: "coordinator",
    wing: "Web Development",
    bio: "Full-stack developer with 3 years experience",
  image: "/placeholder-avatar.svg",
     isOverallCoordinator: true,
    socials: {
      github: "#",
      linkedin: "#",
      twitter: "#",
    },
  },
  {
    id: "4",
    name: "Vikram Patel",
    role: "coordinator",
    wing: "Design",
    bio: "UI/UX designer and creative thinker",
  image: "/placeholder-avatar.svg",
     
    socials: {
      github: "#",
      linkedin: "#",
      twitter: "#",
    },
  },
  {
    id: "5",
    name: "Ananya Singh",
    role: "coordinator",
    wing: "Private AI",
    bio: "AI researcher and machine learning enthusiast",
  image: "/placeholder-avatar.svg",
    socials: {
      github: "#",
      linkedin: "#",
      twitter: "#",
    },
  },
  {
    id: "6",
    name: "Rohit Kumar",
    role: "member",
    wing: "Competitive Coding",
    bio: "Enthusiastic coder",
  image: "/placeholder-avatar.svg",
    socials: {
      github: "#",
      linkedin: "#",
      twitter: "#",
    },
  },
  {
    id: "7",
    name: "Sarah Chen",
    role: "member",
    wing: "Web Development",
    bio: "React specialist",
  image: "/placeholder-avatar.svg",
    socials: {
      github: "#",
      linkedin: "#",
      twitter: "#",
    },
  },
  {
    id: "8",
    name: "Neha Gupta",
    role: "member",
    wing: "Design",
    bio: "Creative designer",
  image: "/placeholder-avatar.svg",
    socials: {
      github: "#",
      linkedin: "#",
      twitter: "#",
    },
  },
]

export const defaultEvents: Event[] = [
  {
    id: "1",
    title: "Coding Contest 2024",
    date: "2024-12-15",
    description: "Annual coding competition with exciting prizes",
    wing: "Competitive Coding",
  image: "/placeholder-avatar.svg",
  },
  {
    id: "2",
    title: "Web Dev Workshop",
    date: "2024-12-20",
    description: "Learn modern web development frameworks",
    wing: "Web Development",
  image: "/placeholder-avatar.svg",
  },
  {
    id: "3",
    title: "Design Bootcamp",
    date: "2024-12-25",
    description: "Intensive design thinking and prototyping",
    wing: "Design",
  image: "/placeholder-avatar.svg",
  },
  {
    id: "4",
    title: "Design Bootcamp",
    date: "2024-12-25",
    description: "Intensive design thinking and prototyping",
    wing: "Design",
  image: "/placeholder-avatar.svg",
  },
  {
    id: "5",
    title: "Design Bootcamp",
    date: "2024-12-25",
    description: "Intensive design thinking and prototyping",
    wing: "Design",
  image: "/placeholder-avatar.svg",
  },
]

export const defaultProjects: Project[] = [
  {
    id: "1",
    title: "CodeVerse Platform",
    description: "Online coding practice platform",
    wing: "Competitive Coding",
    technologies: ["React", "Node.js", "MongoDB"],
    link: "#",
  image: "/placeholder-avatar.svg",
  },
  {
    id: "2",
    title: "DesignHub",
    description: "Collaborative design tool",
    wing: "Design",
    technologies: ["Next.js", "Canvas API", "WebSocket"],
    link: "#",
  image: "/placeholder-avatar.svg",
  },
  {
    id: "3",
    title: "Web3 DApp",
    description: "Decentralized application on blockchain",
    wing: "Blockchain",
    technologies: ["Solidity", "React", "Web3.js"],
    link: "#",
  image: "/placeholder-avatar.svg",
  },
]

export const defaultBlogs: BlogPost[] = [
  {
    id: "1",
    title: "Getting Started with Competitive Programming",
    content: "A comprehensive guide to start your competitive programming journey...",
    author: "Aditya Sharma",
    date: "2024-12-01",
    category: "Competitive Coding",
  image: "/placeholder-avatar.svg",
  },
  {
    id: "2",
    title: "Web3 Development Essentials",
    content: "Everything you need to know about building dApps...",
    author: "Priya Verma",
    date: "2024-11-28",
    category: "Blockchain",
  image: "/placeholder-avatar.svg",
  },
]
