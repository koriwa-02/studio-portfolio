import type { Metadata } from "next";
import LoadingScreen from "@/components/LoadingScreen";
import "./globals.css";

export const metadata: Metadata = {
  title: "KORIWA STUDIO — Bold Creative Agency",
  description:
    "KORIWA STUDIO is a multi-discipline creative agency working across branding, web, content and film.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <head>
        <link rel="preload" href="/brand/koriwa-studio.png" as="image" />
      </head>
      <body className="font-body min-h-full flex flex-col bg-paper text-ink">
        <LoadingScreen />
        {children}
      </body>
    </html>
  );
}
