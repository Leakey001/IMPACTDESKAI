import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Input } from "@/components/ui/Input";

import blog1 from "./blogimages/blog1.avif";
import blog2 from "./blogimages/blog2.avif";
import blog3 from "./blogimages/blog3.avif";
import blog4 from "./blogimages/blog4.avif";
import blog5 from "./blogimages/blog5.avif";

const BLOG_POSTS = [
  {
    slug: "ai-in-nonprofit-grants-2024",
    title: "How AI is Reshaping the Grant Writing Landscape in 2024",
    excerpt: "Discover the ethical and practical applications of generative AI in securing federal and foundation funding.",
    author: "Elena Rodriguez",
    date: "April 12, 2024",
    tags: ["Trends", "Technology"],
    featured: true,
    image: blog3
  },
  {
    slug: "measuring-qualitative-impact",
    title: "The Art of Measuring Qualitative Impact",
    excerpt: "Hard numbers aren't enough. Learn how to weave powerful constituent narratives into your outcome reporting.",
    author: "James Wilson",
    date: "March 28, 2024",
    tags: ["Reporting", "Strategy"],
    image: blog5
  },
  {
    slug: "donor-retention-strategies",
    title: "3 Donor Retention Strategies for Year-End Appeals",
    excerpt: "Stop the churn. Here's how highly personalized communication can boost your year-end retention rates by 15%.",
    author: "Sarah Jenkins",
    date: "March 15, 2024",
    tags: ["Fundraising", "Donors"],
    image: blog1
  },
  {
    slug: "understanding-restricted-funds",
    title: "A Guide to Navigating Restricted Funds",
    excerpt: "Demystifying the accounting and reporting requirements for tightly managed foundation grants.",
    author: "Marcus Do",
    date: "February 22, 2024",
    tags: ["Compliance", "Finance"],
    image: blog4
  },
  {
    slug: "building-board-engagement",
    title: "Activating Your Board for Major Gifts",
    excerpt: "Practical templates and scripts to train your board members to be confident ambassadors and fundraisers.",
    author: "Elena Rodriguez",
    date: "February 10, 2024",
    tags: ["Leadership", "Strategy"],
    image: blog2
  }
];

export const metadata = {
  title: "Blog | ImpactDesk AI",
  description: "Insights, strategies, and resources for nonprofit development professionals.",
};

export default function BlogListingPage() {
  const featured = BLOG_POSTS.find(p => p.featured) || BLOG_POSTS[0];
  const remaining = BLOG_POSTS.filter(p => p.slug !== featured.slug);

  return (
    <div className="bg-background min-h-screen">
      
      {/* Blog Header */}
      <div className="bg-neutral-50 border-b border-neutral-100 py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Impact Insights</h1>
          <p className="text-xl text-neutral-700">Actionable strategies and thoughts on the future of nonprofit development.</p>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Featured Post */}
        <div className="mb-20">
          <Link href={`/blog/${featured.slug}`} className="group block">
            <div className="grid md:grid-cols-2 gap-8 items-center bg-white rounded-card overflow-hidden border border-neutral-100 hover:shadow-md transition-all">
              <div className="relative h-64 md:h-full w-full bg-neutral-200">
                <Image src={featured.image} alt={featured.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" placeholder="blur" />
              </div>
              <div className="p-8 md:p-12">
                <div className="flex gap-2 mb-4">
                  {featured.tags.map(t => <Badge key={t} variant="outline">{t}</Badge>)}
                </div>
                <h2 className="text-3xl font-bold mb-4 group-hover:text-primary-blue transition-colors">
                  {featured.title}
                </h2>
                <p className="text-neutral-700 text-lg mb-6">{featured.excerpt}</p>
                <div className="flex items-center text-sm text-neutral-500">
                  <span className="font-medium text-neutral-900">{featured.author}</span>
                  <span className="mx-2">•</span>
                  <span>{featured.date}</span>
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* Post Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {remaining.map(post => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="group block">
              <Card className="h-full border-neutral-100 hover:shadow-md transition-shadow overflow-hidden">
                <div className="relative h-48 bg-neutral-200 rounded-t-card overflow-hidden">
                  <Image src={post.image} alt={post.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" placeholder="blur" />
                </div>
                <CardContent className="p-6 flex flex-col items-start h-[calc(100%-12rem)]">
                  <div className="flex gap-2 mb-4">
                    {post.tags.map(t => <Badge key={t} variant="secondary">{t}</Badge>)}
                  </div>
                  <h3 className="text-2xl font-bold mb-3 group-hover:text-primary-blue transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-neutral-700 mb-6 flex-1">{post.excerpt}</p>
                  <div className="flex items-center text-sm text-neutral-500 mt-auto">
                    <span className="font-medium text-neutral-900">{post.author}</span>
                    <span className="mx-2">•</span>
                    <span>{post.date}</span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <div className="text-center">
          <Button variant="outline" size="lg" className="rounded-full">Load More Articles</Button>
        </div>

      </div>

      {/* Newsletter Prompt */}
      <section className="bg-primary-blue py-20 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-4">Never miss an insight</h2>
          <p className="text-blue-100 text-lg mb-8">Join 10,000+ nonprofit leaders receiving our weekly grant strategies.</p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto" action="#">
            <Input 
              type="email" 
              placeholder="Your email address" 
              className="bg-white/10 border-white/20 text-white placeholder:text-blue-200 flex-1 focus:ring-white h-12 rounded-full"
              required
            />
            <Button variant="secondary" size="lg" className="rounded-full shadow-lg h-12 px-8">Subscribe</Button>
          </form>
          <p className="text-xs text-blue-200 mt-4 opacity-80">We care about your data. Read our Privacy Policy.</p>
        </div>
      </section>

    </div>
  );
}
