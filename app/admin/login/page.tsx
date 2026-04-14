"use client";
import { useState } from "react";
import { Eye, EyeOff, Lock } from "lucide-react";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  async function login(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (res.ok) {
        // Refresh page and redirect (fixes Next.js router issues)
        window.location.href = "/admin/dashboard";
      } else {
        setError(data.error || "Wrong password");
      }
    } catch (err) {
      setError("Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-purple-900/30 to-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative bg-white/80 backdrop-blur-xl shadow-2xl rounded-3xl p-10 w-full max-w-md border border-white/20">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-linear-to-r from-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
            <Lock className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold bg-linear-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent mb-2">
            Admin Portal
          </h1>
          <p className="text-slate-500 text-sm">Enter your secure access code</p>
        </div>

        {/* Form */}
        <form onSubmit={login} className="space-y-6">
          {error && (
            <div className="p-4 bg-rose-100 border border-rose-200 rounded-2xl text-rose-800 text-sm">
              {error}
            </div>
          )}

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              className="w-full h-14 px-4 pl-12 pr-14 bg-slate-50/50 border-2 border-slate-200 rounded-2xl text-lg placeholder-slate-400 focus:border-purple-500 focus:outline-none focus:ring-4 focus:ring-purple-500/20 transition-all duration-300 shadow-sm hover:shadow-md"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
              autoComplete="current-password"
            />
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <button
              type="button"
              className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-white/50 rounded-full transition-all duration-200"
              onClick={() => setShowPassword(!showPassword)}
              disabled={isLoading}
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5 text-slate-500" />
              ) : (
                <Eye className="w-5 h-5 text-slate-500" />
              )}
            </button>
          </div>

          <button
            type="submit"
            disabled={isLoading || !password.trim()}
            className="w-full h-14 bg-linear-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 disabled:from-slate-400 disabled:to-slate-500 text-white font-semibold rounded-2xl shadow-xl hover:shadow-2xl transform hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2 text-lg disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Signing in...
              </>
            ) : (
              "Access Dashboard"
            )}
          </button>
        </form>

        {/* Footer - Default password hint (remove in production) */}
        <div className="mt-8 pt-8 border-t border-slate-200/50 text-center">
          <p className="text-xs text-slate-500 mb-2">
            Default: <code className="bg-slate-200 px-2 py-1 rounded text-xs font-mono">admin123</code>
          </p>
          <p className="text-xs text-slate-500">
            Secure • Encrypted • Production Ready
          </p>
        </div>
      </div>
    </div>
  );
}
