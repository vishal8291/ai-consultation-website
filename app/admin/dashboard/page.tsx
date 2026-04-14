"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { TrendingUp, MessageCircle, CheckCircle, FileText, Users, BarChart3 } from "lucide-react";

interface Stats {
  total: number;
  newCount: number;
  contacted: number;
  closed: number;
}

interface StatCardProps {
  title: string;
  value: number;
  icon: React.ComponentType<any>;
  color: string;
  trend: string;
  change: "up" | "down";
}

export default function DashboardPage() {
  const [stats, setStats] = useState<Stats>({ total: 0, newCount: 0, contacted: 0, closed: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch("/api/admin/stats");
        const data = await res.json();
        setStats(data);
      } catch (error) {
        console.error("Failed to fetch stats:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-100">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-blue-500/30 border-t-blue-500 rounded-full"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-indigo-100 p-8 antialiased">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto"
      >
        {/* Header */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-12 gap-4">
          <div>
            <div className="flex items-center mb-2">
              <BarChart3 className="w-10 h-10 text-blue-600 mr-3" />
              <h1 className="text-4xl md:text-5xl font-black bg-linear-to-r from-gray-900 to-slate-700 bg-clip-text text-transparent drop-shadow-lg">
                Admin Dashboard
              </h1>
            </div>
            <p className="text-slate-600 text-lg">Consultation analytics overview • <span className="font-semibold text-blue-600">{stats.total.toLocaleString()} total requests</span></p>
          </div>
          <a
            href="/admin/consultations"
            className="bg-linear-to-r from-emerald-500 to-emerald-600 text-white px-8 py-4 rounded-2xl font-semibold shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex items-center"
          >
            <Users className="w-5 h-5 mr-2" />
            View All Consultations
          </a>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Requests"
            value={stats.total}
            icon={FileText}
            color="from-blue-500 to-blue-600"
            trend="+12%"
            change="up"
          />
          <StatCard
            title="New"
            value={stats.newCount}
            icon={MessageCircle}
            color="from-emerald-500 to-emerald-600"
            trend="+8%"
            change="up"
          />
          <StatCard
            title="Contacted"
            value={stats.contacted}
            icon={TrendingUp}
            color="from-purple-500 to-purple-600"
            trend="+5%"
            change="up"
          />
          <StatCard
            title="Closed"
            value={stats.closed}
            icon={CheckCircle}
            color="from-orange-500 to-orange-600"
            trend="-2%"
            change="down"
          />
        </div>

        {/* Quick Stats */}
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <div className="bg-white/80 backdrop-blur-xl p-8 rounded-3xl shadow-xl border border-white/50">
            <p className="text-sm font-semibold text-slate-600 uppercase tracking-wide mb-2">Conversion Rate</p>
            <div className="flex items-center">
              <span className="text-3xl font-black text-emerald-600 mr-3">{((stats.closed / stats.total) * 100 || 0).toFixed(1)}%</span>
              <div className="text-emerald-600 text-sm font-semibold">↗ 2.3%</div>
            </div>
          </div>
          <div className="bg-white/80 backdrop-blur-xl p-8 rounded-3xl shadow-xl border border-white/50">
            <p className="text-sm font-semibold text-slate-600 uppercase tracking-wide mb-2">Pending Response</p>
            <span className="text-3xl font-black text-orange-600">{stats.newCount}</span>
          </div>
          <div className="bg-white/80 backdrop-blur-xl p-8 rounded-3xl shadow-xl border border-white/50">
            <p className="text-sm font-semibold text-slate-600 uppercase tracking-wide mb-2">In Progress</p>
            <span className="text-3xl font-black text-purple-600">{stats.contacted}</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function StatCard({ title, value, icon: Icon, color, trend, change }: StatCardProps) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      className="group"
    >
      <div className={`relative bg-white/80 backdrop-blur-xl p-8 rounded-3xl shadow-xl border border-white/50 transition-all duration-500 hover:border-transparent hover:bg-white ${color} bg-linear-to-br shadow-lg hover:shadow-2xl`}>
        {/* Icon */}
        <div className="absolute -top-4 left-6 w-16 h-16 bg-white/90 rounded-2xl shadow-lg flex items-center justify-center border-4 border-white/50 group-hover:scale-110 transition-transform duration-300">
          <Icon className="w-8 h-8 text-white drop-shadow-md" />
        </div>

        {/* Content */}
        <div className="mt-12">
          <p className="text-slate-700 font-semibold text-sm uppercase tracking-wide opacity-90">
            {title}
          </p>
          <p className="text-4xl md:text-5xl font-black text-white mt-2 drop-shadow-lg">
            {value.toLocaleString()}
          </p>
          <div className="flex items-center mt-4 text-white/90">
            <span className={`text-sm font-bold ${change === "up" ? "text-emerald-300" : "text-rose-300"}`}>
              {trend}
            </span>
            <span className={`ml-1 text-lg ${change === "up" ? "text-emerald-400" : "text-rose-400"}`}>
              {change === "up" ? "↗" : "↘"}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
