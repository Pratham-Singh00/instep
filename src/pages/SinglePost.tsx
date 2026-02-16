import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useContent } from "@/context/ContentContext";
import { Loader2, Calendar, User, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SmartLink } from "@/components/SmartLink";

const SinglePost = () => {
  const { slug } = useParams();
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { hasWordPressSource } = useContent();

  const wpBridge = typeof window !== "undefined" ? window.instepCommunityConnect : undefined;

  useEffect(() => {
    const fetchPost = async () => {
      if (!slug || !wpBridge?.endpoints?.posts) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        // Fetch post by slug
        const response = await fetch(`${wpBridge.endpoints.posts}?slug=${slug}&_embed`);
        if (!response.ok) throw new Error("Failed to fetch post");

        const data = await response.json();

        if (data.length > 0) {
          setPost(data[0]);
        } else {
          setError("Post not found");
        }
      } catch (err) {
        console.error("Error fetching post:", err);
        setError("Unable to load post");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug, wpBridge?.endpoints?.posts]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center pt-32">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 container mx-auto px-4 pt-40 pb-20 text-center">
          <h1 className="text-2xl font-bold mb-4">{error || "Post not found"}</h1>
          <Button asChild>
            <SmartLink href="/blog">Return to Blog</SmartLink>
          </Button>
        </main>
        <Footer />
      </div>
    );
  }

  const featuredImage = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url;
  let authorName = post._embedded?.author?.[0]?.name || "In Step PC Team";
  if (authorName === "In Step") authorName = "In Step PC Team";

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-32 pb-20">
        <article className="container mx-auto px-4 max-w-4xl">
          <Button variant="ghost" className="mb-8" asChild>
            <SmartLink href="/blog">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </SmartLink>
          </Button>

          {featuredImage && (
            <div className="rounded-xl overflow-hidden mb-8 aspect-video">
              <img
                src={featuredImage}
                alt={post.title.rendered}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <h1
            className="text-3xl md:text-5xl font-bold mb-6 text-foreground"
            dangerouslySetInnerHTML={{ __html: post.title.rendered }}
          />

          <div className="flex items-center gap-6 text-muted-foreground mb-12 pb-8 border-b">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span>{authorName}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>{new Date(post.date).toLocaleDateString()}</span>
            </div>
          </div>

          <div
            className="prose prose-lg max-w-none dark:prose-invert prose-headings:text-foreground prose-p:text-muted-foreground prose-a:text-primary hover:prose-a:text-primary/80"
            dangerouslySetInnerHTML={{ __html: post.content.rendered }}
          />
        </article>
      </main>
      <Footer />
    </div>
  );
};

export default SinglePost;
