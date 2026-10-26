import React, { useEffect, useState, useMemo, useRef, useCallback } from 'react';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import { portfolioService } from '../services/portfolioService';
import type { Project } from '../types/portfolio';
import { ProjectCard } from '../components/projects/ProjectCard';
import Folder, { type FolderItem } from '../components/ui/Folder';
import { Sparkles, ArrowRight, Layers, LayoutGrid, Search, Filter, X, FileText } from 'lucide-react';

export const ProjectsPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  // Read initial view mode from URL param (?view=grid) or fallback to sessionStorage / default
  const [viewMode, setViewMode] = useState<'folders' | 'grid'>(() => {
    const urlView = searchParams.get('view');
    if (urlView === 'grid' || urlView === 'folders') return urlView;
    try {
      const saved = sessionStorage.getItem('workshops_view_mode');
      if (saved === 'grid' || saved === 'folders') return saved;
    } catch {
      // ignore
    }
    return 'folders';
  });

  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeItemToast, setActiveItemToast] = useState<{ title: string; href?: string } | null>(null);
  const [isFolderModalOpen, setIsFolderModalOpen] = useState(false);

  const toastRef = useRef<HTMLDivElement>(null);

  // Sync viewMode changes to URL and sessionStorage
  const handleViewModeChange = useCallback((mode: 'folders' | 'grid') => {
    setViewMode(mode);
    try {
      sessionStorage.setItem('workshops_view_mode', mode);
    } catch {
      // ignore
    }
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        next.set('view', mode);
        return next;
      },
      { replace: true }
    );
  }, [setSearchParams]);

  // Sync if URL search params change (e.g. user navigated back from project detail with ?view=grid)
  useEffect(() => {
    const urlView = searchParams.get('view');
    if (urlView === 'grid' && viewMode !== 'grid') {
      setViewMode('grid');
      try {
        sessionStorage.setItem('workshops_view_mode', 'grid');
      } catch {
        // ignore
      }
    } else if (urlView === 'folders' && viewMode !== 'folders') {
      setViewMode('folders');
      try {
        sessionStorage.setItem('workshops_view_mode', 'folders');
      } catch {
        // ignore
      }
    }
  }, [searchParams, viewMode]);

  useEffect(() => {
    // If the cache contains legacy initial mock data, clear it so user starts fresh
    localStorage.removeItem('portfolio_custom_projects');

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
    const q = searchQuery.trim().toLowerCase();

    return projects.filter((project) => {
      const matchCategory = selectedCategory === 'All' || project.category === selectedCategory;

      if (!q) return matchCategory;

      const titleMatch = project.title?.toLowerCase().includes(q) ?? false;
      const shortDescMatch = project.short_description?.toLowerCase().includes(q) ?? false;
      const descMatch = project.description?.toLowerCase().includes(q) ?? false;
      const categoryMatch = project.category?.toLowerCase().includes(q) ?? false;
      const tagsMatch = project.tags?.some((t) => t.toLowerCase().includes(q)) ?? false;
      const techMatch = project.technologies?.some((t) => t.toLowerCase().includes(q)) ?? false;

      const matchSearch = titleMatch || shortDescMatch || descMatch || categoryMatch || tagsMatch || techMatch;

      return matchCategory && matchSearch;
    });
  }, [projects, selectedCategory, searchQuery]);


  // Dynamic items mapped from projects data
  const unit1Items: FolderItem[] = useMemo(() => {
    return projects
      .filter((p) => p.category?.includes('หน่วยการเรียนรู้ที่ 1') || p.tags?.some(t => t.includes('หน่วยการเรียนรู้ที่ 1')))
      .map((p) => ({
        title: p.title,
        description: p.short_description,
        image: p.cover_image_url,
        href: `/projects/${p.slug}`,
      }));
  }, [projects]);


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
            {viewMode === 'folders' ? '3D Folders' : 'All Workshops'}
          </span>
        </div>

        {/* View Mode Switcher (Folders vs Full Grid) */}
        <div className="flex items-center p-1 rounded-2xl glass-panel shadow-sm border border-[#D9C8AA]/40">
          <button
            type="button"
            onClick={() => {
              setActiveItemToast(null);
              handleViewModeChange('folders');
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
              handleViewModeChange('grid');
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
              <Link
                to={activeItemToast.href}
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveItemToast(null);
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#FAF8F2] text-[#243D32] hover:bg-[#F3EBDD] font-bold text-xs shadow-md transition-all cursor-pointer z-50 hover:scale-105 active:scale-95"
              >
                <span>View Workshop</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            )}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setActiveItemToast(null);
              }}
              className="px-2.5 py-1 rounded-full text-xs text-[#FAF8F2]/70 hover:text-white transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Mode 1: 3D Folders (Full Width & Clean) */}
      {viewMode === 'folders' ? (
        projects.length === 0 && !loading ? (
          <div className="w-full max-w-2xl mx-auto my-auto py-16 px-6 text-center glass-panel rounded-3xl space-y-4 border border-[#82977B]/30 shadow-lg">
            <div className="w-16 h-16 rounded-2xl bg-[#355746]/10 border border-[#355746]/20 flex items-center justify-center mx-auto text-[#355746]">
              <Layers className="w-8 h-8 opacity-75" />
            </div>
            <h3 className="text-xl font-bold text-[#243D32]">ยังไม่มีผลงานในระบบ</h3>
            <p className="text-sm text-[#746F64] max-w-md mx-auto">
              ผลงานตัวอย่างถูกนำออกเรียบร้อยแล้ว คุณสามารถเข้าสู่ระบบ Admin เพื่อเพิ่มผลงานจริงได้ในภายหลัง
            </p>
          </div>
        ) : (
        <div
          className="w-full max-w-[1600px] flex-1 flex flex-col justify-center items-center py-8 my-auto"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setActiveItemToast(null);
            }
          }}
        >
          <div className="w-full flex justify-center items-center py-10">
            {/* 1. การพัฒนาระบบสารสนเทศ หน่วยการเรียนรู้ที่ 1 */}
            <div 
              className="flex flex-col items-center relative transition-all duration-300 cursor-pointer group"
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
                handleViewModeChange('grid');
              }}
            >
              <Folder
                label="การพัฒนาระบบสารสนเทศ หน่วยการเรียนรู้ที่ 1"
                mode="flap"
                variant="solid"
                color="#355746"
                paperColor="#FAF8F2"
                theme="light"
                size={1.25}
                draggable={false}
                items={unit1Items}
                onItemClick={() => {
                  setSelectedCategory('All');
                  setSearchQuery('');
                  handleViewModeChange('grid');
                }}
              />
              <div className="mt-8 text-center max-w-[340px] space-y-3">
                <div>
                  <span className="text-lg sm:text-xl font-black text-[#355746] tracking-wide block leading-snug group-hover:text-[#243D32] transition-colors">
                    การพัฒนาระบบสารสนเทศ
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-[#80634D] block mt-1">
                    หน่วยการเรียนรู้ที่ 1
                  </span>
                </div>
                
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedCategory('All');
                    setSearchQuery('');
                    handleViewModeChange('grid');
                  }}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#355746] hover:bg-[#243D32] text-[#FAF8F2] font-bold text-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
                >
                  <LayoutGrid className="w-4 h-4 text-[#D9C8AA]" />
                  <span>เปิดดูในมุมมอง Grid ({unit1Items.length} ชิ้น)</span>
                </button>
              </div>
            </div>
          </div>
        </div>
        )
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

            {/* Search Input with Clear Button */}
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-[#746F64] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="ค้นหาผลงาน, สไลด์, SDLC, เครื่องมือ..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-9 py-2 text-sm rounded-full glass-input text-[#243D32] placeholder:text-[#746F64]/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#355746]"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-[#746F64] hover:text-[#243D32] rounded-full hover:bg-stone-200/50 transition-colors cursor-pointer"
                  title="ล้างคำค้นหา"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </section>

          {/* Search Result Feedback */}
          {searchQuery.trim() && (
            <div className="flex items-center justify-between px-2 text-xs text-[#746F64]">
              <span>
                ผลการค้นหาสำหรับ "<strong>{searchQuery.trim()}</strong>" {selectedCategory !== 'All' ? `ในหมวด ${selectedCategory}` : ''}: พบ {filteredProjects.length} ผลงาน
              </span>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                }}
                className="text-[#355746] font-semibold hover:underline"
              >
                ล้างการค้นหาทั้งหมด
              </button>
            </div>
          )}

          {/* Projects Grid List */}
          <section>
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((n) => (
                  <div key={n} className="glass-panel h-80 rounded-3xl animate-pulse" />
                ))}
              </div>
            ) : filteredProjects.length === 0 ? (
              <div className="glass-panel rounded-3xl p-12 text-center space-y-4">
                <h3 className="text-xl font-bold text-[#243D32]">
                  {projects.length === 0 ? 'ยังไม่มีผลงานในระบบ' : 'ไม่พบผลงานที่ตรงกับคำค้นหา'}
                </h3>
                <p className="text-sm text-[#746F64] max-w-md mx-auto">
                  {projects.length === 0
                    ? 'ผลงานตัวอย่างถูกนำออกแล้ว สามารถเข้าสู่ระบบ Admin เพื่อเพิ่มผลงานจริงได้'
                    : `ไม่พบผลงานที่ตรงกับ "${searchQuery.trim()}" ${
                        selectedCategory !== 'All' ? `ในหมวดหมู่ "${selectedCategory}"` : ''
                      }`}
                </p>
                <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                  {selectedCategory !== 'All' && (
                    <button
                      type="button"
                      onClick={() => setSelectedCategory('All')}
                      className="px-5 py-2 rounded-full bg-[#FAF8F2] border border-[#355746] text-[#355746] text-xs font-semibold hover:bg-[#355746] hover:text-white transition-colors"
                    >
                      ค้นหาคำนี้ในทุกหมวดหมู่ (All)
                    </button>
                  )}
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      className="px-5 py-2 rounded-full bg-[#355746] text-[#FAF8F2] text-xs font-semibold hover:bg-[#243D32] transition-colors"
                    >
                      ล้างคำค้นหา
                    </button>
                  )}
                </div>
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

      {/* Fullscreen Folder Overview Modal */}
      {isFolderModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8 bg-black/70 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setIsFolderModalOpen(false)}
        >
          <div
            className="relative w-full max-w-6xl max-h-[92vh] flex flex-col bg-[#FAF8F2] rounded-3xl border border-[#82977B]/40 shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 sm:px-8 py-5 border-b border-[#D9C8AA]/40 bg-white/70 backdrop-blur-md">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#355746] text-[#FAF8F2] flex items-center justify-center shadow-md">
                  <Layers className="w-5 h-5 text-[#D9C8AA]" />
                </div>
                <div>
                  <h2 className="text-lg sm:text-xl font-black text-[#243D32]">
                    การพัฒนาระบบสารสนเทศ หน่วยการเรียนรู้ที่ 1
                  </h2>
                  <p className="text-xs text-[#746F64]">
                    รายการเอกสารและผลงานทั้งหมด ({unit1Items.length} ชิ้น) • คลิกเพื่อเปิดดูฉบับเต็ม
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsFolderModalOpen(false)}
                className="w-10 h-10 rounded-full flex items-center justify-center bg-stone-100 hover:bg-stone-200 text-[#243D32] transition-colors cursor-pointer"
                title="ปิด"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body - Large, Clear Preview Grid */}
            <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects
                  .filter((p) => p.category?.includes('หน่วยการเรียนรู้ที่ 1') || p.tags?.some((t) => t.includes('หน่วยการเรียนรู้ที่ 1')))
                  .map((project) => (
                    <div
                      key={project.id}
                      onClick={() => {
                        setIsFolderModalOpen(false);
                        navigate(`/projects/${project.slug}`);
                      }}
                      className="group cursor-pointer flex flex-col bg-white rounded-3xl border border-[#82977B]/30 hover:border-[#355746] shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden hover:-translate-y-1"
                    >
                      {/* Large Thumbnail Preview */}
                      <div className="relative aspect-video sm:aspect-16/10 bg-gradient-to-br from-[#FAF8F2] to-[#EAE4D7] p-2 flex items-center justify-center overflow-hidden">
                        <img
                          src={project.cover_image_url}
                          alt={project.title}
                          className="w-full h-full object-contain drop-shadow-md group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-3 left-3">
                          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#355746] text-white shadow-sm flex items-center gap-1">
                            {project.project_url?.endsWith('.pdf') ? (
                              <>
                                <FileText className="w-3 h-3 text-[#D9C8AA]" />
                                <span>PDF Document</span>
                              </>
                            ) : (
                              <>
                                <Sparkles className="w-3 h-3 text-[#D9C8AA]" />
                                <span>Infographic / Image</span>
                              </>
                            )}
                          </span>
                        </div>
                      </div>

                      {/* Content Info */}
                      <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                        <div className="space-y-1.5">
                          <h3 className="text-base font-bold text-[#243D32] group-hover:text-[#355746] transition-colors leading-snug">
                            {project.title}
                          </h3>
                          <p className="text-xs text-[#746F64] line-clamp-2 leading-relaxed">
                            {project.short_description}
                          </p>
                        </div>

                        <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
                          <span className="text-[11px] font-semibold text-[#80634D]">
                            ดูรายละเอียดฉบับเต็ม
                          </span>
                          <div className="w-7 h-7 rounded-full bg-[#355746]/10 group-hover:bg-[#355746] text-[#355746] group-hover:text-white flex items-center justify-center transition-colors">
                            <ArrowRight className="w-3.5 h-3.5" />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 sm:px-8 py-4 border-t border-[#D9C8AA]/40 bg-white/70 flex items-center justify-between text-xs text-[#746F64]">
              <span>💡 คลิกที่การ์ดเพื่อเปิดอ่านเอกสาร PDF หรือรูปภาพฉบับเต็ม</span>
              <button
                type="button"
                onClick={() => setIsFolderModalOpen(false)}
                className="px-5 py-2 rounded-full bg-[#355746] text-white font-bold hover:bg-[#243D32] transition-colors cursor-pointer"
              >
                ปิดหน้าต่าง
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectsPage;
