import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface CtaProps {
  ctaEnabled?: boolean;
  text: string;
  link?: string;
  size?: "default" | "sm" | "lg";
  onClick?: () => void;
}

export interface CtaComponentProps {
  cta: CtaProps;
  invert?: boolean;
  className?: string;
}

export function Cta({ cta, invert, className }: CtaComponentProps) {
  if (!cta?.ctaEnabled) return null;

  const buttonContent = (
    <Button
      size={cta.size || "default"}
      onClick={cta.onClick}
      className={cn(
        "rounded-full px-7 py-3 font-semibold text-sm shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer",
        invert
          ? "bg-white text-zinc-900 hover:bg-zinc-100 shadow-white/10"
          : "bg-[#355746] text-[#FAF8F2] hover:bg-[#243D32]",
        className
      )}
    >
      {cta.text}
    </Button>
  );

  if (cta.link) {
    if (cta.link.startsWith("http://") || cta.link.startsWith("https://")) {
      return (
        <a href={cta.link} target="_blank" rel="noopener noreferrer">
          {buttonContent}
        </a>
      );
    }
    return <Link to={cta.link}>{buttonContent}</Link>;
  }

  return buttonContent;
}

export default Cta;
