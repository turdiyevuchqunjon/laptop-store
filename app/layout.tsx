import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  // Sayt sarlavhasi
  title: {
    default: "Laptop.uz — Premium Noutbuklar Do'koni O'zbekistonda",
    template: "%s | Laptop.uz"
  },
  
  // Sayt tavsifi (Google qidiruvida chiqadigan matn)
  description: "O'zbekistondagi eng kuchli va original noutbuklar do'koni. Apple MacBook, ASUS, HP, Dell va Gaming noutbuklar kafolati bilan. Bepul yetkazib berish va servis xizmati.",
  
  // Kalit so'zlar
  keywords: ["noutbuklar", "macbook uzbekistan", "gaming laptop", "noutbuk narxlari", "laptop uz", "asus rog", "hp spectre"],
  
  // Ijtimoiy tarmoqlar (Telegram, Instagram, Facebook) uchun ko'rinish
  openGraph: {
    title: "Laptop.uz — Sifatli noutbuklar markazi",
    description: "Eng so'nggi rusumdagi noutbuklarni hamyonbop narxlarda xarid qiling.",
    url: "https://laptop.uz", // O'zingizni domeningizni yozasiz
    siteName: "Laptop.uz",
    images: [
      {
        url: "/og-image.jpg", // Sayt ulashilganda chiqadigan rasm (public papkasiga qo'ying)
        width: 1200,
        height: 630,
        alt: "Laptop.uz noutbuklar do'koni",
      },
    ],
    locale: "uz_UZ",
    type: "website",
  },

  // Apple qurilmalari va telefonlar uchun qo'shimcha
  viewport: "width=device-width, initial-scale=1",
  themeColor: "#0f172a", // Saytingizning asosiy orqa fon rangi
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
