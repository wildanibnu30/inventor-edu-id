import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Autodesk Inventor Indonesia - Kurikulum Gratis untuk SMK",
  description: "Platform pembelajaran interaktif gratis untuk Autodesk Inventor. Kurikulum terstruktur dari dasar hingga spesialisasi, dirancang khusus untuk siswa SMK di Indonesia.",
  keywords: "Autodesk Inventor, Belajar Inventor, Kurikulum Inventor, SMK, LKS, Inventor Indonesia",
  openGraph: {
    title: "Autodesk Inventor Indonesia - Kurikulum Gratis untuk SMK",
    description: "Platform pembelajaran interaktif gratis untuk Autodesk Inventor",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className={inter.className}>
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}


