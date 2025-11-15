"use client"

export function AboutSection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-card/50">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold mb-8 gradient-text">About Gravity</h2>

        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-bold mb-4 text-white">Our Mission</h3>
            <p className="text-foreground/70 leading-relaxed mb-4">
              Gravity is a premier technical society dedicated to fostering innovation, creativity, and excellence in
              technology. We bring together passionate developers, designers, and tech enthusiasts from across the
              campus.
            </p>
            <p className="text-foreground/70 leading-relaxed">
              Through our seven specialized wings, we provide platforms for learning, collaboration, and real-world
              project experience in cutting-edge technologies.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-bold mb-4 text-white">Our Vision</h3>
            <p className="text-foreground/70 leading-relaxed mb-4">
              To become the leading hub for technological innovation and talent development, creating leaders who shape
              the future of technology.
            </p>
            <p className="text-foreground/70 leading-relaxed">
              We aim to bridge the gap between academics and industry, fostering a community where ideas transform into
              impactful solutions.
            </p>
          </div>
        </div>

        <div className="mt-12 p-8 bg-gradient-to-r from-purple-500/10 to-cyan-500/10 border border-purple-500/20 rounded-2xl">
          <h3 className="text-2xl font-bold mb-4 text-white">Core Values</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <div className="text-3xl mb-2">🚀</div>
              <h4 className="font-bold text-lg mb-2">Innovation</h4>
              <p className="text-foreground/60 text-sm">Pushing boundaries and exploring new possibilities</p>
            </div>
            <div>
              <div className="text-3xl mb-2">🤝</div>
              <h4 className="font-bold text-lg mb-2">Collaboration</h4>
              <p className="text-foreground/60 text-sm">Working together to achieve greater goals</p>
            </div>
            <div>
              <div className="text-3xl mb-2">📚</div>
              <h4 className="font-bold text-lg mb-2">Learning</h4>
              <p className="text-foreground/60 text-sm">Continuous growth and skill development</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
