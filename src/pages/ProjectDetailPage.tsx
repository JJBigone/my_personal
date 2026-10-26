import React, { useEffect, useState, useCallback, useRef } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { portfolioService } from '../services/portfolioService';
import type { Project } from '../types/portfolio';
import { 
  ArrowLeft, 
  ExternalLink, 
  Sparkles, 
  Calendar, 
  Tag, 
  ShieldCheck, 
  ChevronLeft, 
  ChevronRight, 
  Maximize2, 
  Minimize2,
  Download,
  Layers
} from 'lucide-react';
import { StaggerContainer, StaggerItem } from '../components/motion/StaggerGroup';

export const ProjectDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const location = useLocation();
  const initialProject = (location.state as { initialProject?: Project } | null)?.initialProject;

  const [project, setProject] = useState<Project | null>(initialProject || null);
  const [loading, setLoading] = useState(!initialProject);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const slideContainerRef = useRef<HTMLDivElement>(null);
  const thumbnailsRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = Boolean(useReducedMotion());

  useEffect(() => {
    if (slug) {
      portfolioService.getProjectBySlug(slug).then((data) => {
        setProject(data);
        setLoading(false);
      });
    }
  }, [slug]);

  // Slide navigation
  const slides = project?.gallery_images || [];
  const totalSlides = slides.length;

  const goToPrevSlide = useCallback(() => {
    setCurrentSlideIndex((prev) => (prev > 0 ? prev - 1 : totalSlides - 1));
  }, [totalSlides]);

  const goToNextSlide = useCallback(() => {
    setCurrentSlideIndex((prev) => (prev < totalSlides - 1 ? prev + 1 : 0));
  }, [totalSlides]);

  // Keyboard navigation
  useEffect(() => {
    if (totalSlides === 0) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        goToPrevSlide();
      } else if (e.key === 'ArrowRight') {
        goToNextSlide();
      } else if (e.key === 'Escape' && isFullscreen) {
        setIsFullscreen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [totalSlides, goToPrevSlide, goToNextSlide, isFullscreen]);

  // Scroll active thumbnail into view
  useEffect(() => {
    if (thumbnailsRef.current) {
      const activeThumb = thumbnailsRef.current.children[currentSlideIndex] as HTMLElement;
      if (activeThumb) {
        activeThumb.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }
  }, [currentSlideIndex]);

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  if (loading) {
    return (
      <div className="space-y-6 max-w-4xl mx-auto pt-28 pb-16 px-4 sm:px-8 w-full">
        <div className="h-6 w-32 glass-panel rounded-full animate-pulse" />
        <div className="h-12 w-3/4 glass-panel rounded-2xl animate-pulse" />
        <div className="aspect-video glass-panel rounded-3xl animate-pulse" />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="glass-panel rounded-3xl p-12 text-center space-y-4 max-w-md mx-auto my-24">
        <h2 className="text-2xl font-bold text-[#243D32]">Workshop Not Found</h2>
        <p className="text-sm text-[#746F64]">
          The requested workshop might have been moved, unpublished, or doesn't exist.
        </p>
        <Link
          to="/projects?view=grid"
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#355746] text-[#FAF8F2] text-sm font-semibold"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Workshops</span>
        </Link>
      </div>
    );
  }

  const isSlidePresentation = totalSlides > 0;

  return (
    <article className="max-w-5xl mx-auto w-full pt-28 pb-16 px-4 sm:px-8">
      <StaggerContainer className="space-y-12">
        {/* Back button */}
        <StaggerItem subtle>
          <Link
            to="/projects?view=grid"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#4B382D] hover:text-[#243D32] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#355746] rounded-full px-3 py-1 -ml-3"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>ย้อนกลับสู่หน้ารายการผลงาน (Grid View)</span>
          </Link>
        </StaggerItem>

        {/* Header Info */}
        <StaggerItem className="space-y-4">
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
            {isSlidePresentation && (
              <span className="flex items-center gap-1.5 bg-[#355746]/10 text-[#355746] border border-[#355746]/20 px-3 py-1 rounded-full text-xs font-semibold">
                <Layers className="w-3.5 h-3.5" />
                <span>สไลด์นำเสนอ {totalSlides} หน้า (กดดูได้ทีละหน้า)</span>
              </span>
            )}
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#243D32] tracking-tight leading-tight">
            {project.title}
          </h1>

          <p className="text-lg text-[#746F64] leading-relaxed max-w-2xl">
            {project.short_description}
          </p>

          {/* Action Links */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            {project.source_code_url && project.source_code_url.endsWith('.pptx') && (
              <a
                href={project.source_code_url}
                download
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#D04423] hover:bg-[#B33517] text-white text-sm font-semibold shadow-lg transition-all hover:scale-105 active:scale-95"
              >
                <Download className="w-4 h-4" />
                <span>ดาวน์โหลด PowerPoint (.pptx)</span>
              </a>
            )}
            {project.project_url && (
              <a
                href={project.project_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#355746] hover:bg-[#243D32] text-[#FAF8F2] text-sm font-semibold shadow-md transition-all hover:scale-105 active:scale-95"
              >
                <span>
                  {project.project_url.endsWith('.pdf')
                    ? 'เปิดดูเอกสาร PDF เต็มจอ'
                    : project.project_url.match(/\.(png|jpg|jpeg|webp)$/i)
                    ? 'เปิดดูรูปภาพต้นฉบับ'
                    : 'Live Demonstration'}
                </span>
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>
        </StaggerItem>

        {/* Media / Slide Presentation Viewer */}
        <StaggerItem className="space-y-6">
          {isSlidePresentation ? (
            <div 
              ref={slideContainerRef}
              className={`w-full rounded-3xl overflow-hidden glass-panel p-4 sm:p-6 shadow-2xl bg-gradient-to-br from-[#FAF8F2] via-white to-[#EAE4D7] border border-[#82977B]/30 flex flex-col items-center transition-all ${
                isFullscreen 
                  ? 'fixed inset-0 z-50 rounded-none p-4 sm:p-8 bg-black/95 max-w-none flex flex-col justify-between' 
                  : ''
              }`}
            >
              {/* Slide Controller Bar */}
              <div className="w-full flex items-center justify-between pb-3 sm:pb-4 border-b border-[#82977B]/20">
                <div className="flex items-center gap-2">
                  <span className={`text-xs sm:text-sm font-bold px-3 py-1 rounded-full ${
                    isFullscreen ? 'bg-white/20 text-white' : 'bg-[#355746] text-[#FAF8F2]'
                  }`}>
                    สไลด์ {currentSlideIndex + 1} / {totalSlides}
                  </span>
                  <span className={`text-xs hidden sm:inline ${
                    isFullscreen ? 'text-neutral-300' : 'text-[#746F64]'
                  }`}>
                    (ใช้ปุ่มลูกศร ⬅️ ➡️ บนแป้นพิมพ์เพื่อเปลี่ยนสไลด์ได้)
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={goToPrevSlide}
                    className={`p-2 rounded-full border transition-all active:scale-90 ${
                      isFullscreen 
                        ? 'bg-white/10 hover:bg-white/20 text-white border-white/20' 
                        : 'bg-white hover:bg-[#355746] hover:text-white text-[#355746] border-[#82977B]/30 shadow-sm'
                    }`}
                    title="สไลด์ก่อนหน้า (Arrow Left)"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    type="button"
                    onClick={goToNextSlide}
                    className={`p-2 rounded-full border transition-all active:scale-90 ${
                      isFullscreen 
                        ? 'bg-white/10 hover:bg-white/20 text-white border-white/20' 
                        : 'bg-white hover:bg-[#355746] hover:text-white text-[#355746] border-[#82977B]/30 shadow-sm'
                    }`}
                    title="สไลด์ถัดไป (Arrow Right)"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                  <button
                    type="button"
                    onClick={toggleFullscreen}
                    className={`p-2 rounded-full border transition-all active:scale-90 ${
                      isFullscreen 
                        ? 'bg-white/20 hover:bg-white/30 text-white border-white/30' 
                        : 'bg-white hover:bg-[#80634D] hover:text-white text-[#80634D] border-[#82977B]/30 shadow-sm'
                    }`}
                    title={isFullscreen ? 'ย่อหน้าต่าง (Esc)' : 'ขยายเต็มหน้าจอ'}
                  >
                    {isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Main Slide Display with Animated Transition */}
              <div className="relative w-full flex-1 flex items-center justify-center my-4 overflow-hidden rounded-2xl min-h-[300px] sm:min-h-[500px]">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentSlideIndex}
                    src={slides[currentSlideIndex]}
                    alt={`${project.title} - สไลด์ที่ ${currentSlideIndex + 1}`}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.25, ease: 'easeOut' }}
                    className={`w-full max-h-[75vh] object-contain rounded-xl drop-shadow-2xl select-none ${
                      isFullscreen ? 'max-h-[80vh]' : ''
                    }`}
                  />
                </AnimatePresence>

                {/* Overlay Navigation Buttons on image for easy touch/click */}
                <button
                  type="button"
                  onClick={goToPrevSlide}
                  className="absolute left-2 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/40 hover:bg-black/70 text-white backdrop-blur-md transition-all opacity-70 hover:opacity-100 hover:scale-110 active:scale-95"
                  aria-label="Previous Slide"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  type="button"
                  onClick={goToNextSlide}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/40 hover:bg-black/70 text-white backdrop-blur-md transition-all opacity-70 hover:opacity-100 hover:scale-110 active:scale-95"
                  aria-label="Next Slide"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-[#82977B]/20 h-1.5 rounded-full overflow-hidden mb-3">
                <div 
                  className="bg-[#355746] h-full transition-all duration-300"
                  style={{ width: `${((currentSlideIndex + 1) / totalSlides) * 100}%` }}
                />
              </div>

              {/* Slide Thumbnail Strip */}
              <div 
                ref={thumbnailsRef}
                className="w-full flex items-center gap-2.5 overflow-x-auto py-2 px-1 scrollbar-thin scrollbar-thumb-[#82977B]/40"
              >
                {slides.map((slideSrc, idx) => {
                  const isActive = idx === currentSlideIndex;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setCurrentSlideIndex(idx)}
                      className={`relative flex-shrink-0 w-20 sm:w-28 aspect-video rounded-lg overflow-hidden border-2 transition-all ${
                        isActive 
                          ? 'border-[#355746] scale-105 shadow-md ring-2 ring-[#355746]/40' 
                          : 'border-transparent opacity-60 hover:opacity-100 hover:border-[#82977B]/50'
                      }`}
                    >
                      <img 
                        src={slideSrc} 
                        alt={`หน้า ${idx + 1}`}
                        className="w-full h-full object-cover" 
                        loading="lazy"
                      />
                      <span className={`absolute bottom-0.5 right-0.5 text-[9px] font-bold px-1 rounded ${
                        isActive ? 'bg-[#355746] text-white' : 'bg-black/70 text-white'
                      }`}>
                        {idx + 1}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          ) : project.project_url?.endsWith('.pdf') ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between px-2">
                <span className="text-sm font-bold text-[#355746] flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#80634D] animate-pulse" />
                  <span>เอกสาร PDF ฉบับเต็ม (เลื่อนดูได้ทุกหน้า)</span>
                </span>
                <a
                  href={project.project_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-semibold text-[#80634D] hover:text-[#355746] flex items-center gap-1 underline"
                >
                  <span>เปิดเต็มจอในแท็บใหม่</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
              <div className="w-full h-[750px] sm:h-[900px] rounded-3xl overflow-hidden glass-panel border border-[#82977B]/40 shadow-2xl bg-white">
                <iframe
                  src={`${project.project_url}#toolbar=1&navpanes=1&scrollbar=1&view=FitH`}
                  title={project.title}
                  className="w-full h-full border-0"
                />
              </div>
            </div>
          ) : (
            <div className="w-full rounded-3xl overflow-hidden glass-panel p-3 sm:p-5 shadow-2xl bg-gradient-to-br from-[#FAF8F2] via-white to-[#EAE4D7] border border-[#82977B]/30 flex flex-col items-center">
              <motion.img
                layoutId={shouldReduceMotion ? undefined : `project-cover-${project.slug || project.id}`}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                src={project.cover_image_url}
                alt={project.title}
                className="w-full max-h-[85vh] object-contain rounded-2xl drop-shadow-xl"
              />
              <span className="text-xs text-[#746F64] mt-3 font-medium">
                แสดงผลรูปภาพเต็มขนาด ย่อ-ขยายตามขนาดหน้าจอโดยไม่ตัดขอบ
              </span>
            </div>
          )}
        </StaggerItem>

        {/* Meta Specs Grid */}
        <StaggerItem>
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
        </StaggerItem>

        {/* Detailed Description */}
        <StaggerItem className="space-y-6">
          <h2 className="text-2xl font-bold text-[#243D32]">Workshop Overview &amp; Execution</h2>
          <div className="glass-panel rounded-3xl p-8 space-y-4 text-[#4B382D] leading-relaxed text-base whitespace-pre-line">
            {project.description || project.short_description}
          </div>
        </StaggerItem>

        {/* Technologies & Tags */}
        <StaggerItem className="space-y-4">
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
        </StaggerItem>

        {/* Bottom Back Button */}
        <StaggerItem className="pt-6 border-t border-[#82977B]/20 flex justify-center">
          <Link
            to="/projects?view=grid"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-[#355746] hover:bg-[#243D32] text-[#FAF8F2] font-bold text-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>ย้อนกลับสู่หน้ารายการผลงานทั้งหมด (Grid View)</span>
          </Link>
        </StaggerItem>
      </StaggerContainer>
    </article>
  );
};
