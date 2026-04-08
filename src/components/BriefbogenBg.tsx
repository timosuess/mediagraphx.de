"use client";

export default function BriefbogenBg({ variant = "light" }: { variant?: "light" | "dark" }) {
  const strokeColor = variant === "dark" ? "#ffffff" : "#8C8C8C";
  const opacity = variant === "dark" ? "0.05" : "0.07";

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <svg
        className="absolute w-full h-full"
        viewBox="0 0 1440 900"
        fill="none"
        preserveAspectRatio="none"
        style={{ opacity }}
      >
        <path
          d="M-200 650 C100 350 400 750 700 450 S1100 150 1600 550"
          stroke={strokeColor}
          strokeWidth="2"
        />
        <path
          d="M-100 750 C200 450 500 850 800 550 S1200 250 1700 650"
          stroke={strokeColor}
          strokeWidth="1.5"
        />
        <path
          d="M-300 550 C0 250 300 650 600 350 S1000 50 1500 450"
          stroke="#E8941A"
          strokeWidth="1"
          opacity="0.4"
        />
      </svg>
    </div>
  );
}
