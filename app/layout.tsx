import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "@/context/SessionContext";
import { QueryProvider } from "@/components/providers/QueryProvider";
import { Toaster } from "@/components/ui/sonner";
import { ErrorBoundary } from "@/components/ErrorBoundary";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Idol's Drill - Descubra seu Ídolo Mestre",
  description: "Exercício introspectivo com IA conversacional para identificar qual dos 4 ídolos (Dinheiro, Poder, Prazer, Fama) tem maior influência em sua vida. Baseado em São Tomás de Aquino. ~5 minutos.",
  keywords: ["ídolos", "autoconhecimento", "filosofia", "tomás de aquino", "ia conversacional", "introspecção", "valores pessoais"],
  authors: [{ name: "Idol's Drill Team" }],
  creator: "Idol's Drill",
  publisher: "Idol's Drill",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    alternateLocale: ["en_US", "es_ES", "fr_FR", "zh_CN", "ko_KR", "hi_IN"],
    title: "Idol's Drill - Descubra seu Ídolo Mestre",
    description: "Exercício introspectivo com IA para identificar seus ídolos. Em 5 minutos.",
    siteName: "Idol's Drill",
  },
  twitter: {
    card: "summary_large_image",
    title: "Idol's Drill - Descubra seu Ídolo Mestre",
    description: "Exercício introspectivo com IA para identificar seus ídolos. Em 5 minutos.",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
  },
  themeColor: "#722f37",
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={poppins.variable}>
        <ErrorBoundary>
          <QueryProvider>
            <SessionProvider>
              {children}
              <Toaster />
            </SessionProvider>
          </QueryProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
