import type { Metadata } from "next";
import { Fraunces, Manrope, Caveat } from "next/font/google";
import "./globals.css";
import WhatsAppButton from "@/components/WhatsAppButton";
import Preloader from "@/components/Preloader";
import CustomCursor from "@/components/CustomCursor";
import MagneticAttractor from "@/components/MagneticAttractor";

const fraunces = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz", "SOFT", "WONK"],
});

const manrope = Manrope({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const caveat = Caveat({
  variable: "--font-script",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.mdgx.de"),
  title: "MediaGraphX | Design, das knallt. | Werbeagentur Westerwald",
  description:
    "MediaGraphX – Werbeagentur im Westerwald. Corporate Design, Webdesign, Logoentwicklung, Fahrzeugbeschriftung, Print. Inhaber Timo Suess, seit 2002.",
  keywords: [
    "Werbeagentur",
    "Westerwald",
    "Altenkirchen",
    "Webdesign",
    "Corporate Design",
    "Logoentwicklung",
    "MediaGraphX",
    "Timo Suess",
    "Fahrzeugbeschriftung",
  ],
  openGraph: {
    title: "MediaGraphX | Design, das knallt.",
    description: "Werbeagentur im Westerwald – Corporate Design, Webdesign, Fahrzeugbeschriftung, Print.",
    url: "https://www.mdgx.de",
    siteName: "MediaGraphX",
    locale: "de_DE",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="de"
      className={`${fraunces.variable} ${manrope.variable} ${caveat.variable} antialiased`}
    >
      <body>
        <Preloader />
        <CustomCursor />
        <MagneticAttractor />
        {children}
        <WhatsAppButton />
      </body>
    </html>
  );
}
