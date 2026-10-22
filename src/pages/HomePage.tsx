import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Compass, Layers, Terminal } from 'lucide-react';
import { portfolioService } from '../services/portfolioService';
import type { Project } from '../types/portfolio';
import { ProjectCard } from '../components/projects/ProjectCard';
import Hero12, { type Hero12Props } from '@/components/ui/hero-12';
import TechText from '@/components/ui/TechText';
import BlurText from '@/components/ui/BlurText';
import { StaggerContainer, StaggerItem } from '../components/motion/StaggerGroup';
import { LiquidGlassReveal } from '../components/motion/LiquidGlassReveal';

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
    text: "Explore Projects",
    link: "/projects",
    size: "lg",
  },
  variant: "fullscreen",
};

export const HomePage: React.FC = () => {
  const [featuredProjects, setFeaturedProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    portfolioService.getPublishedProjects().then((data) => {
      setFeaturedProjects(data.slice(0, 3));
      setLoading(false);
    });
  }, []);

  return (
    <div className="w-full">
      {/* Fullscreen Hero12 Section with Floating Navbar */}
      <Hero12 {...HERO_VALUES} />

      {/* Main Page Sections */}
      <div className="max-w-6xl mx-auto px-4 sm:px-8 py-20">
        <StaggerContainer className="space-y-24">
          {/* Featured Projects Section */}
          <StaggerItem className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-[#82977B]">
                  Selected Works
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold text-[#243D32] tracking-tight mt-1">
                  Featured Projects
                </h2>
              </div>
              <Link
                to="/projects"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#355746] hover:text-[#243D32] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#355746] rounded-full px-3 py-1"
              >
                <span>View All Projects</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="glass-panel h-80 rounded-3xl animate-pulse" />
                <div className="glass-panel h-80 rounded-3xl animate-pulse" />
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredProjects.map((project, idx) => (
                  <ProjectCard key={project.id} project={project} featured={idx === 0} />
                ))}
              </div>
            )}
          </StaggerItem>

          {/* Creative Philosophy & Pillars with Liquid Reveal */}
          <StaggerItem>
            <LiquidGlassReveal variant="cream">
              <section className="glass-panel rounded-3xl p-8 sm:p-12 shadow-lg space-y-10">
                <div className="max-w-2xl">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#82977B]">
                    Creative Approach
                  </span>
                  <h2 className="text-3xl font-bold text-[#243D32] mt-1">
                    Bridging Aesthetics &amp; Practical Utility
                  </h2>
                  <p className="text-sm sm:text-base text-[#746F64] mt-3">
                    Every digital piece begins with human curiosity: understanding what makes an experience memorable, functional, and visually pleasant.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div className="glass-panel-subtle rounded-2xl p-6 space-y-3">
                    <div className="w-10 h-10 rounded-xl bg-[#82977B]/20 text-[#355746] flex items-center justify-center">
                      <Compass className="w-5 h-5" />
                    </div>
                    <h3 className="font-bold text-base text-[#243D32]">Organic Visual Direction</h3>
                    <p className="text-xs text-[#746F64] leading-relaxed">
                      Nature-inspired color balance, soft ambient glass lighting, and responsive typography that feels organic.
                    </p>
                  </div>

                  <div className="glass-panel-subtle rounded-2xl p-6 space-y-3">
                    <div className="w-10 h-10 rounded-xl bg-[#A0A37A]/20 text-[#4B382D] flex items-center justify-center">
                      <Terminal className="w-5 h-5" />
                    </div>
                    <h3 className="font-bold text-base text-[#243D32]">Modern Technical Stack</h3>
                    <p className="text-xs text-[#746F64] leading-relaxed">
                      Fast client-side rendering with Vite, React 19, Supabase backend security, and resilient data models.
                    </p>
                  </div>

                  <div className="glass-panel-subtle rounded-2xl p-6 space-y-3">
                    <div className="w-10 h-10 rounded-xl bg-[#80634D]/20 text-[#80634D] flex items-center justify-center">
                      <Layers className="w-5 h-5" />
                    </div>
                    <h3 className="font-bold text-base text-[#243D32]">Full Project Lifecycle</h3>
                    <p className="text-xs text-[#746F64] leading-relaxed">
                      From creative concept, digital streaming assets, to full interactive web deployment and maintenance.
                    </p>
                  </div>
                </div>
              </section>
            </LiquidGlassReveal>
          </StaggerItem>

          {/* Call To Action Banner */}
          <StaggerItem>
            <section className="glass-panel-dark rounded-3xl p-8 sm:p-14 text-center space-y-6 shadow-2xl relative overflow-hidden">
              <div className="max-w-2xl mx-auto space-y-4 relative z-10">
                <h2 className="text-3xl sm:text-4xl font-extrabold text-[#FAF8F2] tracking-tight">
                  Have a project or creative vision in mind?
                </h2>
                <p className="text-sm sm:text-base text-[#D9C8AA]/90 max-w-lg mx-auto">
                  Whether it's interactive web design, video creation, gaming content, or technical collaboration, let's connect and make it happen.
                </p>
                <div className="pt-2">
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#FAF8F2] text-[#243D32] hover:bg-[#F3EBDD] font-bold text-sm shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FAF8F2]"
                  >
                    <span>Start a Conversation</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </section>
          </StaggerItem>
        </StaggerContainer>
      </div>
    </div>
  );
};
