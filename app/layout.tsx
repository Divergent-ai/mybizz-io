import type { Metadata } from "next";
import "@fontsource-variable/manrope";
import "@fontsource-variable/space-grotesk";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://mybizz.io";
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default:"mybizz.io — Digital systems built for ambitious businesses", template:"%s | mybizz.io" },
  description:"Premium websites, AI automation and compliance-first digital transformation delivered by global engineering teams.",
  openGraph:{ title:"mybizz.io", description:"Giving businesses the power to do more.", url:siteUrl, siteName:"mybizz.io", type:"website" },
  twitter:{ card:"summary_large_image", title:"mybizz.io", description:"Web, AI and compliance—built as one." },
  robots:{ index:true, follow:true },
  alternates:{ canonical:siteUrl }
};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en" ><body><Header/><main>{children}</main><Footer/></body></html>}
