"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@toolvault/ui";

export default function FilesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Files</h1>
        <p className="text-gray-500">Your cloud storage</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Cloud Files</CardTitle>
          <CardDescription>Files stored in your cloud storage</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-gray-500">
            <p>No files yet. Use a tool to get started!</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
