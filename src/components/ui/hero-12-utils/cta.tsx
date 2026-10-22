import { Link } from "react-router-dom";
import SpecularButton from "@/components/ui/SpecularButton";

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

export function Cta({ cta, className }: CtaComponentProps) {
  if (!cta?.ctaEnabled) return null;

  const btnSize = cta.size === "sm" ? "sm" : cta.size === "lg" ? "lg" : "md";

  const buttonContent = (
    <SpecularButton
      size={btnSize}
      radius={24}
      tint="#243D32"
      tintOpacity={0.65}
      blur={12}
      textColor="#FAF8F2"
      lineColor="#82977B"
      baseColor="#355746"
      intensity={1.2}
      idleIntensity={0.45}
      shineSize={14}
      shineFade={36}
      thickness={1.5}
      glow={1.2}
      followMouse
      proximity={280}
      onClick={cta.onClick}
      className={className}
    >
      <span className="font-semibold tracking-wide flex items-center gap-2">
        {cta.text}
      </span>
    </SpecularButton>
  );

  if (cta.link) {
    if (cta.link.startsWith("http://") || cta.link.startsWith("https://")) {
      return (
        <a href={cta.link} target="_blank" rel="noopener noreferrer" className="inline-block">
          {buttonContent}
        </a>
      );
    }
    return (
      <Link to={cta.link} className="inline-block">
        {buttonContent}
      </Link>
    );
  }

  return buttonContent;
}

export default Cta;
