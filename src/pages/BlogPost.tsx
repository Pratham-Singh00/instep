import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { Calendar, User, Clock, ArrowLeft, Tag as TagIcon } from "lucide-react";

interface BlogPostType {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  categories: string[];
  tags: string[];
  featured_image: string;
  slug: string;
  link?: string;
  readingTime?: string;
}

const toPlainText = (value: string) =>
  value
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();

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



      // If not in local data, try API
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
        // Check for custom author name first, then fallback to WP author
        const customAuthor = raw.custom_author_name;
        let author = customAuthor || embedded.author?.[0]?.name || "In Step PC Team";
        if (author === "In Step") author = "In Step PC Team";
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
      {post && (
        <SEO
          title={post.title}
          description={post.excerpt}
          image={post.featured_image}
          type="article"
          url={`/blog/${post.slug}`}
        />
      )}
      <Header />
      <main className="pt-32 pb-16">
        <section className="section-padding bg-gradient-to-br from-primary/5 to-accent/5">
          <div className="container mx-auto px-4 max-w-5xl">


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
              <div className="max-w-4xl mx-auto">
                {/* Back Button Top */}
                <div className="mb-8">
                  <Button variant="ghost" onClick={() => navigate("/blog")} className="pl-0 text-muted-foreground hover:text-primary">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Go back to all articles
                  </Button>
                </div>

                {/* Header Section (Title, Tags, Meta ABOVE Image) */}
                <header className="text-center mb-12">
                  {/* Tags & Categories */}
                  <div className="flex flex-wrap justify-center gap-2 mb-6">
                    {(post.categories || []).map((cat) => (
                      <Badge key={cat} variant="secondary" className="px-3 py-1 text-sm">
                        {cat}
                      </Badge>
                    ))}
                    {(post.tags || []).map((tag) => (
                      <Badge key={tag} variant="outline" className="px-3 py-1 text-sm">
                        #{tag}
                      </Badge>
                    ))}
                  </div>

                  {/* Title */}
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight tracking-tight">
                    {post.title}
                  </h1>

                  {/* Meta Data */}
                  <div className="flex flex-wrap items-center justify-center gap-4 text-muted-foreground mb-8">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <User className="h-4 w-4 text-primary" />
                      </div>
                      <span className="font-medium text-foreground">{post.author}</span>
                    </div>
                    <span className="text-muted/30 hidden sm:inline">•</span>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <time dateTime={post.date}>{formatDate(post.date)}</time>
                    </div>
                    {post.readingTime && (
                      <>
                        <span className="text-muted/30 hidden sm:inline">•</span>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          <span>{post.readingTime}</span>
                        </div>
                      </>
                    )}
                  </div>

                  {/* Featured Image (Now Below Title) */}
                  {post.featured_image ? (
                    <div className="rounded-2xl overflow-hidden shadow-lg mb-8 max-h-[500px] w-full mx-auto bg-muted">
                      <img
                        src={post.featured_image}
                        alt={post.title}
                        className="w-full h-full object-cover object-center"
                      />
                    </div>
                  ) : null}
                </header>

                {/* Content */}
                <div className="bg-card rounded-xl shadow-sm border border-border p-8 md:p-12 mb-12">
                  <article
                    className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-bold prose-headings:text-foreground prose-p:text-muted-foreground prose-a:text-primary prose-img:rounded-xl"
                    dangerouslySetInnerHTML={{ __html: contentHtml }}
                  />
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
