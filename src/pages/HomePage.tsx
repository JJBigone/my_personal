import React, { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Layers, 
  Sparkles, 
  Mail, 
  ExternalLink, 
  Download, 
  User 
} from 'lucide-react';
import { portfolioService } from '../services/portfolioService';
import type { Project } from '../types/portfolio';
import Hero12, { type Hero12Props } from '@/components/ui/hero-12';
import TechText from '@/components/ui/TechText';
import BlurText from '@/components/ui/BlurText';
import { TiltedGridHero } from '@/components/ui/tilted-grid-hero';

const HERO_VALUES: Hero12Props = {
  title: "Pacharaphum Maruek",
  titleNode: (
    <div className="w-full max-w-4xl h-[60px] sm:h-[80px] md:h-[105px] lg:h-[125px] relative select-none">
      <TechText
        text="Pacharaphum Maruek"
        fontWeight={800}
        fontSize={160}
        align="left"
        margin={0}
        color="#FFFFFF"
        accentColor="#82977B"
        reveal="letter"
        dashLength={5}
        dashGap={2.5}
        reach={260}
        specks={20}
        intro="none"
        introDuration={2}
        clickKick
        guides={false}
      />
    </div>
  ),
  description:
    "นักศึกษาวิทยาลัยเทคนิคนครศรีธรรมราช สาขาวิชาเทคโนโลยีสารสนเทศ",
  descriptionNode: (
    <BlurText
      text="นักศึกษาวิทยาลัยเทคนิคนครศรีธรรมราช สาขาวิชาเทคโนโลยีสารสนเทศ"
      effect="blur"
      animateBy="words"
      direction="top"
      staggerFrom="start"
      trigger="view"
      delay={70}
      stepDuration={0.35}
      blur={10}
      distance={25}
      className="text-white/95 leading-relaxed font-semibold text-base sm:text-lg md:text-xl drop-shadow-md"
    />
  ),
  backgroundImage: "/banner.png",
  backgroundAlt: "Pacharaphum Profile Hero Banner",
  animation: "subtle",
  primaryCTA: {
    ctaEnabled: true,
    text: "ดูชิ้นงานทั้งหมด",
    link: "/projects",
    size: "lg",
  },
  variant: "fullscreen",
};

export const HomePage: React.FC = () => {
  const [allProjects, setAllProjects] = useState<Project[]>([]);

  useEffect(() => {
    portfolioService.getPublishedProjects().then((data) => {
      setAllProjects(data);
    });
  }, []);

  const heroProjectImages = useMemo(() => {
    if (allProjects.length > 0) {
      return allProjects.map((p) => ({
        src: p.cover_image_url,
        alt: p.title,
      }));
    }
    return [
      {
        src: "/workshops/sdlc-slide-cover.png",
        alt: "SDLC Slides",
      },
      {
        src: "/workshops/อินโฟกราฟิกการพัฒนาระบบสารสนเทศ SDLC.png",
        alt: "Infographic SDLC",
      },
      {
        src: "/workshops/แผ่นงานพัฒนาระบบสารสนเทศ.png",
        alt: "Worksheet SDLC",
      },
      {
        src: "/workshops/แบบทดสอบระบบสารสนเทศโทนพาสเทล.png",
        alt: "Quiz Assessment",
      },
    ];
  }, [allProjects]);

  return (
    <div className="w-full overflow-x-hidden">
      {/* Fullscreen Hero12 Section with Floating Navbar */}
      <Hero12 {...HERO_VALUES} />

      {/* Full-width Edge-to-Edge Cylindrical 3D Showcase */}
      <section className="relative w-full border-t border-[#D9C8AA]/35 overflow-hidden bg-gradient-to-b from-[#FAF8F2] via-[#F3EBDD]/25 to-[#F3EBDD]/40">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage: "radial-gradient(#243D32 1.2px, transparent 1.4px)",
            backgroundSize: "28px 28px",
          }}
        />

        <TiltedGridHero
          images={heroProjectImages}
          speed={3.6}
          tileHeight={30}
          aspectRatio={16 / 9}
          gap={6}
          axis={54}
          curve={78}
          fade={12}
          className="h-[520px] sm:h-[600px] lg:h-[640px] w-full"
        >
          <div className="relative z-10 flex h-full flex-col items-center justify-between pt-12 sm:pt-14 pb-6 sm:pb-8 text-center pointer-events-none">
            {/* Header Content */}
            <div className="px-6 pointer-events-auto max-w-2xl space-y-2">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#243D32] drop-shadow-sm leading-snug">
                ชิ้นงานทั้งหมด
                <span className="text-lg sm:text-2xl font-semibold text-[#355746] block mt-1 sm:mt-2">
                  วิชาการวิเคราะห์และออกแบบระบบเชิงวัตถุ
                </span>
              </h2>
            </div>

            {/* Bottom Callout & Action */}
            <div className="px-6 pointer-events-auto max-w-xl">
              <div className="flex items-center justify-center gap-3">
                <Link
                  to="/projects"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#355746] hover:bg-[#243D32] text-[#FAF8F2] font-bold text-sm shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#355746]"
                >
                  <span>สำรวจผลงานในโฟลเดอร์ 3D</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </TiltedGridHero>
      </section>

      {/* SECTION: Featured Workshops (Clean, Scannable Grid) */}
      <section className="py-16 sm:py-20 px-4 sm:px-8 border-t border-[#D9C8AA]/30 bg-[#FAF8F2]">
        <div className="max-w-6xl mx-auto space-y-10">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#82977B]/20 pb-6">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full glass-panel text-xs font-bold uppercase tracking-wider text-[#355746]">
                <Layers className="w-3.5 h-3.5 text-[#80634D]" />
                <span>ผลงานในรายวิชา</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#243D32] tracking-tight">
                หน่วยการเรียนรู้ที่ 1: การพัฒนาระบบสารสนเทศและ SDLC
              </h2>
            </div>

            <Link
              to="/projects?view=grid"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#355746] hover:text-[#243D32] self-start sm:self-auto hover:underline"
            >
              <span>ดูแบบตารางทั้งหมด (Grid View)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Grid of 4 Workshops - Clean & Minimalist */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {allProjects.slice(0, 4).map((item) => (
              <div
                key={item.id}
                className="group glass-panel rounded-3xl overflow-hidden border border-[#D9C8AA]/45 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Image container */}
                  <div className="relative aspect-video overflow-hidden bg-[#F3EBDD]/50 p-3 flex items-center justify-center">
                    <img
                      src={item.cover_image_url}
                      alt={item.title}
                      loading="lazy"
                      className="w-full h-full object-contain drop-shadow-md transition-transform duration-500 group-hover:scale-102"
                    />

                    {/* Badge */}
                    {item.gallery_images && item.gallery_images.length > 0 && (
                      <div className="absolute top-3 right-3 flex items-center gap-1 bg-[#355746] text-[#FAF8F2] px-3 py-1 rounded-full text-[11px] font-bold shadow-md">
                        <Sparkles className="w-3 h-3 text-[#D9C8AA]" />
                        <span>สไลด์ {item.gallery_images.length} หน้า</span>
                      </div>
                    )}
                  </div>

                  {/* Body Info */}
                  <div className="p-5 sm:p-6 space-y-2">
                    <h3 className="text-lg sm:text-xl font-bold text-[#243D32] group-hover:text-[#355746] transition-colors leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#746F64] leading-relaxed line-clamp-2">
                      {item.short_description}
                    </p>
                  </div>
                </div>

                {/* Footer Actions */}
                <div className="p-5 sm:p-6 pt-0 border-t border-[#D9C8AA]/25 mt-2 flex items-center justify-between gap-3">
                  <Link
                    to={`/projects/${item.slug}`}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#355746] hover:bg-[#243D32] text-[#FAF8F2] text-xs font-bold shadow-sm transition-all hover:scale-105 active:scale-95"
                  >
                    <span>เปิดดูชิ้นงาน</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>

                  {item.source_code_url?.endsWith('.pptx') ? (
                    <a
                      href={item.source_code_url}
                      download
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-[#D04423]/10 hover:bg-[#D04423] text-[#D04423] hover:text-white border border-[#D04423]/25 text-xs font-bold transition-all"
                      title="ดาวน์โหลดไฟล์ PowerPoint .pptx"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>.PPTX</span>
                    </a>
                  ) : item.project_url ? (
                    <a
                      href={item.project_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-3.5 py-2 rounded-full bg-[#FAF8F2] hover:bg-[#F3EBDD] text-[#355746] border border-[#82977B]/25 text-xs font-semibold transition-all"
                    >
                      <span>ไฟล์แนบ</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION: Author Dossier (Clean, Concise, No Clutter) */}
      <section className="py-14 sm:py-16 px-4 sm:px-8 max-w-4xl mx-auto w-full">
        <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-[#82977B]/30 shadow-lg flex flex-col sm:flex-row items-center gap-6 sm:gap-8">
          {/* Photo */}
          <div className="w-32 h-40 sm:w-36 sm:h-44 rounded-2xl overflow-hidden border-2 border-[#82977B]/40 shadow-md shrink-0 bg-[#0e1a14]">
            <img
              src="/profile-card.webp"
              alt="พชรภูมิ มฤค"
              className="w-full h-full object-cover object-top"
            />
          </div>

          {/* Info */}
          <div className="space-y-3 text-center sm:text-left flex-1 min-w-0">
            <div>
              <span className="text-xs font-bold text-[#82977B] uppercase tracking-wider block">
                ข้อมูลผู้จัดทำ
              </span>
              <h3 className="text-2xl font-black text-[#243D32] tracking-tight">
                นายพชรภูมิ มฤค (เจเดม)
              </h3>
              <p className="text-xs sm:text-sm text-[#355746] font-semibold mt-0.5">
                ปวส. 1 • แผนกวิชาเทคโนโลยีสารสนเทศ วิทยาลัยเทคนิคนครศรีธรรมราช
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs text-[#746F64]">
              <span>รหัสนักศึกษา: <strong className="text-[#243D32] font-mono">69319010009</strong> (กลุ่ม 1)</span>
              <span>โทร: <a href="tel:0623058410" className="text-[#355746] font-bold hover:underline">062-3058410</a></span>
            </div>

            <div className="pt-2 flex flex-wrap items-center justify-center sm:justify-start gap-3">
              <Link
                to="/about"
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-[#355746] hover:bg-[#243D32] text-[#FAF8F2] font-bold text-xs shadow-md transition-all hover:scale-105 active:scale-95"
              >
                <User className="w-3.5 h-3.5" />
                <span>ดูประวัติส่วนตัวฉบับเต็ม</span>
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-white hover:bg-[#F3EBDD] text-[#355746] font-bold text-xs border border-[#82977B]/30 transition-all"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>ส่งข้อความติดต่อ</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
