import { TiltedGridHero } from "@/components/ui/tilted-grid-hero";

const IMAGES = [
  {
    src: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1200&auto=format&fit=crop",
    alt: "AuraCraft Gaming & Esports Hub",
  },
  {
    src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop",
    alt: "Nexus AI Telemetry Dashboard",
  },
  {
    src: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop",
    alt: "Earth & Canvas Digital Magazine",
  },
  {
    src: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=1200&auto=format&fit=crop",
    alt: "Lumina Video Stream Manager",
  },
  {
    src: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=1200&auto=format&fit=crop",
    alt: "Verdant Interactive Soundboard",
  },
  {
    src: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop",
    alt: "CyberForge 3D Asset Studio",
  },
  {
    src: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1200&auto=format&fit=crop",
    alt: "Botanica Organic Brand Lookbook",
  },
  {
    src: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1200&auto=format&fit=crop",
    alt: "Retro Cyberpunk Tech Studio",
  },
];

export default function TiltedGridHeroDemo() {
  return (
    <TiltedGridHero
      images={IMAGES}
      className="h-[560px] w-full rounded-3xl border border-[#D9C8AA]/40 bg-[#FAF8F2]"
    >
      <div className="relative z-10 flex h-full flex-col items-center justify-between py-12 text-center pointer-events-none">
        <div className="px-6 pointer-events-auto">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#82977B]">
            Cylindrical 3D Showcase
          </span>
          <h2 className="text-balance text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#243D32] mt-2">
            Every project,
            <br />
            brought into focus.
          </h2>
        </div>
        <p className="max-w-md text-balance px-6 text-sm text-[#746F64] font-medium pointer-events-auto">
          Images stream along a curved cylinder arc, flattening out at the centre, then fading gently into the page.
        </p>
      </div>
    </TiltedGridHero>
  );
}
