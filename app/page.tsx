"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/Card";
import { Accordion } from "@/components/ui/Accordion";
import { HeroCarousel } from "@/components/ui/HeroCarousel";
import { Clock, DollarSign, Shuffle, PenTool, Mic, BarChart, MessageSquare, ArrowRight, ShieldCheck, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden text-white min-h-[65vh] sm:min-h-[90vh] flex items-center">

        {/* Layer 1 — Carousel fills entire hero as background */}
        <div className="absolute inset-0 z-0">
          <HeroCarousel className="h-full w-full rounded-none aspect-auto" />
        </div>

        {/* Layer 2 — Extra dark gradient for text legibility */}
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/65 via-black/45 to-black/65 pointer-events-none" />

        {/* Layer 3 — Hero text content */}
        <div className="relative z-20 w-full mx-auto px-5 sm:px-8 lg:px-12 flex flex-col items-center text-center pt-20 pb-10 sm:pt-32 sm:pb-20">

          {/* Trust badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md mb-4 sm:mb-6 border border-white/20 text-xs sm:text-sm">
            <span className="flex h-2 w-2 rounded-full bg-primary-green"></span>
            Trusted by 500+ nonprofits
          </div>

          {/* Headline */}
          <h1 className="text-[1.65rem] leading-tight sm:text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight max-w-xs sm:max-w-2xl lg:max-w-4xl mb-4 sm:mb-5 drop-shadow-lg">
            Write winning grants.<br />
            Tell sharper impact stories.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-blue to-light-green">
              Close the resource gap.
            </span>
          </h1>

          {/* Sub-text — full version on sm+, short on mobile */}
          <p className="hidden sm:block text-base sm:text-lg md:text-xl text-white/80 max-w-xl md:max-w-2xl mb-8 drop-shadow-md">
            The AI platform built specifically for nonprofit development officers, program directors, and executive staff to communicate better at a fraction of the cost.
          </p>
          <p className="sm:hidden text-xs text-white/80 max-w-[260px] mb-6 drop-shadow-md">
            AI-powered grants, reports and donor comms for nonprofits.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-[260px] sm:max-w-none sm:w-auto">
            <Button size="lg" className="w-full sm:w-auto text-sm sm:text-lg px-5 sm:px-8 rounded-full h-10 sm:h-12" asChild>
              <Link href="/templates">Start Free Draft</Link>
            </Button>
            <Button size="lg" variant="outline" className="w-full sm:w-auto text-sm sm:text-lg px-5 sm:px-8 rounded-full border-white/30 text-white hover:bg-white/10 h-10 sm:h-12" asChild>
              <Link href="#how-it-works">See How It Works</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="relative py-24 bg-background overflow-hidden">
        {/* Ambient Blob */}
        <div className="absolute top-0 left-[-10%] w-[40%] h-[60%] bg-primary-blue rounded-full mix-blend-multiply filter blur-[120px] opacity-10 animate-blob pointer-events-none" />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Development teams are stretched too thin.</h2>
            <p className="text-neutral-700 text-lg">We understand the bottlenecks that keep you from scale.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Clock, title: "Time Constraints", desc: "Hours lost staring at a blank page instead of building relationships." },
              { icon: DollarSign, title: "High Costs", desc: "Hiring dedicated grant writers or agencies is prohibitively expensive." },
              { icon: Shuffle, title: "Inconsistent Voice", desc: "Juggling multiple authors leads to a fragmented brand identity." }
            ].map((item, i) => (
              <div key={i} className="group relative flex flex-col items-center text-center p-8 bg-white rounded-3xl border border-transparent hover:border-primary-blue/10 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-primary-blue/5">
                <div className="h-16 w-16 mb-2 rounded-full bg-primary-blue/10 flex items-center justify-center text-primary-blue group-hover:scale-110 group-hover:bg-primary-blue group-hover:text-white transition-all duration-300">
                  <item.icon className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold mb-2 mt-2">{item.title}</h3>
                <p className="text-neutral-700">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="relative py-24 bg-neutral-100/50 overflow-hidden">
        <div className="absolute bottom-0 right-[0%] w-[30%] h-[50%] bg-primary-green rounded-full mix-blend-multiply filter blur-[120px] opacity-[0.08] animate-blob pointer-events-none" style={{ animationDelay: '2s' }} />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How it works</h2>
          </div>
          <div className="relative">
            {/* Gradient Horizontal Line for Desktop */}
            <div className="hidden md:block absolute top-[40px] left-[10%] right-[10%] h-[4px] bg-gradient-to-r from-primary-blue/20 via-primary-blue/60 to-primary-green/20 rounded-full" />
            <div className="grid md:grid-cols-3 gap-12 relative z-10">
              {[
                { step: "01", title: "Input Needs", desc: "Select a template and provide basic details or raw notes." },
                { step: "02", title: "AI Draft", desc: "ImpactDesk generates a highly tailored, funder-aligned draft in seconds." },
                { step: "03", title: "Human Refine", desc: "Review, edit in your voice, and submit with confidence." }
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center text-center group">
                  <div className="relative flex items-center justify-center h-20 w-20 mb-6 rounded-full bg-white/80 backdrop-blur-md border-[3px] border-primary-blue shadow-[0_0_20px_rgba(37,99,235,0.2)] group-hover:scale-110 transition-transform duration-500">
                    <span className="text-2xl font-bold text-primary-blue animate-pulse">{item.step}</span>
                  </div>
                  <h3 className="text-2xl font-semibold mb-3">{item.title}</h3>
                  <p className="text-neutral-700">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-24 bg-background overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50%] h-[50%] bg-primary-blue rounded-full mix-blend-multiply filter blur-[150px] opacity-10 animate-blob pointer-events-none" style={{ animationDelay: '4s' }} />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Everything you need to write better</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              { icon: PenTool, title: "Funder-Aligned Templates", desc: "Access a library of proven structures tailored to specific grantmakers and foundations." },
              { icon: Mic, title: "Voice Training", desc: "ImpactDesk learns your organization's unique tone from past successful applications." },
              { icon: BarChart, title: "Auto-Report Generator", desc: "Turn messy program data into beautiful, compelling impact reports." },
              { icon: MessageSquare, title: "Donor Message Builder", desc: "Draft personalized thank yous and update emails at scale." }
            ].map((item, i) => (
              <Card key={i} className="p-2 border-neutral-100 hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="h-12 w-12 rounded-lg bg-primary-green/10 group-hover:bg-white/20 flex items-center justify-center text-primary-green group-hover:text-white transition-colors duration-300 mb-4">
                    <item.icon className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-xl">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-neutral-700">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ROI Comparison */}
      <section className="relative py-24 bg-neutral-900 text-white overflow-hidden">
        {/* Glow behind the AI card */}
        <div className="absolute top-1/2 left-[70%] -translate-x-1/2 -translate-y-1/2 w-[60%] h-[80%] bg-primary-blue rounded-full mix-blend-screen filter blur-[150px] opacity-20 pointer-events-none" />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center">Do more with less.</h2>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              
              {/* Traditional Grant Writer Card */}
              <div className="bg-neutral-800/40 backdrop-blur-sm border border-neutral-700/50 rounded-[2rem] p-10 space-y-6 text-center">
                <h3 className="text-xl font-bold text-neutral-400">Traditional Grant Writer</h3>
                <p className="text-5xl font-extrabold">$65k<span className="text-xl text-neutral-500 font-normal">/yr</span></p>
                <div className="h-px w-full bg-neutral-700/50 my-6" />
                <ul className="space-y-4">
                  <li className="text-neutral-400 flex items-center justify-center gap-2">High overhead</li>
                  <li className="text-neutral-400 flex items-center justify-center gap-2">Slow turnaround times</li>
                  <li className="text-neutral-400 flex items-center justify-center gap-2">Limited capacity</li>
                </ul>
              </div>

              {/* ImpactDesk AI Card */}
              <div className="relative group">
                {/* Simulated animated border using an oversized background gradient spinning behind the card */}
                <div className="absolute -inset-1 bg-gradient-to-r from-primary-blue to-primary-green rounded-[2rem] opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-border-spin blur-md" />
                <div className="relative h-full bg-neutral-900 border border-neutral-700 rounded-[2rem] p-10 space-y-6 text-center shadow-[0_0_40px_rgba(37,99,235,0.2)] md:scale-105 z-10">
                  <div className="inline-block px-4 py-1 mb-2 rounded-full bg-primary-blue/10 border border-primary-blue/20 text-primary-blue text-sm font-bold tracking-wider uppercase">High ROI</div>
                  <h3 className="text-2xl font-bold text-white">ImpactDesk AI</h3>
                  <p className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-neutral-300">$79<span className="text-xl font-normal text-neutral-500">/mo</span></p>
                  <div className="h-px w-full bg-neutral-700/50 my-6" />
                  <ul className="space-y-4">
                    <li className="text-white font-medium flex items-center justify-center gap-2">
                       <CheckCircle2 className="w-5 h-5 text-primary-green" /> Fraction of the cost
                    </li>
                    <li className="text-white font-medium flex items-center justify-center gap-2">
                       <CheckCircle2 className="w-5 h-5 text-primary-green" /> Drafts in 2 minutes
                    </li>
                    <li className="text-white font-medium flex items-center justify-center gap-2">
                       <CheckCircle2 className="w-5 h-5 text-primary-green" /> Unlimited output
                    </li>
                  </ul>
                  <Button size="lg" className="w-full mt-6 rounded-full text-lg border-neutral-700 hover:border-white transition-all duration-300" asChild>
                    <Link href="/templates">Start Free Draft</Link>
                  </Button>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-24 bg-neutral-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-xl font-medium text-neutral-500 mb-12">Empowering organizations worldwide</h2>
          <div className="flex flex-wrap justify-center gap-8 sm:gap-12 mb-20">
            {/* Logos placeholder with hover interactions */}
            <div aria-hidden="true" className="h-8 w-32 bg-neutral-300 rounded opacity-50 grayscale hover:grayscale-0 hover:opacity-100 hover:scale-105 hover:bg-neutral-400 transition-all duration-300 cursor-pointer" />
            <div aria-hidden="true" className="h-8 w-32 bg-neutral-300 rounded opacity-50 grayscale hover:grayscale-0 hover:opacity-100 hover:scale-105 hover:bg-neutral-400 transition-all duration-300 cursor-pointer" />
            <div aria-hidden="true" className="h-8 w-32 bg-neutral-300 rounded opacity-50 grayscale hover:grayscale-0 hover:opacity-100 hover:scale-105 hover:bg-neutral-400 transition-all duration-300 cursor-pointer" />
            <div aria-hidden="true" className="h-8 w-32 bg-neutral-300 rounded opacity-50 grayscale hover:grayscale-0 hover:opacity-100 hover:scale-105 hover:bg-neutral-400 transition-all duration-300 cursor-pointer" />
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <Card className="p-4">
              <CardContent className="pt-6">
                <p className="text-lg italic text-neutral-700 mb-6">"ImpactDesk has fundamentally shifted how we operate. We secured a $250k grant using a draft generated in 10 minutes."</p>
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-neutral-300" />
                  <div>
                    <p className="font-semibold">Sarah Jenkins</p>
                    <p className="text-sm text-neutral-500">Director, Global Water Initiative</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="p-4">
              <CardContent className="pt-6">
                <p className="text-lg italic text-neutral-700 mb-6">"Finally, an AI tool that actually understands the nuance of nonprofit writing without sounding generic."</p>
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-neutral-300" />
                  <div>
                    <p className="font-semibold">Marcus Do</p>
                    <p className="text-sm text-neutral-500">Exec Director, Youth Future</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Frequently asked questions</h2>
          <Accordion
            items={[
              { id: "ai", title: "Will funders penalize me for using AI?", content: "ImpactDesk is designed to assist, not replace. By maintaining your unique voice and human review, the output remains authentic and compliant with funder guidelines." },
              { id: "voice", title: "How does the voice matching work?", content: "You can securely upload past successful proposals. Our model analyzes tone, vocabulary, and structure to mimic your organization's unique style." },
              { id: "restricted", title: "Can I use it for restricted grants?", content: "Yes. The platform provides structured templates specifically designed to handle the complex reporting required for restricted funds." },
              { id: "privacy", title: "Is my organization's data private?", content: "Absolutely. We employ bank-grade encryption and have a strict zero-training pledge, meaning your data is never used to train public AI models." },
              { id: "onboarding", title: "How long does onboarding take?", content: "Our intuitive interface means new team members can start drafting within 5 minutes of creating an account." }
            ]}
          />
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-primary-blue text-white relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center max-w-3xl">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to scale your impact?</h2>
          <p className="text-xl text-blue-100 mb-10">Join hundreds of nonprofits accelerating their funding today.</p>
          <Button size="lg" variant="secondary" className="text-lg px-8 rounded-full shadow-xl" asChild>
            <Link href="/templates">Start Free Draft <ArrowRight className="ml-2 h-5 w-5" /></Link>
          </Button>
        </div>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-tr from-primary-blue to-light-green opacity-30 mix-blend-multiply pointer-events-none" />
      </section>
    </>
  );
}
