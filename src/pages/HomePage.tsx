import React, { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
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
        overflowViewport
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

    </div>
  );
};
