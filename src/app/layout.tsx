import type { Metadata } from "next";
import { DM_Sans, Syne, Caveat, Permanent_Marker } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const permanentMarker = Permanent_Marker({
  variable: "--font-marker",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.mdgx.de"),
  title: "MediaGraphX | Idee. Konzept. Design. | Werbeagentur Altenkirchen",
  description:
    "MediaGraphX - Ihre Full-Service Werbeagentur in Altenkirchen. Webdesign, Logoentwicklung, Corporate Design, Printwerbung und mehr. Inhaber Timo Suess.",
  keywords: [
    "Werbeagentur",
    "Altenkirchen",
    "Webdesign",
    "Corporate Design",
    "Logoentwicklung",
    "MediaGraphX",
    "Timo Suess",
    "Full-Service-Agentur",
  ],
  openGraph: {
    title: "MediaGraphX | Idee. Konzept. Design.",
    description: "Full-Service Werbeagentur in Altenkirchen - Webdesign, Print, Corporate Design",
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
      className={`${dmSans.variable} ${syne.variable} ${caveat.variable} ${permanentMarker.variable} antialiased`}
    >
      <body>{children}</body>
    </html>
  );
}
