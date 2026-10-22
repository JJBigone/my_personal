import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Gamepad2, Compass, Layers, Terminal } from 'lucide-react';
import { portfolioService } from '../services/portfolioService';
import type { Project } from '../types/portfolio';
import { ProjectCard } from '../components/projects/ProjectCard';

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
    <div className="space-y-24">
      {/* Hero Section */}
      <section className="relative pt-6 sm:pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Headline & Description */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel text-xs font-semibold uppercase tracking-wider text-[#355746]">
              <Sparkles className="w-3.5 h-3.5 text-[#80634D]" />
              <span>Personal Portfolio</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-extrabold text-[#243D32] tracking-tight leading-[1.12]">
              Creating Digital Experiences Through <span className="text-[#355746] underline decoration-[#82977B]/50 underline-offset-8">Creativity</span> &amp; Technology.
            </h1>

            <p className="text-base sm:text-lg text-[#746F64] leading-relaxed max-w-xl">
              I'm passionate about digital content, gaming, technology, and building creative projects that combine high functionality with tactile visual storytelling.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                to="/projects"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#355746] hover:bg-[#243D32] text-[#FAF8F2] font-semibold text-sm shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95"
              >
                <span>Explore My Work</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full glass-panel hover:bg-[#FAF8F2]/90 text-[#243D32] font-semibold text-sm transition-all duration-300"
              >
                <span>About Me</span>
              </Link>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-3 gap-4 pt-6 max-w-md">
              <div className="glass-panel-subtle rounded-2xl p-4 text-center">
                <div className="text-2xl font-bold text-[#243D32]">100%</div>
                <div className="text-xs text-[#746F64] mt-0.5">Passion &amp; Focus</div>
              </div>
              <div className="glass-panel-subtle rounded-2xl p-4 text-center">
                <div className="text-2xl font-bold text-[#355746]">Fast</div>
                <div className="text-xs text-[#746F64] mt-0.5">Vite + React</div>
              </div>
              <div className="glass-panel-subtle rounded-2xl p-4 text-center">
                <div className="text-2xl font-bold text-[#80634D]">Modern</div>
                <div className="text-xs text-[#746F64] mt-0.5">Liquid Glass</div>
              </div>
            </div>
          </div>

          {/* Hero Visual Card / Floating Panels */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md">
              {/* Main Decorative Frame */}
              <div className="aspect-4/5 rounded-3xl overflow-hidden glass-panel p-3 shadow-2xl relative">
                <img
                  src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=800&auto=format&fit=crop"
                  alt="Creative work station"
                  className="w-full h-full object-cover rounded-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#243D32]/60 via-transparent to-transparent rounded-2xl" />
              </div>

              {/* Floating Glass Pill: Creative Tech */}
              <div className="absolute -bottom-6 -left-6 glass-panel rounded-2xl p-4 shadow-xl flex items-center gap-3 backdrop-blur-xl animate-bounce-slow">
                <div className="w-10 h-10 rounded-xl bg-[#355746] text-[#FAF8F2] flex items-center justify-center">
                  <Gamepad2 className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-[#243D32]">Gaming &amp; Media</div>
                  <div className="text-[11px] text-[#746F64]">Interactive Creations</div>
                </div>
              </div>

              {/* Floating Glass Pill: Status */}
              <div className="absolute -top-4 -right-4 glass-panel rounded-2xl py-2.5 px-4 shadow-lg flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-medium text-[#243D32]">Available for Collabs</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="space-y-8">
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
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#355746] hover:text-[#243D32] transition-colors"
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
      </section>

      {/* Creative Philosophy & Pillars */}
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

      {/* Call To Action Banner */}
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
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#FAF8F2] text-[#243D32] hover:bg-[#F3EBDD] font-bold text-sm shadow-xl transition-all duration-300 hover:scale-105 active:scale-95"
            >
              <span>Start a Conversation</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
