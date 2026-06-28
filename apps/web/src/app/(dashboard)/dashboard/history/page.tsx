"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@toolvault/ui";

export default function HistoryPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">History</h1>
        <p className="text-gray-500">Your past operations</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Operations</CardTitle>
          <CardDescription>All your tool operations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-gray-500">
            <p>No operations yet. Start using tools!</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
