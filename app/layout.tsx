import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

// 1. IDEAL METADATA (SEO uchun)
export const metadata: Metadata = {
  title: {
    default: "Laptop.uz — Premium Noutbuklar Do'koni",
    template: "%s | Laptop.uz"
  },
  description: "O'zbekistondagi eng kuchli va original noutbuklar do'koni. Apple MacBook, Gaming noutbuklar kafolati bilan.",
  keywords: ["noutbuklar", "macbook uzbekistan", "gaming laptop", "laptop uz"],
  openGraph: {
    title: "Laptop.uz — Sifatli noutbuklar markazi",
    description: "Eng so'nggi rusumdagi noutbuklarni hamyonbop narxlarda xarid qiling.",
    url: "https://laptop.uz",
    siteName: "Laptop.uz",
    locale: "uz_UZ",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uz">
      <head>
        {/* 2. META PIXEL (Noscript qismi) */}
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=1453433609494393&ev=PageView&noscript=1"
          />
        </noscript>
      </head>
      <body className={inter.className}>
        {/* 3. META PIXEL (Asosiy Skript qismi) */}
        <Script
          id="fb-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '1453433609494393');
              fbq('track', 'PageView');
            `,
          }}
        />
        
        {children}
      </body>
    </html>
  );
}