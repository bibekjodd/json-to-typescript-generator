import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const isArray = (data: unknown): boolean => {
  return data instanceof Array;
};

export const isObject = (data: unknown): boolean => {
  if (!isArray(data) && data instanceof Object) return true;
  return false;
};

export const capitalize = (data: string): string => {
  return data.slice(0, 1).toUpperCase() + data.slice(1);
};
