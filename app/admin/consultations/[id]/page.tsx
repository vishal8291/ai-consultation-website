"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Phone, Mail, MessageSquare, Save, CheckCircle, Trash2 } from "lucide-react";
import { motion } from "framer-motion";

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

export default function ConsultationDetail() {
  const params = useParams();
  const router = useRouter();
  const [consultation, setConsultation] = useState<Consultation | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [status, setStatus] = useState<"new" | "contacted" | "closed">("new");

  useEffect(() => {
    if (params.id) {
      fetchConsultation();
    }
  }, [params.id]);

  const fetchConsultation = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/consultations/${params.id}`);
      const data = await res.json();
      
      if (res.ok) {
        setConsultation(data);
        setStatus(data.status);
      } else {
        router.push("/admin/consultations");
      }
    } catch (error) {
      console.error("Failed to fetch consultation:", error);
      router.push("/admin/consultations");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!consultation) return;

    setUpdating(true);
    try {
      const res = await fetch(`/api/consultations/${params.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });

      if (res.ok) {
        const updated = await res.json();
        setConsultation({ ...consultation, status: updated.status, updatedAt: updated.updatedAt });
      }
    } catch (error) {
      console.error("Update failed:", error);
    } finally {
      setUpdating(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this consultation? This action cannot be undone.")) return;
    
    setDeleting(true);
    try {
      await fetch(`/api/consultations/${params.id}`, { method: "DELETE" });
      router.push("/admin/consultations");
    } catch (error) {
      console.error("Delete failed:", error);
      alert("Delete failed. Please try again.");
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-100 flex items-center justify-center">
        <motion.div 
          animate={{ rotate: 360 }} 
          transition={{ duration: 1, repeat: Infinity }} 
          className="w-12 h-12 border-4 border-blue-500/30 border-t-blue-500 rounded-full" 
        />
      </div>
    );
  }

  if (!consultation) {
    return (
      <div className="min-h-100 flex items-center justify-center text-gray-500">
        Consultation not found
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex items-center justify-between"
      >
        <div className="flex items-center space-x-4">
          <button
            onClick={() => router.back()}
            className="inline-flex items-center px-4 py-2 text-blue-600 hover:text-blue-900 font-medium bg-blue-50 hover:bg-blue-100 rounded-xl transition-all duration-200"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to list
          </button>
          <span className={`inline-flex px-4 py-2 rounded-full text-sm font-semibold ${
            consultation.status === "new" 
              ? "bg-orange-100 text-orange-800" 
              : consultation.status === "contacted" 
              ? "bg-blue-100 text-blue-800" 
              : "bg-emerald-100 text-emerald-800"
          }`}>
            {consultation.status.toUpperCase()}
          </span>
        </div>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Customer Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-white/50"
        >
          <div className="flex items-center mb-6">
            <div className="w-16 h-16 bg-linear-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center text-white font-bold text-2xl mr-4 shadow-lg">
              {consultation.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <h2 className="text-2xl font-black text-gray-900">{consultation.name}</h2>
              <p className="text-slate-600">{consultation.business}</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="flex items-center text-sm font-semibold text-gray-600 mb-3">Contact</label>
              <div className="flex items-center p-4 bg-linear-to-r from-gray-50 to-gray-100 rounded-2xl">
                <Mail className="w-5 h-5 text-gray-500 mr-3 shrink-0" />
                <a 
                  href={`mailto:${consultation.contact}`} 
                  className="font-medium text-blue-600 hover:text-blue-700 truncate"
                >
                  {consultation.contact}
                </a>
              </div>
            </div>
            
            <div>
              <label className="flex items-center text-sm font-semibold text-gray-600 mb-3">Created</label>
              <div className="p-4 bg-linear-to-r from-gray-50 to-gray-100 rounded-2xl">
                <span className="text-sm text-gray-900 font-medium">
                  {new Date(consultation.createdAt).toLocaleString()}
                </span>
              </div>
            </div>

            {consultation.updatedAt !== consultation.createdAt && (
              <div>
                <label className="flex items-center text-sm font-semibold text-gray-600 mb-3">Last Updated</label>
                <div className="p-4 bg-linear-to-r from-emerald-50 to-emerald-100 rounded-2xl">
                  <span className="text-sm text-emerald-800 font-medium">
                    {new Date(consultation.updatedAt).toLocaleString()}
                  </span>
                </div>
              </div>
            )}
          </div>
        </motion.div>

        {/* Message & Status Update */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-white/50"
        >
          <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
            <MessageSquare className="w-6 h-6 mr-3 text-blue-500" />
            Customer Message
          </h3>
          
          <div className="bg-linear-to-b from-gray-50 to-white rounded-2xl p-6 border-l-4 border-blue-500 mb-8 min-h-50">
            <p className="text-gray-800 leading-relaxed whitespace-pre-wrap text-lg">
              {consultation.message}
            </p>
          </div>

          {/* Status Update Form */}
          <form onSubmit={handleStatusUpdate} className="space-y-6">
            <div>
              <label className="flex items-center text-sm font-semibold text-gray-600 mb-3">Update Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as "new" | "contacted" | "closed")}
                disabled={updating}
                className="w-full p-4 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 bg-white shadow-sm text-lg"
              >
                <option value="new">New (Pending Response)</option>
                <option value="contacted">Contacted (In Progress)</option>
                <option value="closed">Closed (Completed)</option>
              </select>
            </div>
            
            <div className="flex gap-4 pt-4">
              <motion.button
                type="submit"
                disabled={updating}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 bg-linear-to-r from-emerald-500 to-emerald-600 text-white py-4 px-6 rounded-2xl font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-lg"
              >
                {updating ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Updating...
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-5 h-5" />
                    Update Status
                  </>
                )}
              </motion.button>
              
              <motion.button
                type="button"
                onClick={handleDelete}
                disabled={deleting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-6 bg-linear-to-r from-red-500 to-red-600 text-white py-4 rounded-2xl font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-lg"
              >
                {deleting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Deleting...
                  </>
                ) : (
                  <>
                    <Trash2 className="w-5 h-5" />
                    Delete
                  </>
                )}
              </motion.button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
