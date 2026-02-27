import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Get the correct asset URL for WordPress installations
 */
export function getAssetUrl(filename: string): string {
  if (typeof window !== 'undefined' && (window as any).INSTEP_THEME_URI) {
    return (window as any).INSTEP_THEME_URI + '/assets/' + filename;
  }
  return '/assets/' + filename;
}
