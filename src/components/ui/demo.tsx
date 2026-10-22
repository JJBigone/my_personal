import Hero12, { type Hero12Props } from "@/components/ui/hero-12";

const values: Hero12Props = {
  title: "Pacharaphum Profile",
  established: "Portfolio 2026",
  description:
    "Student at Nakhon Si Thammarat Technical College. Passionate about software development, interactive digital media, and modern web applications.",
  backgroundImage: "/hero-carousel-1.png",
  backgroundAlt: "Pacharaphum Profile Hero Banner",
  animation: "subtle",
  primaryCTA: {
    ctaEnabled: true,
    text: "View Projects",
    link: "/projects",
    size: "default",
  },
  variant: "fullscreen",
};

export default function Hero12Demo() {
  return (
    <div className="flex min-h-screen w-full max-w-full overflow-hidden p-0">
      <Hero12 {...values} />
    </div>
  );
}
