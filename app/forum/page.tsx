import Link from "next/link";
import { MessageCircle, Plus, Clock, User } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { formatDistanceToNow } from "date-fns";
import { id } from "date-fns/locale";

export default async function ForumPage() {
  const supabase = await createClient();
  
  // In a real app, this would fetch from database
  // For now, we'll use placeholder data
  const posts = [
    {
      id: "1",
      title: "Cara membuat constraint yang benar di assembly?",
      author: "Ahmad Rizki",
      category: "Assembly",
      replies: 5,
      views: 42,
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      tags: ["assembly", "constraint", "help"],
    },
    {
      id: "2",
      title: "Tips untuk LKS Nasional 2024",
      author: "Siti Nurhaliza",
      category: "LKS",
      replies: 12,
      views: 128,
      createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
      tags: ["lks", "tips", "competition"],
    },
    {
      id: "3",
      title: "Error saat membuat drawing view",
      author: "Budi Santoso",
      category: "Drawing",
      replies: 3,
      views: 28,
      createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
      tags: ["drawing", "error", "help"],
    },
    {
      id: "4",
      title: "Workflow terbaik untuk project besar",
      author: "Dewi Lestari",
      category: "Best Practices",
      replies: 8,
      views: 67,
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
      tags: ["workflow", "tips"],
    },
  ];

  const categories = ["Semua", "LKS", "Assembly", "Part", "Drawing", "Best Practices", "Help"];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Forum Diskusi</h1>
            <p className="text-xl text-gray-600">
              Tanya jawab tentang Autodesk Inventor, LKS, dan masalah teknis
            </p>
          </div>
          <Link
            href="/forum/new"
            className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold mt-4 md:mt-0"
          >
            <Plus className="w-5 h-5" />
            <span>Buat Post Baru</span>
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-blue-50 hover:border-blue-500 transition-colors text-sm font-medium"
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          {posts.map((post) => (
            <Link
              key={post.id}
              href={`/forum/${post.id}`}
              className="block bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 border border-gray-200"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-xl font-semibold text-gray-800">{post.title}</h3>
                    <span className="px-2 py-1 text-xs font-semibold rounded bg-blue-100 text-blue-700">
                      {post.category}
                    </span>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                    <div className="flex items-center space-x-1">
                      <User className="w-4 h-4" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>
                        {formatDistanceToNow(post.createdAt, { addSuffix: true, locale: id })}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col items-end space-y-2 ml-4">
                  <div className="flex items-center space-x-1 text-gray-600">
                    <MessageCircle className="w-4 h-4" />
                    <span className="text-sm font-semibold">{post.replies}</span>
                  </div>
                  <div className="text-sm text-gray-500">{post.views} views</div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}


