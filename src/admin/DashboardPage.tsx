import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { portfolioService } from '../services/portfolioService';
import type { Project, ContactMessage } from '../types/portfolio';
import { FolderKanban, CheckCircle2, FileEdit, MessageSquare, Plus, ArrowUpRight } from 'lucide-react';

export const DashboardPage: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      portfolioService.getAllProjectsAdmin(),
      portfolioService.getContactMessagesAdmin()
    ]).then(([projData, msgData]) => {
      setProjects(projData);
      setMessages(msgData);
      setLoading(false);
    });
  }, []);

  const totalPublished = projects.filter(p => p.status === 'published').length;
  const totalDrafts = projects.filter(p => p.status === 'draft').length;

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-[#243D32]">Portfolio Overview</h1>
          <p className="text-xs sm:text-sm text-[#746F64] mt-1">
            Real-time management dashboard connected to Supabase database.
          </p>
        </div>
        <Link
          to="/admin/projects/new"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#355746] hover:bg-[#243D32] text-[#FAF8F2] text-xs font-semibold shadow-sm transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>New Project</span>
        </Link>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-panel rounded-2xl p-5 space-y-1">
          <div className="flex items-center justify-between text-[#82977B]">
            <span className="text-xs font-semibold uppercase tracking-wider">Total Projects</span>
            <FolderKanban className="w-4 h-4" />
          </div>
          <div className="text-3xl font-extrabold text-[#243D32]">
            {loading ? '...' : projects.length}
          </div>
          <div className="text-[11px] text-[#746F64]">Created across all categories</div>
        </div>

        <div className="glass-panel rounded-2xl p-5 space-y-1">
          <div className="flex items-center justify-between text-emerald-600">
            <span className="text-xs font-semibold uppercase tracking-wider">Published</span>
            <CheckCircle2 className="w-4 h-4" />
          </div>
          <div className="text-3xl font-extrabold text-emerald-800">
            {loading ? '...' : totalPublished}
          </div>
          <div className="text-[11px] text-[#746F64]">Live on public portfolio</div>
        </div>

        <div className="glass-panel rounded-2xl p-5 space-y-1">
          <div className="flex items-center justify-between text-amber-600">
            <span className="text-xs font-semibold uppercase tracking-wider">Drafts</span>
            <FileEdit className="w-4 h-4" />
          </div>
          <div className="text-3xl font-extrabold text-amber-800">
            {loading ? '...' : totalDrafts}
          </div>
          <div className="text-[11px] text-[#746F64]">Pending administrator review</div>
        </div>

        <div className="glass-panel rounded-2xl p-5 space-y-1">
          <div className="flex items-center justify-between text-[#80634D]">
            <span className="text-xs font-semibold uppercase tracking-wider">Messages</span>
            <MessageSquare className="w-4 h-4" />
          </div>
          <div className="text-3xl font-extrabold text-[#4B382D]">
            {loading ? '...' : messages.length}
          </div>
          <div className="text-[11px] text-[#746F64]">From public contact form</div>
        </div>
      </div>

      {/* Recent Projects Table Preview */}
      <div className="glass-panel rounded-2xl p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-[#243D32]">Recent Projects</h2>
          <Link
            to="/admin/projects"
            className="text-xs font-semibold text-[#355746] hover:underline flex items-center gap-1"
          >
            <span>View All</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#D9C8AA]/30 text-[#746F64]">
                <th className="py-2.5 font-semibold">Title</th>
                <th className="py-2.5 font-semibold">Category</th>
                <th className="py-2.5 font-semibold">Status</th>
                <th className="py-2.5 font-semibold">Updated</th>
                <th className="py-2.5 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#D9C8AA]/20">
              {projects.slice(0, 5).map((p) => (
                <tr key={p.id} className="hover:bg-[#FAF8F2]/60">
                  <td className="py-3 font-semibold text-[#243D32] flex items-center gap-2">
                    <img
                      src={p.cover_image_url || 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=200'}
                      alt=""
                      className="w-8 h-8 rounded-lg object-cover bg-gray-200"
                    />
                    <span>{p.title}</span>
                  </td>
                  <td className="py-3 text-[#746F64]">{p.category}</td>
                  <td className="py-3">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        p.status === 'published'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {p.status}
                    </span>
                  </td>
                  <td className="py-3 text-[#746F64]">
                    {new Date(p.updated_at).toLocaleDateString()}
                  </td>
                  <td className="py-3 text-right">
                    <Link
                      to={`/admin/projects/${p.id}/edit`}
                      className="text-[#355746] hover:underline font-semibold"
                    >
                      Edit
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
