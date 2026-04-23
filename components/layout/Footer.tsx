import Link from "next/link";
import { Twitter, Linkedin, Facebook } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-neutral-100 bg-neutral-100/50 py-12 text-sm text-neutral-700">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-8">
        
        <div className="flex flex-col space-y-3">
          <h4 className="font-semibold text-neutral-900">Product</h4>
          <Link href="/templates" className="hover:text-primary-blue transition-colors">Templates</Link>
          <Link href="/pricing" className="hover:text-primary-blue transition-colors">Pricing</Link>
          <Link href="/features" className="hover:text-primary-blue transition-colors">Features</Link>
        </div>

        <div className="flex flex-col space-y-3">
          <h4 className="font-semibold text-neutral-900">Resources</h4>
          <Link href="/blog" className="hover:text-primary-blue transition-colors">Blog</Link>
          <Link href="/faq" className="hover:text-primary-blue transition-colors">FAQ</Link>
          <Link href="/support" className="hover:text-primary-blue transition-colors">Support</Link>
        </div>

        <div className="flex flex-col space-y-3">
          <h4 className="font-semibold text-neutral-900">Company</h4>
          <Link href="/about" className="hover:text-primary-blue transition-colors">About Us</Link>
          <Link href="/careers" className="hover:text-primary-blue transition-colors">Careers</Link>
          <Link href="/contact" className="hover:text-primary-blue transition-colors">Contact</Link>
        </div>

        <div className="flex flex-col space-y-3">
          <h4 className="font-semibold text-neutral-900">Legal</h4>
          <Link href="/privacy" className="hover:text-primary-blue transition-colors">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-primary-blue transition-colors">Terms of Service</Link>
          <div className="flex items-center gap-4 pt-4">
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-neutral-700 hover:text-primary-blue transition-colors" aria-label="Twitter">
              <Twitter className="h-5 w-5" aria-hidden="true" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-neutral-700 hover:text-primary-blue transition-colors" aria-label="LinkedIn">
              <Linkedin className="h-5 w-5" aria-hidden="true" />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-neutral-700 hover:text-primary-blue transition-colors" aria-label="Facebook">
              <Facebook className="h-5 w-5" aria-hidden="true" />
            </a>
          </div>
        </div>

      </div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-neutral-300 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
        <p suppressHydrationWarning>© {new Date().getFullYear()} ImpactDesk AI. All rights reserved.</p>
      </div>
    </footer>
  );
}
