import React, { useState } from 'react';
import { 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  Target, 
  GraduationCap, 
  School,
  Copy,
  Check,
  ExternalLink, 
  ArrowUpRight,
  Sparkles
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
    }, 2000);
  };

  const educationHistory = [
    {
      level: 'ระดับมัธยมศึกษาตอนต้น',
      school: 'โรงเรียนท่านครญาณวโรภาสอุทิศ',
      status: 'สำเร็จการศึกษา',
      icon: School,
    },
    {
      level: 'ระดับประกาศนียบัตรวิชาชีพ (ปวช.)',
      school: 'วิทยาลัยเทคนิคนครศรีธรรมราช',
      status: 'สำเร็จการศึกษา',
      logo: '/logo.png',
    },
    {
      level: 'ระดับประกาศนียบัตรวิชาชีพชั้นสูง (ปวส. 1)',
      school: 'วิทยาลัยเทคนิคนครศรีธรรมราช',
      major: 'แผนกวิชาเทคโนโลยีสารสนเทศ',
      status: 'กำลังศึกษาอยู่ปัจจุบัน',
      current: true,
      logo: '/logo.png',
    },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Ambient Atmospheric Lighting */}
      <div className="pointer-events-none absolute -top-28 left-1/4 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-[#82977B]/15 via-[#355746]/10 to-transparent blur-3xl" />
      <div className="pointer-events-none absolute bottom-16 left-6 w-[400px] h-[400px] rounded-full bg-gradient-to-tr from-[#243D32]/15 via-[#82977B]/10 to-transparent blur-3xl" />

      <StaggerContainer className="relative z-10 max-w-5xl mx-auto w-full pt-28 pb-20 px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Page Title & Status */}
        <StaggerItem className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#82977B]/20 pb-5">
          <div className="space-y-1">
            <h1 className="text-3xl sm:text-4xl font-black text-[#243D32] tracking-tight">
              ประวัติส่วนตัว
            </h1>
            <p className="text-xs sm:text-sm text-[#746F64]">
              ข้อมูลประวัติและการศึกษา • พชรภูมิ มฤค
            </p>
          </div>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 border border-[#82977B]/30 shadow-xs backdrop-blur-md self-start sm:self-auto">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-bold text-[#243D32]">
              ปวส. 1 • เทคโนโลยีสารสนเทศ NTC
            </span>
          </div>
        </StaggerItem>

        {/* Main 2-Column: 3D Student ID Card (Left) & Personal Details (Right) */}
        <StaggerItem>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
            
            {/* LEFT: 3D Reflective Student ID Card */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center">
              <div className="w-full bg-white/70 backdrop-blur-xl border border-[#82977B]/35 rounded-3xl p-5 shadow-xl flex flex-col items-center">
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
                  height={490}
                  radius={20}
                  className="w-full max-w-[310px] shadow-xl mx-auto border border-[#82977B]/40"
                >
                  <div className="flex flex-col h-full justify-between select-none">
                    {/* Photo with clear view of face and uniform */}
                    <div className="relative mb-3 w-full flex-1 rounded-2xl overflow-hidden border border-[#82977B]/40 shadow-md bg-[#0e1a14]">
                      <img
                        src="/profile-card.webp"
                        alt="พชรภูมิ มฤค"
                        className="w-full h-full object-cover object-top"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 via-15% to-transparent to-30% pointer-events-none" />

                      <div className="absolute bottom-3 left-3 right-3 text-white">
                        <span className="inline-block px-2 py-0.5 rounded text-[10px] font-semibold bg-[#355746]/90 text-[#D9C8AA] border border-[#82977B]/50 mb-1">
                          เทคโนโลยีสารสนเทศ
                        </span>
                        <h3 className="text-base font-bold text-white drop-shadow-md">
                          พชรภูมิ มฤค (เจเดม)
                        </h3>
                        <p className="text-[11px] text-[#D9C8AA] mt-0.5">
                          วิทยาลัยเทคนิคนครศรีธรรมราช
                        </p>
                      </div>
                    </div>

                    {/* Card Footer */}
                    <div className="flex items-center justify-between gap-2 pt-2 border-t border-[#82977B]/30 text-white">
                      <div className="flex flex-col">
                        <span className="text-[9px] uppercase tracking-wider text-[#D9C8AA]">
                          รหัสนักศึกษา
                        </span>
                        <span className="text-xs font-mono font-bold tracking-wider">
                          69319010009
                        </span>
                      </div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#243D32] text-[#D9C8AA] border border-[#82977B]/40">
                        NTC
                      </span>
                    </div>
                  </div>
                </ReflectiveCard>

                <span className="text-[11px] text-[#746F64] mt-3 flex items-center gap-1 font-medium">
                  <Sparkles className="w-3 h-3 text-[#355746]" />
                  <span>ขยับเมาส์เพื่อเอียงบัตร 3D</span>
                </span>
              </div>
            </div>

            {/* RIGHT: Clear Personal Dossier */}
            <div className="lg:col-span-7 bg-white/80 backdrop-blur-xl border border-[#82977B]/35 rounded-3xl p-6 sm:p-7 shadow-xl flex flex-col justify-between space-y-5">
              
              <div className="flex items-center gap-3 pb-3 border-b border-[#82977B]/20">
                <div className="w-10 h-10 rounded-xl bg-[#355746]/10 text-[#355746] flex items-center justify-center">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg sm:text-xl font-bold text-[#243D32]">
                    ข้อมูลส่วนบุคคล
                  </h2>
                  <p className="text-xs text-[#746F64]">
                    นายพชรภูมิ มฤค
                  </p>
                </div>
              </div>

              {/* Clean 2-Column Details Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5">
                
                {/* ชื่อ-สกุล */}
                <div className="p-3.5 rounded-2xl bg-[#FAF9F5] border border-[#82977B]/20 space-y-0.5">
                  <span className="text-[11px] text-[#746F64] block">ชื่อ-สกุล / ชื่อเล่น</span>
                  <p className="text-sm font-bold text-[#243D32]">
                    นาย พชรภูมิ มฤค <span className="text-[#355746] font-extrabold">(เจเดม)</span>
                  </p>
                </div>

                {/* วันเกิด */}
                <div className="p-3.5 rounded-2xl bg-[#FAF9F5] border border-[#82977B]/20 space-y-0.5">
                  <span className="text-[11px] text-[#746F64] block">วันเกิด / อายุ</span>
                  <p className="text-sm font-bold text-[#243D32]">
                    19 เมษายน 2550 <span className="text-xs text-[#82977B] font-semibold">(อายุ 19 ปี)</span>
                  </p>
                </div>

                {/* ระดับชั้น */}
                <div className="p-3.5 rounded-2xl bg-[#FAF9F5] border border-[#82977B]/20 space-y-0.5">
                  <span className="text-[11px] text-[#746F64] block">ระดับการศึกษา</span>
                  <p className="text-sm font-bold text-[#243D32]">
                    ปวส. 1 • เทคโนโลยีสารสนเทศ
                  </p>
                </div>

                {/* รหัสนักศึกษา */}
                <div className="p-3.5 rounded-2xl bg-[#FAF9F5] border border-[#82977B]/20 space-y-0.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] text-[#746F64]">รหัสนักศึกษา</span>
                    <button
                      type="button"
                      onClick={() => handleCopy('69319010009', 'id')}
                      className="text-[10px] text-stone-400 hover:text-[#355746] flex items-center gap-1 cursor-pointer"
                    >
                      {copiedField === 'id' ? (
                        <span className="text-emerald-600 font-bold flex items-center gap-0.5">
                          <Check className="w-3 h-3" /> คัดลอกแล้ว
                        </span>
                      ) : (
                        <span className="flex items-center gap-0.5">
                          <Copy className="w-3 h-3" /> คัดลอก
                        </span>
                      )}
                    </button>
                  </div>
                  <p className="text-sm font-mono font-bold text-[#243D32]">
                    69319010009 <span className="text-xs font-sans text-[#746F64]">(กลุ่ม 1)</span>
                  </p>
                </div>

                {/* เบอร์โทรศัพท์ */}
                <div className="p-3.5 rounded-2xl bg-[#FAF9F5] border border-[#82977B]/20 space-y-0.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] text-[#746F64] flex items-center gap-1">
                      <Phone className="w-3 h-3 text-[#82977B]" />
                      <span>เบอร์โทรศัพท์</span>
                    </span>
                    <button
                      type="button"
                      onClick={() => handleCopy('0623058410', 'phone')}
                      className="text-[10px] text-stone-400 hover:text-[#355746] flex items-center gap-1 cursor-pointer"
                    >
                      {copiedField === 'phone' ? (
                        <span className="text-emerald-600 font-bold flex items-center gap-0.5">
                          <Check className="w-3 h-3" /> คัดลอกแล้ว
                        </span>
                      ) : (
                        <span className="flex items-center gap-0.5">
                          <Copy className="w-3 h-3" /> คัดลอก
                        </span>
                      )}
                    </button>
                  </div>
                  <a
                    href="tel:0623058410"
                    className="text-sm font-bold text-[#243D32] hover:text-[#355746] transition-colors flex items-center justify-between"
                  >
                    <span>062-3058410</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-stone-400" />
                  </a>
                </div>

                {/* อีเมล */}
                <div className="p-3.5 rounded-2xl bg-[#FAF9F5] border border-[#82977B]/20 space-y-0.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] text-[#746F64] flex items-center gap-1">
                      <Mail className="w-3 h-3 text-[#82977B]" />
                      <span>อีเมลสถานศึกษา</span>
                    </span>
                    <button
                      type="button"
                      onClick={() => handleCopy('69319010009@tnk.ac.th', 'email')}
                      className="text-[10px] text-stone-400 hover:text-[#355746] flex items-center gap-1 cursor-pointer"
                    >
                      {copiedField === 'email' ? (
                        <span className="text-emerald-600 font-bold flex items-center gap-0.5">
                          <Check className="w-3 h-3" /> คัดลอกแล้ว
                        </span>
                      ) : (
                        <span className="flex items-center gap-0.5">
                          <Copy className="w-3 h-3" /> คัดลอก
                        </span>
                      )}
                    </button>
                  </div>
                  <a
                    href="mailto:69319010009@tnk.ac.th"
                    className="text-xs sm:text-sm font-bold text-blue-600 hover:underline block truncate"
                  >
                    69319010009@tnk.ac.th
                  </a>
                </div>

              </div>

              {/* ที่อยู่ปัจจุบัน */}
              <div className="pt-2 border-t border-[#82977B]/20 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-[#746F64]">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-[#82977B] shrink-0 mt-0.5" />
                  <p>
                    <strong className="text-[#243D32]">ที่อยู่:</strong> 90/9 หมู่ 5 ต.ปากนคร อ.เมือง จ.นครศรีธรรมราช 80000
                  </p>
                </div>
                <a
                  href="https://www.google.com/maps?q=8.418910391058159,100.0049360619489"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[11px] font-bold text-[#355746] hover:underline shrink-0"
                >
                  <span>Google Maps</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              {/* เป้าหมายในอนาคต */}
              <div className="bg-[#FAF9F5] border-l-3 border-[#355746] p-3.5 rounded-xl text-xs space-y-1">
                <span className="font-bold text-[#243D32] flex items-center gap-1.5">
                  <Target className="w-3.5 h-3.5 text-[#355746]" />
                  <span>เป้าหมายในอนาคต</span>
                </span>
                <p className="text-[#5C574F] italic leading-relaxed">
                  "ตั้งใจจะพัฒนาทักษะและประสบการณ์ในการทำงานให้ประสบความสำเร็จ มุ่งมั่นสร้างสรรค์ผลงานด้านเทคโนโลยีสารสนเทศที่มีคุณภาพ และต่อยอดสู่การทำงานจริงในระดับมืออาชีพ"
                </p>
              </div>

            </div>

          </div>
        </StaggerItem>

        {/* Education Timeline (Clean, No Fluff) */}
        <StaggerItem>
          <div className="bg-white/80 backdrop-blur-xl border border-[#82977B]/30 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-[#82977B]/20">
              <div className="w-10 h-10 rounded-xl bg-[#355746]/10 text-[#355746] flex items-center justify-center">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-[#243D32]">
                  ประวัติการศึกษา
                </h2>
                <p className="text-xs text-[#746F64]">
                  ระดับการศึกษาและสถาบัน
                </p>
              </div>
            </div>

            {/* Simple, Legible Step Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {educationHistory.map((item, idx) => (
                <div
                  key={idx}
                  className={`p-5 rounded-2xl border transition-all ${
                    item.current
                      ? 'bg-gradient-to-b from-white to-[#FAF9F5] border-[#355746]/50 shadow-md ring-1 ring-[#355746]/20'
                      : 'bg-[#FAF9F5] border-[#82977B]/25'
                  } space-y-2.5`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-[#80634D]">
                      0{idx + 1}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      item.current
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                        : 'bg-white text-[#746F64] border border-stone-200'
                    }`}>
                      {item.status}
                    </span>
                  </div>

                  <div>
                    <span className="text-xs font-bold text-[#82977B] block">
                      {item.level}
                    </span>
                    <h3 className="text-sm sm:text-base font-bold text-[#243D32] leading-snug mt-0.5">
                      {item.school}
                    </h3>
                    {item.major && (
                      <p className="text-xs font-semibold text-[#355746] mt-1">
                        {item.major}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </StaggerItem>

      </StaggerContainer>
    </div>
  );
};
