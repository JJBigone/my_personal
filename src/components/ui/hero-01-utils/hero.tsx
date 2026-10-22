import { Button } from "@/components/ui/button";
import { motion } from "motion/react";
import { ArrowUpRight, Sparkles, Star } from "lucide-react";
import { Link } from "react-router-dom";

export type AvatarList = {
  image: string;
};

type HeroSectionProps = {
  avatarList: AvatarList[];
  heroImage?: string;
};

export function HeroSection({
  avatarList,
  heroImage = "/hero-image.png"
}: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden pt-4 md:pt-10 pb-8 md:pb-14">
      {/* Ambient background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-3/4 h-72 bg-gradient-to-r from-[#A0A37A]/20 via-[#D9C8AA]/30 to-[#82977B]/20 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto gap-6 sm:gap-8 mb-10 sm:mb-12">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel text-xs font-semibold uppercase tracking-wider text-[#355746] shadow-xs"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#80634D]" />
            <span>Personal Portfolio &amp; Creative Works</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeInOut" }}
            className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-[#243D32] tracking-tight leading-[1.12]"
          >
            Building bold brands with{" "}
            <span className="italic font-serif text-[#355746] underline decoration-[#82977B]/40 underline-offset-8">
              thoughtful design
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeInOut" }}
            className="text-base sm:text-lg font-normal max-w-2xl text-[#746F64] leading-relaxed"
          >
            I craft digital experiences, interactive gaming projects, and tailored software solutions, guiding ideas from creative vision to reality.
          </motion.p>

          {/* Actions & Social Proof */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeInOut" }}
            className="flex items-center flex-col sm:flex-row justify-center gap-6 sm:gap-8 pt-2"
          >
            <Link to="/projects">
              <Button className="relative text-sm font-semibold rounded-full h-12 p-1 ps-6 pe-14 group transition-all duration-500 hover:ps-14 hover:pe-6 w-fit overflow-hidden bg-[#355746] hover:bg-[#243D32] text-[#FAF8F2] shadow-lg cursor-pointer">
                <span className="relative z-10 transition-all duration-500">
                  Explore Work
                </span>
                <span className="absolute right-1 w-10 h-10 bg-[#FAF8F2] text-[#243D32] rounded-full flex items-center justify-center transition-all duration-500 group-hover:right-[calc(100%-44px)] group-hover:rotate-45">
                  <ArrowUpRight size={16} />
                </span>
              </Button>
            </Link>

            {/* Avatars & Rating */}
            <div className="flex items-center gap-3">
              <ul className="flex flex-row items-center">
                {avatarList.map((avatar, index) => (
                  <li key={index} className="-mr-2.5 z-1 hover:translate-y-[-2px] transition-transform">
                    <img
                      src={avatar.image}
                      alt="Collaborator avatar"
                      width={38}
                      height={38}
                      className="rounded-full border-2 border-[#FAF8F2] shadow-xs object-cover"
                    />
                  </li>
                ))}
              </ul>
              <div className="flex flex-col items-start gap-1">
                <div className="flex gap-0.5 text-amber-500">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-500" />
                  ))}
                </div>
                <p className="text-xs font-medium text-[#746F64]">
                  High creative standard
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ======================================================== */}
        {/* CUSTOM HERO IMAGE SHOWCASE (เอารูปนั้นใส่ในนี้) */}
        {/* ======================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 36, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.4, ease: "easeOut" }}
          className="relative max-w-5xl mx-auto group"
        >
          {/* Glass frame */}
          <div className="w-full rounded-3xl overflow-hidden glass-panel p-2 sm:p-3 shadow-2xl relative border border-[#D9C8AA]/60 transition-transform duration-500 group-hover:scale-[1.005]">
            <div className="relative w-full overflow-hidden rounded-2xl h-[230px] sm:h-[350px] md:h-[420px] lg:h-[460px] bg-[#243D32]/10">
              <img
                src={heroImage}
                alt="Pacharaphum Profile Custom Hero"
                className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#243D32]/50 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>

          {/* Floating Pill Left */}
          <div className="absolute -bottom-4 left-6 sm:left-10 glass-panel rounded-2xl py-2 px-4 shadow-xl flex items-center gap-2.5 backdrop-blur-xl border border-[#D9C8AA]/60 z-10">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-semibold text-[#243D32]">Pacharaphum Profile</span>
          </div>

          {/* Floating Pill Right */}
          <div className="hidden sm:flex absolute -bottom-4 right-10 glass-panel rounded-2xl py-2 px-4 shadow-xl items-center gap-2 backdrop-blur-xl border border-[#D9C8AA]/60 z-10">
            <Sparkles className="w-3.5 h-3.5 text-[#80634D]" />
            <span className="text-xs font-semibold text-[#355746]">Interactive Showcase</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default HeroSection;
