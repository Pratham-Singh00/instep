import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { BlogPost as BlogPostType, toPlainText } from "./Blog";
import { Calendar, User, Clock, ArrowLeft, Tag as TagIcon, ExternalLink } from "lucide-react";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPostType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const wpBridge = typeof window !== "undefined" ? window.instepCommunityConnect : undefined;

  useEffect(() => {
    if (!slug) return;

    const loadPost = async () => {
      setLoading(true);
      setError(null);

      if (!wpBridge?.endpoints?.posts) {
        setPost(null);
        setError("WordPress connection not available");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`${wpBridge.endpoints.posts}?slug=${slug}&_embed&per_page=1`);
        if (!response.ok) {
          throw new Error(`Failed to load post (${response.status})`);
        }

        const data = await response.json();
        const raw = Array.isArray(data) && data.length ? data[0] : null;
        if (!raw) {
          setError("Post not found");
          setPost(null);
          return;
        }

        const embedded = raw._embedded || {};
        const author = embedded.author?.[0]?.name ?? "In Step";
        const categories = (embedded["wp:term"]?.[0] || [])
          .map((term: any) => term.name)
          .filter(Boolean);
        const tags = (embedded["wp:term"]?.[1] || [])
          .map((term: any) => term.name)
          .filter(Boolean);
        const featured = embedded["wp:featuredmedia"]?.[0]?.source_url ?? "/api/placeholder/800/400";
        const contentHtml = raw.content?.rendered ?? "";
        const contentText = toPlainText(contentHtml);
        const words = contentText.split(/\s+/).filter(Boolean).length;
        const readingTimeMinutes = Math.max(1, Math.round(words / 200));

        setPost({
          id: raw.id,
          title: raw.title?.rendered ?? "Untitled",
          excerpt: toPlainText(raw.excerpt?.rendered ?? contentHtml ?? ""),
          content: contentHtml,
          author,
          date: raw.date,
          categories,
          tags,
          featured_image: featured,
          slug: raw.slug,
          link: raw.link,
          readingTime: `${readingTimeMinutes} min read`,
        });
      } catch (err) {
        console.error("Unable to load WordPress post", err);
        setError(err instanceof Error ? err.message : "Unknown error");
        setPost(null);
      } finally {
        setLoading(false);
      }
    };

    void loadPost();
  }, [slug, wpBridge?.endpoints?.posts]);

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  const contentHtml = post?.content || `<p>${post?.excerpt ?? ""}</p>`;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-32 pb-16">
        <section className="section-padding bg-gradient-to-br from-primary/5 to-accent/5">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="flex items-center gap-3 mb-6">
              <Button variant="ghost" onClick={() => navigate(-1)} className="px-2 text-primary hover:text-primary/80">
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back
              </Button>
              <Button variant="link" onClick={() => navigate("/blog")} className="px-2">
                View All Posts
              </Button>
            </div>

            {loading ? (
              <div className="space-y-4 animate-pulse">
                <div className="h-8 w-2/3 bg-muted rounded" />
                <div className="h-4 w-1/3 bg-muted rounded" />
                <div className="h-4 w-1/2 bg-muted rounded" />
              </div>
            ) : error && !post ? (
              <div className="p-6 bg-destructive/10 border border-destructive rounded-lg">
                <h2 className="text-lg font-semibold text-destructive mb-2">Unable to load post</h2>
                <p className="text-sm text-destructive/80 mb-4">{error}</p>
                <Button onClick={() => navigate("/blog")} variant="secondary">
                  Go back to articles
                </Button>
              </div>
            ) : post ? (
              <div>
                <div className="mb-6">
                  <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground mb-3">
                    <User className="h-4 w-4" />
                    <span>{post.author}</span>
                    <span>•</span>
                    <Calendar className="h-4 w-4" />
                    <span>{formatDate(post.date)}</span>
                    {post.readingTime ? (
                      <>
                        <span>•</span>
                        <Clock className="h-4 w-4" />
                        <span>{post.readingTime}</span>
                      </>
                    ) : null}
                  </div>
                  <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 leading-tight">
                    {post.title}
                  </h1>
                  <div className="flex flex-wrap gap-2">
                    {(post.categories && post.categories.length ? post.categories : ["General"]).map((category) => (
                      <Badge key={category} variant="secondary" className="uppercase tracking-tight">
                        {category}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-md border border-muted overflow-hidden">
                  {post.featured_image ? (
                    <div className="relative h-72 md:h-96 overflow-hidden">
                      <img
                        src={post.featured_image}
                        alt={post.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : null}

                  <div className="p-6 md:p-10">
                    <article
                      className="prose prose-lg max-w-none prose-headings:text-foreground prose-p:text-muted-foreground prose-strong:text-foreground"
                      dangerouslySetInnerHTML={{ __html: contentHtml }}
                    />

                    {post.tags?.length ? (
                      <div className="mt-8 flex flex-wrap gap-2 text-sm text-muted-foreground">
                        <TagIcon className="h-4 w-4" />
                        {post.tags.map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    ) : null}

                    <div className="mt-10 flex flex-wrap gap-3">
                      <Button onClick={() => navigate("/blog")} variant="secondary">
                        Back to blog
                      </Button>
                      {post.link ? (
                        <Button asChild>
                          <a href={post.link} target="_blank" rel="noopener noreferrer">
                            View on WordPress
                            <ExternalLink className="h-4 w-4 ml-2" />
                          </a>
                        </Button>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-6 bg-muted/30 rounded-lg border border-muted">
                <h2 className="text-lg font-semibold mb-2 text-foreground">Post not found</h2>
                <p className="text-sm text-muted-foreground mb-4">This article may have been removed or is not yet published.</p>
                <Button onClick={() => navigate("/blog")} variant="secondary">
                  Go back to articles
                </Button>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default BlogPost;
