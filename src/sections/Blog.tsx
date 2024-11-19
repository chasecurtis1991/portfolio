"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { SectionHeader } from "@/components/SectionHeader";
import  BlogCard  from "@/components/BlogCard";
import { getBlogPosts, type BlogPost } from "@/lib/contentful";
import Image from "next/image";
import { format } from "date-fns";
import { ArrowLeft } from "lucide-react";
import { Document, BLOCKS, MARKS } from "@contentful/rich-text-types";
import {
  documentToReactComponents,
  Options,
} from "@contentful/rich-text-react-renderer";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter, useSearchParams } from 'next/navigation';

// Dynamically import rich text components with no SSR
const RichTextComponents = dynamic(
  () =>
    import("@contentful/rich-text-react-renderer").then(
      (mod) => mod.documentToReactComponents
    ),
  { ssr: false }
);

const formatDate = (date: string) => {
  if (!date) return "";
  try {
    return format(new Date(date), "MMM d, yyyy");
  } catch {
    return "";
  }
};

// Rich text options
const richTextOptions: Options = {
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node, children) => (
      <p className="mb-4 text-gray-300">{children}</p>
    ),
    [BLOCKS.HEADING_1]: (node, children) => (
      <h1 className="text-3xl font-bold mb-4 text-white">{children}</h1>
    ),
    [BLOCKS.HEADING_2]: (node, children) => (
      <h2 className="text-2xl font-bold mb-3 text-white">{children}</h2>
    ),
    [BLOCKS.HEADING_3]: (node, children) => (
      <h3 className="text-xl font-bold mb-2 text-white">{children}</h3>
    ),
    [BLOCKS.UL_LIST]: (node, children) => (
      <ul className="list-disc pl-6 mb-4 text-gray-300">{children}</ul>
    ),
    [BLOCKS.OL_LIST]: (node, children) => (
      <ol className="list-decimal pl-6 mb-4 text-gray-300">{children}</ol>
    ),
    [BLOCKS.LIST_ITEM]: (node, children) => (
      <li className="mb-2">{children}</li>
    ),
    [BLOCKS.QUOTE]: (node, children) => (
      <blockquote className="border-l-4 border-blue-500 pl-4 italic my-4 text-gray-300">
        {children}
      </blockquote>
    ),
  },
  renderMark: {
    [MARKS.BOLD]: (text) => <strong className="font-bold">{text}</strong>,
    [MARKS.ITALIC]: (text) => <em className="italic">{text}</em>,
    [MARKS.CODE]: (text) => (
      <code className="bg-gray-800 rounded px-1">{text}</code>
    ),
  },
};

// No SSR wrapper
const BlogComponent = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const blogPosts = await getBlogPosts();
        setPosts(blogPosts);
        
        // Check for slug in URL
        const slug = searchParams.get('post');
        if (slug) {
          const post = blogPosts.find(p => p.slug === slug);
          if (post) {
            setSelectedPost(post);
          }
        }
      } catch (error) {
        console.error("Error fetching blog posts:", error);
        setError(
          error instanceof Error ? error.message : "Failed to fetch blog posts"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [searchParams]);

  const handlePostSelect = (post: BlogPost) => {
    setSelectedPost(post);
    router.push(`?post=${post.slug}`, { scroll: false });
  };

  const handleBackClick = () => {
    setSelectedPost(null);
    router.push('.', { scroll: false });
  };

  if (loading) {
    return (
      <section id="blog" className="h-fit">
        <div className="container mx-auto px-4 py-8">
          <SectionHeader
            title="My Blog"
            eyebrow="Thoughts & Insights"
            description="Loading blog posts..."
          />
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-[400px] animate-pulse rounded-2xl bg-gray-800"
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="blog" className="h-fit">
        <div className="container mx-auto px-4 py-8">
          <SectionHeader
            title="My Blog"
            eyebrow="Thoughts & Insights"
            description="Error loading blog posts"
          />
          <div className="mt-12 text-red-500">{error}</div>
        </div>
      </section>
    );
  }

  if (!posts.length) {
    return (
      <section id="blog" className="h-fit">
        <div className="container mx-auto px-4 py-8">
          <SectionHeader
            title="My Blog"
            eyebrow="Thoughts & Insights"
            description="No blog posts available yet. Check back soon!"
          />
        </div>
      </section>
    );
  }

  return (
    <section id="blog" className="h-fit relative py-16">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-transparent pointer-events-none"></div>
      <div className="relative">
        <AnimatePresence mode="wait" initial={false}>
          {selectedPost ? (
            <motion.div
              key="article"
              initial={{ rotateY: 90 }}
              animate={{ rotateY: 0 }}
              exit={{ rotateY: -90 }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 25,
                duration: 0.3,
              }}
              style={{
                perspective: 1000,
                transformStyle: "preserve-3d",
              }}
              className="w-full"
            >
              <div className="relative bg-white/[0.02] backdrop-blur-xl border border-white/[0.05] shadow-2xl mx-auto max-w-7xl rounded-xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] via-transparent to-white/[0.03]"></div>
                <div className="absolute inset-0 overflow-hidden">
                  <div className="absolute inset-0 w-[300%] h-[300%] bg-[linear-gradient(135deg,transparent_0%,transparent_26.67%,rgba(255,255,255,0.05)_33.33%,transparent_40%,transparent_100%)] animate-shimmer-bg"></div>
                </div>
                <div className="relative z-10">
                  <div className="container mx-auto px-4 py-8">
                    <button
                      onClick={handleBackClick}
                      className="flex items-center gap-2 text-gray-300 hover:text-cyan-300 transition-colors mb-8 group"
                    >
                      <div className="relative">
                        <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 bg-cyan-400/30 transition-all duration-300"></div>
                        <ArrowLeft className="w-5 h-5 relative z-10" />
                      </div>
                      <span className="relative font-medium">
                        Back to all articles
                        <span className="absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-cyan-300/70 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                      </span>
                    </button>

                    <article className="max-w-4xl mx-auto w-full">
                      <div className="space-y-8">
                        {selectedPost.featuredImage && (
                          <div className="relative">
                            <div className="aspect-video relative rounded-lg overflow-hidden">
                              <Image
                                src={selectedPost.featuredImage.url}
                                alt={selectedPost.featuredImage.title}
                                fill
                                className="object-cover"
                                priority
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-cyan-900/40 to-transparent"></div>
                            </div>
                            <div className="absolute -inset-px rounded-lg bg-gradient-to-r from-cyan-500/10 via-transparent to-cyan-500/10"></div>
                            <div className="absolute -inset-px rounded-lg ring-1 ring-cyan-500/20"></div>
                          </div>
                        )}

                        <div className="relative">
                          <h1 className="text-4xl font-bold text-white mb-6 relative inline-block">
                            {selectedPost.title}
                            <div className="absolute -inset-x-4 -inset-y-2 bg-gradient-to-r from-cyan-400/10 via-cyan-400/5 to-transparent rounded-lg -z-10"></div>
                          </h1>
                        </div>

                        <div className="flex items-center gap-6 text-gray-200">
                          <div className="flex items-center gap-3 bg-gray-800 rounded-full px-4 py-2 relative">
                            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500/20 via-cyan-500/5 to-transparent"></div>
                            {selectedPost.author?.avatar && (
                              <Image
                                src={selectedPost.author.avatar.url}
                                alt={selectedPost.author.name}
                                width={32}
                                height={32}
                                className="rounded-full ring-2 ring-cyan-500/30"
                              />
                            )}
                            <div className="flex flex-col relative">
                              <span className="text-sm">
                                {selectedPost.author?.name}
                              </span>
                              {selectedPost.publishedDate && (
                                <time
                                  dateTime={selectedPost.publishedDate}
                                  className="text-xs text-cyan-400/80"
                                >
                                  {formatDate(selectedPost.publishedDate)}
                                </time>
                              )}
                            </div>
                          </div>

                          {selectedPost.tags &&
                            selectedPost.tags.length > 0 && (
                              <div className="flex gap-2 flex-wrap">
                                {selectedPost.tags.map((tag) => (
                                  <span
                                    key={tag}
                                    className="px-3 py-1 bg-gray-800 rounded-full text-sm text-cyan-400 relative group"
                                  >
                                    <span className="relative z-10">{tag}</span>
                                    <div className="absolute inset-0 rounded-full bg-cyan-400/10 group-hover:bg-cyan-400/20 transition-colors"></div>
                                  </span>
                                ))}
                              </div>
                            )}
                        </div>

                        <div className="prose prose-invert max-w-none relative">
                          <div className="absolute -left-4 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-500/50 via-cyan-500/10 to-transparent"></div>
                          <style jsx global>{`
                            .prose h2 {
                              position: relative;
                              color: rgb(34 211 238); /* text-cyan-400 */
                            }
                            .prose h2::before {
                              content: "";
                              position: absolute;
                              left: -1rem;
                              top: 50%;
                              width: 0.5rem;
                              height: 2px;
                              background: rgb(34 211 238); /* bg-cyan-400 */
                              transform: translateY(-50%);
                            }
                            .prose a {
                              color: rgb(34 211 238); /* text-cyan-400 */
                              text-decoration: none;
                              position: relative;
                            }
                            .prose a::after {
                              content: "";
                              position: absolute;
                              left: 0;
                              right: 0;
                              bottom: -2px;
                              height: 1px;
                              background: linear-gradient(
                                to right,
                                transparent,
                                rgb(34 211 238),
                                transparent
                              );
                              transform: scaleX(0);
                              transition: transform 0.3s ease;
                            }
                            .prose a:hover::after {
                              transform: scaleX(1);
                            }
                            .prose blockquote {
                              border-image: linear-gradient(
                                  to bottom,
                                  rgb(34 211 238),
                                  transparent
                                )
                                1;
                              background: rgb(34 211 238 / 0.1);
                            }
                            .prose code {
                              background: rgb(34 211 238 / 0.1);
                              color: rgb(34 211 238);
                              padding: 0.2em 0.4em;
                              border-radius: 0.25em;
                            }
                          `}</style>
                          {(() => {
                            if (!selectedPost.content) {
                              console.log("No content found");
                              return null;
                            }
                            if (
                              typeof selectedPost.content === "object" &&
                              selectedPost.content !== null &&
                              "nodeType" in selectedPost.content &&
                              selectedPost.content.nodeType === "document" &&
                              "content" in selectedPost.content &&
                              Array.isArray(selectedPost.content.content)
                            ) {
                              return documentToReactComponents(
                                selectedPost.content as Document,
                                richTextOptions
                              );
                            } else {
                              console.log("Invalid content structure");
                              return (
                                <p className="text-gray-400">
                                  Content could not be displayed
                                </p>
                              );
                            }
                          })()}
                        </div>
                      </div>
                    </article>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="blog-list"
              initial={{ rotateY: -90 }}
              animate={{ rotateY: 0 }}
              exit={{ rotateY: 90 }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 25,
                duration: 0.3,
              }}
              style={{
                perspective: 1000,
                transformStyle: "preserve-3d",
              }}
              className="w-full"
            >
              <div className="relative bg-white/[0.02] backdrop-blur-xl border border-white/[0.05] shadow-2xl mx-auto max-w-7xl rounded-xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] via-transparent to-white/[0.03]"></div>
                <div className="absolute inset-0 overflow-hidden">
                  <div className="absolute inset-0 w-[300%] h-[300%] bg-[linear-gradient(135deg,transparent_0%,transparent_26.67%,rgba(255,255,255,0.05)_33.33%,transparent_40%,transparent_100%)] animate-shimmer-bg"></div>
                </div>
                <div className="relative z-10">
                  <div className="container mx-auto px-4 py-8">
                    <SectionHeader
                      title="My Blog"
                      eyebrow="Thoughts & Insights"
                      description="Exploring ideas, sharing insights, and documenting my journey in tech."
                    />

                    <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                      {posts.map((post) => (
                        <BlogCard
                          key={post.slug}
                          className="group cursor-pointer"
                          onClick={() => handlePostSelect(post)}
                        >
                          <div className="aspect-video relative overflow-hidden">
                            {post.featuredImage?.url && (
                              <Image
                                src={post.featuredImage.url}
                                alt={post.featuredImage.title || post.title}
                                fill
                                className="object-cover transition-transform group-hover:scale-110"
                              />
                            )}
                          </div>
                          <div className="p-6 space-y-4">
                            <h3 className="text-lg font-bold text-white group-hover:text-cyan-200 group-hover:brightness-125 transition-colors line-clamp-2">
                              {post.title}
                            </h3>
                            {post.excerpt && (
                              <p className="text-gray-200 text-sm line-clamp-2 group-hover:text-white/90">
                                {post.excerpt}
                              </p>
                            )}
                            <div className="flex items-center justify-between pt-4 border-t border-white/10">
                              {post.author && (
                                <div className="flex items-center gap-3">
                                  {post.author.avatar && (
                                    <Image
                                      src={post.author.avatar.url}
                                      alt={post.author.name}
                                      width={32}
                                      height={32}
                                      className="rounded-full ring-2 ring-cyan-200/40"
                                    />
                                  )}
                                  <div className="flex flex-col">
                                    <span className="text-sm text-gray-100">
                                      {post.author.name}
                                    </span>
                                    <time
                                      dateTime={post.publishedDate}
                                      className="text-xs text-gray-400"
                                    >
                                      {formatDate(post.publishedDate)}
                                    </time>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </BlogCard>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

// Export the component with no SSR
export const Blog = dynamic(() => Promise.resolve(BlogComponent), {
  ssr: false,
});
