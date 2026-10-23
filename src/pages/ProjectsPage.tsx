import React, { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { portfolioService } from '../services/portfolioService';
import type { Project } from '../types/portfolio';
import { ProjectCard } from '../components/projects/ProjectCard';
import GlassFolder, { type FolderFile } from '../components/ui/glass-folder-cards';
import { Search, FolderGit2, Filter, Layers, LayoutGrid, Sparkles, FolderOpen, MousePointerClick } from 'lucide-react';
import { StaggerContainer, StaggerItem } from '../components/motion/StaggerGroup';

export const ProjectsPage: React.FC = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [viewMode, setViewMode] = useState<'folders' | 'grid'>('folders');

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

  // Handle navigating when a file is selected inside a Glass Folder
  const handleFileSelect = (file: FolderFile) => {
    if (file.href && file.href.startsWith('/')) {
      navigate(file.href);
    } else if (file.href) {
      window.open(file.href, '_blank', 'noopener,noreferrer');
    }
  };

  // Curated Glass Folders collections separating works by discipline
  const webAppFiles: FolderFile[] = [
    {
      name: 'AuraCraft Gaming Hub',
      meta: 'Web App · React & Supabase',
      image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=800&auto=format&fit=crop',
      href: '/projects/auracraft-gaming-hub',
    },
    {
      name: 'Nexus Telemetry Cockpit',
      meta: 'Next.js · Real-time Analytics',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop',
      href: '/projects/nexus-telemetry-dashboard',
    },
    {
      name: 'Cloud-Architecture-Specs.pdf',
      meta: 'PDF · 1.4 MB',
      art: 'aurora',
    },
  ];

  const creativeMediaFiles: FolderFile[] = [
    {
      name: 'Earth & Canvas Magazine',
      meta: 'Editorial · Fluid Layout',
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop',
      href: '/projects/earth-and-canvas-magazine',
    },
    {
      name: 'Lumina Video Stream Manager',
      meta: 'Creator Cloud Tool',
      image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=800&auto=format&fit=crop',
      href: '/projects/lumina-video-asset-manager',
    },
    {
      name: 'Cinematic Grade v4.drx',
      meta: 'LUT / DRX · 24 MB',
      art: 'ember',
    },
    {
      name: 'Design-Tokens-Spec.json',
      meta: 'Design System',
    },
  ];

  const labExperimentsFiles: FolderFile[] = [
    {
      name: 'Verdant Soundboard Synthesizer',
      meta: 'Web Audio API · Generative Synth',
      image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=800&auto=format&fit=crop',
      href: '/projects/verdant-soundboard',
    },
    {
      name: 'CyberForge 3D Studio',
      meta: 'WebGL & Three.js · PBR Shaders',
      image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop',
      href: '/projects/cyberforge-3d-asset-studio',
    },
    {
      name: 'Botanica Brand Identity',
      meta: 'Sustainable Commerce Concept',
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=800&auto=format&fit=crop',
      href: '/projects/botanica-organic-brand',
    },
    {
      name: 'Shader-Source-GLSL.frag',
      meta: 'GPU Raymarching',
      art: 'glacier',
    },
  ];

  const archiveDocumentsFiles: FolderFile[] = [
    {
      name: 'Technical-College-Thesis.pdf',
      meta: 'PDF · NSTTC 2026',
      art: 'dusk',
    },
    {
      name: 'Lighthouse-Audit-100.pdf',
      meta: 'Performance Report',
    },
    {
      name: 'Client-Contract-Brief.pdf',
      meta: 'PDF · 480 KB',
      art: 'verdant',
    },
    {
      name: 'Asset-Inventory-Manifest.csv',
      meta: 'Data Sheet',
    },
  ];

  return (
    <StaggerContainer className="space-y-12 max-w-7xl mx-auto w-full pt-28 pb-20 px-4 sm:px-8">
      {/* Header with Title & View Mode Switcher */}
      <StaggerItem className="space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel text-xs font-semibold uppercase tracking-wider text-[#355746]">
            <FolderGit2 className="w-3.5 h-3.5 text-[#80634D]" />
            <span>Interactive Portfolio Showcase</span>
          </div>

          {/* Mode Switcher */}
          <div className="flex items-center p-1 rounded-2xl glass-panel shadow-sm">
            <button
              type="button"
              onClick={() => setViewMode('folders')}
              className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                viewMode === 'folders'
                  ? 'bg-[#355746] text-[#FAF8F2] shadow-sm'
                  : 'text-[#4B382D] hover:text-[#243D32]'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Glass Folders</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode('grid')}
              className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                viewMode === 'grid'
                  ? 'bg-[#355746] text-[#FAF8F2] shadow-sm'
                  : 'text-[#4B382D] hover:text-[#243D32]'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Full Grid View</span>
            </button>
          </div>
        </div>

        <div className="max-w-3xl space-y-3">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-[#243D32] tracking-tight">
            Curated Works &amp; Creative Folders
          </h1>
          <p className="text-base sm:text-lg text-[#746F64] leading-relaxed">
            {viewMode === 'folders'
              ? 'เปิดสำรวจแฟ้มผลงานในรูปแบบ 3D Frosted Glass Folders แยกตามประเภทงาน คลิกที่โฟลเดอร์เพื่อกางไฟล์ออก และคลิกที่แผ่นผลงานเพื่อดูรายละเอียด'
              : 'Explore all individual projects, interactive systems, soundscapes, and applications with searchable technology tags.'}
          </p>
        </div>
      </StaggerItem>

      {/* Main Content Area: Folders Experience OR Grid View */}
      {viewMode === 'folders' ? (
        <StaggerItem className="space-y-10">
          {/* Subtle instruction banner */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl glass-panel-subtle text-xs sm:text-sm text-[#746F64]">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#80634D] animate-pulse" />
              <span>
                <strong>โฟลเดอร์กระจกแบบอินเทอร์แอคทีฟ:</strong> เลื่อนเมาส์ผ่านเพื่อเอียงโฟลเดอร์ · คลิกเพื่อเปิดแฟ้ม · คลิกที่แผ่นงานเพื่อเปิดดูโปรเจกต์
              </span>
            </div>
            <div className="hidden md:flex items-center gap-1.5 text-[11px] font-mono text-[#80634D] bg-[#FAF8F2]/80 px-2.5 py-1 rounded-full">
              <MousePointerClick className="w-3.5 h-3.5" />
              <span>CLICK TO EXPAND FILES</span>
            </div>
          </div>

          {/* 3D Glass Folders Showcase Grid */}
          <section className="relative rounded-3xl glass-panel p-6 sm:p-12 overflow-visible">
            {/* Ambient desk pattern */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-[0.09] rounded-3xl"
              style={{
                backgroundImage: 'radial-gradient(#243D32 1.2px, transparent 1.4px)',
                backgroundSize: '24px 24px',
              }}
            />

            <div className="relative grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-x-8 gap-y-16 items-end justify-items-center">
              {/* Folder 1: Web Applications */}
              <div className="flex flex-col items-center">
                <GlassFolder
                  label="Web Apps"
                  art="aurora"
                  seed={4}
                  action="add"
                  appearDelay={0}
                  files={webAppFiles}
                  onFileSelect={handleFileSelect}
                  onAdd={() => ({
                    name: 'New Concept ' + (webAppFiles.length + 1),
                    meta: 'Draft · Just added',
                    art: 'glacier',
                  })}
                  menu={[
                    { label: 'View All Web Projects', onSelect: () => setSelectedCategory('Web Development') },
                    { label: 'Copy Category Link', onSelect: () => navigator.clipboard?.writeText(window.location.href) },
                  ]}
                />
                <span className="mt-4 text-xs font-semibold uppercase tracking-wider text-[#80634D]">
                  Fullstack &amp; SaaS
                </span>
              </div>

              {/* Folder 2: Creative Media */}
              <div className="flex flex-col items-center">
                <GlassFolder
                  label="Media &amp; Video"
                  tone="dark"
                  art="ember"
                  seed={11}
                  action="more"
                  labelPlacement="top-left"
                  appearDelay={120}
                  files={creativeMediaFiles}
                  onFileSelect={handleFileSelect}
                  menu={[
                    { label: 'Filter Media Works', onSelect: () => setSelectedCategory('Video Editing') },
                    { label: 'View Editorial Magazine', onSelect: () => navigate('/projects/earth-and-canvas-magazine') },
                  ]}
                />
                <span className="mt-4 text-xs font-semibold uppercase tracking-wider text-[#80634D]">
                  Video &amp; Editorial Design
                </span>
              </div>

              {/* Folder 3: Creative Tech & Audio Lab */}
              <div className="flex flex-col items-center">
                <GlassFolder
                  label="Audio &amp; 3D Lab"
                  tone="light"
                  art="verdant"
                  seed={8}
                  action="add"
                  labelPlacement="bottom-left"
                  appearDelay={220}
                  files={labExperimentsFiles}
                  onFileSelect={handleFileSelect}
                  onAdd={() => ({
                    name: 'Generative Patch #' + Math.floor(Math.random() * 900 + 100),
                    meta: 'Audio Node · Active',
                    art: 'verdant',
                  })}
                />
                <span className="mt-4 text-xs font-semibold uppercase tracking-wider text-[#80634D]">
                  Audio API &amp; WebGL
                </span>
              </div>

              {/* Folder 4: Documents & Case Studies */}
              <div className="flex flex-col items-center">
                <GlassFolder
                  label="Archives &amp; Docs"
                  tone="light"
                  art="dusk"
                  seed={15}
                  action="more"
                  labelPlacement="top-right"
                  appearDelay={320}
                  files={archiveDocumentsFiles}
                  onFileSelect={handleFileSelect}
                  menu={[
                    { label: 'Download Resume', onSelect: () => navigate('/about') },
                    { label: 'View Skills Matrix', onSelect: () => navigate('/skills') },
                    { label: 'Contact Me', onSelect: () => navigate('/contact') },
                  ]}
                />
                <span className="mt-4 text-xs font-semibold uppercase tracking-wider text-[#80634D]">
                  Specs, Audits &amp; Docs
                </span>
              </div>
            </div>

            {/* Bottom Footer Callout */}
            <div className="mt-14 pt-8 border-t border-[#D9C8AA]/30 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
              <div>
                <p className="text-sm font-semibold text-[#243D32]">ต้องการดูรายละเอียดโปรเจกต์ทั้งหมดพร้อมกัน?</p>
                <p className="text-xs text-[#746F64]">สลับไปยังมุมมองตาราง หรือเลื่อนลงเพื่อดูโปรเจกต์เด่นด้านล่าง</p>
              </div>
              <button
                type="button"
                onClick={() => setViewMode('grid')}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#355746] text-[#FAF8F2] text-xs font-bold shadow-md hover:bg-[#243D32] transition-colors"
              >
                <FolderOpen className="w-4 h-4" />
                <span>เปิดดูโปรเจกต์ทั้งหมด (All Projects Grid)</span>
              </button>
            </div>
          </section>
        </StaggerItem>
      ) : null}

      {/* Filter and Search Bar for Projects Grid */}
      <StaggerItem>
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
      </StaggerItem>

      {/* Projects Grid List */}
      <StaggerItem>
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
      </StaggerItem>
    </StaggerContainer>
  );
};
