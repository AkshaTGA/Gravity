"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import MagicButton from "@/components/magic-button"

export default function AboutPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          {/* Header */}
          <div className="text-center mb-16 slide-in-up">
            <h1 className="text-5xl md:text-6xl font-bold gradient-text mb-4">About Gravity</h1>
            <p className="text-xl text-foreground/70">Building the future of technology together</p>
          </div>

          {/* Mission Section */}
          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <div className="card-glow p-8 slide-in-up">
              <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
              <p className="text-foreground/70 leading-relaxed mb-4">
                Gravity is a technical society dedicated to fostering innovation, collaboration, and excellence in
                technology. We bring together passionate individuals across seven distinct domains to create, learn, and
                grow together.
              </p>
              <p className="text-foreground/70 leading-relaxed">
                Whether you're into competitive programming, web development, design, open-source, AI, blockchain, or
                the metaverse, Gravity provides the platform and community to achieve your goals.
              </p>
            </div>

            <div className="card-glow p-8 slide-in-up" style={{ animationDelay: "0.1s" }}>
              <h2 className="text-3xl font-bold mb-4">Our Vision</h2>
              <p className="text-foreground/70 leading-relaxed mb-4">
                To create a vibrant ecosystem of tech enthusiasts who push the boundaries of innovation and collaborate
                to solve real-world problems.
              </p>
              <p className="text-foreground/70 leading-relaxed">
                We believe in the power of community, continuous learning, and practical application of knowledge.
                Together, we're shaping the future of technology.
              </p>
            </div>
          </div>

          {/* Values */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold gradient-text mb-8 text-center">Our Core Values</h2>
            <div className="grid md:grid-cols-4 gap-6">
              {[
                { title: "Innovation", description: "Pushing boundaries and exploring new technologies" },
                { title: "Collaboration", description: "Working together to achieve greater goals" },
                { title: "Excellence", description: "Striving for the highest quality in everything" },
                { title: "Growth", description: "Continuous learning and personal development" },
              ].map((value, index) => (
                <div
                  key={index}
                  className="card-glow p-6 text-center slide-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <h3 className="font-bold text-lg mb-2">{value.title}</h3>
                  <p className="text-foreground/60 text-sm">{value.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* History */}
          <div className="card-glow p-8 text-center slide-in-up">
            <h2 className="text-3xl font-bold mb-4">Join Our Community</h2>
            <p className="text-foreground/70 mb-6 max-w-2xl mx-auto">
              Whether you're a beginner just starting your tech journey or an experienced developer, Gravity welcomes
              you. Join us in building an amazing tech community!
            </p>
            <MagicButton heightClass="h-11">
              Get Started Today
            </MagicButton>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
