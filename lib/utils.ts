import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function truncateAddress(address: string, length = 4): string {
  if (!address) return ""
  return `${address.slice(0, length)}...${address.slice(-length)}`
}

