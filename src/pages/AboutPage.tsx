import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Heart, Compass, Cpu, Gamepad2 } from 'lucide-react';
import { StaggerContainer, StaggerItem } from '../components/motion/StaggerGroup';
import { LiquidGlassReveal } from '../components/motion/LiquidGlassReveal';

export const AboutPage: React.FC = () => {
  const milestones = [
    {
      year: 'Present',
      title: 'Digital Creator & Web Artisan',
      desc: 'Developing immersive interactive web apps, content creation workflows, and gaming community systems.'
    },
    {
      year: '2024 - 2025',
      title: 'Media Production & Streaming Tools',
      desc: 'Produced high-engagement gaming streams, dynamic video overlays, and interactive community tools.'
    },
    {
      year: '2023',
      title: 'Foundation in Modern Web & Design Systems',
      desc: 'Explored liquid glass aesthetics, Tailwind CSS, TypeScript, and modern headless backend architectures.'
    }
  ];

  return (
    <StaggerContainer className="space-y-16 max-w-4xl mx-auto w-full pt-28 pb-16 px-4 sm:px-8">
      {/* Intro Header */}
      <StaggerItem className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-panel text-xs font-semibold uppercase tracking-wider text-[#355746]">
          <Sparkles className="w-3.5 h-3.5 text-[#80634D]" />
          <span>About Me</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-[#243D32] tracking-tight">
          Exploring the Intersection of Art, Games &amp; Code.
        </h1>
        <p className="text-base sm:text-lg text-[#746F64] leading-relaxed">
          Hello! I'm a passionate digital creator, gamer, and frontend developer dedicated to building polished, tactile web experiences with thoughtful aesthetics and dependable modern engineering.
        </p>
      </StaggerItem>

      {/* Main Glass Profile Card with Liquid Reveal */}
      <StaggerItem>
        <LiquidGlassReveal variant="sage">
          <section className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center glass-panel rounded-3xl p-8 sm:p-10 shadow-lg">
            <div className="md:col-span-5 relative aspect-square rounded-2xl overflow-hidden glass-panel-subtle shadow-md">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop"
                alt="Portrait of the creator"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="md:col-span-7 space-y-4">
              <h2 className="text-2xl font-bold text-[#243D32]">
                Creative Philosophy
              </h2>
              <p className="text-sm text-[#746F64] leading-relaxed">
                I believe that great software shouldn't just be functional—it should feel delightful to touch and look at. By combining gentle natural colors (forest greens, warm sand, and cream) with modern translucent materials, every screen evokes tranquility and clarity.
              </p>
              <p className="text-sm text-[#746F64] leading-relaxed">
                When I'm not coding or designing interfaces, you can find me immersing myself in indie video games, producing media content, exploring new soundtrack design, or testing emerging AI technologies.
              </p>
              <div className="pt-2 flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#355746]/10 text-[#355746] text-xs font-semibold">
                  <Gamepad2 className="w-3.5 h-3.5" /> Gaming Culture
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#80634D]/10 text-[#80634D] text-xs font-semibold">
                  <Cpu className="w-3.5 h-3.5" /> Creative Tech
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#82977B]/10 text-[#243D32] text-xs font-semibold">
                  <Compass className="w-3.5 h-3.5" /> Storytelling
                </span>
              </div>
            </div>
          </section>
        </LiquidGlassReveal>
      </StaggerItem>

      {/* Milestones Timeline */}
      <StaggerItem className="space-y-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-[#243D32]">
          Journey &amp; Milestones
        </h2>
        <div className="space-y-4">
          {milestones.map((m, idx) => (
            <div key={idx} className="glass-panel-subtle rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="text-xs font-bold text-[#80634D] uppercase tracking-wider">
                  {m.year}
                </span>
                <h3 className="text-lg font-bold text-[#243D32]">{m.title}</h3>
                <p className="text-xs sm:text-sm text-[#746F64]">{m.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </StaggerItem>

      {/* Personal Goals and CTA */}
      <StaggerItem>
        <section className="glass-panel rounded-3xl p-8 sm:p-10 text-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-[#355746]/10 text-[#355746] flex items-center justify-center mx-auto">
            <Heart className="w-6 h-6" />
          </div>
          <h3 className="text-2xl font-bold text-[#243D32]">Always Learning, Always Building</h3>
          <p className="text-sm text-[#746F64] max-w-lg mx-auto">
            My goal is to continuously refine my craft, connect with fellow creators, and engineer digital experiences that inspire.
          </p>
          <div className="pt-2">
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#355746] hover:bg-[#243D32] text-[#FAF8F2] font-semibold text-sm shadow-md transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#355746]"
            >
              <span>Browse My Portfolio</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </StaggerItem>
    </StaggerContainer>
  );
};
