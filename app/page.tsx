import Link from "next/link";
import { BookOpen, Award, FileText, MessageCircle, TrendingUp, Users, Target, Zap } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-gray-800 text-white py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center space-y-6">
            <h1 className="text-5xl md:text-6xl font-bold leading-tight">
              Autodesk Inventor Indonesia
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
              Platform Pembelajaran Interaktif Gratis untuk SMK
            </p>
            <p className="text-lg text-blue-200 max-w-2xl mx-auto">
              Kurikulum terstruktur pertama di Indonesia yang 100% gratis. 
              Dari dasar hingga spesialisasi, siapkan dirimu menjadi juara LKS Nasional.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
              <Link
                href="/courses"
                className="bg-white text-blue-700 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors shadow-lg"
              >
                Mulai Belajar
              </Link>
              <Link
                href="/lks-path"
                className="bg-blue-800 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-900 transition-colors border-2 border-blue-600"
              >
                Jalur LKS Nasional
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Mengapa Pilih Platform Ini?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <FeatureCard
              icon={<BookOpen className="w-8 h-8" />}
              title="Kurikulum Terstruktur"
              description="Dari dasar hingga spesialisasi, dengan roadmap yang jelas untuk setiap level"
            />
            <FeatureCard
              icon={<Award className="w-8 h-8" />}
              title="Jalur LKS Nasional"
              description="Roadmap khusus untuk persiapan Lomba Kompetensi Siswa tingkat nasional"
            />
            <FeatureCard
              icon={<FileText className="w-8 h-8" />}
              title="File Latihan Lengkap"
              description="Repository file .ipt, .iam, .idw dengan kategori dan pencarian"
            />
            <FeatureCard
              icon={<MessageCircle className="w-8 h-8" />}
              title="Forum Diskusi"
              description="Tanya jawab dengan komunitas dan mentor untuk LKS dan masalah teknis"
            />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <StatCard icon={<Users className="w-6 h-6 mx-auto mb-2" />} number="100%" label="Gratis Selamanya" />
            <StatCard icon={<BookOpen className="w-6 h-6 mx-auto mb-2" />} number="50+" label="Modul Pembelajaran" />
            <StatCard icon={<Target className="w-6 h-6 mx-auto mb-2" />} number="LKS" label="Jalur Khusus" />
            <StatCard icon={<Zap className="w-6 h-6 mx-auto mb-2" />} number="24/7" label="Akses Online" />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-4">Siap Memulai Perjalanan Belajarmu?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Bergabung dengan ratusan siswa SMK yang sudah memulai perjalanan mereka
          </p>
          <Link
            href="/courses"
            className="inline-block bg-white text-blue-700 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors shadow-lg"
          >
            Daftar Sekarang - Gratis!
          </Link>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200">
      <div className="text-blue-600 mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2 text-gray-800">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

function StatCard({ icon, number, label }: { icon: React.ReactNode; number: string; label: string }) {
  return (
    <div>
      <div className="text-blue-600 mb-2">{icon}</div>
      <div className="text-4xl font-bold text-blue-600 mb-2">{number}</div>
      <div className="text-gray-600 font-medium">{label}</div>
    </div>
  );
}


