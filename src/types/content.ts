import type { IconName } from "@/lib/icon-map";

export type LinkTarget = "anchor" | "route" | "external";

export interface NavMenuItem {
  label: string;
  href: string;
  type?: LinkTarget;
}

export interface ButtonLink {
  label: string;
  url: string;
}

export interface NavigationContent {
  phone: string;
  logoText: string;
  logoAccent?: string;
  clientPortal: ButtonLink;
  primaryCta: ButtonLink;
  menu: NavMenuItem[];
}

export interface HeroStat {
  icon: IconName;
  value: string;
  label: string;
}

export interface HeroContent {
  bannerText: string;
  tagline: string;
  titleBefore: string;
  titleHighlight: string;
  titleAfter: string;
  description: string;
  backgroundImage?: string | null;
  primaryCta: ButtonLink;
  secondaryCta: ButtonLink;
  stats: HeroStat[];
}

export interface AboutAchievement {
  icon: IconName;
  value: string;
  label: string;
}

export interface AboutValue {
  icon: IconName;
  title: string;
  description: string;
}

export interface SectionCta {
  heading: string;
  description: string;
  primaryCta: ButtonLink;
  secondaryCta?: ButtonLink;
}

export interface AboutContent {
  heading: string;
  description: string;
  storyHeading: string;
  storyParagraphs: string[];
  certificationsHeading: string;
  certifications: string[];
  impactHeading: string;
  achievements: AboutAchievement[];
  valuesHeading: string;
  values: AboutValue[];
  cta: SectionCta;
}

export interface ServiceItem {
  icon: IconName;
  title: string;
  description: string;
  image?: string | null;
  alt?: string;
  cta?: ButtonLink;
}

export interface ServicesContent {
  heading: string;
  description: string;
  items: ServiceItem[];
  cta: SectionCta;
}

export type BadgeVariant = "default" | "secondary" | "outline" | "destructive" | "success" | "warning";

export interface ProgramItem {
  icon: IconName;
  title: string;
  description: string;
  duration: string;
  location: string;
  features: string[];
  badge?: string;
  badgeVariant?: BadgeVariant;
  cta?: ButtonLink;
}

export interface ProgramsContent {
  heading: string;
  description: string;
  items: ProgramItem[];
  crisisBanner: {
    heading: string;
    description: string;
    primaryCta: ButtonLink;
    secondaryCta?: ButtonLink;
  };
}

export interface TestimonialItem {
  name: string;
  role: string;
  content: string;
  rating: number;
  location?: string;
}

export interface TestimonialsContent {
  heading: string;
  description: string;
  items: TestimonialItem[];
  cta: SectionCta;
}

export interface BusinessServiceItem {
  icon: IconName;
  title: string;
  description: string;
  features: string[];
  cta?: ButtonLink;
}

export interface PartnershipItem {
  title: string;
  description: string;
}

export interface GetInvolvedContent {
  heading: string;
  description: string;
  businessServicesHeading: string;
  businessServicesDescription: string;
  businessServices: BusinessServiceItem[];
  partnershipsHeading: string;
  partnershipsDescription: string;
  partnerships: PartnershipItem[];
  cta: SectionCta;
}

export interface ContactMethodItem {
  icon: IconName;
  title: string;
  primary: string;
  secondary?: string;
  action?: string | null;
}

export interface UrgencyLevel {
  value: string;
  label: string;
  color?: BadgeVariant;
}

export interface ContactContent {
  heading: string;
  description: string;
  introHeading: string;
  introDescription: string;
  contactMethods: ContactMethodItem[];
  services: string[];
  urgencyLevels: UrgencyLevel[];
  crisis: {
    heading: string;
    description: string;
    primaryCta: ButtonLink;
    secondaryCta?: ButtonLink;
  };
  privacyNote: string;
  formSuccess: {
    title: string;
    description: string;
  };
  formValidation: {
    missingTitle: string;
    missingDescription: string;
    crisisTitle: string;
    crisisDescription: string;
  };
}

export interface FooterLinkItem {
  label: string;
  href: string;
}

export interface FooterContent {
  emergencyBanner: {
    heading: string;
    resources: Array<{
      label: string;
      number: string;
      description?: string;
    }>;
  };
  about: {
    heading: string;
    accent?: string;
    description: string;
    phone: string;
    email: string;
    location: string;
  };
  newsletter: {
    heading: string;
    description: string;
    placeholder: string;
    cta: ButtonLink;
  };
  links: {
    services: FooterLinkItem[];
    programs: FooterLinkItem[];
    company: FooterLinkItem[];
  };
  bottomBar: {
    legal?: string;
    developer?: FooterLinkItem;
    links: FooterLinkItem[];
  };
}

export interface TeamMemberContent {
  name: string;
  title: string;
  credentials: string[];
  bio: string;
  image?: string | null;
  specialties: string[];
  languages: string[];
  email?: string;
  phone?: string;
  experienceYears?: number;
  education: string[];
  location?: string;
}

export interface TeamContent {
  heading: string;
  description: string;
  members: TeamMemberContent[];
}

export interface BlogPageContent {
  heading: string;
  description: string;
  emptyState: string;
}

export interface SiteContent {
  navigation: NavigationContent;
  hero: HeroContent;
  about: AboutContent;
  services: ServicesContent;
  programs: ProgramsContent;
  testimonials: TestimonialsContent;
  getInvolved: GetInvolvedContent;
  contact: ContactContent;
  footer: FooterContent;
  team: TeamContent;
  blogPage: BlogPageContent;
}
