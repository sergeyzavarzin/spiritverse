import * as process from "process";

export function getBaseUrl(): string {
  if (typeof window !== "undefined")
    // browser should use relative path
    return "";
  if (process.env.NEXT_PUBLIC_VERCEL_URL || process.env.VERCEL_URL)
    // reference for vercel.com
    return `https://${
      process.env.NEXT_PUBLIC_VERCEL_URL ?? process.env.VERCEL_URL ?? ""
    }`;
  // assume localhost
  return `http://localhost:${process.env.PORT ?? 3000}`;
}
