"use client";

import { useState } from "react";
import Link from "next/link";
import { Button, Card, CardContent, Label, Textarea } from "@toolvault/ui";
import { ArrowLeft, BookOpen } from "lucide-react";

function simpleMarkdown(md: string): string {
  return md
    .replace(/^### (.+)$/gm, "<h3>$1</h3>")
    .replace(/^## (.+)$/gm, "<h2>$1</h2>")
    .replace(/^# (.+)$/gm, "<h1>$1</h1>")
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(/`(.+?)`/g, '<code class="bg-gray-100 px-1 rounded">$1</code>')
    .replace(/^- (.+)$/gm, "<li>$1</li>")
    .replace(/(<li>.*<\/li>)/s, "<ul>$1</ul>")
    .replace(/^\d+\. (.+)$/gm, "<li>$1</li>")
    .replace(/\n{2,}/g, "</p><p>")
    .replace(/\n/g, "<br/>")
    .replace(/^(.+)$/gm, (m) => {
      if (m.startsWith("<")) return m;
      return m;
    });
}

const DEFAULT_MD = `# Hello World

This is a **bold** and *italic* text example.

## Features

- Item one
- Item two
- Item three

### Code

Inline \`code\` looks like this.

### Numbered List

1. First step
2. Second step
3. Third step
`;

export default function MarkdownPreviewPage() {
  const [markdown, setMarkdown] = useState(DEFAULT_MD);
  const [preview, setPreview] = useState(simpleMarkdown(DEFAULT_MD));

  const handleChange = (val: string) => {
    setMarkdown(val);
    setPreview(simpleMarkdown(val));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="border-b bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <Link href="/" className="text-xl font-bold text-blue-600">ToolVault Pro</Link>
            <div className="flex items-center gap-4"><Link href="/login" className="text-sm text-gray-700 hover:text-gray-900">Sign in</Link></div>
          </div>
        </div>
      </nav>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Link href="/tools/dev" className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to Dev Tools
        </Link>
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <BookOpen className="h-8 w-8 text-pink-600" />
            <h1 className="text-3xl font-bold text-gray-900">Markdown Preview Editor</h1>
          </div>
          <p className="text-gray-600">Write Markdown on the left, see the rendered preview on the right.</p>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <Card>
            <CardContent className="p-6">
              <Label>Markdown Input</Label>
              <Textarea
                value={markdown}
                onChange={(e) => handleChange(e.target.value)}
                className="h-[500px] font-mono text-sm mt-2"
                placeholder="Write your markdown here..."
              />
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <Label>Preview</Label>
              <div
                className="h-[500px] overflow-auto prose prose-sm max-w-none mt-2 p-4 bg-white border rounded-lg"
                dangerouslySetInnerHTML={{ __html: preview }}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
