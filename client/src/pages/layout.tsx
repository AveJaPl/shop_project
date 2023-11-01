import Header from '@/components/layout/header'
import '../styles/globals.css'
import Footer from '@/components/layout/footer'


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return(
    <div>
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  )
}