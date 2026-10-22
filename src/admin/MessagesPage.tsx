import React, { useEffect, useState } from 'react';
import { portfolioService } from '../services/portfolioService';
import type { ContactMessage } from '../types/portfolio';
import { MessageSquare, Mail, Calendar, CheckCircle2 } from 'lucide-react';

export const MessagesPage: React.FC = () => {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    portfolioService.getContactMessagesAdmin().then((data) => {
      setMessages(data);
      setLoading(false);
    });
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-extrabold text-[#243D32]">Contact Inquiries</h1>
        <p className="text-xs sm:text-sm text-[#746F64] mt-1">
          Review incoming messages submitted through the public contact form.
        </p>
      </div>

      <div className="glass-panel rounded-2xl p-6">
        {loading ? (
          <div className="py-12 text-center text-xs text-[#746F64] animate-pulse">
            Loading inquiries...
          </div>
        ) : messages.length === 0 ? (
          <div className="py-12 text-center text-xs text-[#746F64] space-y-2">
            <MessageSquare className="w-8 h-8 mx-auto text-[#D9C8AA]" />
            <p>No messages received yet. All new contact inquiries will appear here.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className="glass-panel-subtle rounded-2xl p-5 space-y-3 hover:bg-[#FAF8F2] transition-colors"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#D9C8AA]/30 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-[#243D32]">{msg.name}</span>
                    <span className="text-xs text-[#746F64]">&lt;{msg.email}&gt;</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] text-[#746F64]">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{new Date(msg.created_at).toLocaleString()}</span>
                  </div>
                </div>

                <div>
                  <div className="text-xs font-semibold text-[#80634D] mb-1">
                    Subject: {msg.subject}
                  </div>
                  <p className="text-xs sm:text-sm text-[#4B382D] leading-relaxed whitespace-pre-wrap">
                    {msg.message}
                  </p>
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Saved in Database</span>
                  </span>
                  <a
                    href={`mailto:${msg.email}?subject=Re: ${encodeURIComponent(msg.subject)}`}
                    className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-[#355746] text-[#FAF8F2] text-xs font-medium hover:bg-[#243D32]"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>Reply via Email</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
