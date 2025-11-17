import Link from "next/link";
import { Mail, Github, Linkedin, Twitter, Instagram } from "lucide-react";
import { wings } from "@/lib/data";

const slug = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

export function Footer() {
  return (
    <footer className="bg-card/50 border-t border-border mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8 text-center md:text-left">
          {/* Brand */}
          <div>
            <h3 className="font-bold text-lg gradient-text mb-2">Gravity</h3>
            <p className="text-foreground/60 text-sm">
              Technical Society for Innovation & Excellence
            </p>
            <p className="text-foreground/60 text-sm mt-2">IIIT Allahabad</p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <div className="flex flex-col text-sm items-center md:items-start">
              <Link
                href="/"
                className="block w-full text-foreground/70 hover:text-foreground transition py-1"
              >
                Home
              </Link>
              <Link
                href="/about"
                className="block w-full text-foreground/70 hover:text-foreground transition py-1"
              >
                About
              </Link>
              <Link
                href="/wings"
                className="block w-full text-foreground/70 hover:text-foreground transition py-1"
              >
                Wings
              </Link>
              <Link
                href="/events"
                className="block w-full text-foreground/70 hover:text-foreground transition py-1"
              >
                Events
              </Link>
              <Link
                href="/projects"
                className="block w-full text-foreground/70 hover:text-foreground transition py-1"
              >
                Projects
              </Link>
              <Link
                href="/members"
                className="block w-full text-foreground/70 hover:text-foreground transition py-1"
              >
                Members
              </Link>
              <Link
                href="/blogs"
                className="block w-full text-foreground/70 hover:text-foreground transition py-1"
              >
                Blogs
              </Link>
              <Link
                href="/contact"
                className="block w-full text-foreground/70 hover:text-foreground transition py-1"
              >
                Contact
              </Link>
            </div>
          </div>

          {/* Wings */}
          <div>
            <h4 className="font-semibold mb-4">Wings</h4>
            <div className="space-y-2 text-sm flex flex-col items-center md:items-start">
              {wings.map((w) => (
                <Link
                  key={w.id}
                  href={`/#wing-${slug(w.name)}`}
                  className="block text-foreground/70 hover:text-foreground transition"
                >
                  {w.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Socials */}
          <div>
            <h4 className="font-semibold mb-4">Connect</h4>
            <div className="flex gap-4 justify-center md:justify-start">
              <a
                href="#"
                aria-label="Gravity on GitHub"
                className="text-foreground/60 hover:text-primary transition"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github size={20} />
              </a>
              <a
                href="https://www.linkedin.com/search/results/all/?fetchDeterministicClustersOnly=true&heroEntityKey=urn%3Ali%3Aorganization%3A88675450&keywords=gravity%2C%20iiit%20allahabad&origin=RICH_QUERY_SUGGESTION&position=0&searchId=2d92fe41-6498-4e26-91de-097b6b4e75d2&sid=Jg&spellCorrectionEnabled=false"
                aria-label="Gravity on LinkedIn"
                className="text-foreground/60 hover:text-primary transition"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="https://www.instagram.com/gravityiiita/"
                aria-label="Gravity on Instagram"
                className="text-foreground/60 hover:text-primary transition"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Instagram size={20} />
              </a>
              <a
                href="/contact"
                aria-label="Contact Gravity"
                className="text-foreground/60 hover:text-primary transition"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Removed lower legal section per request */}
      </div>
    </footer>
  );
}
