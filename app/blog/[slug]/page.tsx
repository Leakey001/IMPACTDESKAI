import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ArrowLeft, Twitter, Linkedin, Link2 } from "lucide-react";
import type { Metadata, ResolvingMetadata } from "next";

// Simplified mockup data
const POST_DATA = {
  title: "How AI is Reshaping the Grant Writing Landscape in 2024",
  excerpt: "Discover the ethical and practical applications of generative AI in securing federal and foundation funding.",
  author: {
    name: "Elena Rodriguez",
    role: "VP of Product, ImpactDesk AI",
    bio: "Elena spent 10 years writing federal grants for health initiatives before joining ImpactDesk to build the tools she wished she had."
  },
  date: "April 12, 2024",
  tags: ["Trends", "Technology"],
  content: `
    <p>The philanthropic sector has traditionally been slow to adopt new technologies, often constrained by tight budgets and risk-averse boards. However, the emergence of highly capable generative AI is forcing a rapid paradigm shift in how organizations approach development and fundraising.</p>
    <h2>The End of the Blank Page</h2>
    <p>For grant writers, the hardest part is often just getting started. AI tools can now ingest a logic model, an organization's mission statement, and a funder's RFP to generate a highly structured first draft in seconds.</p>
    <blockquote>"It's not about replacing the grant writer. It's about elevating them from a typist to an editor and strategist."</blockquote>
    <h2>Ethical Considerations</h2>
    <p>Of course, this power comes with responsibility. Foundations are increasingly asking for transparency regarding AI use. The consensus is forming around a few key principles:</p>
    <ul>
      <li><strong>Human-in-the-Loop:</strong> AI should draft, but humans must verify every factual claim and budget figure.</li>
      <li><strong>Data Privacy:</strong> Organizations must use closed-system AIs (like ImpactDesk) that do not train public models on proprietary program data.</li>
      <li><strong>Authenticity:</strong> The narrative must still reflect the genuine voice and lived experiences of the constituents being served.</li>
    </ul>
    <h2>Looking Ahead to 2025</h2>
    <p>As we move forward, the organizations that thrive will be those that view AI not as a shortcut, but as a capacity multiplier. By spending less time generating boilerplate narrative, development teams can redirect their focus to what actually matters: building relationships with program staff, constituents, and funders.</p>
  `
};

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const finalTitle = `${POST_DATA.title} | ImpactDesk Blog`;
  const url = `https://impactdesk.ai/blog/${params.slug}`;
  
  return {
    title: finalTitle,
    description: POST_DATA.excerpt,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: finalTitle,
      description: POST_DATA.excerpt,
      url: url,
      type: "article",
      publishedTime: POST_DATA.date,
      authors: [POST_DATA.author.name],
    },
    twitter: {
      card: "summary_large_image",
      title: finalTitle,
      description: POST_DATA.excerpt,
    }
  };
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  // In a real app we'd fetch data based on params.slug

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: POST_DATA.title,
    author: [{
      "@type": "Person",
      name: POST_DATA.author.name,
      url: "https://impactdesk.ai/about"
    }],
    datePublished: "2024-04-12T08:00:00+08:00",
  };

  return (
    <article className="bg-background min-h-screen pb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      {/* Optional: Add a reading progress bar via client component if needed. Omitted for simplicity here. */}

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl pt-16">
        
        <Link href="/blog" className="inline-flex items-center text-sm font-medium text-neutral-500 hover:text-primary-blue mb-10 transition-colors">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Blog
        </Link>
        
        <div className="flex gap-2 mb-6">
          {POST_DATA.tags.map(t => <Badge key={t} variant="outline">{t}</Badge>)}
        </div>
        
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-8 leading-tight">
          {POST_DATA.title}
        </h1>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-y border-neutral-100 py-6 mb-12 gap-4">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-neutral-200" />
            <div>
              <p className="font-semibold text-neutral-900">{POST_DATA.author.name}</p>
              <p className="text-sm text-neutral-500">{POST_DATA.date}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-neutral-500 mr-2">Share:</span>
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full bg-neutral-100 hover:bg-neutral-200">
              <Twitter className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full bg-neutral-100 hover:bg-neutral-200">
              <Linkedin className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full bg-neutral-100 hover:bg-neutral-200">
              <Link2 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Hero Image */}
        <div className="w-full h-64 md:h-96 bg-neutral-200 rounded-2xl mb-16" />

        {/* Content */}
        <div 
          className="prose prose-lg prose-neutral max-w-none prose-a:text-primary-blue prose-a:no-underline hover:prose-a:underline prose-headings:font-bold prose-h2:mt-12 prose-blockquote:border-l-primary-green prose-blockquote:bg-neutral-50 prose-blockquote:py-2 prose-blockquote:px-6 prose-blockquote:not-italic prose-blockquote:text-lg prose-blockquote:font-medium prose-blockquote:text-neutral-900 rounded-r"
          dangerouslySetInnerHTML={{ __html: POST_DATA.content }}
        />

        {/* Author Bio */}
        <div className="mt-20 p-8 bg-neutral-50 rounded-2xl border border-neutral-100 flex flex-col sm:flex-row gap-6 items-start">
           <div className="h-20 w-20 rounded-full bg-neutral-300 shrink-0" />
           <div>
             <h3 className="text-xl font-bold mb-2">{POST_DATA.author.name}</h3>
             <p className="text-sm text-primary-blue font-medium mb-3">{POST_DATA.author.role}</p>
             <p className="text-neutral-700">{POST_DATA.author.bio}</p>
           </div>
        </div>

      </div>
    </article>
  );
}
