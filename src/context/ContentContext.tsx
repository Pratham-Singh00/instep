import { createContext, useContext, useEffect, useMemo, useState } from "react";

import { getDefaultContent } from "@/lib/content-defaults";
import { mergeContent } from "@/lib/merge-content";
import type { SiteContent } from "@/types/content";

interface ContentContextValue {
  content: SiteContent;
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
  hasWordPressSource: boolean;
}

const defaultContent = getDefaultContent();

const defaultValue: ContentContextValue = {
  content: defaultContent,
  loading: false,
  error: null,
  refresh: async () => {
    /* noop */
  },
  hasWordPressSource: false,
};

const ContentContext = createContext<ContentContextValue>(defaultValue);

const resolveContentEndpoint = (): string | null => {
  const bridge = typeof window !== "undefined" ? window.instepCommunityConnect : undefined;
  return bridge?.endpoints?.content ?? null;
};

export const ContentProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [content, setContent] = useState<SiteContent>(defaultContent);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasWordPressSource, setHasWordPressSource] = useState(false);

  const contentEndpoint = useMemo(() => resolveContentEndpoint(), []);

  const fetchContent = async () => {
    // DISCONNECT MODE:
    // We are temporarily disabling the API fetch to force the application to use
    // the local content-defaults.json. This prevents server-side caching or
    // stale database entries from overwriting our critical content updates.
    //
    // If dynamic content (like Team Members from WP Admin) is needed in the future,
    // we should re-enable this BUT with a strategy to prioritize local text updates.
    setHasWordPressSource(false);
    return;

    /*
    if (!contentEndpoint) {
      setHasWordPressSource(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const response = await fetch(contentEndpoint, {
        credentials: "include",
        headers: {
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch content (${response.status})`);
      }

      const data = (await response.json()) as Partial<SiteContent>;
      setContent(mergeContent(getDefaultContent(), data));
      setHasWordPressSource(true);
    } catch (err) {
      console.error("Failed to load WordPress content", err);
      setError(err instanceof Error ? err.message : "Unknown error");
      setHasWordPressSource(false);
    } finally {
      setLoading(false);
    }
    */
  };

  useEffect(() => {
    void fetchContent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contentEndpoint]);

  const value = useMemo<ContentContextValue>(
    () => ({
      content,
      loading,
      error,
      refresh: fetchContent,
      hasWordPressSource,
    }),
    [content, loading, error, hasWordPressSource],
  );

  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>;
};

export const useContent = () => {
  const ctx = useContext(ContentContext);
  if (!ctx) {
    throw new Error("useContent must be used within a ContentProvider");
  }
  return ctx;
};
