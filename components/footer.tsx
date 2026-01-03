import Link from "next/link";
import { BookOpen, Github, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <BookOpen className="w-6 h-6 text-blue-400" />
              <span className="font-bold text-white text-lg">Inventor ID</span>
            </div>
            <p className="text-sm">
              Platform pembelajaran interaktif gratis untuk Autodesk Inventor.
              Dibuat untuk mendukung pendidikan teknik di Indonesia.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Navigasi</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/courses" className="hover:text-blue-400 transition-colors">
                  Kursus
                </Link>
              </li>
              <li>
                <Link href="/exercises" className="hover:text-blue-400 transition-colors">
                  File Latihan
                </Link>
              </li>
              <li>
                <Link href="/forum" className="hover:text-blue-400 transition-colors">
                  Forum
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Kontak</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <span>info@inventorid.com</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Tentang</h3>
            <p className="text-sm mb-4">
              Platform ini 100% gratis dan akan tetap gratis selamanya.
              Dibangun dengan Next.js, Supabase, dan Vercel.
            </p>
            <p className="text-xs text-gray-500">
              © 2024 Autodesk Inventor Indonesia. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}



