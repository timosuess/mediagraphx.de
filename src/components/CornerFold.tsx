"use client";

export default function CornerFold({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const sizes = {
    sm: "w-14 h-14 md:w-20 md:h-20",
    md: "w-16 h-16 md:w-24 md:h-24",
    lg: "w-20 h-20 md:w-32 md:h-32",
  };

  return (
    <div className={`absolute top-0 right-0 ${sizes[size]} z-20 pointer-events-none`}>
      <svg viewBox="0 0 100 100" className="w-full h-full" preserveAspectRatio="none">
        {/* Main orange fold */}
        <polygon points="0,0 100,0 100,100" fill="#E8941A" />
        {/* Subtle gradient overlay for depth */}
        <polygon points="0,0 100,0 100,100" fill="url(#foldSheen)" />
        {/* Fold crease line */}
        <line x1="0" y1="0" x2="100" y2="100" stroke="rgba(255,255,255,0.15)" strokeWidth="0.8" />
        <defs>
          <linearGradient id="foldSheen" x1="100%" y1="0%" x2="50%" y2="50%">
            <stop offset="0%" stopColor="#F0A030" stopOpacity="0.4" />
            <stop offset="100%" stopColor="transparent" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
