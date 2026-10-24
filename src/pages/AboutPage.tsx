import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Heart, Compass, Cpu, Gamepad2 } from 'lucide-react';
import { StaggerContainer, StaggerItem } from '../components/motion/StaggerGroup';
import { LiquidGlassReveal } from '../components/motion/LiquidGlassReveal';
import ReflectiveCard from '../components/ui/ReflectiveCard';
import { HugeiconsIcon } from '@hugeicons/react';
import { CheckmarkBadge01Icon, FingerPrintIcon } from '@hugeicons/core-free-icons';

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

      {/* Main Glass Profile Card with Reflective Card & Liquid Reveal */}
      <StaggerItem>
        <LiquidGlassReveal variant="sage">
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center glass-panel rounded-3xl p-6 sm:p-10 shadow-lg">
            {/* Interactive 3D Reflective Card with Profile Photo */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center">
              <ReflectiveCard
                theme="dark"
                tint="#ffffff"
                metalness={0.95}
                roughness={0.22}
                blurStrength={6}
                shine={1.2}
                glare={0.65}
                tiltStrength={15}
                width="100%"
                height={500}
                radius={24}
                className="w-full max-w-[340px] shadow-2xl mx-auto"
              >
                <div className="flex flex-col h-full justify-between select-none">
                  {/* Card Header */}
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-white border border-white/15 shadow-sm">
                      <HugeiconsIcon icon={CheckmarkBadge01Icon} size={15} strokeWidth={2} className="text-emerald-400" />
                      Verified Creator
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-white/80 text-xs">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      Active
                    </span>
                  </div>

                  {/* Profile Photo Display */}
                  <div className="relative my-3 w-full flex-1 min-h-[270px] rounded-2xl overflow-hidden border border-white/20 shadow-2xl bg-black/40 group">
                    <img
                      src="/profile.webp"
                      alt="Pacharaphum Maruek"
                      className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />
                    <div className="absolute bottom-3 left-3 right-3 text-white">
                      <span className="inline-block px-2 py-0.5 rounded text-[10px] font-semibold tracking-wider uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 backdrop-blur-sm mb-1">
                        IT Student &amp; Developer
                      </span>
                      <h3 className="text-lg font-bold tracking-tight text-white drop-shadow-md">
                        Pacharaphum Maruek
                      </h3>
                      <p className="text-xs text-white/70 line-clamp-1">
                        Nakhon Si Thammarat Technical College
                      </p>
                    </div>
                  </div>

                  {/* Card Footer */}
                  <div className="flex items-end justify-between gap-3 pt-2 border-t border-white/10">
                    <div className="flex flex-col gap-0.5">
                      <span className="text-[10px] font-medium uppercase tracking-wider text-white/50">
                        Digital ID
                      </span>
                      <span className="text-xs font-mono tracking-wider text-white/90">
                        NTC-IT-2026-DEV
                      </span>
                    </div>
                    <div className="w-9 h-9 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center text-white/80 shadow-inner">
                      <HugeiconsIcon icon={FingerPrintIcon} size={20} strokeWidth={1.8} />
                    </div>
                  </div>
                </div>
              </ReflectiveCard>
              <p className="mt-3 text-xs text-[#746F64]/80 flex items-center gap-1.5 text-center">
                <Sparkles className="w-3.5 h-3.5 text-[#355746]" />
                Interactive 3D Card • Hover / Touch to Tilt &amp; Reflect
              </p>
            </div>

            <div className="lg:col-span-7 space-y-4">
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
