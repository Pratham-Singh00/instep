import rawContent from "../../content-defaults.json" assert { type: "json" };
import heroImage from "@/assets/hero-image.jpg";
import individualImage from "@/assets/individual-therapy.jpg";
import groupImage from "@/assets/group-therapy.jpg";
import familyImage from "@/assets/family-therapy.jpg";

import type { SiteContent } from "@/types/content";

const serviceImageFallbacks = [
  individualImage,
  groupImage,
  familyImage,
  individualImage,
];

export const getDefaultContent = (): SiteContent => {
  const base: SiteContent = JSON.parse(JSON.stringify(rawContent));

  return {
    ...base,
    hero: {
      ...base.hero,
      backgroundImage: base.hero.backgroundImage || heroImage,
    },
    services: {
      ...base.services,
      items: base.services.items.map((item, index) => ({
        ...item,
        image: item.image || serviceImageFallbacks[index] || individualImage,
      })),
    },
  };
};
