import { useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { SmartLink } from "@/components/SmartLink";
import {
  Calendar,
  User,
  ArrowRight,
  Search,
  Clock,
  BookOpen,
  Filter,
  Eye
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useContent } from "@/context/ContentContext";
import { SEO } from "@/components/SEO";

export interface BlogPost {
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
  views?: number;
}

export const toPlainText = (value: string) =>
  value
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const Blog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const {
    content: { blogPage },
    hasWordPressSource,
  } = useContent();

  // Sample blog posts - replace with WordPress API calls
  const wpBridge = typeof window !== "undefined" ? window.instepCommunityConnect : undefined;

  const samplePosts: BlogPost[] = [
    {
      id: 1,
      title: "Understanding DBT: A Guide to Dialectical Behavior Therapy",
      excerpt: "Learn about DBT skills and how they can help manage emotions, improve relationships, and build a life worth living.",
      content: "",
      author: "Dr. Sarah Johnson",
      date: "2024-03-15",
      categories: ["Therapy", "DBT"],
      tags: ["mental health", "coping skills", "therapy"],
      featured_image: "/api/placeholder/400/250",
      slug: "understanding-dbt-guide",
      views: 324
    },
    {
      id: 4,
      title: "Building Healthy Parenting Skills",
      excerpt: "Evidence-based strategies for effective parenting and creating positive family dynamics.",
      content: "",
      author: "Dr. Lisa Chen",
      date: "2024-02-28",
      categories: ["Parenting", "Family"],
      tags: ["parenting", "family therapy", "children"],
      featured_image: "/api/placeholder/400/250",
      slug: "building-healthy-parenting-skills",
      views: 412
    }
  ];

  useEffect(() => {
    // Simulate API call - replace with actual WordPress API integration
    const fetchPosts = async () => {
      setLoading(true);
      setError(null);
      if (!wpBridge?.endpoints?.posts) {
        setPosts(samplePosts);
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`${wpBridge.endpoints.posts}?_embed&per_page=20`);
        if (!response.ok) {
          throw new Error(`Failed to load posts (${response.status})`);
        }

        const data = await response.json();
        const mappedPosts: BlogPost[] = data.map((post: any) => {
          const embedded = post._embedded || {};
          const customAuthor = post.custom_author_name;
          let author = customAuthor || embedded.author?.[0]?.name || "In Step PC Team";
          if (author === "In Step") author = "In Step PC Team";
          const categories = (embedded["wp:term"]?.[0] || [])
            .map((term: any) => term.name)
            .filter(Boolean);
          const tags = (embedded["wp:term"]?.[1] || [])
            .map((term: any) => term.name)
            .filter(Boolean);
          const featured = embedded["wp:featuredmedia"]?.[0]?.source_url ?? "/api/placeholder/400/250";
          const contentHtml = post.content?.rendered ?? "";
          const contentText = toPlainText(contentHtml);
          const words = contentText.split(/\s+/).filter(Boolean).length;
          const readingTimeMinutes = Math.max(1, Math.round(words / 200));

          return {
            id: post.id,
            title: post.title?.rendered ?? "Untitled",
            excerpt: toPlainText(post.excerpt?.rendered ?? contentHtml ?? ""),
            content: contentHtml,
            author,
            date: post.date,
            categories,
            tags,
            featured_image: featured,
            slug: post.slug,
            link: post.link,
            readingTime: `${readingTimeMinutes} min read`,
          } satisfies BlogPost;
        });

        setPosts(mappedPosts.length ? mappedPosts : samplePosts);
      } catch (err) {
        console.error("Unable to load WordPress posts", err);
        setPosts(samplePosts);
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [hasWordPressSource, wpBridge?.endpoints?.posts]);

  const derivedCategories = useMemo(() => {
    const allCategories = new Set<string>();
    posts.forEach((post) => {
      post.categories.forEach((category) => {
        if (category) {
          allCategories.add(category);
        }
      });
    });
    return ["all", ...Array.from(allCategories).sort()];
  }, [posts]);

  const filteredPosts = posts.filter((post) => {
    const plainExcerpt = post.excerpt.replace(/<[^>]+>/g, "");
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      plainExcerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || post.categories.includes(selectedCategory);

    return matchesSearch && matchesCategory;
  });

  useEffect(() => {
    if (!derivedCategories.includes(selectedCategory)) {
      setSelectedCategory("all");
    }
  }, [derivedCategories, selectedCategory]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen">
      <SEO
        title="Resources & Blog | InStep PC"
        description="Articles, resources, and insights on mental health, parenting, and community support from In Step's clinical team."
        url="/blog"
      />
      <Header />
      <main className="pt-32">
        {/* Hero Section */}
        <section className="section-padding bg-gradient-to-br from-primary/5 to-accent/5">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gradient">
                {blogPage.heading}
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                {blogPage.description}
              </p>
            </div>

            {/* Search and Filter */}
            <div className="max-w-4xl mx-auto mb-12">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search articles..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4 text-muted-foreground" />
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="px-3 py-2 border border-input bg-background rounded-md text-sm"
                  >
                    {derivedCategories.map(category => (
                      <option key={category} value={category}>
                        {category === "all" ? "All Categories" : category}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              {error ? (
                <div className="text-center mt-4 p-4 bg-destructive/10 rounded-lg border border-destructive/20">
                  <p className="text-sm text-destructive font-semibold">Unable to load posts from WordPress</p>
                  <p className="text-xs text-muted-foreground mt-1 font-mono">{error}</p>
                </div>
              ) : null}
            </div>
          </div>
        </section>

        {/* Blog Posts */}
        <section className="section-padding">
          <div className="container mx-auto px-4">
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[1, 2, 3].map(i => (
                  <Card key={i} className="card-elevated animate-pulse">
                    <CardContent className="p-6">
                      <div className="h-48 bg-muted rounded-t-lg mb-4"></div>
                      <div className="h-4 bg-muted rounded mb-2"></div>
                      <div className="h-4 bg-muted rounded w-3/4 mb-4"></div>
                      <div className="h-3 bg-muted rounded mb-2"></div>
                      <div className="h-3 bg-muted rounded w-2/3"></div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : filteredPosts.length === 0 ? (
              <div className="text-center py-16">
                <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No articles found</h3>
                <p className="text-muted-foreground">
                  {searchTerm || selectedCategory !== "all"
                    ? "Try adjusting your search or filter criteria."
                    : blogPage.emptyState
                  }
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPosts.map(post => (
                  <Card key={post.id} className="card-elevated hover:scale-105 transition-all duration-300 overflow-hidden">
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={post.featured_image}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                      />
                      <div className="absolute top-4 left-4">
                        <Badge variant="secondary" className="bg-background/90">
                          {post.categories[0] ?? "General"}
                        </Badge>
                      </div>
                    </div>

                    <CardContent className="p-6">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                        <User className="h-3 w-3" />
                        <span>{post.author}</span>
                        <span>•</span>
                        <Calendar className="h-3 w-3" />
                        <span>{formatDate(post.date)}</span>
                      </div>

                      <h3 className="text-xl font-bold mb-3 text-foreground line-clamp-2">
                        {post.title}
                      </h3>

                      <p className="text-muted-foreground mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          <span>{post.readingTime ?? "5 min read"}</span>
                          <span>•</span>
                          <Eye className="h-3 w-3" />
                          <span>{post.views ?? "—"} views</span>
                        </div>

                        <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80" asChild>
                          <SmartLink href={`/blog/${post.slug}`}>
                            Read More
                            <ArrowRight className="ml-1 h-3 w-3" />
                          </SmartLink>
                        </Button>
                      </div>

                      <div className="flex flex-wrap gap-1 mt-4">
                        {post.tags.slice(0, 3).map(tag => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}


          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Blog;
