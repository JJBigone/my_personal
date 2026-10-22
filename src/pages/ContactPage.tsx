import React, { useState } from 'react';
import { Mail, Send, CheckCircle2, AlertCircle, MapPin, Sparkles, MessageSquare } from 'lucide-react';
import { portfolioService } from '../services/portfolioService';

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
      setErrorMsg('Please complete all required fields.');
      return;
    }

    setLoading(true);
    try {
      const success = await portfolioService.submitContactMessage({
        name: formData.name,
        email: formData.email,
        subject: formData.subject || 'Portfolio Inquiry',
        message: formData.message
      });

      if (success) {
        setSubmitted(true);
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setErrorMsg('Failed to send message. Please try again.');
      }
    } catch {
      setErrorMsg('An unexpected error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-12 max-w-4xl mx-auto">
      {/* Header */}
      <section className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-panel text-xs font-semibold uppercase tracking-wider text-[#355746]">
          <Mail className="w-3.5 h-3.5 text-[#80634D]" />
          <span>Get in Touch</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-[#243D32] tracking-tight">
          Let's Start a Conversation.
        </h1>
        <p className="text-base sm:text-lg text-[#746F64] leading-relaxed max-w-xl">
          Interested in collaborating on a web project, digital media campaign, or creative endeavor? Send a message and I'll respond promptly.
        </p>
      </section>

      {/* Main Grid: Form and Contact Info */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Info Sidebar */}
        <div className="md:col-span-5 space-y-6">
          <div className="glass-panel rounded-3xl p-6 sm:p-8 space-y-6">
            <h3 className="text-xl font-bold text-[#243D32]">Direct Channels</h3>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-[#355746]/10 text-[#355746] flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs text-[#746F64]">Email</div>
                  <div className="text-sm font-semibold text-[#243D32]">contact@liquidstudio.dev</div>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-[#80634D]/10 text-[#80634D] flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs text-[#746F64]">Location</div>
                  <div className="text-sm font-semibold text-[#243D32]">Bangkok, Thailand (Remote Worldwide)</div>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-[#82977B]/10 text-[#243D32] flex items-center justify-center shrink-0">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs text-[#746F64]">Discord / Socials</div>
                  <div className="text-sm font-semibold text-[#243D32]">@liquid.creator</div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#D9C8AA]/30">
              <div className="flex items-center gap-2 text-xs text-[#355746] font-medium">
                <Sparkles className="w-3.5 h-3.5 text-[#80634D]" />
                <span>Response time within 24 hours</span>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="md:col-span-7">
          <div className="glass-panel rounded-3xl p-6 sm:p-8 shadow-xl relative">
            {submitted ? (
              <div className="py-12 text-center space-y-4 animate-in fade-in duration-300">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-[#243D32]">Message Delivered!</h3>
                <p className="text-sm text-[#746F64] max-w-sm mx-auto">
                  Thank you for reaching out. Your message has been safely saved in the Supabase database.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2.5 rounded-full bg-[#355746] text-[#FAF8F2] text-xs font-semibold hover:bg-[#243D32] transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {errorMsg && (
                  <div className="p-3 rounded-xl bg-red-50 text-red-700 text-xs flex items-center gap-2 border border-red-200">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-semibold text-[#243D32] mb-1.5">
                    Your Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Alex Hunter"
                    className="w-full px-4 py-2.5 rounded-xl glass-input text-sm text-[#243D32]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#243D32] mb-1.5">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="alex@example.com"
                    className="w-full px-4 py-2.5 rounded-xl glass-input text-sm text-[#243D32]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#243D32] mb-1.5">
                    Subject
                  </label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="Project Inquiry, Collab, or Just Saying Hi"
                    className="w-full px-4 py-2.5 rounded-xl glass-input text-sm text-[#243D32]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#243D32] mb-1.5">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell me about your project, timeline, or idea..."
                    className="w-full px-4 py-2.5 rounded-xl glass-input text-sm text-[#243D32] resize-y"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 rounded-xl bg-[#355746] hover:bg-[#243D32] text-[#FAF8F2] font-semibold text-sm shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {loading ? (
                      <span className="animate-pulse">Sending Message...</span>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
