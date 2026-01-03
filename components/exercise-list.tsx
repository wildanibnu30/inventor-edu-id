"use client";

import { useState, useEffect } from "react";
import { FileDown, ExternalLink, Youtube, Download } from "lucide-react";

const exercises = [
  {
    id: "1",
    name: "Engine Piston",
    level: "Dasar",
    category: "Part",
    fileType: ".ipt",
    fileSize: "2.5 MB",
    downloadLink: "https://drive.google.com/file/d/example/view",
    videoLink: "https://youtube.com/watch?v=example",
    description: "Latihan membuat piston engine dengan teknik extrude dan revolve dasar.",
  },
  {
    id: "2",
    name: "Bracket Assembly",
    level: "Menengah",
    category: "Assembly",
    fileType: ".iam",
    fileSize: "5.2 MB",
    downloadLink: "https://drive.google.com/file/d/example/view",
    videoLink: "https://youtube.com/watch?v=example",
    description: "Assembly bracket dengan multiple components dan constraints.",
  },
  {
    id: "3",
    name: "Sheet Metal Box",
    level: "Menengah",
    category: "Part",
    fileType: ".ipt",
    fileSize: "1.8 MB",
    downloadLink: "https://drive.google.com/file/d/example/view",
    videoLink: "https://youtube.com/watch?v=example",
    description: "Desain box dengan sheet metal tools dan unfold.",
  },
  {
    id: "4",
    name: "LKS Pattern 2023",
    level: "LKS",
    category: "Assembly",
    fileType: ".zip",
    fileSize: "15 MB",
    downloadLink: "https://drive.google.com/file/d/example/view",
    videoLink: "https://youtube.com/watch?v=example",
    description: "Soal latihan LKS Nasional 2023 dengan solusi lengkap.",
  },
  {
    id: "5",
    name: "Technical Drawing - Bracket",
    level: "Dasar",
    category: "Drawing",
    fileType: ".idw",
    fileSize: "1.2 MB",
    downloadLink: "https://drive.google.com/file/d/example/view",
    videoLink: "https://youtube.com/watch?v=example",
    description: "Drawing teknik dengan views, dimensions, dan annotations.",
  },
  {
    id: "6",
    name: "Complex Assembly - Gearbox",
    level: "Lanjutan",
    category: "Assembly",
    fileType: ".iam",
    fileSize: "25 MB",
    downloadLink: "https://drive.google.com/file/d/example/view",
    videoLink: "https://youtube.com/watch?v=example",
    description: "Assembly gearbox dengan banyak komponen dan motion simulation.",
  },
];

export function ExerciseList({
  searchTerm = "",
  selectedCategory = "Semua",
}: {
  searchTerm?: string;
  selectedCategory?: string;
}) {
  const filteredExercises = exercises.filter((exercise) => {
    const matchesSearch = exercise.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      exercise.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "Semua" || exercise.category === selectedCategory || exercise.level === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-4">
      {filteredExercises.map((exercise) => (
        <div
          key={exercise.id}
          className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 border border-gray-200"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-2">
                <h3 className="text-xl font-semibold text-gray-800">{exercise.name}</h3>
                <span className="px-2 py-1 text-xs font-semibold rounded bg-blue-100 text-blue-700">
                  {exercise.level}
                </span>
                <span className="px-2 py-1 text-xs font-semibold rounded bg-gray-100 text-gray-700">
                  {exercise.category}
                </span>
              </div>
              <p className="text-gray-600 mb-3">{exercise.description}</p>
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <span className="flex items-center space-x-1">
                  <FileDown className="w-4 h-4" />
                  <span>{exercise.fileType}</span>
                </span>
                <span>{exercise.fileSize}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2">
              <a
                href={exercise.downloadLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>Download</span>
              </a>
              <a
                href={exercise.videoLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                <Youtube className="w-4 h-4" />
                <span>Video</span>
              </a>
            </div>
          </div>
        </div>
      ))}

      {filteredExercises.length === 0 && (
        <div className="text-center py-12 bg-white rounded-lg shadow-md">
          <p className="text-gray-600">Tidak ada file latihan yang ditemukan.</p>
        </div>
      )}
    </div>
  );
}

