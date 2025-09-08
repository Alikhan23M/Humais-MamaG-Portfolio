import Navbar from '@/components/Navbar'
import './globals.css'
import ClientLoader from '@/components/ui/ClientLoader'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'Content Writer Portfolio',
  description: 'Professional content writer and digital strategist portfolio',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      
      <body>
        <Navbar/>
        <ClientLoader>{children}</ClientLoader>
        <Footer/>
        </body>
    </html>
  )
}