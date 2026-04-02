import type { Metadata } from "next";
import { Inter, Playfair_Display, Poppins } from "next/font/google";
import CustomCursor from "@/components/CustomCursor";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://voicium.live"),
  title: "Voicium | AI-Powered Real Estate Lead Qualification",
  description: "Stop calling dead leads. Voicium's AI calls, analyzes, and delivers only highly motivated real estate prospects directly to your pipeline.",
  keywords: [
    "real estate ai",
    "lead qualification ai",
    "ai outbound calling",
    "motivated seller leads",
    "real estate automation",
    "voicium",
    "ai lead scoring",
    "real estate prospecting ai"
  ],
  authors: [{ name: "Autolinium" }],
  openGraph: {
    title: "Voicium | AI-Powered Real Estate Lead Qualification",
    description: "Automate your outbound calling. Talk only to motivated sellers with our advanced AI lead qualification engine.",
    url: "https://voicium.live",
    siteName: "Voicium",
    images: [
      {
        url: "/images/logo.png",
        width: 800,
        height: 600,
        alt: "Voicium Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Voicium | AI-Powered Real Estate Lead Qualification",
    description: "Stop calling dead leads. Get qualified prospects delivered to your pipeline by our AI.",
    images: ["/images/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${playfair.variable} ${poppins.variable} antialiased`}
      >
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
