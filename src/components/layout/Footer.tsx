import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MapPin, Phone, Mail, ExternalLink, ShieldAlert } from 'lucide-react';
import { cn } from '../../lib/utils';

export const Footer: React.FC = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <footer
      className={cn(
        "border-t border-[#82977B]/30 bg-[#24352b] text-[#D9C8AA] transition-all duration-300",
        isHome ? "mt-0" : "mt-24"
      )}
    >
      <div className="max-w-6xl mx-auto px-6 pt-12 pb-8 space-y-10">
        {/* Main 3 Columns: Address, Location, Contact (Excluding Cat image & About me per request) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* 1. Address */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="text-base font-bold text-[#FAF8F2] tracking-wider uppercase flex items-center gap-2 border-b border-[#82977B]/30 pb-2">
              <MapPin className="w-4 h-4 text-[#82977B]" />
              <span>Address</span>
            </h4>
            <div className="space-y-1 text-sm text-[#D9C8AA]/90 leading-relaxed font-normal">
              <p>90/9 Moo 5, Pak Nakhon</p>
              <p>Subdistrict, Mueang Nakhon Si</p>
              <p>Thammarat District, Nakhon Si</p>
              <p>Thammarat Province</p>
            </div>
          </div>

          {/* 2. Location (Google Map) */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center justify-between border-b border-[#82977B]/30 pb-2">
              <h4 className="text-base font-bold text-[#FAF8F2] tracking-wider uppercase flex items-center gap-2">
                <span>Location</span>
              </h4>
              <a
                href="https://www.google.com/maps?q=8.418910391058159,100.0049360619489"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-[#82977B] hover:text-[#FAF8F2] flex items-center gap-1 transition-colors"
              >
                <span>View larger</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
            <div className="w-full h-36 rounded-2xl overflow-hidden border border-[#82977B]/35 shadow-lg bg-[#1a2820] relative">
              <iframe
                title="Location Map"
                src="https://maps.google.com/maps?q=8.418910391058159,100.0049360619489&t=&z=16&ie=UTF8&iwloc=&output=embed"
                className="w-full h-full border-0 filter contrast-95 opacity-90 hover:opacity-100 transition-opacity"
                loading="lazy"
              />
            </div>
          </div>

          {/* 3. Contact */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-base font-bold text-[#FAF8F2] tracking-wider uppercase border-b border-[#82977B]/30 pb-2">
              Contact
            </h4>
            <div className="space-y-4 text-sm">
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-[#82977B] uppercase tracking-wider">
                  <Phone className="w-3.5 h-3.5" />
                  <span>Phone</span>
                </div>
                <a
                  href="tel:0623058410"
                  className="block font-medium text-[#FAF8F2] hover:text-[#A0A37A] transition-colors"
                >
                  062-3058410
                </a>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-[#82977B] uppercase tracking-wider">
                  <Mail className="w-3.5 h-3.5" />
                  <span>E-mail</span>
                </div>
                <a
                  href="mailto:69319010009@tnk.ac.th"
                  className="block font-medium text-[#FAF8F2] hover:text-[#A0A37A] transition-colors break-all"
                >
                  69319010009@tnk.ac.th
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-[#82977B]/25 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#D9C8AA]/80">
          <p className="text-center sm:text-left font-medium">
            วิทยาลัยเทคนิคนครศรีธรรมราช <span className="opacity-75 ml-1 font-normal">Nakhonsithammarat Technical College</span>
          </p>

          <div className="flex items-center gap-3 text-center sm:text-right">
            <span>จัดทำเพื่อการศึกษา • &copy; {new Date().getFullYear()} Pacharaphum</span>
            <Link
              to="/admin"
              className="text-[#82977B] hover:text-[#FAF8F2] transition-colors flex items-center gap-1"
              title="Admin Portal"
            >
              <ShieldAlert className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
