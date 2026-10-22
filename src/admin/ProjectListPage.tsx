import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { portfolioService } from '../services/portfolioService';
import type { Project } from '../types/portfolio';
import { Plus, Search, Trash2, Edit3, ExternalLink, Globe, Lock } from 'lucide-react';

export const ProjectListPage: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'published' | 'draft'>('all');

  const fetchProjects = () => {
    setLoading(true);
    portfolioService.getAllProjectsAdmin().then((data) => {
      setProjects(data);
      setLoading(false);
    });
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleTogglePublish = async (project: Project) => {
    const newStatus = project.status === 'published' ? 'draft' : 'published';
    await portfolioService.saveProject({
      ...project,
      status: newStatus,
      published_at: newStatus === 'published' ? new Date().toISOString() : undefined
    });
    fetchProjects();
  };

  const handleDelete = async (id: string, title: string) => {
    if (window.confirm(`Are you sure you want to delete "${title}"? This cannot be undone.`)) {
      await portfolioService.deleteProject(id);
      fetchProjects();
    }
  };

  const filtered = projects.filter((p) => {
    const matchStatus = statusFilter === 'all' || p.status === statusFilter;
    const matchSearch =
      !search ||
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-[#243D32]">Project Management</h1>
          <p className="text-xs sm:text-sm text-[#746F64] mt-1">
            Create, edit, publish, or remove projects from the public portfolio.
          </p>
        </div>
        <Link
          to="/admin/projects/new"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#355746] hover:bg-[#243D32] text-[#FAF8F2] text-xs font-semibold shadow-sm transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Create New Project</span>
        </Link>
      </div>

      {/* Filter and Search Bar */}
      <div className="glass-panel rounded-2xl p-4 flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="flex items-center gap-2">
          {(['all', 'published', 'draft'] as const).map((st) => (
            <button
              key={st}
              type="button"
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all ${
                statusFilter === st
                  ? 'bg-[#355746] text-[#FAF8F2]'
                  : 'bg-[#FAF8F2]/60 hover:bg-[#FAF8F2] text-[#4B382D]'
              }`}
            >
              {st}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 text-[#746F64] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search projects..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 text-xs rounded-xl glass-input text-[#243D32]"
          />
        </div>
      </div>

      {/* Projects Table */}
      <div className="glass-panel rounded-2xl p-6 overflow-hidden">
        {loading ? (
          <div className="py-12 text-center text-xs text-[#746F64] animate-pulse">
            Loading project records...
          </div>
        ) : filtered.length === 0 ? (
          <div className="py-12 text-center text-xs text-[#746F64]">
            No projects found matching the criteria.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-[#D9C8AA]/30 text-[#746F64]">
                  <th className="py-3 font-semibold">Project</th>
                  <th className="py-3 font-semibold">Category</th>
                  <th className="py-3 font-semibold">Status</th>
                  <th className="py-3 font-semibold">Featured</th>
                  <th className="py-3 font-semibold">Date</th>
                  <th className="py-3 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#D9C8AA]/20">
                {filtered.map((project) => (
                  <tr key={project.id} className="hover:bg-[#FAF8F2]/60">
                    <td className="py-3 font-semibold text-[#243D32] flex items-center gap-3">
                      <img
                        src={project.cover_image_url || 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=200'}
                        alt=""
                        className="w-10 h-10 rounded-xl object-cover bg-gray-100"
                      />
                      <div>
                        <div>{project.title}</div>
                        <div className="text-[10px] text-[#746F64]">/projects/{project.slug}</div>
                      </div>
                    </td>
                    <td className="py-3 text-[#746F64]">{project.category}</td>
                    <td className="py-3">
                      <button
                        type="button"
                        onClick={() => handleTogglePublish(project)}
                        title="Click to toggle publish status"
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold transition-all ${
                          project.status === 'published'
                            ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                            : 'bg-amber-100 text-amber-800 hover:bg-amber-200'
                        }`}
                      >
                        {project.status === 'published' ? (
                          <>
                            <Globe className="w-3 h-3" />
                            <span>Published</span>
                          </>
                        ) : (
                          <>
                            <Lock className="w-3 h-3" />
                            <span>Draft</span>
                          </>
                        )}
                      </button>
                    </td>
                    <td className="py-3 text-[#746F64]">
                      {project.is_featured ? (
                        <span className="text-emerald-700 font-bold">Yes</span>
                      ) : (
                        <span>No</span>
                      )}
                    </td>
                    <td className="py-3 text-[#746F64]">
                      {new Date(project.updated_at).toLocaleDateString()}
                    </td>
                    <td className="py-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          to={`/projects/${project.slug}`}
                          target="_blank"
                          title="Preview project page"
                          className="p-1.5 rounded-lg text-[#746F64] hover:text-[#243D32] hover:bg-white"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </Link>
                        <Link
                          to={`/admin/projects/${project.id}/edit`}
                          title="Edit project"
                          className="p-1.5 rounded-lg text-[#355746] hover:bg-white"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </Link>
                        <button
                          type="button"
                          onClick={() => handleDelete(project.id, project.title)}
                          title="Delete project"
                          className="p-1.5 rounded-lg text-red-600 hover:bg-red-50"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
