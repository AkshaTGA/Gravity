"use client"

import { useAdminStore } from "@/hooks/use-admin-store"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { useMemo } from "react"
import type { Member } from "@/lib/types"
import { useSearchParams } from "next/navigation"
import ProfileCard from "@/components/profile-card"
import "@/components/ProfileCard.css"

export default function MembersPage() {
  const { members } = useAdminStore()
  const searchParams = useSearchParams()
  const wingFilter = searchParams.get("wing") || ""

  const { coordinators, regularMembers, heading, subheading } = useMemo(() => {
    let list = members
    let heading = "Our Team"
    let subheading = "Meet the talented members of Gravity"
    const isWingFilter = wingFilter && wingFilter.toLowerCase() !== "overall"
    if (isWingFilter) {
      heading = `${wingFilter} Wing`
      subheading = `Coordinators and members from the ${wingFilter} wing`
      list = members.filter(
        (m) => m.wing === wingFilter && !m.isOverallCoordinator && !m.isFacultyCoordinator
      )
    }
    return {
      coordinators: list.filter((m) => m.role === "coordinator"),
      regularMembers: list.filter((m) => m.role === "member"),
      heading,
      subheading,
    }
  }, [members, wingFilter])

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          {/* Header */}
          <div className="text-center mb-16 slide-in-up">
            <h1 className="text-5xl md:text-6xl font-bold gradient-text mb-4">{heading}</h1>
            <p className="text-xl text-foreground/70">{subheading}</p>
          </div>

          {/* Coordinators Section */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold mb-8 flex items-center gap-2">
              <span className="text-2xl">👑</span>
              <span>Coordinators</span>
            </h2>
            <div className="flex flex-wrap gap-8 justify-start">
              {coordinators.map((member) => (
                <div key={member.id} className="fade-in-up">
                  <ProfileCard
                    name={member.name}
                    title={member.bio || member.wing}
                    handle={member.name?.toLowerCase().replace(/\s+/g, "") || "member"}
                    status={member.role}
                    contactText="Contact"
                    avatarUrl={member.image || "/placeholder-avatar.svg"}
                    socials={{
                      linkedin: member.socials?.linkedin,
                      instagram: member.socials?.twitter,
                      facebook: member.socials?.github,
                      whatsapp: undefined,
                    }}
                    showUserInfo={true}
                    enableTilt={true}
                    enableMobileTilt={false}
                    onContactClick={() => console.log("Contact", member.name)}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Members Section */}
          <div>
            <h2 className="text-3xl font-bold mb-8 flex items-center gap-2">
              <span className="text-2xl">👤</span>
              <span>Members</span>
            </h2>
            <div className="flex flex-wrap gap-8 justify-start">
              {regularMembers.map((member) => (
                <div key={member.id} className="fade-in-up">
                  <ProfileCard
                    name={member.name}
                    title={member.bio || member.wing}
                    handle={member.name?.toLowerCase().replace(/\s+/g, "") || "member"}
                    status={member.role}
                    contactText="Contact"
                    avatarUrl={member.image || "/placeholder-avatar.svg"}
                    socials={{
                      linkedin: member.socials?.linkedin,
                      instagram: member.socials?.twitter,
                      facebook: member.socials?.github,
                      whatsapp: undefined,
                    }}
                    showUserInfo={true}
                    enableTilt={true}
                    enableMobileTilt={false}
                    onContactClick={() => console.log("Contact", member.name)}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Call to Action */}
          <div className="mt-20 card-glow p-8 text-center slide-in-up">
            <h2 className="text-3xl font-bold mb-4">Join Our Community</h2>
            <p className="text-foreground/70 mb-6">
              Interested in joining Gravity? We're always looking for passionate members!
            </p>
            <a
              href="/contact"
              className="inline-block px-8 py-3 rounded-lg bg-linear-to-r from-purple-500 to-cyan-500 text-white font-bold hover:shadow-lg hover:shadow-purple-500/50 transition-all"
            >
              Get in Touch
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
 
