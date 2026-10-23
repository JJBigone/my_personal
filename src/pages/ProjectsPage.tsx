import React, { useEffect, useState, useMemo, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { portfolioService } from '../services/portfolioService';
import type { Project } from '../types/portfolio';
import { ProjectCard } from '../components/projects/ProjectCard';
import Folder, { type FolderItem } from '../components/ui/Folder';
import { Sparkles, ArrowRight, Layers, LayoutGrid, Search, Filter } from 'lucide-react';

export const ProjectsPage: React.FC = () => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<'folders' | 'grid'>('folders');
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeItemToast, setActiveItemToast] = useState<{ title: string; href?: string } | null>(null);

  const toastRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    portfolioService.getPublishedProjects().then((data) => {
      setProjects(data);
      setLoading(false);
    });
  }, []);

  // Auto-dismiss or outside-click dismiss for activeItemToast
  useEffect(() => {
    if (!activeItemToast) return;

    // Auto-dismiss after 6 seconds
    const timer = setTimeout(() => {
      setActiveItemToast(null);
    }, 6000);

    const handleOutsideClick = (e: MouseEvent | PointerEvent) => {
      if (toastRef.current && !toastRef.current.contains(e.target as Node)) {
        setActiveItemToast(null);
      }
    };

    const timeoutId = setTimeout(() => {
      document.addEventListener('pointerdown', handleOutsideClick);
    }, 150);

    return () => {
      clearTimeout(timer);
      clearTimeout(timeoutId);
      document.removeEventListener('pointerdown', handleOutsideClick);
    };
  }, [activeItemToast]);

  // Compute dynamic categories based on loaded projects
  const categories = useMemo(() => {
    const set = new Set<string>(['All']);
    projects.forEach((p) => {
      if (p.category) set.add(p.category);
    });
    return Array.from(set);
  }, [projects]);

  // Filter projects by category and search term for Grid View
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

  // Handle clicking on an item inside 3D Folder
  const handleFolderItemClick = (item: FolderItem | null) => {
    if (!item) {
      setActiveItemToast(null);
      return;
    }
    if (typeof item === 'object' && item !== null && 'title' in item) {
      setActiveItemToast({
        title: item.title || 'Selected Project',
        href: item.href,
      });
    }
  };

  // Data for 3D Folders
  const reactBitsWebApps: FolderItem[] = [
    {
      title: 'AuraCraft Hub',
      description: 'React & Supabase esports portal with real-time tournament brackets.',
      image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=800&auto=format&fit=crop',
      href: '/projects/auracraft-gaming-hub',
    },
    {
      title: 'Nexus Telemetry',
      description: 'Next.js real-time AI workload analytics and trace monitor.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop',
      href: '/projects/nexus-telemetry-dashboard',
    },
    {
      title: 'Microservices Architecture',
      description: 'High-availability cluster specs, WebSockets & API schemas.',
    },
  ];

  const reactBitsMedia: FolderItem[] = [
    {
      title: 'Earth & Canvas',
      description: 'Tactile editorial magazine with fluid liquid typography.',
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop',
      href: '/projects/earth-and-canvas-magazine',
    },
    {
      title: 'Lumina Video',
      description: 'Cloud video workflow tool for creators to render stream highlights.',
      image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=800&auto=format&fit=crop',
      href: '/projects/lumina-video-asset-manager',
    },
    {
      title: 'Cinematic Grade v4',
      description: 'DRX 3D LUT lookbook & HDR broadcast grading profiles.',
    },
  ];

  const reactBitsLab: FolderItem[] = [
    {
      title: 'Verdant Sound',
      description: 'Generative Web Audio synth with ambient nature loop layer.',
      image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=800&auto=format&fit=crop',
      href: '/projects/verdant-soundboard',
    },
    {
      title: 'CyberForge 3D',
      description: 'WebGL procedural PBR shader generator with WebGPU support.',
      image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop',
      href: '/projects/cyberforge-3d-asset-studio',
    },
    {
      title: 'Botanica Brand',
      description: 'E-commerce lookbook celebrating sustainable organic artisans.',
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=800&auto=format&fit=crop',
      href: '/projects/botanica-organic-brand',
    },
  ];

  const reactBitsArchives: FolderItem[] = [
    {
      title: 'NSTTC Thesis 2026',
      description: 'Software engineering & interactive web systems capstone dissertation.',
    },
    {
      title: 'Performance Audit',
      description: 'Lighthouse 100/100 Core Web Vitals optimization audit.',
    },
    {
      title: 'Client Contract SOW',
      description: 'Scope of work template, SLA guidelines, and commercial roadmap.',
    },
  ];

  return (
    <div className="w-full min-h-screen pt-24 pb-16 px-4 sm:px-8 xl:px-12 flex flex-col items-center relative overflow-visible">
      {/* Ambient background dot grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 opacity-[0.06]"
        style={{
          backgroundImage: 'radial-gradient(#243D32 1.4px, transparent 1.6px)',
          backgroundSize: '28px 28px',
        }}
      />

      {/* Top Floating Control Bar: View Switcher */}
      <div className="w-full max-w-[1600px] flex items-center justify-between gap-4 mb-6 relative z-30">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#355746] animate-pulse" />
          <span className="text-xs font-bold uppercase tracking-wider text-[#243D32]">
            {viewMode === 'folders' ? '3D Folders' : 'All Projects'}
          </span>
        </div>

        {/* View Mode Switcher (Folders vs Full Grid) */}
        <div className="flex items-center p-1 rounded-2xl glass-panel shadow-sm border border-[#D9C8AA]/40">
          <button
            type="button"
            onClick={() => {
              setActiveItemToast(null);
              setViewMode('folders');
            }}
            className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              viewMode === 'folders'
                ? 'bg-[#355746] text-[#FAF8F2] shadow-sm'
                : 'text-[#4B382D] hover:text-[#243D32]'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Interactive Folders</span>
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveItemToast(null);
              setViewMode('grid');
            }}
            className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              viewMode === 'grid'
                ? 'bg-[#355746] text-[#FAF8F2] shadow-sm'
                : 'text-[#4B382D] hover:text-[#243D32]'
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span>Grid View</span>
          </button>
        </div>
      </div>

      {/* Active Item Toast / Action Banner when an item is clicked */}
      {activeItemToast && (
        <div
          ref={toastRef}
          className="fixed top-24 z-50 p-4 rounded-2xl bg-[#355746] text-[#FAF8F2] flex items-center gap-4 shadow-xl border border-[#FAF8F2]/20 animate-in fade-in slide-in-from-top-3 duration-300"
        >
          <div className="flex items-center gap-2.5">
            <Sparkles className="w-4 h-4 text-[#A0A37A]" />
            <span className="text-sm font-medium">
              Selected: <strong>{activeItemToast.title}</strong>
            </span>
          </div>
          <div className="flex items-center gap-2">
            {activeItemToast.href && (
              <button
                type="button"
                onClick={() => {
                  setActiveItemToast(null);
                  navigate(activeItemToast.href!);
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FAF8F2] text-[#243D32] hover:bg-[#F3EBDD] font-bold text-xs shadow transition-all cursor-pointer"
              >
                <span>View Project</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
            <button
              type="button"
              onClick={() => setActiveItemToast(null)}
              className="px-2.5 py-1 rounded-full text-xs text-[#FAF8F2]/70 hover:text-white transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Mode 1: 3D Folders (Full Width & Clean) */}
      {viewMode === 'folders' ? (
        <div
          className="w-full max-w-[1600px] flex-1 flex flex-col justify-center items-center py-8 my-auto"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setActiveItemToast(null);
            }
          }}
        >
          <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-x-6 sm:gap-x-8 lg:gap-x-10 xl:gap-x-12 gap-y-16 items-end justify-items-center">
            {/* 1. Web Apps (Forest Green: #355746) */}
            <div className="flex flex-col items-center relative transition-all duration-300">
              <Folder
                label="Web Apps"
                mode="flap"
                variant="solid"
                color="#355746"
                paperColor="#FAF8F2"
                theme="light"
                size={1.12}
                draggable={false}
                items={reactBitsWebApps}
                onItemClick={handleFolderItemClick}
              />
              <div className="mt-7 text-center">
                <span className="text-sm font-extrabold text-[#355746] uppercase tracking-wider block">
                  WEB &amp; FULLSTACK
                </span>
              </div>
            </div>

            {/* 2. Media & Video (Earth Brown: #80634D) */}
            <div className="flex flex-col items-center relative transition-all duration-300">
              <Folder
                label="Media & Video"
                mode="flap"
                variant="solid"
                color="#80634D"
                paperColor="#FAF8F2"
                theme="light"
                size={1.12}
                draggable={false}
                items={reactBitsMedia}
                onItemClick={handleFolderItemClick}
              />
              <div className="mt-7 text-center">
                <span className="text-sm font-extrabold text-[#80634D] uppercase tracking-wider block">
                  VIDEO &amp; EDITORIAL
                </span>
              </div>
            </div>

            {/* 3. Audio & 3D Lab (Sage Green: #82977B) */}
            <div className="flex flex-col items-center relative transition-all duration-300">
              <Folder
                label="Creative Lab"
                mode="flap"
                variant="solid"
                color="#82977B"
                paperColor="#FAF8F2"
                theme="light"
                size={1.12}
                draggable={false}
                items={reactBitsLab}
                onItemClick={handleFolderItemClick}
              />
              <div className="mt-7 text-center">
                <span className="text-sm font-extrabold text-[#82977B] uppercase tracking-wider block">
                  AUDIO &amp; WEBGL
                </span>
              </div>
            </div>

            {/* 4. Archives & Docs (Deep Forest: #243D32) */}
            <div className="flex flex-col items-center relative transition-all duration-300">
              <Folder
                label="Archives & Docs"
                mode="flap"
                variant="solid"
                color="#243D32"
                paperColor="#F3EBDD"
                theme="light"
                size={1.12}
                draggable={false}
                items={reactBitsArchives}
                onItemClick={handleFolderItemClick}
              />
              <div className="mt-7 text-center">
                <span className="text-sm font-extrabold text-[#243D32] uppercase tracking-wider block">
                  SPECS &amp; REPORTS
                </span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Mode 2: Full Grid View with Search and Filter */
        <div className="w-full max-w-7xl space-y-8 py-6">
          {/* Filter and Search Bar for Projects Grid */}
          <section className="glass-panel rounded-3xl p-4 sm:p-6 shadow-md flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Category Pills */}
            <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
              <Filter className="w-4 h-4 text-[#80634D] hidden sm:block mr-1" />
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#355746] ${
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
                className="w-full pl-9 pr-4 py-2 text-sm rounded-full glass-input text-[#243D32] placeholder:text-[#746F64]/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#355746]"
              />
            </div>
          </section>

          {/* Projects Grid List */}
          <section>
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((n) => (
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
                  <ProjectCard
                    key={project.id}
                    project={project}
                    featured={idx === 0 && selectedCategory === 'All' && !searchQuery}
                  />
                ))}
              </div>
            )}
          </section>
        </div>
      )}
    </div>
  );
};

export default ProjectsPage;
