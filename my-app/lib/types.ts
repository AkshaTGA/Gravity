export interface Wing {
  id: string
  name: string
  description: string
  icon: string
  color: string
}

export interface Member {
  id: string
  name: string
  role: "coordinator" | "member"
  wing: string
  bio: string
  image?: string
  isOverallCoordinator?: boolean
  isFacultyCoordinator?: boolean
  socials?: {
    github?: string
    linkedin?: string
    twitter?: string
  }
  /** Timestamp when the member was added (ms since epoch). */
  createdAt?: number
}

export interface Event {
  id: string
  title: string
  date: string
  description: string
  wing: string
  image?: string
  /** Timestamp when the event record was created (ms since epoch). */
  createdAt?: number
}

export interface Project {
  id: string
  title: string
  description: string
  wing: string
  link?: string
  image?: string
  technologies: string[]
}

export interface BlogPost {
  id: string
  title: string
  content: string
  author: string
  date: string
  category: string
  image?: string
}
