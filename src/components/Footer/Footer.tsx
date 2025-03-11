
import { Twitter, Linkedin, Facebook, Github, Globe } from "lucide-react"
import { DiscIcon as Discord } from 'lucide-react'
import logo from "../../assets/Images/o bg.webp"

export default function Footer() {
  return (
    <footer className="bg-black text-white py-6 px-8">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Logo and Copyright */}
          <div className="flex flex-col items-center md:items-start gap-4">
            <a href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 relative">
              <div className="relative z-10 flex h-full items-center justify-center text-2xl font-bold">
            <img src={logo} className="rounded-full" />
          </div>
          <div className="absolute -inset-1 animate-pulse rounded-full bg-gradient-to-br from-purple-500/50 to-pink-500/50 blur-md" />
              </div>
              <span className="text-xl font-semibold">CRIBBLE</span>
            </a>
            <p className="text-sm text-gray-400">© 2077 Hortes. All rights reserved.</p>
          </div>

          {/* Navigation */}
          <nav className="flex gap-8">
            <a href="/why-hortes" className="text-sm hover:text-gray-300 transition-colors">
              Why Hortes
            </a>
            <a href="/solution" className="text-sm hover:text-gray-300 transition-colors">
              Solution
            </a>
            <a href="/resource" className="text-sm hover:text-gray-300 transition-colors">
              Resource
            </a>
            <a href="/pricing" className="text-sm hover:text-gray-300 transition-colors">
              Pricing
            </a>
          </nav>

          {/* Social Links */}
          <div className="flex items-center gap-6">
            <a href="https://twitter.com" className="text-gray-400 hover:text-white transition-colors">
              <Twitter className="w-5 h-5" />
              <span className="sr-only">Twitter</span>
            </a>
            <a href="https://linkedin.com" className="text-gray-400 hover:text-white transition-colors">
              <Linkedin className="w-5 h-5" />
              <span className="sr-only">LinkedIn</span>
            </a>
            <a href="https://facebook.com" className="text-gray-400 hover:text-white transition-colors">
              <Facebook className="w-5 h-5" />
              <span className="sr-only">Facebook</span>
            </a>
            <a href="https://github.com" className="text-gray-400 hover:text-white transition-colors">
              <Github className="w-5 h-5" />
              <span className="sr-only">GitHub</span>
            </a>
            <a href="https://discord.com" className="text-gray-400 hover:text-white transition-colors">
              <Discord className="w-5 h-5" />
              <span className="sr-only">Discord</span>
            </a>
            <button className="text-gray-400 hover:text-white transition-colors">
              <Globe className="w-5 h-5" />
              <span className="sr-only">Change language</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}

