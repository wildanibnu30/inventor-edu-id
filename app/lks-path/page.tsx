import { Target, Award, Clock, BookOpen, TrendingUp, CheckCircle } from "lucide-react";
import Link from "next/link";

const lksModules = [
  {
    id: "lks-1",
    title: "Memahami Format LKS",
    description: "Pelajari struktur soal LKS, penilaian, dan strategi umum",
    duration: "1 jam",
    icon: <Target className="w-6 h-6" />,
  },
  {
    id: "lks-2",
    title: "Analisis Soal LKS",
    description: "Breakdown soal-soal LKS tahun sebelumnya dan pola yang muncul",
    duration: "2 jam",
    icon: <BookOpen className="w-6 h-6" />,
  },
  {
    id: "lks-3",
    title: "Time Management",
    description: "Teknik mengelola waktu selama kompetisi untuk hasil maksimal",
    duration: "1.5 jam",
    icon: <Clock className="w-6 h-6" />,
  },
  {
    id: "lks-4",
    title: "Workflow Efisien",
    description: "Best practices dan shortcut untuk mempercepat workflow",
    duration: "2 jam",
    icon: <TrendingUp className="w-6 h-6" />,
  },
  {
    id: "lks-5",
    title: "Best Practices",
    description: "Tips dan trik dari juara LKS untuk meningkatkan kualitas hasil",
    duration: "2 jam",
    icon: <Award className="w-6 h-6" />,
  },
];

const tips = [
  "Pelajari soal LKS 3-5 tahun terakhir untuk memahami pola",
  "Latih time management dengan timer saat berlatih",
  "Gunakan template yang sudah disiapkan untuk menghemat waktu",
  "Fokus pada akurasi dimensi dan constraint",
  "Pastikan drawing views lengkap dan rapi",
  "Simpan file secara berkala untuk menghindari kehilangan data",
];

export default function LKSPathPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-red-600 via-red-700 to-orange-700 text-white py-20 px-4">
        <div className="container mx-auto max-w-6xl text-center">
          <div className="flex justify-center mb-6">
            <Award className="w-16 h-16" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Jalur LKS Nasional</h1>
          <p className="text-xl md:text-2xl text-red-100 max-w-3xl mx-auto mb-8">
            Roadmap khusus untuk persiapan Lomba Kompetensi Siswa tingkat nasional
          </p>
          <p className="text-lg text-red-200 max-w-2xl mx-auto">
            Program intensif yang dirancang khusus untuk membantu siswa SMK meraih prestasi 
            di LKS Nasional dengan kurikulum yang terstruktur dan teruji.
          </p>
        </div>
      </section>

      {/* Modules Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Modul Pembelajaran LKS
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {lksModules.map((module) => (
              <div
                key={module.id}
                className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow p-6 border border-gray-200"
              >
                <div className="text-red-600 mb-4">{module.icon}</div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">{module.title}</h3>
                <p className="text-gray-600 mb-4">{module.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1 text-sm text-gray-500">
                    <Clock className="w-4 h-4" />
                    <span>{module.duration}</span>
                  </div>
                  <Link
                    href={`/courses/lks#${module.id}`}
                    className="text-red-600 hover:text-red-700 font-semibold text-sm"
                  >
                    Pelajari →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tips Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Tips dari Juara LKS
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {tips.map((tip, index) => (
              <div
                key={index}
                className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg border border-gray-200"
              >
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <p className="text-gray-700">{tip}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-red-600 to-red-700 text-white">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-4">Siap Menjadi Juara LKS?</h2>
          <p className="text-xl text-red-100 mb-8">
            Mulai perjalananmu sekarang dengan kurikulum yang sudah terbukti
          </p>
          <Link
            href="/courses/lks"
            className="inline-block bg-white text-red-700 px-8 py-3 rounded-lg font-semibold hover:bg-red-50 transition-colors shadow-lg"
          >
            Mulai Program LKS
          </Link>
        </div>
      </section>
    </div>
  );
}


