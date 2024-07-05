import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import HTMLToJSX from "htmltojsx";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const convertHTMLToJSX = (html: string) => {
  const converter = new HTMLToJSX({ createClass: false });
  return converter.convert(html);
};
