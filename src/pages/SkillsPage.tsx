import React from 'react';
import { Sparkles, Code2, Palette, Gamepad2, Layers, Cpu, Database, Video } from 'lucide-react';

export const SkillsPage: React.FC = () => {
  const skillCategories = [
    {
      title: 'Frontend & Architecture',
      icon: Code2,
      description: 'Building reactive, component-driven interfaces with pixel-perfect attention to responsiveness and performance.',
      skills: ['React 19', 'TypeScript', 'Vite', 'Tailwind CSS', 'Next.js', 'State Management', 'HTML5 Semantic', 'CSS Animations']
    },
    {
      title: 'Backend & Cloud Services',
      icon: Database,
      description: 'Implementing serverless backends, relational databases, security policies, and authentication.',
      skills: ['Supabase', 'PostgreSQL', 'Row Level Security (RLS)', 'REST APIs', 'Supabase Storage', 'Auth Flows']
    },
    {
      title: 'UI/UX & Design Systems',
      icon: Palette,
      description: 'Translating concepts into tactile design systems with translucent liquid glass and accessible color harmonies.',
      skills: ['Liquid Glass UI', 'Figma', 'Earth Tone Palettes', 'Micro-interactions', 'Design Systems', 'Responsive Grids']
    },
    {
      title: 'Gaming & Interactive Media',
      icon: Gamepad2,
      description: 'Developing tools for streaming communities, interactive sound design, and content creator workflows.',
      skills: ['Web Audio API', 'Interactive Canvases', 'Streaming Tools', 'Community Bots', 'OBS Overlays']
    },
    {
      title: 'Content Creation & Video',
      icon: Video,
      description: 'Producing visual storytelling, video editing, highlight compilations, and digital media production.',
      skills: ['Video Editing', 'Motion Graphics', 'Visual Storytelling', 'Asset Management', 'Creative Scripting']
    },
    {
      title: 'Engineering Best Practices',
      icon: Layers,
      description: 'Writing maintainable, clean code with strict type checking, robust error handling, and Git workflows.',
      skills: ['Git & GitHub', 'CI/CD Pipelines', 'Performance Optimization', 'Zod Validation', 'Responsive Testing']
    }
  ];

  return (
    <div className="space-y-16 max-w-5xl mx-auto">
      {/* Header */}
      <section className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-panel text-xs font-semibold uppercase tracking-wider text-[#355746]">
          <Cpu className="w-3.5 h-3.5 text-[#80634D]" />
          <span>Core Competencies</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-[#243D32] tracking-tight">
          Skills &amp; Technical Capabilities
        </h1>
        <p className="text-base sm:text-lg text-[#746F64] leading-relaxed max-w-2xl">
          A balanced blend of engineering rigor, design sensibility, and digital content craftsmanship honed across creative projects and real-world web implementations.
        </p>
      </section>

      {/* Grid of Skill Categories */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {skillCategories.map((cat, idx) => {
          const Icon = cat.icon;
          return (
            <div
              key={idx}
              className="glass-panel glass-card-hover rounded-3xl p-7 flex flex-col justify-between space-y-5"
            >
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-[#355746]/10 text-[#355746] flex items-center justify-center">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-[#243D32]">{cat.title}</h3>
                <p className="text-xs text-[#746F64] leading-relaxed">
                  {cat.description}
                </p>
              </div>

              <div className="pt-4 border-t border-[#D9C8AA]/30">
                <div className="flex flex-wrap gap-1.5">
                  {cat.skills.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="px-2.5 py-1 rounded-lg bg-[#FAF8F2]/80 text-[#4B382D] text-xs font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </section>

      {/* Process Highlights */}
      <section className="glass-panel rounded-3xl p-8 sm:p-10 space-y-6">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#82977B]">
          <Sparkles className="w-4 h-4 text-[#80634D]" />
          <span>Workflow Values</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-[#243D32]">
          How I Approach Building Software
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm text-[#746F64]">
          <div className="space-y-2">
            <h4 className="font-bold text-[#243D32] text-base">1. User First</h4>
            <p>Every interface must be intuitive, snappy, and readable before decorative elements are added.</p>
          </div>
          <div className="space-y-2">
            <h4 className="font-bold text-[#243D32] text-base">2. Clean &amp; Modular</h4>
            <p>Writing typed, modular code with reusable components and reliable data fallbacks ensures longevity.</p>
          </div>
          <div className="space-y-2">
            <h4 className="font-bold text-[#243D32] text-base">3. Continuous Polish</h4>
            <p>Micro-interactions, smooth hover transitions, and tactile materials transform good tools into memorable products.</p>
          </div>
        </div>
      </section>
    </div>
  );
};
