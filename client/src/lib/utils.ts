import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { API_FILEMANAGER } from "@/const"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const routeFormat = (route: string) => route.replaceAll('/', '>')

export const pathApiFormat = (route: string, api: 'mkdir' | 'rmdir' | 'dir' | 'upload') => `${API_FILEMANAGER}/${api}/${routeFormat(route)}`