import Link from "next/link"
import { Mail, Github, Linkedin, Twitter } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-card/50 border-t border-border mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="font-bold text-lg gradient-text mb-2">Gravity</h3>
            <p className="text-foreground/60 text-sm">Technical Society for Innovation & Excellence</p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <div className="space-y-2 text-sm">
              <Link href="/about" className="text-foreground/70 hover:text-foreground transition">
                About
              </Link>
              <Link href="/wings" className="text-foreground/70 hover:text-foreground transition">
                Wings
              </Link>
              <Link href="/events" className="text-foreground/70 hover:text-foreground transition">
                Events
              </Link>
            </div>
          </div>

          {/* Wings */}
          <div>
            <h4 className="font-semibold mb-4">Wings</h4>
            <div className="space-y-2 text-sm">
              <p className="text-foreground/70 hover:text-foreground transition cursor-pointer">Competitive Coding</p>
              <p className="text-foreground/70 hover:text-foreground transition cursor-pointer">Web Development</p>
              <p className="text-foreground/70 hover:text-foreground transition cursor-pointer">Design</p>
            </div>
          </div>

          {/* Socials */}
          <div>
            <h4 className="font-semibold mb-4">Connect</h4>
            <div className="flex gap-4">
              <a href="#" className="text-foreground/60 hover:text-primary transition">
                <Github size={20} />
              </a>
              <a href="#" className="text-foreground/60 hover:text-primary transition">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-foreground/60 hover:text-primary transition">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-foreground/60 hover:text-primary transition">
                <Mail size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-8 flex flex-col sm:flex-row justify-between items-center text-sm text-foreground/60">
          <p>&copy; 2025 Gravity Technical Society. All rights reserved.</p>
          <div className="flex gap-6 mt-4 sm:mt-0">
            <Link href="#" className="hover:text-foreground transition">
              Privacy
            </Link>
            <Link href="#" className="hover:text-foreground transition">
              Terms
            </Link>
            <Link href="#" className="hover:text-foreground transition">
              Credits
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
