"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Search, Trash2, Eye, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Consultation {
  _id: string;
  name: string;
  business: string;
  contact: string;
  message: string;
  status: "new" | "contacted" | "closed";
  createdAt: string;
  updatedAt: string;
}

export default function AdminConsultations() {
  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    fetchConsultations();
  }, []);

  const fetchConsultations = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/consultations");
      const data = await res.json();
      setConsultations(data);
    } catch (error) {
      console.error("Failed to fetch consultations:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this consultation?")) return;
    
    setDeletingId(id);
    try {
      await fetch(`/api/consultations/${id}`, { method: "DELETE" });
      setConsultations(prev => prev.filter(c => c._id !== id));
    } catch (error) {
      console.error("Delete failed:", error);
      alert("Delete failed. Please try again.");
    } finally {
      setDeletingId(null);
    }
  };

  const filteredConsultations = consultations.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.business.toLowerCase().includes(search.toLowerCase()) ||
    c.contact.toLowerCase().includes(search.toLowerCase()) ||
    c.status.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-black bg-linear-to-r from-gray-900 to-slate-700 bg-clip-text text-transparent mb-2">
            Consultation Requests
          </h1>
          <p className="text-slate-600 text-lg">
            Manage all incoming requests • <span className="font-semibold text-blue-600">{consultations.length} total</span>
          </p>
        </div>
        
        <div className="relative max-w-md w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search by name, business, contact, or status..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 bg-white shadow-sm"
            disabled={loading}
          />
        </div>
      </div>

      {/* Table */}
      {loading ? (
        <div className="grid place-items-center min-h-100">
          <motion.div 
            animate={{ rotate: 360 }} 
            transition={{ duration: 1, repeat: Infinity }} 
            className="w-12 h-12 border-4 border-blue-500/30 border-t-blue-500 rounded-full" 
          />
        </div>
      ) : filteredConsultations.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl shadow-xl border border-gray-100">
          <Eye className="w-24 h-24 text-gray-300 mx-auto mb-6" />
          <h3 className="text-2xl font-semibold text-gray-500 mb-2">No consultations found</h3>
          <p className="text-gray-400 mb-6">Try adjusting your search or submit a test form from homepage</p>
          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 bg-linear-to-r from-emerald-500 to-emerald-600 text-white font-semibold rounded-2xl shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
          >
            Test Form
          </Link>
        </div>
      ) : (
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-linear-to-r from-gray-50 to-gray-100">
                <tr>
                  <th className="px-8 py-6 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Customer</th>
                  <th className="px-6 py-6 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider hidden md:table-cell">Business</th>
                  <th className="px-6 py-6 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider hidden lg:table-cell">Contact</th>
                  <th className="px-6 py-6 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-6 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider hidden xl:table-cell">Date</th>
                  <th className="px-8 py-6 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <AnimatePresence>
                  {filteredConsultations.map((consultation, index) => (
                    <motion.tr
                      key={consultation._id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ delay: index * 0.05 }}
                      className="hover:bg-gray-50/50 transition-colors duration-200"
                    >
                      <td className="px-8 py-6">
                        <div className="font-semibold text-gray-900">{consultation.name}</div>
                        <div className="text-sm text-gray-500 truncate max-w-xs">{consultation.message}</div>
                      </td>
                      <td className="px-6 py-6 hidden md:table-cell">
                        <div className="font-medium text-gray-900">{consultation.business}</div>
                      </td>
                      <td className="px-6 py-6 text-sm text-gray-500 hidden lg:table-cell truncate max-w-xs">
                        {consultation.contact}
                      </td>
                      <td className="px-6 py-6">
                        <span className={`inline-flex px-4 py-2 rounded-full text-sm font-semibold ${
                          consultation.status === "new" 
                            ? "bg-orange-100 text-orange-800" 
                            : consultation.status === "contacted" 
                            ? "bg-blue-100 text-blue-800" 
                            : "bg-emerald-100 text-emerald-800"
                        }`}>
                          {consultation.status.toUpperCase()}
                        </span>
                      </td>
                      <td className="px-6 py-6 text-sm text-gray-500 hidden xl:table-cell">
                        {new Date(consultation.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-8 py-6 text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <Link
                            href={`/admin/consultations/${consultation._id}`}
                            className="inline-flex items-center px-4 py-2 text-blue-600 hover:text-blue-900 font-medium text-sm bg-blue-50 hover:bg-blue-100 rounded-xl transition-all duration-200"
                          >
                            <Eye className="w-4 h-4 mr-1" />
                            View
                          </Link>
                          <motion.button
                            onClick={() => handleDelete(consultation._id)}
                            disabled={deletingId === consultation._id}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="inline-flex items-center px-4 py-2 text-red-600 hover:text-red-900 font-medium text-sm bg-red-50 hover:bg-red-100 rounded-xl transition-all duration-200 disabled:opacity-50"
                          >
                            {deletingId === consultation._id ? (
                              <div className="w-4 h-4 border-2 border-red-500 border-t-transparent rounded-full animate-spin" />
                            ) : (
                              <Trash2 className="w-4 h-4 mr-1" />
                            )}
                            Delete
                          </motion.button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
