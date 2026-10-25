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
    "นักศึกษาวิทยาลัยเทคนิคนครศรีธรรมราช สาขาวิชาเทคโนโลยีสารสนเทศ มีความสนใจด้านการพัฒนาซอฟต์แวร์ สื่ออินเทอร์แอคทีฟ และการพัฒนาเว็บแอปพลิเคชันสมัยใหม่",
  descriptionNode: (
    <BlurText
      text="นักศึกษาวิทยาลัยเทคนิคนครศรีธรรมราช สาขาวิชาเทคโนโลยีสารสนเทศ มีความสนใจด้านการพัฒนาซอฟต์แวร์ สื่ออินเทอร์แอคทีฟ และการพัฒนาเว็บแอปพลิเคชันสมัยใหม่"
      effect="blur"
      animateBy="words"
      direction="top"
      staggerFrom="start"
      trigger="view"
      delay={70}
      stepDuration={0.35}
      blur={10}
      distance={25}
      className="text-white/95 leading-relaxed font-medium text-base sm:text-lg md:text-xl drop-shadow-md"
    />
  ),
  backgroundImage: "/banner.png",
  backgroundAlt: "Pacharaphum Profile Hero Banner",
  animation: "subtle",
  primaryCTA: {
    ctaEnabled: true,
    text: "Explore Workshops",
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
        src: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1200&auto=format&fit=crop",
        alt: "AuraCraft Gaming Hub",
      },
      {
        src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop",
        alt: "Nexus Telemetry Cockpit",
      },
      {
        src: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop",
        alt: "Earth & Canvas Magazine",
      },
      {
        src: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=1200&auto=format&fit=crop",
        alt: "Lumina Video Stream Manager",
      },
      {
        src: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=1200&auto=format&fit=crop",
        alt: "Verdant Soundboard Synthesizer",
      },
      {
        src: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop",
        alt: "CyberForge 3D Studio",
      },
      {
        src: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1200&auto=format&fit=crop",
        alt: "Botanica Brand Lookbook",
      },
    ];
  }, [allProjects]);

  return (
    <div className="w-full overflow-x-hidden">
      {/* Fullscreen Hero12 Section with Floating Navbar */}
      <Hero12 {...HERO_VALUES} />

      {/* Full-width Edge-to-Edge Cylindrical 3D Showcase */}
      <section className="relative w-full border-t border-[#D9C8AA]/35 overflow-hidden bg-gradient-to-b from-[#FAF8F2] via-[#F3EBDD]/25 to-[#F3EBDD]/40">
        {/* Subtle background mesh grid */}
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
          className="h-[580px] sm:h-[660px] lg:h-[700px] w-full"
        >
          <div className="relative z-10 flex h-full flex-col items-center justify-between pt-12 sm:pt-14 pb-6 sm:pb-8 text-center pointer-events-none">
            {/* Header Content */}
            <div className="px-6 pointer-events-auto max-w-3xl space-y-3">
              <h2 className="text-balance text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#243D32] drop-shadow-sm leading-snug">
                ชิ้นงานทั้งหมด
                <br />
                <span className="text-xl sm:text-2xl md:text-3xl font-semibold text-[#355746] block mt-2 sm:mt-3">
                  รายวิชาการวิเคราะห์และออกแบบระบบเชิงวัตถุ
                </span>
              </h2>
            </div>

            {/* Bottom Callout & Action */}
            <div className="px-6 pointer-events-auto space-y-4 max-w-2xl">
              <p className="text-balance text-xs sm:text-sm md:text-base text-[#4B382D] font-medium leading-relaxed bg-[#FAF8F2]/90 backdrop-blur-md px-6 py-3 rounded-2xl sm:rounded-3xl border border-[#D9C8AA]/60 shadow-md">
                ศึกษาและออกแบบระบบสารสนเทศเชิงวัตถุ ตั้งแต่การวิเคราะห์ความต้องการ
                <br />
                การออกแบบ UML ไปจนถึงการพัฒนาโครงสร้างระบบที่มีประสิทธิภาพและใช้งานได้จริง
              </p>
              <div className="flex items-center justify-center gap-3">
                <Link
                  to="/projects"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#355746] hover:bg-[#243D32] text-[#FAF8F2] font-bold text-sm shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#355746]"
                >
                  <span>Explore All Workshops</span>
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
