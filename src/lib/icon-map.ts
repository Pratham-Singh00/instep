import {
  AlertTriangle,
  ArrowRight,
  Award,
  BookOpen,
  Brain,
  Briefcase,
  Building,
  Calendar,
  CheckCircle,
  Clock,
  Filter,
  GraduationCap,
  Heart,
  Home,
  Mail,
  MapPin,
  Menu,
  MessageSquare,
  Phone,
  Quote,
  Search,
  Shield,
  Star,
  Target,
  User,
  Users,
  X,
  Eye,
  Puzzle,
  HeartHandshake,
  Smile
} from "lucide-react";

import type { LucideIcon } from "lucide-react";

export const iconMap = {
  AlertTriangle,
  ArrowRight,
  Award,
  BookOpen,
  Brain,
  Briefcase,
  Building,
  Calendar,
  CheckCircle,
  Clock,
  Eye,
  Filter,
  GraduationCap,
  Heart,
  Home,
  Mail,
  MapPin,
  Menu,
  MessageSquare,
  Phone,
  Quote,
  Search,
  Shield,
  Star,
  Target,
  User,
  Users,
  X,
  Puzzle,
  HeartHandshake,
  Smile,
} satisfies Record<string, LucideIcon>;

export type IconName = keyof typeof iconMap;

export const getIconByName = (name?: string): LucideIcon | null => {
  if (!name) {
    return null;
  }
  return iconMap[name as IconName] ?? null;
};
