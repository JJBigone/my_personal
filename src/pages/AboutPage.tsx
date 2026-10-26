import React, { useState } from 'react';
import { 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  Target, 
  GraduationCap, 
  School,
  Sparkles,
  Copy,
  Check,
  Cpu,
  ExternalLink,
  Code2,
  Terminal,
  ShieldCheck,
  Compass,
  Calendar,
  Layers,
  Zap,
  CheckCircle2,
  ArrowUpRight,
  BookOpen
} from 'lucide-react';
import { StaggerContainer, StaggerItem } from '../components/motion/StaggerGroup';
import ReflectiveCard from '../components/ui/ReflectiveCard';

export const AboutPage: React.FC = () => {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const handleCopy = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => {
      setCopiedField(null);
    }, 2200);
  };

  const skills = [
    { name: 'เทคโนโลยีสารสนเทศ', category: 'Core Tech', icon: Cpu, desc: 'Information Technology Foundation' },
    { name: 'วิเคราะห์และออกแบบระบบ (OOAD)', category: 'System Design', icon: Compass, desc: 'Object-Oriented Analysis & Design' },
    { name: 'การออกแบบ UML Diagram', category: 'Architecture', icon: Terminal, desc: 'Class, Use Case, Sequence Diagrams' },
    { name: 'การพัฒนาเว็บไซต์ (Web Dev)', category: 'Frontend', icon: Code2, desc: 'Modern Web Application Engineering' },
    { name: 'HTML5 & Semantic Web', category: 'Markup', icon: Code2, desc: 'Accessible & Modern Architecture' },
    { name: 'Modern CSS & Tailwind', category: 'Styling', icon: Sparkles, desc: 'Responsive Design & Design Systems' },
    { name: 'ระบบสารสนเทศเชิงวัตถุ', category: 'Concepts', icon: Cpu, desc: 'Object-Oriented Architecture' },
  ];

  const quickStats = [
    { label: 'อายุ', value: '19 ปี', sub: '19 เม.ย. 2550', icon: Calendar },
    { label: 'การศึกษา', value: 'ปวส. 1', sub: 'เทคโนโลยีสารสนเทศ', icon: GraduationCap },
    { label: 'รหัสนักศึกษา', value: '69319010009', sub: 'กลุ่ม 1', icon: ShieldCheck },
    { label: 'สถาบัน', value: 'วิทยาลัยเทคนิค', sub: 'นครศรีธรรมราช', icon: School },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Ambient Atmospheric Lighting & Glowing Orbs in Background */}
      <div className="pointer-events-none absolute -top-28 left-1/4 w-[550px] h-[550px] rounded-full bg-gradient-to-br from-[#82977B]/20 via-[#355746]/15 to-transparent blur-3xl animate-pulse" style={{ animationDuration: '7s' }} />
      <div className="pointer-events-none absolute top-1/3 -right-28 w-[500px] h-[500px] rounded-full bg-gradient-to-bl from-[#D9C8AA]/30 via-[#355746]/12 to-transparent blur-3xl" />
      <div className="pointer-events-none absolute bottom-16 left-6 w-[450px] h-[450px] rounded-full bg-gradient-to-tr from-[#243D32]/20 via-[#82977B]/15 to-transparent blur-3xl" />

      <StaggerContainer className="relative z-10 max-w-6xl mx-auto w-full pt-28 pb-24 px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Page Title & Status Banner */}
        <StaggerItem className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-b border-[#82977B]/25 pb-6">
            <div className="space-y-3">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#243D32] tracking-tight">
                About Me
              </h1>
            </div>

            <div className="flex items-center gap-3">
              <div className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-white/85 border border-[#82977B]/35 shadow-md backdrop-blur-xl shrink-0">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
                </span>
                <div className="flex flex-col text-left">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#82977B]">สถานะปัจจุบัน</span>
                  <span className="text-xs font-black text-[#243D32]">
                    ปวส. 1 • เทคโนโลยีสารสนเทศ NTC
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* 4 Interactive Quick Metric Tiles */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            {quickStats.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <div 
                  key={i} 
                  className="group relative bg-white/70 hover:bg-white backdrop-blur-md border border-[#82977B]/25 hover:border-[#355746]/50 rounded-2xl p-4 shadow-xs hover:shadow-md transition-all duration-300 overflow-hidden"
                >
                  <div className="absolute -right-4 -top-4 w-16 h-16 bg-[#82977B]/10 rounded-full blur-xl group-hover:scale-150 transition-transform" />
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="text-xs font-semibold text-[#746F64] uppercase tracking-wider">
                      {stat.label}
                    </span>
                    <Icon className="w-4 h-4 text-[#82977B] group-hover:text-[#355746] transition-colors" />
                  </div>
                  <div className="text-base sm:text-lg font-black text-[#243D32] tracking-tight">
                    {stat.value}
                  </div>
                  <div className="text-[11px] text-[#82977B] font-medium truncate mt-0.5">
                    {stat.sub}
                  </div>
                </div>
              );
            })}
          </div>
        </StaggerItem>

        {/* Main 2-Column Section: 3D Reflective Card (Left) & Personal Profile Card (Right) */}
        <StaggerItem>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
            
            {/* LEFT: 3D Reflective Student ID Card in High-Tech Pedestal (5 cols) */}
            <div className="lg:col-span-5 relative group flex flex-col">
              {/* Backlight Ambient Glow for the Card */}
              <div className="absolute inset-2 -z-10 rounded-3xl bg-gradient-to-br from-[#355746]/45 via-[#82977B]/35 to-[#D9C8AA]/30 blur-2xl opacity-75 group-hover:opacity-100 transition-opacity duration-700" />

              <div className="h-full bg-white/80 backdrop-blur-2xl border border-[#82977B]/40 hover:border-[#355746]/60 rounded-3xl p-6 sm:p-7 flex flex-col items-center justify-between shadow-2xl transition-all duration-500 relative overflow-hidden">
                {/* Decorative High-Tech Corner Accent Crosshairs */}
                <div className="absolute top-3 left-3 w-3 h-3 border-t-2 border-l-2 border-[#82977B]/60" />
                <div className="absolute top-3 right-3 w-3 h-3 border-t-2 border-r-2 border-[#82977B]/60" />
                <div className="absolute bottom-3 left-3 w-3 h-3 border-b-2 border-l-2 border-[#82977B]/60" />
                <div className="absolute bottom-3 right-3 w-3 h-3 border-b-2 border-r-2 border-[#82977B]/60" />

                {/* Pedestal Header Tag */}
                <div className="w-full flex items-center justify-between pb-3.5 border-b border-[#82977B]/25 mb-4">
                  <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#355746]">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                    <ShieldCheck className="w-4 h-4 text-[#82977B]" />
                    <span>Digital Student Credential</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-[#355746]/10 text-[#355746] font-bold border border-[#355746]/15">
                      NTC-IT-2567
                    </span>
                  </div>
                </div>

                {/* The 3D Reflective Card */}
                <div className="my-auto py-2 w-full flex justify-center">
                  <ReflectiveCard
                    theme="forest"
                    tint="#82977B"
                    metalness={0.85}
                    roughness={0.32}
                    blurStrength={6}
                    shine={0.85}
                    glare={0.35}
                    tiltStrength={15}
                    width="100%"
                    height={520}
                    radius={24}
                    className="w-full max-w-[330px] shadow-2xl mx-auto border border-[#82977B]/45"
                  >
                    <div className="flex flex-col h-full justify-between select-none">
                      {/* Photo with subtle dark bottom-only gradient: face, glasses, shirt and tie remain 100% clear */}
                      <div className="relative mb-3 w-full flex-1 min-h-[340px] rounded-2xl overflow-hidden border border-[#82977B]/40 shadow-2xl bg-[#0e1a14] group/photo">
                        <img
                          src="/profile-card.webp"
                          alt="พชรภูมิ มฤค"
                          className="w-full h-full object-cover object-top transition-transform duration-700 group-hover/photo:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 via-15% to-transparent to-30% pointer-events-none" />
                        
                        {/* High-tech Holographic scanline overlay subtle effect */}
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-400/5 to-transparent pointer-events-none opacity-40 animate-pulse" style={{ animationDuration: '3s' }} />

                        <div className="absolute bottom-3 left-3 right-3 text-white">
                          <span className="inline-block px-2.5 py-0.5 rounded text-[10px] font-semibold tracking-wider uppercase bg-[#355746]/90 text-[#D9C8AA] border border-[#82977B]/50 backdrop-blur-md mb-1.5 shadow-sm">
                            Information Technology
                          </span>
                          <h3 className="text-lg font-bold tracking-tight text-white drop-shadow-md">
                            พชรภูมิ มฤค
                          </h3>
                          <p className="text-xs text-[#D9C8AA] font-medium leading-relaxed mt-0.5 drop-shadow-sm">
                            วิทยาลัยเทคนิคนครศรีธรรมราช
                            <br />
                            Nakhonsithammarat Technical College
                          </p>
                        </div>
                      </div>

                      {/* Card Footer */}
                      <div className="flex items-center justify-between gap-3 pt-2.5 border-t border-[#82977B]/30">
                        <div className="flex flex-col gap-0.5">
                          <span className="text-[10px] font-semibold uppercase tracking-wider text-[#D9C8AA]/80">
                            Student ID
                          </span>
                          <span className="text-sm font-mono font-bold tracking-wider text-white">
                            69319010009
                          </span>
                        </div>
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#243D32] border border-[#82977B]/40 text-[10px] font-semibold text-[#D9C8AA] shadow-sm">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          NTC
                        </div>
                      </div>
                    </div>
                  </ReflectiveCard>
                </div>

                {/* Interactive Hint & Visual Status */}
                <div className="pt-3.5 border-t border-[#82977B]/20 w-full flex items-center justify-between text-xs text-[#746F64]">
                  <span className="flex items-center gap-1.5 font-medium">
                    <Sparkles className="w-3.5 h-3.5 text-[#355746]" />
                    <span>3D Dynamic Shader Tilt</span>
                  </span>
                  <span className="text-[11px] text-[#82977B] font-mono">
                    Move mouse to tilt
                  </span>
                </div>
              </div>
            </div>

            {/* RIGHT: ประวัติส่วนตัว Card (7 cols) */}
            <div className="lg:col-span-7 bg-white/80 backdrop-blur-2xl border border-[#82977B]/40 hover:border-[#355746]/60 rounded-3xl p-6 sm:p-8 shadow-2xl flex flex-col justify-between space-y-6 text-[#243D32] transition-all duration-500">
              
              {/* Header: User Icon + Title + Status */}
              <div className="flex items-center justify-between pb-4 border-b border-[#82977B]/20">
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-2xl border border-[#82977B]/35 flex items-center justify-center text-[#355746] bg-[#355746]/10 shadow-sm">
                    <User className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-black text-[#243D32] tracking-tight">
                      ประวัติส่วนตัว
                    </h2>
                    <p className="text-xs text-[#746F64]">
                      Personal Dossier &amp; Academic Status
                    </p>
                  </div>
                </div>

                <div className="hidden sm:inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#82977B]/15 border border-[#82977B]/30 text-xs font-bold text-[#355746]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>นักศึกษา ปวส. 1 (กำลังศึกษา)</span>
                </div>
              </div>

              {/* 2-Column Info Grid with Tactile Glass Tiles */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                
                {/* ชื่อ-สกุล / ชื่อเล่น */}
                <div className="bg-[#FAF9F5]/90 hover:bg-white border border-[#82977B]/25 hover:border-[#355746]/50 rounded-2xl p-4 transition-all duration-300 hover:shadow-md space-y-1 group">
                  <span className="text-xs text-[#746F64] font-medium block">
                    ชื่อ-สกุล / ชื่อเล่น
                  </span>
                  <p className="text-sm sm:text-base font-bold text-[#243D32]">
                    นาย พชรภูมิ มฤค <span className="text-[#355746] font-extrabold bg-[#355746]/10 px-2 py-0.5 rounded-md ml-1">(เจเดม)</span>
                  </p>
                </div>

                {/* วัน/เดือน/ปีเกิด */}
                <div className="bg-[#FAF9F5]/90 hover:bg-white border border-[#82977B]/25 hover:border-[#355746]/50 rounded-2xl p-4 transition-all duration-300 hover:shadow-md space-y-1">
                  <span className="text-xs text-[#746F64] font-medium block">
                    วัน/เดือน/ปีเกิด
                  </span>
                  <p className="text-sm sm:text-base font-bold text-[#243D32]">
                    19 เมษายน 2550 <span className="text-xs text-[#82977B] font-bold bg-[#82977B]/10 px-2 py-0.5 rounded-md ml-1">(อายุ 19 ปี)</span>
                  </p>
                </div>

                {/* กำลังศึกษาอยู่ระดับชั้น */}
                <div className="bg-[#FAF9F5]/90 hover:bg-white border border-[#82977B]/25 hover:border-[#355746]/50 rounded-2xl p-4 transition-all duration-300 hover:shadow-md space-y-1 sm:col-span-1">
                  <span className="text-xs text-[#746F64] font-medium block">
                    กำลังศึกษาอยู่ระดับชั้น
                  </span>
                  <p className="text-sm sm:text-base font-bold text-[#243D32] leading-snug">
                    ประกาศนียบัตรวิชาชีพชั้นสูง (ปวส. 1)
                  </p>
                  <p className="text-xs font-bold text-[#355746] flex items-center gap-1.5 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    แผนกวิชาเทคโนโลยีสารสนเทศ
                  </p>
                </div>

                {/* รหัสนักศึกษา / กลุ่ม */}
                <div className="bg-[#FAF9F5]/90 hover:bg-white border border-[#82977B]/25 hover:border-[#355746]/50 rounded-2xl p-4 transition-all duration-300 hover:shadow-md space-y-1 relative group">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-[#746F64] font-medium">
                      รหัสนักศึกษา / กลุ่ม
                    </span>
                    <button
                      type="button"
                      onClick={() => handleCopy('69319010009', 'id')}
                      className="text-stone-400 hover:text-[#355746] p-1.5 rounded-lg hover:bg-stone-100 transition-colors flex items-center gap-1 text-[11px]"
                      title="คัดลอกรหัสนักศึกษา"
                    >
                      {copiedField === 'id' ? (
                        <span className="text-emerald-600 font-bold flex items-center gap-1">
                          <Check className="w-3.5 h-3.5" />
                          คัดลอกแล้ว!
                        </span>
                      ) : (
                        <span className="flex items-center gap-1">
                          <Copy className="w-3.5 h-3.5" />
                          <span className="hidden sm:inline">คัดลอก</span>
                        </span>
                      )}
                    </button>
                  </div>
                  <p className="text-sm sm:text-base font-mono font-black text-[#243D32]">
                    69319010009 <span className="text-xs font-sans text-[#746F64] font-semibold bg-stone-200/70 px-2 py-0.5 rounded ml-1">(กลุ่ม 1)</span>
                  </p>
                </div>

                {/* เบอร์โทรศัพท์ */}
                <div className="bg-[#FAF9F5]/90 hover:bg-white border border-[#82977B]/25 hover:border-[#355746]/50 rounded-2xl p-4 transition-all duration-300 hover:shadow-md space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-[#746F64] font-medium flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-[#82977B]" />
                      <span>เบอร์โทรศัพท์</span>
                    </span>
                    <button
                      type="button"
                      onClick={() => handleCopy('0623058410', 'phone')}
                      className="text-stone-400 hover:text-[#355746] p-1.5 rounded-lg hover:bg-stone-100 transition-colors flex items-center gap-1 text-[11px]"
                      title="คัดลอกเบอร์โทรศัพท์"
                    >
                      {copiedField === 'phone' ? (
                        <span className="text-emerald-600 font-bold flex items-center gap-1">
                          <Check className="w-3.5 h-3.5" />
                          คัดลอกแล้ว!
                        </span>
                      ) : (
                        <span className="flex items-center gap-1">
                          <Copy className="w-3.5 h-3.5" />
                          <span className="hidden sm:inline">คัดลอก</span>
                        </span>
                      )}
                    </button>
                  </div>
                  <a
                    href="tel:0623058410"
                    className="text-sm sm:text-base font-black text-[#243D32] hover:text-[#355746] transition-colors flex items-center justify-between group"
                  >
                    <span>062-3058410</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-stone-400 group-hover:text-[#355746] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                </div>

                {/* อีเมล (E-mail) */}
                <div className="bg-[#FAF9F5]/90 hover:bg-white border border-[#82977B]/25 hover:border-[#355746]/50 rounded-2xl p-4 transition-all duration-300 hover:shadow-md space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-[#746F64] font-medium flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-[#82977B]" />
                      <span>อีเมลสถานศึกษา (E-mail)</span>
                    </span>
                    <button
                      type="button"
                      onClick={() => handleCopy('69319010009@tnk.ac.th', 'email')}
                      className="text-stone-400 hover:text-[#355746] p-1.5 rounded-lg hover:bg-stone-100 transition-colors flex items-center gap-1 text-[11px]"
                      title="คัดลอกอีเมล"
                    >
                      {copiedField === 'email' ? (
                        <span className="text-emerald-600 font-bold flex items-center gap-1">
                          <Check className="w-3.5 h-3.5" />
                          คัดลอกแล้ว!
                        </span>
                      ) : (
                        <span className="flex items-center gap-1">
                          <Copy className="w-3.5 h-3.5" />
                          <span className="hidden sm:inline">คัดลอก</span>
                        </span>
                      )}
                    </button>
                  </div>
                  <a
                    href="mailto:69319010009@tnk.ac.th"
                    className="text-xs sm:text-sm font-bold text-blue-600 hover:text-blue-700 hover:underline transition-colors block truncate"
                  >
                    69319010009@tnk.ac.th
                  </a>
                </div>

              </div>

              {/* ที่อยู่ปัจจุบัน with Map Pin Link */}
              <div className="pt-3 border-t border-[#82977B]/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs sm:text-sm text-[#746F64]">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-[#82977B] shrink-0 mt-0.5" />
                  <p className="leading-relaxed">
                    <span className="font-bold text-[#243D32]">ที่อยู่ปัจจุบัน:</span> 90/9 หมู่ 5 ตำบลปากนคร อำเภอเมือง จังหวัดนครศรีธรรมราช 80000
                  </p>
                </div>
                <a
                  href="https://www.google.com/maps?q=8.418910391058159,100.0049360619489"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#355746] hover:text-[#243D32] shrink-0 bg-[#355746]/10 hover:bg-[#355746]/20 px-3 py-1.5 rounded-xl border border-[#355746]/20 transition-all shadow-xs"
                >
                  <MapPin className="w-3.5 h-3.5 text-[#355746]" />
                  <span>เปิด Google Maps</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              {/* เป้าหมายในอนาคต Callout Box */}
              <div className="relative overflow-hidden bg-gradient-to-r from-[#FAF9F5] via-white to-[#FAF9F5] border-l-4 border-l-[#355746] border border-[#82977B]/30 rounded-2xl p-4 sm:p-5 flex items-start gap-4 shadow-sm hover:shadow-md transition-all">
                <div className="w-10 h-10 rounded-xl bg-[#355746]/10 border border-[#355746]/20 flex items-center justify-center text-[#355746] shrink-0 mt-0.5 shadow-xs">
                  <Target className="w-5 h-5" />
                </div>
                <div className="space-y-1.5">
                  <h4 className="text-sm font-black text-[#243D32] flex items-center gap-2">
                    <span>เป้าหมายในอนาคต</span>
                    <span className="text-[10px] font-bold text-[#82977B] uppercase tracking-wider font-mono bg-[#82977B]/10 px-2 py-0.5 rounded">
                      Future Vision
                    </span>
                  </h4>
                  <p className="text-xs sm:text-sm text-[#5C574F] leading-relaxed italic font-medium">
                    "ตั้งใจจะพัฒนาทักษะและประสบการณ์ในการทำงานให้ประสบความสำเร็จ มุ่งมั่นสร้างสรรค์ผลงานด้านเทคโนโลยีสารสนเทศที่มีคุณภาพ และต่อยอดสู่การทำงานจริงในระดับมืออาชีพ"
                  </p>
                </div>
              </div>

            </div>

          </div>
        </StaggerItem>

        {/* Secondary Section: ประวัติการศึกษา (Education Timeline) & ทักษะ */}
        <StaggerItem>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-4">
            
            {/* Education Timeline (8 cols) */}
            <div className="lg:col-span-8 bg-white/80 backdrop-blur-2xl border border-[#82977B]/35 hover:border-[#355746]/60 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 transition-all duration-500">
              <div className="flex items-center justify-between pb-4 border-b border-[#82977B]/20">
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-2xl border border-[#82977B]/30 flex items-center justify-center text-[#355746] bg-[#355746]/10 shadow-xs">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-black text-[#243D32] tracking-tight">
                      ประวัติการศึกษา
                    </h2>
                    <p className="text-xs text-[#746F64]">
                      Academic Journey &amp; Milestones
                    </p>
                  </div>
                </div>

                <div className="hidden sm:flex items-center gap-1.5 text-xs font-bold text-[#355746] bg-[#355746]/10 px-3 py-1 rounded-full">
                  <Layers className="w-3.5 h-3.5" />
                  <span>Education Roadmap</span>
                </div>
              </div>

              {/* Connected Timeline without trailing line past 03 */}
              <div className="relative pl-6 sm:pl-8 space-y-7">
                
                {/* Step 01: มัธยมศึกษาตอนต้น */}
                <div className="relative group">
                  {/* Connecting line to Step 02 */}
                  <div className="absolute left-[-11px] sm:left-[-19px] top-11 -bottom-7 w-0.5 bg-gradient-to-b from-[#82977B] to-stone-300 pointer-events-none" />

                  {/* Step Marker Badge */}
                  <div className="absolute -left-6 sm:-left-8 top-4 w-7 h-7 rounded-xl bg-white border-2 border-[#82977B] text-[#355746] font-black text-xs flex items-center justify-center shadow-md z-10 group-hover:scale-110 transition-transform">
                    01
                  </div>

                  <div className="bg-[#FAF9F5]/90 hover:bg-white border border-[#82977B]/25 hover:border-[#355746]/45 rounded-2xl p-5 shadow-xs hover:shadow-md space-y-3 transition-all duration-300">
                    <div className="flex items-center gap-3.5">
                      <div className="w-12 h-12 rounded-xl border border-[#82977B]/25 bg-white p-2 flex flex-col items-center justify-center text-center shadow-xs shrink-0">
                        <School className="w-5 h-5 text-[#355746]" />
                        <span className="text-[8px] font-black text-[#80634D] mt-0.5">ท.ญ.อ.</span>
                      </div>
                      <div className="min-w-0">
                        <span className="text-xs font-bold text-[#82977B] block">
                          ระดับมัธยมศึกษาตอนต้น
                        </span>
                        <h3 className="text-base font-bold text-[#243D32] leading-snug">
                          โรงเรียนท่านครญาณวโรภาสอุทิศ
                        </h3>
                      </div>
                    </div>
                    <p className="text-xs sm:text-sm text-[#5C574F] leading-relaxed">
                      วางรากฐานความรู้ พัฒนาทักษะพื้นฐาน และเรียนรู้การทำงานร่วมกับผู้อื่น
                    </p>
                    <div>
                      <span className="inline-block px-3 py-1 rounded-full bg-white text-[11px] font-medium text-[#746F64] border border-[#82977B]/25 shadow-xs">
                        Thanakhorn Yanwaropat Utith School
                      </span>
                    </div>
                  </div>
                </div>

                {/* Step 02: ปวช. */}
                <div className="relative group">
                  {/* Connecting line to Step 03 */}
                  <div className="absolute left-[-11px] sm:left-[-19px] top-11 -bottom-7 w-0.5 bg-gradient-to-b from-[#82977B] to-[#355746] pointer-events-none" />

                  {/* Step Marker Badge */}
                  <div className="absolute -left-6 sm:-left-8 top-4 w-7 h-7 rounded-xl bg-white border-2 border-[#82977B] text-[#355746] font-black text-xs flex items-center justify-center shadow-md z-10 group-hover:scale-110 transition-transform">
                    02
                  </div>

                  <div className="bg-[#FAF9F5]/90 hover:bg-white border border-[#82977B]/25 hover:border-[#355746]/45 rounded-2xl p-5 shadow-xs hover:shadow-md space-y-3 transition-all duration-300">
                    <div className="flex items-center gap-3.5">
                      <div className="w-12 h-12 rounded-xl border border-[#82977B]/25 bg-white p-1 flex items-center justify-center shadow-xs shrink-0 overflow-hidden">
                        <img
                          src="/logo.png"
                          alt="วิทยาลัยเทคนิคนครศรีธรรมราช"
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div className="min-w-0">
                        <span className="text-xs font-bold text-[#82977B] block">
                          ระดับประกาศนียบัตรวิชาชีพ (ปวช.)
                        </span>
                        <h3 className="text-base font-bold text-[#243D32] leading-snug">
                          วิทยาลัยเทคนิคนครศรีธรรมราช
                        </h3>
                      </div>
                    </div>
                    <p className="text-xs sm:text-sm text-[#5C574F] leading-relaxed">
                      เรียนรู้พื้นฐานวิชาชีพ ทั้งภาคทฤษฎี และภาคปฏิบัติ พร้อมพัฒนาทักษะเฉพาะทาง
                    </p>
                    <div>
                      <span className="inline-block px-3 py-1 rounded-full bg-white text-[11px] font-medium text-[#746F64] border border-[#82977B]/25 shadow-xs">
                        Nakhonsithammarat Technical College
                      </span>
                    </div>
                  </div>
                </div>

                {/* Step 03: ปวส. (กำลังศึกษา) - Line ends here cleanly */}
                <div className="relative group">
                  {/* Step Marker Badge with Glowing Ring */}
                  <div className="absolute -left-6 sm:-left-8 top-4 w-7 h-7 rounded-xl bg-[#243D32] text-[#FAF8F2] border-2 border-[#355746] font-black text-xs flex items-center justify-center shadow-xl z-10 group-hover:scale-110 transition-transform ring-4 ring-[#82977B]/20">
                    03
                  </div>

                  <div className="bg-gradient-to-br from-[#FAF9F5] to-white border-2 border-[#355746]/50 hover:border-[#355746] rounded-2xl p-5 shadow-lg hover:shadow-2xl space-y-3.5 relative transition-all duration-300">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="flex items-center gap-3.5 min-w-0">
                        <div className="w-12 h-12 rounded-xl border border-[#82977B]/30 bg-white p-1 flex items-center justify-center shadow-xs shrink-0 overflow-hidden">
                          <img
                            src="/logo.png"
                            alt="วิทยาลัยเทคนิคนครศรีธรรมราช"
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <div className="min-w-0">
                          <span className="text-xs font-bold text-[#355746] block">
                            ระดับประกาศนียบัตรวิชาชีพชั้นสูง (ปวส.)
                          </span>
                          <h3 className="text-base font-bold text-[#243D32] leading-snug">
                            วิทยาลัยเทคนิคนครศรีธรรมราช
                          </h3>
                        </div>
                      </div>

                      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs font-bold self-start sm:self-auto shadow-xs">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span>กำลังศึกษาอยู่ปัจจุบัน (ปวส. 1)</span>
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-[#5C574F] leading-relaxed">
                      มุ่งพัฒนาความรู้และทักษะวิชาชีพขั้นสูง สร้างผลงานและประสบการณ์ เพื่อเตรียมความพร้อมสำหรับการทำงานในอนาคต
                    </p>

                    <div className="flex flex-wrap gap-2 pt-1">
                      <span className="inline-block px-3 py-1 rounded-full bg-white text-[11px] font-medium text-[#746F64] border border-[#82977B]/25 shadow-xs">
                        Nakhonsithammarat Technical College
                      </span>
                      <span className="inline-block px-3 py-1 rounded-full bg-[#355746]/10 text-[11px] font-bold text-[#355746] border border-[#355746]/20">
                        สาขาวิชาเทคโนโลยีสารสนเทศ
                      </span>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Skills & Quick Info (4 cols) */}
            <div className="lg:col-span-4 bg-white/80 backdrop-blur-2xl border border-[#82977B]/35 hover:border-[#355746]/60 rounded-3xl p-6 sm:p-7 shadow-2xl space-y-6 transition-all duration-500">
              <div className="pb-3 border-b border-[#82977B]/20 flex items-center justify-between">
                <h3 className="text-sm font-black tracking-wide uppercase text-[#243D32] flex items-center gap-2">
                  <Zap className="w-4 h-4 text-[#80634D]" />
                  <span>ความสนใจและทักษะ</span>
                </h3>
                <span className="text-[10px] font-bold text-[#355746] bg-[#355746]/10 px-2.5 py-1 rounded-full border border-[#355746]/15">
                  Skill Matrix
                </span>
              </div>

              <div className="space-y-3">
                {skills.map((skill, index) => {
                  const Icon = skill.icon;
                  return (
                    <div
                      key={index}
                      className="group flex flex-col p-3 rounded-2xl bg-[#FAF9F5]/90 hover:bg-white border border-[#82977B]/25 hover:border-[#355746]/45 transition-all duration-300 hover:shadow-md space-y-1"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div className="w-8 h-8 rounded-xl bg-[#355746]/10 flex items-center justify-center text-[#355746] shrink-0 group-hover:scale-110 group-hover:bg-[#355746] group-hover:text-white transition-all">
                            <Icon className="w-4 h-4" />
                          </div>
                          <span className="text-xs font-bold text-[#243D32] truncate">
                            {skill.name}
                          </span>
                        </div>
                        <span className="text-[9px] font-bold text-[#82977B] uppercase tracking-wider shrink-0 bg-white px-2 py-0.5 rounded-md border border-[#82977B]/20">
                          {skill.category}
                        </span>
                      </div>
                      <span className="text-[10px] text-[#746F64] pl-10.5 font-medium">
                        {skill.desc}
                      </span>
                    </div>
                  );
                })}
              </div>

              <div className="pt-2 border-t border-[#82977B]/20 text-center">
                <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-[#355746]">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>มุ่งเน้นการพัฒนาระบบที่มีประสิทธิภาพ</span>
                </div>
              </div>
            </div>

          </div>
        </StaggerItem>

      </StaggerContainer>
    </div>
  );
};




