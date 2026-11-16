import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getNews } from "@/lib/data/news";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/sections/PageHero";
import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Reveal } from "@/components/ui/Reveal";
import { formatDateIt } from "@/lib/utils";

export const metadata: Metadata = {
  title: "News e Risultati",
  description: "Risultati dei tornei, chip count, vincitori e comunicati di Nettuno Gold, Bologna.",
};

export default function NewsPage() {
  const news = getNews();

  return (
    <>
      <PageHero
        title="News &amp; Risultati"
        subtitle="Vincitori, chip count e comunicati direttamente dalla sala."
      />
      <div className="pb-16 md:pb-24">
        <Container className="flex flex-col gap-12">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {news.map((post, i) => (
              <Reveal key={post.slug} delay={0.06 * i} className="flex">
                <Link href={`/news/${post.slug}`} className="card-modern group flex w-full flex-col overflow-hidden">
                  <div className="relative aspect-[16/10] w-full overflow-hidden">
                    <Image
                      src={post.images[0]}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d10] via-transparent to-transparent" />
                    <Badge className="absolute left-3 top-3">{post.category}</Badge>
                    <span className="glass absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full text-gold-light opacity-0 transition-all duration-300 group-hover:opacity-100">
                      <ArrowUpRight size={16} />
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col gap-2.5 p-6">
                    <span className="text-xs font-semibold tracking-wide text-gold">{formatDateIt(post.date)}</span>
                    <h2 className="font-display text-xl font-semibold leading-snug tracking-tight text-foreground transition-colors group-hover:text-gold-light">
                      {post.title}
                    </h2>
                    <p className="text-sm leading-relaxed text-muted">{post.excerpt}</p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </div>
    </>
  );
}
