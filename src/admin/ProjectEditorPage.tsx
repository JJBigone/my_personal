import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { portfolioService } from '../services/portfolioService';
import type { Project } from '../types/portfolio';
import { ArrowLeft, Upload, Trash2, Globe, Lock, AlertCircle, Check } from 'lucide-react';

export const ProjectEditorPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const isEdit = Boolean(id);
  const navigate = useNavigate();

  const [formData, setFormData] = useState<Partial<Project>>({
    title: '',
    slug: '',
    short_description: '',
    description: '',
    category: 'Web Development',
    tags: ['React', 'TypeScript'],
    technologies: ['React', 'Tailwind CSS', 'Vite'],
    cover_image_url: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1200',
    project_url: '',
    source_code_url: '',
    is_featured: false,
    status: 'draft',
    completion_date: new Date().toISOString().split('T')[0]
  });

  const [techInput, setTechInput] = useState('React, Tailwind CSS, Vite');
  const [tagInput, setTagInput] = useState('Web, Creative, Design');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [uploading, setUploading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  // Auto-generate slug from title if new
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    const updates: Partial<Project> = { title };
    if (!isEdit) {
      updates.slug = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');
    }
    setFormData((prev) => ({ ...prev, ...updates }));
  };

  useEffect(() => {
    if (isEdit && id) {
      setLoading(true);
      portfolioService.getAllProjectsAdmin().then((list) => {
        const found = list.find((p) => p.id === id);
        if (found) {
          setFormData(found);
          setTechInput(found.technologies ? found.technologies.join(', ') : '');
          setTagInput(found.tags ? found.tags.join(', ') : '');
        } else {
          setError('Project not found');
        }
        setLoading(false);
      });
    }
  }, [id, isEdit]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const publicUrl = await portfolioService.uploadImage(file);
      setFormData((prev) => ({ ...prev, cover_image_url: publicUrl }));
    } catch {
      setError('Image upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async (targetStatus?: 'draft' | 'published') => {
    setError('');
    setSuccessMsg('');

    if (!formData.title?.trim() || !formData.slug?.trim()) {
      setError('Title and unique slug are required.');
      return;
    }

    setLoading(true);

    const technologies = techInput
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    const tags = tagInput
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    const payload: Partial<Project> = {
      ...formData,
      status: targetStatus || formData.status || 'draft',
      technologies,
      tags,
      ...(targetStatus === 'published' && !formData.published_at
        ? { published_at: new Date().toISOString() }
        : {})
    };

    try {
      await portfolioService.saveProject(payload);
      setSuccessMsg('Project successfully saved!');
      setTimeout(() => {
        navigate('/admin/projects');
      }, 700);
    } catch {
      setError('Failed to persist project in database.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (id && window.confirm('Are you certain you want to delete this project?')) {
      await portfolioService.deleteProject(id);
      navigate('/admin/projects');
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link
            to="/admin/projects"
            className="p-2 rounded-xl glass-panel hover:bg-white text-[#746F64] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-[#243D32]">
              {isEdit ? 'Edit Project' : 'Create New Project'}
            </h1>
            <p className="text-xs text-[#746F64]">
              Configure metadata, technology tags, and publication state.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {isEdit && (
            <button
              type="button"
              onClick={handleDelete}
              className="p-2.5 rounded-xl text-red-600 hover:bg-red-50 transition-colors"
              title="Delete Project"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
          <button
            type="button"
            disabled={loading}
            onClick={() => handleSave('draft')}
            className="px-4 py-2 rounded-xl glass-panel text-xs font-semibold text-[#4B382D] hover:bg-white transition-all flex items-center gap-1.5"
          >
            <Lock className="w-3.5 h-3.5" />
            <span>Save Draft</span>
          </button>
          <button
            type="button"
            disabled={loading}
            onClick={() => handleSave('published')}
            className="px-5 py-2 rounded-xl bg-[#355746] hover:bg-[#243D32] text-[#FAF8F2] text-xs font-semibold shadow-md transition-all flex items-center gap-1.5"
          >
            <Globe className="w-3.5 h-3.5" />
            <span>Publish Live</span>
          </button>
        </div>
      </div>

      {error && (
        <div className="p-3 rounded-xl bg-red-50 text-red-700 text-xs flex items-center gap-2 border border-red-200">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {successMsg && (
        <div className="p-3 rounded-xl bg-emerald-50 text-emerald-800 text-xs flex items-center gap-2 border border-emerald-200">
          <Check className="w-4 h-4 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Editor Form */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Main Details */}
        <div className="md:col-span-8 glass-panel rounded-2xl p-6 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-[#243D32] mb-1">
              Project Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={handleTitleChange}
              placeholder="e.g. AuraCraft Esports Portal"
              className="w-full px-3.5 py-2 rounded-xl glass-input text-sm text-[#243D32]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#243D32] mb-1">
              URL Slug <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              placeholder="auracraft-esports-portal"
              className="w-full px-3.5 py-2 rounded-xl glass-input text-xs font-mono text-[#243D32]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#243D32] mb-1">
              Short Description (Card Teaser)
            </label>
            <textarea
              rows={2}
              value={formData.short_description}
              onChange={(e) => setFormData({ ...formData, short_description: e.target.value })}
              placeholder="Concise 1-2 sentence overview for cards and listings..."
              className="w-full px-3.5 py-2 rounded-xl glass-input text-xs text-[#243D32] resize-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#243D32] mb-1">
              Full Project Description &amp; Technical Execution
            </label>
            <textarea
              rows={8}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Comprehensive write-up covering background, challenges, architecture, and results..."
              className="w-full px-3.5 py-2 rounded-xl glass-input text-xs text-[#243D32] resize-y"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#243D32] mb-1">
                Live URL (optional)
              </label>
              <input
                type="url"
                value={formData.project_url || ''}
                onChange={(e) => setFormData({ ...formData, project_url: e.target.value })}
                placeholder="https://..."
                className="w-full px-3.5 py-2 rounded-xl glass-input text-xs text-[#243D32]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#243D32] mb-1">
                GitHub / Repository URL (optional)
              </label>
              <input
                type="url"
                value={formData.source_code_url || ''}
                onChange={(e) => setFormData({ ...formData, source_code_url: e.target.value })}
                placeholder="https://github.com/..."
                className="w-full px-3.5 py-2 rounded-xl glass-input text-xs text-[#243D32]"
              />
            </div>
          </div>
        </div>

        {/* Sidebar / Meta Settings */}
        <div className="md:col-span-4 space-y-5">
          {/* Cover Media Card */}
          <div className="glass-panel rounded-2xl p-5 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#243D32]">
              Cover Media Preview
            </h3>

            <div className="aspect-video rounded-xl overflow-hidden bg-gray-200 relative border border-[#D9C8AA]/40">
              <img
                src={formData.cover_image_url || 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=400'}
                alt=""
                className="w-full h-full object-cover"
              />
              {uploading && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white text-xs">
                  Uploading...
                </div>
              )}
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-[#746F64] mb-1">
                Image URL
              </label>
              <input
                type="text"
                value={formData.cover_image_url}
                onChange={(e) => setFormData({ ...formData, cover_image_url: e.target.value })}
                className="w-full px-3 py-1.5 text-xs rounded-lg glass-input text-[#243D32]"
              />
            </div>

            <div>
              <label className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#FAF8F2] hover:bg-white text-[#355746] text-xs font-semibold cursor-pointer border border-[#D9C8AA]/50 w-full justify-center">
                <Upload className="w-3.5 h-3.5" />
                <span>Upload New Image</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          {/* Classification */}
          <div className="glass-panel rounded-2xl p-5 space-y-3">
            <div>
              <label className="block text-xs font-semibold text-[#243D32] mb-1">
                Category
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3 py-1.5 text-xs rounded-xl glass-input text-[#243D32]"
              >
                <option value="Web Development">Web Development</option>
                <option value="Gaming">Gaming</option>
                <option value="Content Creation">Content Creation</option>
                <option value="Video Editing">Video Editing</option>
                <option value="Graphic Design">Graphic Design</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#243D32] mb-1">
                Technologies (comma separated)
              </label>
              <input
                type="text"
                value={techInput}
                onChange={(e) => setTechInput(e.target.value)}
                placeholder="React, TypeScript, Vite"
                className="w-full px-3 py-1.5 text-xs rounded-xl glass-input text-[#243D32]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#243D32] mb-1">
                Tags (comma separated)
              </label>
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                placeholder="Design, OpenSource, Streaming"
                className="w-full px-3 py-1.5 text-xs rounded-xl glass-input text-[#243D32]"
              />
            </div>

            <div className="pt-2 flex items-center justify-between">
              <span className="text-xs font-semibold text-[#243D32]">Featured Project</span>
              <input
                type="checkbox"
                checked={formData.is_featured}
                onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
                className="w-4 h-4 rounded text-[#355746] accent-[#355746]"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
