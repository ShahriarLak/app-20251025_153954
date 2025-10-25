import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Brew Haven - Artisan Coffee & Community',
  description: 'Experience the finest artisan coffee in a warm, welcoming atmosphere. Visit Brew Haven for expertly crafted beverages and genuine hospitality.',
  keywords: 'coffee, artisan coffee, cafe, coffee shop, brew haven, specialty coffee',
  authors: [{ name: 'Brew Haven' }],
  viewport: 'width=device-width, initial-scale=1',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}