"use client"

import { useMembers } from "@/hooks/use-members"
import ProfileCard from './profile-card'
import "./ProfileCard.css"

export function FacultyCoordinatorsSection() {
  const members = useMembers()
  const facultyCoordinators = members.filter((member) => member.isFacultyCoordinator)

  if (facultyCoordinators.length === 0) return null

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-card/50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text text-center">Faculty Coordinators</h2>
        <p className="text-foreground/60 mb-16 text-lg text-center">Meet our faculty coordinators and advisors</p>

        <div className="flex flex-wrap gap-8 justify-center">
          {facultyCoordinators.slice(0, 3).map((member) => (
            <div key={member.id} className="fade-in-up">
              <ProfileCard
                name={member.name}
                title={member.bio || member.wing}
                handle={member.name?.toLowerCase().replace(/\s+/g, '') || 'member'}
                status={member.role}
                contactText="Contact"
                avatarUrl={member.image || '/placeholder-avatar.svg'}
                socials={{
                  linkedin: member.socials?.linkedin,
                  instagram: member.socials?.twitter,
                  facebook: member.socials?.github,
                  whatsapp: undefined,
                }}
                showUserInfo={true}
                enableTilt={true}
                enableMobileTilt={false}
                onContactClick={() => console.log('Contact', member.name)}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
