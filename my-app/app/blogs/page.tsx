"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { defaultBlogs } from "@/lib/data"
import { useEffect, useMemo, useState } from "react"
import BlogSubmitModal from "@/components/blog-submit-modal"
import { getApprovedBlogs } from "@/lib/blog-store"
import { Calendar, User, Tag } from "lucide-react"
import MagicButton from "@/components/magic-button"

export default function BlogsPage() {
  const [open, setOpen] = useState(false)
  const [approved, setApproved] = useState(() => getApprovedBlogs())

  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === 'gravity.blogs') setApproved(getApprovedBlogs())
    }
    window.addEventListener('storage', onStorage)
    // load on focus too
    const onFocus = () => setApproved(getApprovedBlogs())
    window.addEventListener('focus', onFocus)
    return () => {
      window.removeEventListener('storage', onStorage)
      window.removeEventListener('focus', onFocus)
    }
  }, [])

  const communityCards = useMemo(() => approved.map((b) => (
    <a key={b.id} href={b.mediumUrl} target="_blank" rel="noreferrer"
       className="block card-glow overflow-hidden group cursor-pointer slide-in-up">
      <div className="p-6 grid md:grid-cols-3 gap-6">
        <div className="md:col-span-1 h-48 md:h-auto rounded-lg overflow-hidden wing-card-gradient flex items-center justify-center text-6xl">✍️</div>
        <div className="md:col-span-2 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-sm font-medium text-purple-300 bg-purple-500/20 px-3 py-1 rounded-full">Community</span>
            </div>
            <h2 className="text-2xl font-bold mb-3 group-hover:gradient-text transition-all">Medium Article</h2>
            <p className="text-foreground/70 break-all mb-2">{b.mediumUrl}</p>
          </div>
          <div className="flex flex-wrap gap-4 text-sm text-foreground/60 pt-4 border-t border-border">
            <div className="flex items-center gap-1"><span>By</span><span className="font-medium">{b.name}</span></div>
            <div className="flex items-center gap-1"><span>Roll</span><span className="font-medium">{b.rollNumber}</span></div>
            <div className="flex items-center gap-1"><span>{new Date(b.createdAt).toLocaleDateString()}</span></div>
          </div>
        </div>
      </div>
    </a>
  )), [approved])

  const staticPosts = useMemo(() =>
    [...defaultBlogs].sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  , [])
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          {/* Header */}
          <div className="text-center mb-16 slide-in-up">
            <h1 className="text-5xl md:text-6xl font-bold gradient-text mb-4">Blog & Articles</h1>
            <p className="text-xl text-foreground/70">Insights and stories from our community</p>
          </div>

          {/* Blog Posts (latest on top) - grid like Events/Projects */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/** Community submissions first */}
            {approved.map((b, idx) => (
              <a
                key={b.id}
                href={b.mediumUrl}
                target="_blank"
                rel="noreferrer"
                className="block card-glow overflow-hidden group cursor-pointer slide-in-up h-[440px] flex flex-col"
                style={{ animationDelay: `${idx * 0.06}s` }}
              >
                {/* Top area: matching card background with centered logo */}
                <div className="relative w-full h-[75%] overflow-hidden bg-card flex items-center justify-center rounded-t-lg">
                  <div className="rounded-full bg-black/80 p-3 transition-transform duration-300 group-hover:scale-105">
                    <img
                      src="/gravity-logo.ico"
                      alt="Gravity logo"
                      className="w-40 h-40 object-contain"
                    />
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-sm font-medium text-purple-300 bg-purple-500/20 px-3 py-1 rounded-full">Community</span>
                  </div>

                  <div className="flex-1">
                    <h2 className="text-lg font-bold mb-2 group-hover:gradient-text transition-all line-clamp-2">Medium Article</h2>
                    <p className="text-foreground/70 break-all text-sm mb-2">{b.mediumUrl}</p>
                  </div>

                  <div className="flex flex-wrap gap-4 text-sm text-foreground/60 pt-3 border-t border-border mt-4">
                    <div className="flex items-center gap-1"><span>By</span><span className="font-medium">{b.name}</span></div>
                    <div className="flex items-center gap-1"><span>Roll</span><span className="font-medium">{b.rollNumber}</span></div>
                    <div className="flex items-center gap-1"><span>{new Date(b.createdAt).toLocaleDateString()}</span></div>
                  </div>
                </div>
              </a>
            ))}

            {staticPosts.map((post, index) => (
              <article
                key={post.id}
                className="card-glow overflow-hidden group cursor-pointer slide-in-up h-[440px] flex flex-col"
                style={{ animationDelay: `${index * 0.06}s` }}
              >
                <div className="relative w-full h-[75%] overflow-hidden">
                  <img
                    src={post.image || "/placeholder.svg?key=blog"}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>

                <div className="p-5 flex-1 flex flex-col">
                  <div className="flex items-center gap-2 mb-3">
                    <Tag size={16} className="text-purple-500" />
                    <span className="text-sm font-medium text-purple-300 bg-purple-500/20 px-3 py-1 rounded-full">{post.category}</span>
                  </div>

                  <div className="flex-1">
                    <h2 className="text-lg font-bold mb-2 group-hover:gradient-text transition-all line-clamp-2">{post.title}</h2>
                    <p className="text-foreground/70 text-sm line-clamp-3 mb-3">{post.content}</p>
                  </div>

                  <div className="flex flex-wrap gap-4 text-sm text-foreground/60 pt-3 border-t border-border mt-4">
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
              </article>
            ))}
          </div>

          {/* CTA for more blogs */}
          <div className="mt-16 card-glow p-8 text-center slide-in-up">
            <h2 className="text-3xl font-bold mb-4">Share Your Story</h2>
            <p className="text-foreground/70 mb-6">
              Are you working on something interesting? Share your insights with the Gravity community!
            </p>
            <MagicButton heightClass="h-11" onClick={()=>setOpen(true)}>
              Submit Article
            </MagicButton>
          </div>
        </div>
      </main>
      <BlogSubmitModal open={open} onClose={()=>{ setOpen(false); setApproved(getApprovedBlogs()) }} />
      <Footer />
    </>
  )
}
