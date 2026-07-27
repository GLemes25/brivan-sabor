import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateSlug(text: string) {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const SKU_PREFIX = "BRV-";
const SKU_MAX_WORDS = 4;

export function generateSKU(name: string) {
  const normalized = name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toUpperCase()
    .replace(/[^A-Z0-9\s]/g, "")
    .trim();

  if (!normalized) {
    return "";
  }

  const initials = normalized
    .split(/\s+/)
    .slice(0, SKU_MAX_WORDS)
    .map((word) => word[0])
    .join("");

  return `${SKU_PREFIX}${initials}`;
}
