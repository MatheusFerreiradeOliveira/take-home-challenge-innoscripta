import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Header from "@/components/header";
import Footer from "@/components/footer";

import ReactQueryProviders from "@/utils/react-query-provider";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Innoscripta",
  description: "Take home challenge",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={cn(inter.className, "flex w-full flex-col min-h-screen")}
      >
        <ThemeProvider
          attribute={"class"}
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <ReactQueryProviders>
            <Header />
            {children}
            <Footer />
          </ReactQueryProviders>
        </ThemeProvider>
      </body>
    </html>
  );
}
