"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { defaultBlogs } from "@/lib/data"
import { Calendar, User, Tag } from "lucide-react"

export default function BlogsPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          {/* Header */}
          <div className="text-center mb-16 slide-in-up">
            <h1 className="text-5xl md:text-6xl font-bold gradient-text mb-4">Blog & Articles</h1>
            <p className="text-xl text-foreground/70">Insights and stories from our community</p>
          </div>

          {/* Blog Posts */}
          <div className="space-y-8">
            {defaultBlogs.map((post, index) => (
              <article
                key={post.id}
                className="card-glow overflow-hidden group cursor-pointer slide-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="grid md:grid-cols-3 gap-6 p-6">
                  {/* Image */}
                  <div className="md:col-span-1 relative h-48 md:h-auto rounded-lg overflow-hidden">
                    <img
                      src={post.image || "/placeholder.svg?key=blog"}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>

                  {/* Content */}
                  <div className="md:col-span-2 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <Tag size={16} className="text-purple-500" />
                        <span className="text-sm font-medium text-purple-300 bg-purple-500/20 px-3 py-1 rounded-full">
                          {post.category}
                        </span>
                      </div>

                      <h2 className="text-2xl font-bold mb-3 group-hover:gradient-text transition-all">{post.title}</h2>

                      <p className="text-foreground/70 line-clamp-3 mb-4">{post.content}</p>
                    </div>

                    <div className="flex flex-wrap gap-4 text-sm text-foreground/60 pt-4 border-t border-border">
                      <div className="flex items-center gap-1">
                        <User size={16} />
                        <span>{post.author}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar size={16} />
                        <span>{new Date(post.date).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* CTA for more blogs */}
          <div className="mt-16 card-glow p-8 text-center slide-in-up">
            <h2 className="text-3xl font-bold mb-4">Share Your Story</h2>
            <p className="text-foreground/70 mb-6">
              Are you working on something interesting? Share your insights with the Gravity community!
            </p>
            <button className="px-8 py-3 rounded-lg bg-gradient-to-r from-purple-500 to-cyan-500 text-white font-bold hover:shadow-lg hover:shadow-purple-500/50 transition-all">
              Submit Article
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
