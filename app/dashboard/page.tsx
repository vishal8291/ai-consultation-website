"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { LogOut, User, Mail, Calendar, FileText, CheckCircle } from "lucide-react"; // ✅ Added CheckCircle
import { motion } from "framer-motion";

interface UserConsultations {
  _id: string;
  name: string;
  business: string;
  contact: string;
  message: string;
  status: "new" | "contacted" | "closed";
  createdAt: string;
}

export default function UserDashboard() {
  const [user, setUser] = useState<any>(null);
  const [consultations, setConsultations] = useState<UserConsultations[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const userRes = await fetch("/api/users/me");
      if (!userRes.ok) {
        router.push("/login");
        return;
      }
      const userData = await userRes.json();
      setUser(userData);

      const consRes = await fetch("/api/users/consultations");
      if (consRes.ok) {
        const data = await consRes.json();
        setConsultations(data);
      }
    } catch (error) {
      router.push("/login");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    document.cookie = "user-token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
    router.push("/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center"> {/* ✅ Fixed Tailwind */}
        <motion.div 
          animate={{ rotate: 360 }} 
          transition={{ duration: 1, repeat: Infinity }} 
          className="w-12 h-12 border-4 border-blue-500/30 border-t-blue-500 rounded-full" 
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-indigo-100"> {/* ✅ Fixed Tailwind */}
      <div className="max-w-6xl mx-auto p-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-12 gap-6">
          <div className="flex items-center">
            <div className="w-16 h-16 bg-linear-to-r from-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center text-white font-bold text-2xl mr-4 shadow-lg"> {/* ✅ Fixed Tailwind */}
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            <div>
              <h1 className="text-4xl font-black bg-linear-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent"> {/* ✅ Fixed Tailwind */}
                Welcome back, {user?.name}!
              </h1>
              <p className="text-slate-600 text-lg">Manage your consultations</p>
            </div>
          </div>
          <motion.button
            onClick={handleLogout}
            whileHover={{ scale: 1.05 }}
            className="flex items-center px-6 py-3 bg-linear-to-r from-red-500 to-red-600 text-white font-semibold rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300" // ✅ Fixed Tailwind
          >
            <LogOut className="w-5 h-5 mr-2" />
            Logout
          </motion.button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-white/80 backdrop-blur-xl p-8 rounded-3xl shadow-xl border border-white/50">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-blue-500 rounded-2xl flex items-center justify-center mr-4">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-600 uppercase">Total Consultations</p>
                <p className="text-3xl font-black text-slate-900">{consultations.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white/80 backdrop-blur-xl p-8 rounded-3xl shadow-xl border border-white/50">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-emerald-500 rounded-2xl flex items-center justify-center mr-4">
                <CheckCircle className="w-6 h-6 text-white" /> {/* ✅ Now imported */}
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-600 uppercase">Completed</p>
                <p className="text-3xl font-black text-slate-900">
                  {consultations.filter(c => c.status === "closed").length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Consultations */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 overflow-hidden">
          <div className="p-8 border-b border-slate-100">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Recent Consultations</h2>
            <a href="/consultations/new" className="inline-flex items-center px-6 py-3 bg-linear-to-r from-emerald-500 to-emerald-600 text-white font-semibold rounded-2xl hover:shadow-2xl transition-all"> {/* ✅ Fixed Tailwind */}
              <FileText className="w-5 h-5 mr-2" />
              New Consultation
            </a>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-linear-to-r from-slate-50 to-slate-100"> {/* ✅ Fixed Tailwind */}
                <tr>
                  <th className="px-8 py-4 text-left text-sm font-semibold text-slate-600">Business</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">Created</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {consultations.slice(0, 5).map((consultation) => (
                  <tr key={consultation._id} className="hover:bg-slate-50">
                    <td className="px-8 py-6">
                      <div className="font-medium text-slate-900">{consultation.business}</div>
                    </td>
                    <td className="px-6 py-6">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        consultation.status === "new" ? "bg-orange-100 text-orange-800" :
                        consultation.status === "contacted" ? "bg-blue-100 text-blue-800" :
                        "bg-emerald-100 text-emerald-800"
                      }`}>
                        {consultation.status.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-6 text-sm text-slate-500">
                      {new Date(consultation.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
