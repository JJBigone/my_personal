import React from 'react';
import { Link } from 'react-router-dom';
import type { Project } from '../../types/portfolio';
import { ArrowUpRight, Sparkles } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
  featured?: boolean;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, featured }) => {
  return (
    <Link
      to={`/projects/${project.slug}`}
      className={`group block glass-panel glass-card-hover rounded-3xl overflow-hidden text-decoration-none ${
        featured ? 'md:col-span-2' : ''
      }`}
    >
      <div className="relative aspect-video sm:aspect-16/10 overflow-hidden bg-[#D9C8AA]/30">
        <img
          src={project.cover_image_url || 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=800'}
          alt={project.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#243D32]/80 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

        {/* Category tag */}
        <div className="absolute top-4 left-4">
          <span className="glass-panel px-3 py-1 rounded-full text-xs font-semibold text-[#243D32] uppercase tracking-wider backdrop-blur-md">
            {project.category}
          </span>
        </div>

        {/* Featured badge */}
        {project.is_featured && (
          <div className="absolute top-4 right-4 flex items-center gap-1 bg-[#80634D]/90 text-[#FAF8F2] px-3 py-1 rounded-full text-xs font-medium shadow-sm">
            <Sparkles className="w-3 h-3 text-[#D9C8AA]" />
            <span>Featured</span>
          </div>
        )}

        {/* Action arrow */}
        <div className="absolute bottom-4 right-4 w-10 h-10 rounded-full glass-panel flex items-center justify-center text-[#243D32] group-hover:bg-[#355746] group-hover:text-[#FAF8F2] transition-all duration-300">
          <ArrowUpRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>
      </div>

      <div className="p-6 sm:p-7 flex flex-col justify-between">
        <div>
          <h3 className="text-xl sm:text-2xl font-bold text-[#243D32] group-hover:text-[#355746] transition-colors leading-snug">
            {project.title}
          </h3>
          <p className="text-sm text-[#746F64] mt-2.5 line-clamp-2 leading-relaxed">
            {project.short_description}
          </p>
        </div>

        {/* Tech tags */}
        <div className="mt-5 flex flex-wrap gap-1.5 pt-4 border-t border-[#D9C8AA]/30">
          {project.technologies.slice(0, 4).map((tech, idx) => (
            <span
              key={idx}
              className="text-xs px-2.5 py-1 rounded-lg bg-[#FAF8F2]/70 text-[#4B382D] font-medium"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 4 && (
            <span className="text-xs px-2 py-1 rounded-lg text-[#746F64]">
              +{project.technologies.length - 4}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
};
