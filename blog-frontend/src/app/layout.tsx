import type { Metadata } from "next";
import { Outfit, Playfair_Display } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "MuXian.Blog - Exploring Software Architecture",
    template: "%s | MuXian.Blog",
  },
  description: "专注后端架构 (Spring) 与现代前端 (Next.js) 的融合。记录代码，分享思考，构建数字花园。",
  keywords: ["博客", "技术", "Spring Boot", "Next.js", "架构", "全栈开发"],
  authors: [{ name: "MuXian" }],
  creator: "MuXian",
  openGraph: {
    type: "website",
    locale: "zh_CN",
    siteName: "MuXian.Blog",
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
    <html lang="zh-CN" className="scroll-smooth">
      <body
        className={`${outfit.variable} ${playfair.variable} font-sans antialiased`}
        style={{ fontFamily: "'Outfit', sans-serif" }}
      >
        {/* 噪点纹理层 */}
        <div className="noise" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
