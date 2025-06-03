import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
export interface Skip {
  id: number;
  size: number;
  hire_period_days: number;
  transport_cost: number | null;
  per_tonne_cost: number | null;
  price_before_vat: number;
  vat: number;
  postcode: string;
  area: string;
  forbidden: boolean;
  created_at: string;
  updated_at: string;
  allowed_on_road: boolean;
  allows_heavy_waste: boolean;
  name?: string;
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
