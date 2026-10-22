import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { portfolioService } from '../services/portfolioService';
import type { Project } from '../types/portfolio';
import { ArrowLeft, ExternalLink, Sparkles, Calendar, Tag, ShieldCheck } from 'lucide-react';

export const ProjectDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      portfolioService.getProjectBySlug(slug).then((data) => {
        setProject(data);
        setLoading(false);
      });
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="space-y-6 max-w-4xl mx-auto py-12">
        <div className="h-6 w-32 glass-panel rounded-full animate-pulse" />
        <div className="h-12 w-3/4 glass-panel rounded-2xl animate-pulse" />
        <div className="aspect-video glass-panel rounded-3xl animate-pulse" />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="glass-panel rounded-3xl p-12 text-center space-y-4 max-w-md mx-auto my-12">
        <h2 className="text-2xl font-bold text-[#243D32]">Project Not Found</h2>
        <p className="text-sm text-[#746F64]">
          The requested project might have been moved, unpublished, or doesn't exist.
        </p>
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#355746] text-[#FAF8F2] text-sm font-semibold"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Projects</span>
        </Link>
      </div>
    );
  }

  return (
    <article className="space-y-12 max-w-4xl mx-auto">
      {/* Back button */}
      <div>
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 text-sm font-medium text-[#4B382D] hover:text-[#243D32] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Projects</span>
        </Link>
      </div>

      {/* Header Info */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="glass-panel px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider text-[#355746]">
            {project.category}
          </span>
          {project.is_featured && (
            <span className="flex items-center gap-1 bg-[#80634D] text-[#FAF8F2] px-3 py-1 rounded-full text-xs font-medium">
              <Sparkles className="w-3 h-3 text-[#D9C8AA]" />
              <span>Featured Project</span>
            </span>
          )}
          {project.status === 'draft' && (
            <span className="flex items-center gap-1 bg-amber-600 text-white px-3 py-1 rounded-full text-xs font-medium">
              <ShieldCheck className="w-3 h-3" />
              <span>Admin Preview (Draft)</span>
            </span>
          )}
        </div>

        <h1 className="text-4xl sm:text-5xl font-extrabold text-[#243D32] tracking-tight leading-tight">
          {project.title}
        </h1>

        <p className="text-lg text-[#746F64] leading-relaxed max-w-2xl">
          {project.short_description}
        </p>

        {/* Action Links */}
        <div className="flex flex-wrap items-center gap-3 pt-2">
          {project.project_url && (
            <a
              href={project.project_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#355746] hover:bg-[#243D32] text-[#FAF8F2] text-sm font-semibold shadow-md transition-all hover:scale-105 active:scale-95"
            >
              <span>Live Demonstration</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
          {project.source_code_url && (
            <a
              href={project.source_code_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full glass-panel hover:bg-[#FAF8F2] text-[#243D32] text-sm font-semibold transition-all"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
              <span>Source Repository</span>
            </a>
          )}
        </div>
      </div>

      {/* Cover Image */}
      <div className="aspect-video sm:aspect-16/9 rounded-3xl overflow-hidden glass-panel p-2 shadow-2xl">
        <img
          src={project.cover_image_url}
          alt={project.title}
          className="w-full h-full object-cover rounded-2xl"
        />
      </div>

      {/* Meta Specs Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 glass-panel rounded-2xl p-6">
        <div className="space-y-1">
          <div className="flex items-center gap-1.5 text-xs text-[#746F64] font-medium">
            <Tag className="w-3.5 h-3.5" />
            <span>Category</span>
          </div>
          <div className="font-semibold text-sm text-[#243D32]">{project.category}</div>
        </div>

        <div className="space-y-1">
          <div className="flex items-center gap-1.5 text-xs text-[#746F64] font-medium">
            <Calendar className="w-3.5 h-3.5" />
            <span>Timeline</span>
          </div>
          <div className="font-semibold text-sm text-[#243D32]">
            {project.completion_date || 'Completed'}
          </div>
        </div>

        <div className="space-y-1">
          <div className="flex items-center gap-1.5 text-xs text-[#746F64] font-medium">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Stack</span>
          </div>
          <div className="font-semibold text-sm text-[#243D32]">
            {project.technologies.slice(0, 3).join(', ')}
          </div>
        </div>
      </div>

      {/* Detailed Description */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-[#243D32]">Project Overview &amp; Execution</h2>
        <div className="glass-panel rounded-3xl p-8 space-y-4 text-[#4B382D] leading-relaxed text-base whitespace-pre-line">
          {project.description || project.short_description}
        </div>
      </div>

      {/* Technologies & Tags */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-[#243D32]">Technologies &amp; Libraries Used</h3>
        <div className="flex flex-wrap gap-2">
          {project.technologies.map((tech, idx) => (
            <span
              key={idx}
              className="px-3.5 py-1.5 rounded-xl glass-panel text-xs font-semibold text-[#355746]"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
};
