import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { ShieldCheck, Heart, Eye, Lock, Globe, Building, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

export default function AboutPage() {
  return (
    <div className="bg-background min-h-screen">
      
      {/* Mission Section */}
      <section className="py-24 bg-neutral-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-primary opacity-10 pointer-events-none" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center max-w-4xl pt-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-8">Our Mission</h1>
          <p className="text-2xl md:text-3xl font-medium leading-relaxed font-serif italic text-neutral-100">
            "To democratize access to funding by empowering every nonprofit with world-class writing and communication tools."
          </p>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-4">What drives us</h2>
            <p className="text-neutral-700 text-lg">We built ImpactDesk on a foundation of commitments to the sector we serve.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Heart, title: "Nonprofit-First", desc: "Every feature is designed specifically for the unique workflows of community organizations, not corporate enterprises." },
              { icon: Globe, title: "Accessibility", desc: "We price our tools to be accessible to grassroots operations, ensuring technology bridges the resource gap." },
              { icon: ShieldCheck, title: "Security", desc: "Nonprofit data is sensitive. We treat your donor and program data with uncompromising bank-grade security." },
              { icon: Eye, title: "Transparency", desc: "We are clear about how our AI models work, what data they use, and their limitations." }
            ].map((value, i) => (
              <Card key={i} className="hover:-translate-y-1 transition-transform border-neutral-100">
                <CardContent className="pt-6 flex flex-col items-center text-center">
                  <div className="h-12 w-12 rounded-full bg-primary-blue/10 flex items-center justify-center text-primary-blue mb-6">
                    <value.icon className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-xl mb-4">{value.title}</CardTitle>
                  <p className="text-neutral-700 text-sm leading-relaxed">{value.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Security & Compliance */}
      <section className="py-24 bg-neutral-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Security & Compliance</h2>
              <p className="text-neutral-700 mb-8 text-lg">
                Trust is our most important asset. ImpactDesk is engineered from the ground up to protect your sensitive operational and donor data.
              </p>
              <ul className="space-y-6">
                {[
                  { title: "Zero-Training Pledge", desc: "Your proprietary grant applications and donor data are never used to train public AI models." },
                  { title: "SOC 2 Type II", desc: "We maintain ongoing SOC 2 compliance to ensure rigorous operational security." },
                  { title: "GDPR & CCPA Aligned", desc: "Full control over your data with automated retention policies and immediate deletion rights." },
                  { title: "End-to-End Encryption", desc: "Data in transit is encrypted via TLS 1.3, and at rest using AES-256." }
                ].map((item, i) => (
                  <li key={i} className="flex gap-4 items-start">
                    <Lock className="h-6 w-6 text-primary-green shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold text-neutral-900">{item.title}</h4>
                      <p className="text-sm text-neutral-700 mt-1">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary-blue/20 to-primary-green/20 blur-3xl rounded-full" />
              <div className="relative bg-white p-8 rounded-card border shadow-lg border-neutral-100 flex flex-col gap-6">
                <div className="flex items-center gap-4 border-b pb-4">
                  <ShieldCheck className="h-8 w-8 text-primary-blue" />
                  <span className="font-semibold text-lg">Security Portal</span>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center bg-neutral-50 p-3 rounded">
                    <span className="text-sm font-medium">Encryption</span>
                    <Badge variant="secondary">Active</Badge>
                  </div>
                  <div className="flex justify-between items-center bg-neutral-50 p-3 rounded">
                    <span className="text-sm font-medium">Access Logs</span>
                    <Badge variant="secondary">Active</Badge>
                  </div>
                  <div className="flex justify-between items-center bg-neutral-50 p-3 rounded">
                    <span className="text-sm font-medium">Data Sandboxing</span>
                    <Badge variant="secondary">Active</Badge>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Logos */}
      <section className="py-16 border-y border-neutral-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-neutral-500 mb-8">Trusted by sector leaders</p>
          <div className="flex flex-wrap justify-center items-center gap-12 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
            {/* Using Building as placeholder icons for logos */}
            <Building className="h-10 w-32" />
            <Building className="h-10 w-32" />
            <Building className="h-10 w-32" />
            <Building className="h-10 w-32" />
            <Building className="h-10 w-32" />
          </div>
        </div>
      </section>

      {/* Team Snippet */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-2xl">
          <h2 className="text-3xl font-bold mb-6">Backed by nonprofit veterans</h2>
          <p className="text-neutral-700 text-lg mb-8">
            ImpactDesk is being built by a coalition of former development directors, technical architects, and foundation officers who know the grant cycle inside and out.
          </p>
          <div className="p-8 bg-neutral-50 rounded-card border border-neutral-100 flex flex-col items-center">
             <div className="h-16 w-16 rounded-full bg-neutral-300 mb-4" />
             <p className="font-medium text-neutral-900">Board of Advisors</p>
             <p className="text-sm text-neutral-500 mb-6">Guiding our product strategy and ethical AI adoption.</p>
             <Button variant="outline" className="rounded-full">Read the Founding Letter</Button>
          </div>
        </div>
      </section>

    </div>
  );
}
