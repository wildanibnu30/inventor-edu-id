import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export function LessonContent({ title, content }: { title: string; content: string }) {
  return (
    <div className="prose prose-lg max-w-none">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">{title}</h1>
      <ReactMarkdown remarkPlugins={[remarkGfm]} className="markdown-content">
        {content}
      </ReactMarkdown>
    </div>
  );
}



