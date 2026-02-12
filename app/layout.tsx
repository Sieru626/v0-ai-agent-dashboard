import type { Metadata, Viewport } from 'next'
import { Press_Start_2P } from 'next/font/google'

import './globals.css'

const pixelFont = Press_Start_2P({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-pixel',
})

export const metadata: Metadata = {
  title: 'なりたたせ屋本舗 | AI Agent Dashboard',
  description: 'Cyberpunk AI Agent Integration Dashboard - THE 5 SISTERS',
}

export const viewport: Viewport = {
  themeColor: '#0a0a0a',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ja" className={pixelFont.variable}>
      <body className="font-sans antialiased overflow-hidden">{children}</body>
    </html>
  )
}
