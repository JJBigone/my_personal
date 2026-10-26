import React, { useState } from 'react';
import { Mail, Send, CheckCircle2, AlertCircle, MapPin, Phone } from 'lucide-react';
import { portfolioService } from '../services/portfolioService';
import { StaggerContainer, StaggerItem } from '../components/motion/StaggerGroup';

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setErrorMsg('กรุณากรอกข้อมูลให้ครบทุกช่อง');
      return;
    }

    setLoading(true);
    try {
      const success = await portfolioService.submitContactMessage({
        name: formData.name,
        email: formData.email,
        subject: formData.subject || 'ข้อความติดต่อจากเว็บไซต์',
        message: formData.message
      });

      if (success) {
        setSubmitted(true);
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setErrorMsg('ไม่สามารถส่งข้อความได้ กรุณาลองใหม่อีกครั้ง');
      }
    } catch {
      setErrorMsg('เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้งในภายหลัง');
    } finally {
      setLoading(false);
    }
  };

  return (
    <StaggerContainer className="space-y-10 max-w-4xl mx-auto w-full pt-28 pb-16 px-4 sm:px-8">
      {/* Header */}
      <StaggerItem className="space-y-2 border-b border-[#82977B]/20 pb-5">
        <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full glass-panel text-xs font-bold uppercase tracking-wider text-[#355746]">
          <Mail className="w-3.5 h-3.5 text-[#80634D]" />
          <span>Contact</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#243D32] tracking-tight">
          ติดต่อ / ส่งข้อความ
        </h1>
        <p className="text-xs sm:text-sm text-[#746F64]">
          ช่องทางการติดต่อและแบบฟอร์มส่งข้อความถึงผู้จัดทำ
        </p>
      </StaggerItem>

      {/* Main Grid: Form and Contact Info */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Info Sidebar */}
        <StaggerItem className="md:col-span-5 space-y-4">
          <div className="glass-panel rounded-3xl p-6 space-y-4 border border-[#82977B]/30 shadow-sm">
            <h3 className="text-base font-bold text-[#243D32]">
              ข้อมูลการติดต่อโดยตรง
            </h3>
            
            <div className="space-y-3">
              {/* Phone */}
              <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/70 border border-[#82977B]/20">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-700 flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[11px] text-[#746F64]">เบอร์โทรศัพท์</div>
                  <a href="tel:0623058410" className="text-sm font-bold text-[#243D32] hover:text-[#355746] transition-colors">
                    062-3058410
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/70 border border-[#82977B]/20">
                <div className="w-9 h-9 rounded-xl bg-[#355746]/10 text-[#355746] flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <div className="text-[11px] text-[#746F64]">อีเมลสถานศึกษา</div>
                  <a href="mailto:69319010009@tnk.ac.th" className="text-xs font-bold text-blue-600 hover:underline block truncate">
                    69319010009@tnk.ac.th
                  </a>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/70 border border-[#82977B]/20">
                <div className="w-9 h-9 rounded-xl bg-[#80634D]/10 text-[#80634D] flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[11px] text-[#746F64]">สถานศึกษา</div>
                  <div className="text-xs font-bold text-[#243D32]">
                    วิทยาลัยเทคนิคนครศรีธรรมราช
                  </div>
                </div>
              </div>
            </div>
          </div>
        </StaggerItem>

        {/* Contact Form */}
        <StaggerItem className="md:col-span-7">
          <div className="glass-panel rounded-3xl p-6 sm:p-7 shadow-sm border border-[#82977B]/30 relative">
            {submitted ? (
              <div className="py-10 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-[#243D32]">ส่งข้อความเรียบร้อยแล้ว</h3>
                <p className="text-xs text-[#746F64] max-w-xs mx-auto">
                  ข้อความของคุณถูกบันทึกเข้าสู่ระบบฐานข้อมูลเรียบร้อยแล้ว
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="px-5 py-2 rounded-full bg-[#355746] text-[#FAF8F2] text-xs font-semibold hover:bg-[#243D32] transition-colors mt-2"
                >
                  ส่งข้อความใหม่
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3.5">
                {errorMsg && (
                  <div className="p-3 rounded-xl bg-red-50 text-red-700 text-xs flex items-center gap-2 border border-red-200">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-semibold text-[#243D32] mb-1">
                    ชื่อของคุณ <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="เช่น สมชาย ใจดี"
                    className="w-full px-3.5 py-2 rounded-xl glass-input text-xs sm:text-sm text-[#243D32]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#243D32] mb-1">
                    อีเมลติดต่อ <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="your-email@example.com"
                    className="w-full px-3.5 py-2 rounded-xl glass-input text-xs sm:text-sm text-[#243D32]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#243D32] mb-1">
                    หัวข้อเรื่อง
                  </label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="เช่น สอบถามข้อมูลชิ้นงาน"
                    className="w-full px-3.5 py-2 rounded-xl glass-input text-xs sm:text-sm text-[#243D32]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#243D32] mb-1">
                    ข้อความ <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="เขียนข้อความที่ต้องการส่ง..."
                    className="w-full px-3.5 py-2 rounded-xl glass-input text-xs sm:text-sm text-[#243D32] resize-y"
                  />
                </div>

                <div className="pt-1">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 rounded-xl bg-[#355746] hover:bg-[#243D32] text-[#FAF8F2] font-semibold text-xs sm:text-sm shadow-md transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
                  >
                    {loading ? (
                      <span className="animate-pulse">กำลังส่งข้อความ...</span>
                    ) : (
                      <>
                        <span>ส่งข้อความ</span>
                        <Send className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </StaggerItem>
      </div>
    </StaggerContainer>
  );
};
