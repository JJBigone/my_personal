import React from 'react';
import { 
  Code2, 
  Cpu, 
  Database, 
  Compass, 
  FileText, 
  Workflow, 
  Wrench 
} from 'lucide-react';
import { StaggerContainer, StaggerItem } from '../components/motion/StaggerGroup';

export const SkillsPage: React.FC = () => {
  const skillCategories = [
    {
      title: 'การวิเคราะห์ระบบและ SDLC',
      icon: Compass,
      skills: [
        'SDLC 7 ขั้นตอน',
        'Requirements Analysis',
        'Feasibility Study',
        'Process Modeling',
        'บทบาทหน้าที่นักวิเคราะห์ระบบ (SA)'
      ]
    },
    {
      title: 'การสร้างแบบจำลอง UML',
      icon: Workflow,
      skills: [
        'Use Case Diagram',
        'Class Diagram',
        'Sequence Diagram',
        'Activity Diagram',
        'Object-Oriented Concepts'
      ]
    },
    {
      title: 'การพัฒนาเว็บแอปพลิเคชัน',
      icon: Code2,
      skills: [
        'React 19 & TypeScript',
        'Tailwind CSS',
        'Vite',
        'HTML5 & Semantic Web',
        'Responsive Design'
      ]
    },
    {
      title: 'ฐานข้อมูลและคลาวด์',
      icon: Database,
      skills: [
        'PostgreSQL',
        'Supabase Database',
        'Row Level Security (RLS)',
        'Database Normalization',
        'RESTful APIs'
      ]
    },
    {
      title: 'สื่อการเรียนรู้และการนำเสนอ',
      icon: FileText,
      skills: [
        'PowerPoint Presentations (.pptx)',
        'Infographic Design',
        'ใบงานและแบบฝึกปฏิบัติ (Worksheets)',
        'แบบประเมินและข้อสอบ (Quizzes)'
      ]
    },
    {
      title: 'เครื่องมือปฏิบัติงาน',
      icon: Wrench,
      skills: [
        'Visual Paradigm / Draw.io',
        'VS Code',
        'Git & GitHub',
        'Figma / Canva',
        'Bun Runtime'
      ]
    }
  ];

  return (
    <StaggerContainer className="space-y-10 max-w-5xl mx-auto w-full pt-28 pb-16 px-4 sm:px-8">
      {/* Header */}
      <StaggerItem className="space-y-2 border-b border-[#82977B]/20 pb-5">
        <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full glass-panel text-xs font-bold uppercase tracking-wider text-[#355746]">
          <Cpu className="w-3.5 h-3.5 text-[#80634D]" />
          <span>Technical Skills</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#243D32] tracking-tight">
          ทักษะและความสามารถ
        </h1>
        <p className="text-xs sm:text-sm text-[#746F64]">
          ทักษะด้านการวิเคราะห์ระบบเชิงวัตถุ การพัฒนาเว็บ และเครื่องมือที่ใช้ในการสร้างสรรค์ผลงาน
        </p>
      </StaggerItem>

      {/* Grid of Skill Categories - Clean, Concise, No Clutter */}
      <StaggerItem>
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {skillCategories.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <div
                key={idx}
                className="glass-panel rounded-3xl p-6 border border-[#82977B]/25 hover:border-[#355746]/45 shadow-sm hover:shadow-md transition-all duration-300 space-y-4"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-[#355746]/10 text-[#355746] flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-base text-[#243D32] leading-snug">
                    {cat.title}
                  </h3>
                </div>

                {/* Skills tags */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {cat.skills.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="px-2.5 py-1 rounded-xl bg-white/80 border border-[#82977B]/20 text-[#355746] text-xs font-semibold"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </section>
      </StaggerItem>
    </StaggerContainer>
  );
};
