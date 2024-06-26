import type { Metadata } from "next"
import { Manrope } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/ThemeProvider"
import { Toaster } from "@/components/ui/toaster"
import Navbar from "@/components/Navbar"
import Sidebar from "@/components/Sidebar"
import { ClerkProvider } from "@clerk/nextjs"

const manrope = Manrope({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "SleepCatch ",
  description: "catching up with the news while you were sleeping",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={manrope.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ClerkProvider>
            <div className="flex">
              <Sidebar />
              <main className="flex-1 md:p-8 pt-2 bg-stone-950 ">
                <Navbar />
                {children}
              </main>
            </div>
          </ClerkProvider>

          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
