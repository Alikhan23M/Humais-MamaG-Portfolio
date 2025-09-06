import './globals.css'
import ClientLoader from '@/components/ui/ClientLoader'

export const metadata = {
  title: 'Content Writer Portfolio',
  description: 'Professional content writer and digital strategist portfolio',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body><ClientLoader>{children}</ClientLoader></body>
    </html>
  )
}