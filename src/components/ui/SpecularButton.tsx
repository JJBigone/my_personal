'use client';

import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  type ReactNode,
  type MouseEventHandler,
  type CSSProperties,
  type ButtonHTMLAttributes
} from 'react';

import './SpecularButton.css';

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

export interface SpecularButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  size?: 'sm' | 'md' | 'lg';
  radius?: number;
  tint?: string;
  tintOpacity?: number;
  blur?: number;
  textColor?: string;
  lineColor?: string;
  baseColor?: string;
  intensity?: number;
  idleIntensity?: number;
  shineSize?: number;
  shineFade?: number;
  thickness?: number;
  glow?: number;
  speed?: number;
  followMouse?: boolean;
  proximity?: number;
  autoAnimate?: boolean;
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  style?: CSSProperties;
}

export const SpecularButton: React.FC<SpecularButtonProps> = ({
  children = 'Get Started',
  size = 'lg',
  radius = 24,
  tint = '#243D32',
  tintOpacity = 0.75,
  blur = 16,
  textColor = '#FAF8F2',
  lineColor = '#82977B',
  baseColor = '#355746',
  intensity = 1.2,
  idleIntensity = 0.35,
  thickness = 1.5,
  glow = 1.2,
  speed = 0.35,
  followMouse = true,
  proximity = 280,
  autoAnimate = false,
  disabled = false,
  onClick,
  className = '',
  type = 'button',
  style,
  ...rest
}) => {
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const [angle, setAngle] = useState(135);
  const [activeIntensity, setActiveIntensity] = useState(idleIntensity);
  const rafRef = useRef<number | null>(null);

  const handlePointerMove = useCallback((e: PointerEvent) => {
    if (!followMouse || disabled || !buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const dx = e.clientX - centerX;
    const dy = e.clientY - centerY;
    const dist = Math.hypot(dx, dy);

    if (dist < proximity) {
      const rad = Math.atan2(dy, dx);
      let deg = (rad * 180) / Math.PI + 90;
      if (deg < 0) deg += 360;
      setAngle(deg);
      const factor = clamp(1 - dist / proximity, 0, 1);
      setActiveIntensity(idleIntensity + (intensity - idleIntensity) * factor);
    } else {
      setActiveIntensity(idleIntensity);
    }
  }, [followMouse, disabled, proximity, idleIntensity, intensity]);

  useEffect(() => {
    if (autoAnimate && !disabled) {
      let currentAngle = angle;
      let lastTime = performance.now();
      const loop = (now: number) => {
        const dt = (now - lastTime) / 1000;
        lastTime = now;
        currentAngle = (currentAngle + speed * 120 * dt) % 360;
        setAngle(currentAngle);
        rafRef.current = requestAnimationFrame(loop);
      };
      rafRef.current = requestAnimationFrame(loop);
      return () => {
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
      };
    }
  }, [autoAnimate, disabled, speed]);

  useEffect(() => {
    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
    };
  }, [handlePointerMove]);

  return (
    <button
      ref={buttonRef}
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`specular-button specular-button--${size}${className ? ` ${className}` : ''}`}
      style={{
        '--sb-radius': `${radius}px`,
        '--sb-tint': tint,
        '--sb-tint-opacity': tintOpacity,
        '--sb-blur': `${blur}px`,
        '--sb-text-color': textColor,
        '--sb-line-color': lineColor,
        '--sb-base-color': baseColor,
        '--sb-thickness': `${thickness}px`,
        '--sb-angle': `${angle}deg`,
        '--sb-glow': glow,
        '--sb-intensity': activeIntensity,
        ...style
      } as CSSProperties}
      {...rest}
    >
      {/* Specular border light shine overlay */}
      <span className="specular-button__rim" aria-hidden="true" />
      {/* Specular glow aura */}
      <span className="specular-button__aura" aria-hidden="true" />
      {/* Button content */}
      <span className="specular-button__label">{children}</span>
    </button>
  );
};

export default SpecularButton;
