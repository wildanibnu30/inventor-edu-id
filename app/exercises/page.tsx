"use client";

import { useState } from "react";
import { FileDown, Search, Filter, ExternalLink, Youtube } from "lucide-react";
import { ExerciseList } from "@/components/exercise-list";

const categories = ["Semua", "Dasar", "Menengah", "Lanjutan", "LKS", "Assembly", "Part", "Drawing"];

export default function ExercisesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Semua");

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Repository File Latihan</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Download file latihan (.ipt, .iam, .idw) dan akses video tutorial untuk setiap project.
            Semua file tersedia gratis untuk pembelajaran.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Cari file latihan..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-gray-400" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <ExerciseList searchTerm={searchTerm} selectedCategory={selectedCategory} />
      </div>
    </div>
  );
}

