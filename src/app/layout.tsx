'use client'
import './global.css'
import { Inter } from 'next/font/google'
import { AuthProvider } from "../context/AuthContext.jsx";
import { ExoplanetProvider } from "../context/ExoplanetsContext.jsx";
import Navbar from "../components/Navbar.jsx";

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <ExoplanetProvider>
            <Navbar />
            <main className="container mx-auto px-10 mt-5">
              {children}
            </main>
          </ExoplanetProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
