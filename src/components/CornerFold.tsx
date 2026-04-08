"use client";

export default function CornerFold({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const sizes = {
    sm: "w-16 h-16 md:w-20 md:h-20",
    md: "w-20 h-20 md:w-28 md:h-28",
    lg: "w-24 h-24 md:w-36 md:h-36",
  };

  return (
    <div className={`absolute top-0 right-0 ${sizes[size]} overflow-hidden z-20 pointer-events-none`}>
      {/* Folded corner */}
      <div className="absolute top-0 right-0 w-full h-full">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          {/* Main orange triangle */}
          <polygon points="0,0 100,0 100,100" fill="url(#cornerGradient)" />
          {/* Shadow/fold line */}
          <line x1="0" y1="0" x2="100" y2="100" stroke="rgba(0,0,0,0.1)" strokeWidth="0.5" />
          {/* Paper fold shadow */}
          <polygon points="0,0 100,100 0,100" fill="url(#foldShadow)" opacity="0.08" />
          <defs>
            <linearGradient id="cornerGradient" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#E8941A" />
              <stop offset="100%" stopColor="#F0A030" />
            </linearGradient>
            <linearGradient id="foldShadow" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#000" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
}
