import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getNews, getNewsBySlug } from "@/lib/data/news";
import { Container } from "@/components/ui/Container";
import { Aurora } from "@/components/ui/Aurora";
import { Reveal } from "@/components/ui/Reveal";
import { Badge } from "@/components/ui/Badge";
import { formatDateIt } from "@/lib/utils";

export function generateStaticParams() {
  return getNews().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getNewsBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: post.images.map((url) => ({ url })),
    },
  };
}

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getNewsBySlug(slug);
  if (!post) notFound();

  return (
    <div className="relative -mt-[var(--header-h)] pb-16 pt-[calc(var(--header-h)+2rem)] md:pb-24">
      <Aurora intensity={0.55} grid={false} className="h-[36rem]" />
      <Container className="relative mx-auto flex max-w-3xl flex-col gap-8">
        <Link
          href="/news"
          className="glass inline-flex w-fit items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-muted transition-colors hover:text-gold-light"
        >
          <ArrowLeft size={16} /> Tutte le news
        </Link>

        <Reveal className="flex flex-col gap-4">
          <div className="flex flex-wrap items-center gap-3">
            <Badge>{post.category}</Badge>
            <span className="text-sm font-medium text-muted">{formatDateIt(post.date)}</span>
          </div>
          <h1 className="font-display text-4xl font-bold leading-[1.08] tracking-tight text-heading-gradient sm:text-5xl">
            {post.title}
          </h1>
          <p className="text-lg leading-relaxed text-foreground/70">{post.excerpt}</p>
        </Reveal>

        <Reveal className="flex flex-col gap-4">
          {post.images.map((src, i) => (
            <div
              key={src + i}
              className="relative aspect-[16/9] w-full overflow-hidden rounded-3xl border border-white/10 shadow-[0_40px_80px_-40px_rgba(201,162,39,0.4)]"
            >
              <Image
                src={src}
                alt={`${post.title}${post.images.length > 1 ? ` ${i + 1}` : ""}`}
                fill
                sizes="(max-width: 768px) 100vw, 768px"
                className="object-cover"
                priority={i === 0}
              />
            </div>
          ))}
        </Reveal>

        <Reveal className="card-static flex flex-col gap-5 p-6 text-lg leading-relaxed text-foreground/80 sm:p-9">
          {post.body.map((paragraph, i) => (
            <p key={i} className="whitespace-pre-line">
              {paragraph}
            </p>
          ))}
        </Reveal>
      </Container>
    </div>
  );
}
