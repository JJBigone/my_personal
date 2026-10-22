import React, { useEffect, useState, useMemo } from 'react';
import { portfolioService } from '../services/portfolioService';
import type { Project } from '../types/portfolio';
import { ProjectCard } from '../components/projects/ProjectCard';
import { Search, FolderGit2, Filter } from 'lucide-react';

export const ProjectsPage: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    portfolioService.getPublishedProjects().then((data) => {
      setProjects(data);
      setLoading(false);
    });
  }, []);

  // Compute dynamic categories based on loaded projects
  const categories = useMemo(() => {
    const set = new Set<string>(['All']);
    projects.forEach((p) => {
      if (p.category) set.add(p.category);
    });
    return Array.from(set);
  }, [projects]);

  // Filter projects by category and search term
  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchCategory = selectedCategory === 'All' || project.category === selectedCategory;
      const matchSearch =
        !searchQuery ||
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.short_description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.technologies.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchCategory && matchSearch;
    });
  }, [projects, selectedCategory, searchQuery]);

  return (
    <div className="space-y-12">
      {/* Header */}
      <section className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-panel text-xs font-semibold uppercase tracking-wider text-[#355746]">
          <FolderGit2 className="w-3.5 h-3.5 text-[#80634D]" />
          <span>Curated Portfolio</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-[#243D32] tracking-tight">
          Works &amp; Creative Projects
        </h1>
        <p className="text-base sm:text-lg text-[#746F64] max-w-2xl leading-relaxed">
          Explore a collection of interactive web systems, streaming tools, game design concepts, and creative applications built with passion and modern technology.
        </p>
      </section>

      {/* Filter and Search Bar */}
      <section className="glass-panel rounded-3xl p-4 sm:p-6 shadow-md flex flex-col md:flex-row gap-4 items-center justify-between">
        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
          <Filter className="w-4 h-4 text-[#80634D] hidden sm:block mr-1" />
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-200 ${
                selectedCategory === cat
                  ? 'bg-[#355746] text-[#FAF8F2] shadow-sm'
                  : 'bg-[#FAF8F2]/60 hover:bg-[#FAF8F2] text-[#4B382D]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-[#746F64] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search projects or tech..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm rounded-full glass-input text-[#243D32] placeholder:text-[#746F64]/70"
          />
        </div>
      </section>

      {/* Projects Grid */}
      <section>
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((n) => (
              <div key={n} className="glass-panel h-80 rounded-3xl animate-pulse" />
            ))}
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="glass-panel rounded-3xl p-12 text-center space-y-3">
            <h3 className="text-xl font-bold text-[#243D32]">No projects found</h3>
            <p className="text-sm text-[#746F64]">
              Try searching with another keyword or selecting a different category.
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
              }}
              className="mt-2 px-5 py-2 rounded-full bg-[#355746] text-[#FAF8F2] text-xs font-semibold"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project, idx) => (
              <ProjectCard key={project.id} project={project} featured={idx === 0 && selectedCategory === 'All' && !searchQuery} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};
