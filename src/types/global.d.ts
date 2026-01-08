interface InstepWpBridge {
  restBase: string;
  version?: string;
  nonce?: string;
  endpoints: {
    content: string;
    posts: string;
    team: string;
  };
}

declare global {
  interface Window {
    instepCommunityConnect?: InstepWpBridge;
  }
}

export {};
