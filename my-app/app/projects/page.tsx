"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { defaultProjects } from "@/lib/data"
import { Github, ExternalLink } from "lucide-react"

export default function ProjectsPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          {/* Header */}
          <div className="text-center mb-16 slide-in-up">
            <h1 className="text-5xl md:text-6xl font-bold gradient-text mb-4">Our Projects</h1>
            <p className="text-xl text-foreground/70">Showcasing innovation across all wings</p>
          </div>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            {defaultProjects.map((project, index) => (
              <div
                key={project.id}
                className="card-glow overflow-hidden group slide-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Project Image */}
                <div className="relative w-full h-64 overflow-hidden">
                  <img
                    src={project.image || "/placeholder.svg?key=project"}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>

                {/* Project Content */}
                <div className="p-6">
                  <div className="inline-block px-3 py-1 rounded-full bg-cyan-500/20 border border-cyan-500/30 text-xs font-medium text-cyan-300 mb-3">
                    {project.wing}
                  </div>

                  <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                  <p className="text-foreground/70 text-sm mb-4">{project.description}</p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech, idx) => (
                      <span key={idx} className="px-2 py-1 rounded text-xs bg-purple-500/20 text-purple-300">
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex gap-2 pt-4 border-t border-border">
                    <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-card hover:bg-card/80 text-sm font-medium transition-all">
                      <Github size={16} />
                      Code
                    </button>
                    <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500/20 to-cyan-500/20 hover:from-purple-500/30 hover:to-cyan-500/30 text-sm font-medium transition-all">
                      <ExternalLink size={16} />
                      Live Demo
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
