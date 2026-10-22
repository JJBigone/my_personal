import HeroSection from "@/components/ui/hero-01-utils/hero";
import type { NavigationSection } from "@/components/ui/hero-01-utils/header";
import Header from "@/components/ui/hero-01-utils/header";
import BrandSlider, {
  type BrandList,
} from "@/components/ui/hero-01-utils/brand-slider";
import type { AvatarList } from "@/components/ui/hero-01-utils/hero";

export default function AgencyHeroSection({
  heroImage = "/hero-image.png",
  showHeader = true,
}: {
  heroImage?: string;
  showHeader?: boolean;
}) {
  const avatarList: AvatarList[] = [
    {
      image:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
    },
    {
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
    },
    {
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80",
    },
    {
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80",
    },
  ];

  const navigationData: NavigationSection[] = [
    {
      title: "Home",
      href: "/",
      isActive: true,
    },
    {
      title: "About",
      href: "/about",
    },
    {
      title: "Projects",
      href: "/projects",
    },
    {
      title: "Skills",
      href: "/skills",
    },
    {
      title: "Contact",
      href: "/contact",
    },
  ];

  const brandList: BrandList[] = [
    {
      image:
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
      name: "React 19",
    },
    {
      image:
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
      name: "TypeScript",
    },
    {
      image:
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg",
      name: "Supabase",
    },
    {
      image:
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
      name: "Tailwind CSS",
    },
    {
      image:
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg",
      name: "Vite",
    },
  ];

  return (
    <div className="relative">
      {showHeader && <Header navigationData={navigationData} />}
      <main>
        <HeroSection avatarList={avatarList} heroImage={heroImage} />
        <BrandSlider brandList={brandList} />
      </main>
    </div>
  );
}

export { AgencyHeroSection };
