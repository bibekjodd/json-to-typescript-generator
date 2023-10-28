import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const isArray = (data: unknown): boolean => {
  return data instanceof Array;
};

export const isObject = (data: unknown): boolean => {
  if (!isArray(data) && data !== null && data instanceof Object) return true;
  return false;
};

export const capitalize = (data: string): string => {
  return data.slice(0, 1).toUpperCase() + data.slice(1);
};

export const getKeysFromObjectArray = (array: Object[]): string[] => {
  const keys = new Set<string>();
  for (const item of array) {
    for (const key in item) {
      keys.add(key);
    }
  }
  return [...keys];
};
