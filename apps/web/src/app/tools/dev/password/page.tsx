"use client";

import { useState, useCallback, useEffect } from "react";
import Link from "next/link";
import { Button, Card, CardContent, Label } from "@toolvault/ui";
import { ArrowLeft, Lock, Copy, Check, RefreshCw } from "lucide-react";

interface Options {
  length: number;
  uppercase: boolean;
  lowercase: boolean;
  numbers: boolean;
  symbols: boolean;
}

const CHAR_SETS = {
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  lowercase: "abcdefghijklmnopqrstuvwxyz",
  numbers: "0123456789",
  symbols: "!@#$%^&*()_+-=[]{}|;:',.<>?",
};

function getStrength(len: number, opts: Options) {
  let pool = 0;
  if (opts.uppercase) pool += 26;
  if (opts.lowercase) pool += 26;
  if (opts.numbers) pool += 10;
  if (opts.symbols) pool += 27;
  if (pool === 0) return { label: "None", color: "bg-gray-300", score: 0 };
  const bits = len * Math.log2(pool);
  if (bits < 40) return { label: "Weak", color: "bg-red-500", score: 1 };
  if (bits < 60) return { label: "Fair", color: "bg-orange-500", score: 2 };
  if (bits < 80) return { label: "Strong", color: "bg-yellow-500", score: 3 };
  return { label: "Very Strong", color: "bg-green-500", score: 4 };
}

export default function PasswordGeneratorPage() {
  const [options, setOptions] = useState<Options>({ length: 16, uppercase: true, lowercase: true, numbers: true, symbols: false });
  const [password, setPassword] = useState("");
  const [copied, setCopied] = useState(false);
  const [history, setHistory] = useState<string[]>([]);

  const generate = useCallback(() => {
    let chars = "";
    if (options.uppercase) chars += CHAR_SETS.uppercase;
    if (options.lowercase) chars += CHAR_SETS.lowercase;
    if (options.numbers) chars += CHAR_SETS.numbers;
    if (options.symbols) chars += CHAR_SETS.symbols;
    if (!chars) {
      setPassword("Select at least one character type");
      return;
    }
    const arr = new Uint32Array(options.length);
    crypto.getRandomValues(arr);
    const pw = Array.from(arr, (x) => chars[x % chars.length]).join("");
    setPassword(pw);
    setHistory((prev) => [pw, ...prev].slice(0, 10));
    setCopied(false);
  }, [options]);

  useEffect(() => { generate(); }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const strength = getStrength(options.length, options);

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
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Link href="/tools/dev" className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to Dev Tools
        </Link>
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Lock className="h-8 w-8 text-red-600" />
            <h1 className="text-3xl font-bold text-gray-900">Password Generator</h1>
          </div>
          <p className="text-gray-600">Generate cryptographically secure random passwords.</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardContent className="p-6 space-y-6">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label>Length: {options.length}</Label>
                  <span className="text-sm text-gray-500">characters</span>
                </div>
                <input
                  type="range"
                  min={4}
                  max={64}
                  value={options.length}
                  onChange={(e) => setOptions((o) => ({ ...o, length: Number(e.target.value) }))}
                  className="w-full accent-red-600"
                />
                <div className="flex justify-between text-xs text-gray-400">
                  <span>4</span><span>64</span>
                </div>
              </div>

              <div className="space-y-3">
                <Label>Character Types</Label>
                {(["uppercase", "lowercase", "numbers", "symbols"] as const).map((k) => (
                  <label key={k} className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={options[k]}
                      onChange={(e) => setOptions((o) => ({ ...o, [k]: e.target.checked }))}
                      className="rounded"
                    />
                    <span className="text-sm capitalize">{k}</span>
                    <span className="text-xs text-gray-400 font-mono">{CHAR_SETS[k].slice(0, 12)}...</span>
                  </label>
                ))}
              </div>

              <div className="space-y-2">
                <Label>Strength</Label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className={`h-2 flex-1 rounded-full ${i <= strength.score ? strength.color : "bg-gray-200"}`} />
                  ))}
                  <span className="text-sm font-medium">{strength.label}</span>
                </div>
              </div>

              <Button onClick={generate} className="w-full">
                <RefreshCw className="h-4 w-4 mr-2" /> Generate New Password
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label>Generated Password</Label>
                <div className="bg-gray-900 rounded-lg p-4">
                  <p className="text-green-400 font-mono text-lg break-all">{password}</p>
                </div>
              </div>

              <Button onClick={handleCopy} className="w-full">
                {copied ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
                {copied ? "Copied!" : "Copy to Clipboard"}
              </Button>

              {history.length > 1 && (
                <div className="space-y-2">
                  <Label>Recent Passwords</Label>
                  <div className="space-y-1 max-h-48 overflow-auto">
                    {history.slice(1).map((pw, i) => (
                      <div key={i} className="flex items-center gap-2 p-2 bg-gray-50 rounded text-sm font-mono truncate">
                        <span className="text-gray-400 text-xs">{history.length - i}</span>
                        <span className="truncate flex-1">{pw}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
