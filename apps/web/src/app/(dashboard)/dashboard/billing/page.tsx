"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent, Button, Badge } from "@toolvault/ui";

export default function BillingPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Billing</h1>
        <p className="text-gray-500">Manage your subscription</p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Current Plan</CardTitle>
              <CardDescription>Your subscription details</CardDescription>
            </div>
            <Badge variant="free">Free</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-500">Plan</p>
                <p className="font-medium">Free</p>
              </div>
              <div>
                <p className="text-gray-500">Next billing</p>
                <p className="font-medium">N/A</p>
              </div>
            </div>
            <Button asChild>
              <a href="/pricing">Upgrade to Pro</a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
