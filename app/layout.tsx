import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

// ✅ Special export that Next.js uses for <head> tags
export const metadata: Metadata = {
  title: "Kasome - Learn New Skills",
  description:
    "Discover thousands of courses from expert instructors. Build your skills, advance your career, and achieve your goals with our comprehensive online learning platform.",
  generator: "v0.dev",
  icons: {
    icon: "/favicon.ico", // This will be loaded from public/favicon.ico
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en"  suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
