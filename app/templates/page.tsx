"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/providers/AuthProvider";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card, CardContent, CardFooter } from "@/components/ui/Card";
import { TemplatePreviewModal, type TemplateData } from "@/components/ui/TemplatePreviewModal";
import { Search, Eye, Clock, TrendingUp, FileText, Star, ChevronDown, ChevronUp, Calendar } from "lucide-react";

const CATEGORIES = ["All", "Grant", "Report", "Donor", "Compliance"];

const TEMPLATES: TemplateData[] = [
  {
    id: 1,
    title: "Federal Grant Narrative",
    category: "Grant",
    desc: "Structured narrative template for federal applications including logic model generation and outcome-based storytelling for maximum funder alignment.",
    image: "/templates/templateimages/Federal Grant.png",
    time: "2–4 hrs",
    successRate: 78,
    pages: 12,
    reviews: 24,
    rating: 5,
  },
  {
    id: 2,
    title: "Annual Impact Report",
    category: "Report",
    desc: "Turn raw program text into an engaging, multi-page annual report that demonstrates measurable community outcomes to stakeholders and board members.",
    image: "/templates/templateimages/Annual Impact Report.png",
    time: "3–5 hrs",
    successRate: 91,
    pages: 18,
    reviews: 41,
    rating: 5,
  },
  {
    id: 3,
    title: "Major Donor Update",
    category: "Donor",
    desc: "Personalized quarterly update email structure for high-net-worth supporters, designed to deepen relationships and drive continued philanthropic investment.",
    image: "/templates/templateimages/Major Donor Update.png",
    time: "1–2 hrs",
    successRate: 84,
    pages: 4,
    reviews: 19,
    rating: 4,
  },
  {
    id: 4,
    title: "Restricted Fund Report",
    category: "Compliance",
    desc: "Detailed breakdown format covering financial allocation and programmatic outcomes to satisfy restricted grant reporting requirements with precision.",
    image: "/templates/templateimages/Restricted Fund Report.png",
    time: "2–3 hrs",
    successRate: 96,
    pages: 8,
    reviews: 33,
    rating: 5,
  },
  {
    id: 5,
    title: "Corporate Sponsorship Pitch",
    category: "Grant",
    desc: "Short, punchy pitch deck outline targeting corporate CSR initiatives — structured to speak the language of business impact and brand alignment.",
    image: "/templates/templateimages/Corporate Sponsorship Pitch.png",
    time: "1–3 hrs",
    successRate: 72,
    pages: 10,
    reviews: 17,
    rating: 4,
  },
  {
    id: 6,
    title: "End of Year Appeal",
    category: "Donor",
    desc: "Emotional, story-driven appeal letter designed for mass mailings that convert year-end donors at higher rates through urgency and mission connection.",
    image: "/templates/templateimages/End of Year Appeal.png",
    time: "1–2 hrs",
    successRate: 88,
    pages: 3,
    reviews: 56,
    rating: 5,
  },
];

// Badge colors per category
const CATEGORY_VARIANT: Record<string, "default" | "secondary" | "outline"> = {
  Grant: "default",
  Report: "secondary",
  Donor: "outline",
  Compliance: "outline",
};

function StarRating({ rating, total = 5 }: { rating: number; total?: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: total }).map((_, i) => (
        <Star
          key={i}
          className={`h-3.5 w-3.5 ${
            i < rating ? "text-amber-400 fill-amber-400" : "text-neutral-300 fill-neutral-200"
          }`}
        />
      ))}
    </div>
  );
}

function TemplateCard({
  template,
  onPreview,
}: {
  template: TemplateData;
  onPreview: (t: TemplateData) => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const SHORT_DESC = 100;

  const isLong = template.desc.length > SHORT_DESC;
  const displayDesc =
    !expanded && isLong ? template.desc.slice(0, SHORT_DESC).trimEnd() + "…" : template.desc;

  return (
    <Card
      noBubble
      showCornerArrow={false}
      className="flex flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm hover:shadow-xl transition-all duration-300 group/card"
    >
      {/* ── Image preview ────────────────────────────────────────────── */}
      <div className="relative h-48 w-full overflow-hidden bg-neutral-100 flex-shrink-0">
        <Image
          src={template.image}
          alt={`${template.title} preview`}
          fill
          className="object-cover transition-transform duration-500 group-hover/card:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-primary-blue/0 group-hover/card:bg-primary-blue/10 transition-colors duration-300" />
      </div>

      {/* ── Body ─────────────────────────────────────────────────────── */}
      <CardContent className="flex flex-col flex-1 gap-3 p-5 pt-4">
        <div>
          <Badge variant={CATEGORY_VARIANT[template.category] ?? "default"}>
            {template.category}
          </Badge>
        </div>

        <h3 className="text-[1.05rem] font-bold text-neutral-900 leading-snug">
          {template.title}
        </h3>

        <div className="text-sm text-neutral-600 leading-relaxed">
          <span>{displayDesc}</span>
          {isLong && (
            <button
              onClick={() => setExpanded((p) => !p)}
              className="ml-1 inline-flex items-center gap-0.5 text-primary-blue font-medium text-xs hover:underline focus:outline-none"
              aria-label={expanded ? "Read less" : "Read more"}
            >
              {expanded ? (
                <>less <ChevronUp className="h-3 w-3" /></>
              ) : (
                <>more <ChevronDown className="h-3 w-3" /></>
              )}
            </button>
          )}
        </div>

        {/* Metadata row */}
        <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-neutral-500 mt-auto pt-2 border-t border-neutral-100">
          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5 text-primary-blue" />
            {template.time}
          </span>
          <span className="flex items-center gap-1">
            <TrendingUp className="h-3.5 w-3.5 text-emerald-500" />
            {template.successRate}% success rate
          </span>
          <span className="flex items-center gap-1">
            <FileText className="h-3.5 w-3.5 text-violet-500" />
            {template.pages} pages avg
          </span>
        </div>
      </CardContent>

      {/* ── Footer ───────────────────────────────────────────────────── */}
      <CardFooter className="flex flex-col gap-3 px-5 pb-5 pt-0 border-t border-neutral-100">
        <Button
          variant="primary"
          className="w-full"
          onClick={() => onPreview(template)}
        >
          <Eye className="mr-2 h-4 w-4" />
          Preview Template
        </Button>
      </CardFooter>
    </Card>
  );
}

export default function TemplatesPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [previewTemplate, setPreviewTemplate] = useState<TemplateData | null>(null);

  const { user } = useAuth();
  const router = useRouter();

  // Suppress unused-var warnings — used implicitly by TemplatePreviewModal form
  void user;
  void router;

  const filteredTemplates = TEMPLATES.filter((t) => {
    const matchesSearch = t.title.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = activeCategory === "All" || t.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="bg-background min-h-screen pb-24 pt-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header Section */}
        <div className="mb-12 text-center max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">Template Library</h1>
          <p className="text-neutral-700 text-lg">
            Browse our funder-aligned templates designed to accelerate your writing process.
          </p>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col md:flex-row gap-4 mb-12 items-center justify-between">
          <div className="relative w-full md:max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500 h-5 w-5" />
            <Input
              placeholder="Search templates..."
              className="pl-10 h-12"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="flex flex-wrap gap-2 justify-center">
            {CATEGORIES.map((cat) => (
              <Button
                key={cat}
                variant={activeCategory === cat ? "primary" : "subtle"}
                className="rounded-full"
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </Button>
            ))}
          </div>
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTemplates.map((template) => (
            <TemplateCard
              key={template.id}
              template={template}
              onPreview={setPreviewTemplate}
            />
          ))}
        </div>

        {filteredTemplates.length === 0 && (
          <div className="text-center py-24 text-neutral-500">
            No templates found matching your criteria.
          </div>
        )}
      </div>

      {/* Bottom CTA Banner */}
      <div className="mt-20 px-4">
        <div className="container mx-auto max-w-4xl bg-primary-blue rounded-2xl p-8 md:p-12 text-center text-white relative overflow-hidden shadow-lg">
          <div className="relative z-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Need a custom template?</h2>
            <p className="text-blue-100 mb-8 max-w-xl mx-auto">
              Our experts can help map your existing proposals and logic models into reusable templates.
            </p>
            <Button variant="secondary" size="lg" className="rounded-full shadow-md">
              <Calendar className="mr-2 h-5 w-5" /> Book a 15-min walkthrough
            </Button>
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl" />
        </div>
      </div>

      {/* ── Glassmorphism Preview Modal ──────────────────────────────────────── */}
      <TemplatePreviewModal
        template={previewTemplate}
        onClose={() => setPreviewTemplate(null)}
      />
    </div>
  );
}
