import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Analytics from '@/components/Analytics'

const inter = Inter({ subsets: ['latin'] })

// SEO - Metadatos principales del sitio
export const metadata: Metadata = {
  title: 'Orientación Militar | Asesorías personalizadas para tu futuro en el ejército español',
  description: 'Descubre qué destino y especialidad encajan contigo antes de tomar la decisión. Asesorías 1 a 1 con expertos del Ejército Español.',
  keywords: ['orientación militar', 'asesorías militares', 'ejército español', 'carrera militar', 'oposiciones militares'],
  authors: [{ name: 'Orientación Militar' }],
  creator: 'Orientación Militar',
  publisher: 'Orientación Militar',
  metadataBase: new URL('https://orientacionmilitar.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Orientación Militar | Tu guía personalizada para elegir tu futuro militar',
    description: 'Te ayudamos a entender cada destino, especialidad y oportunidad dentro del Ejército Español.',
    url: 'https://orientacionmilitar.com',
    siteName: 'Orientación Militar',
    locale: 'es_ES',
    type: 'website',
    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 630,
        alt: 'Orientación Militar',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Orientación Militar | Asesorías personalizadas',
    description: 'Tu guía personalizada para elegir tu futuro militar',
    images: ['/logo.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={inter.className}>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </div>
        <Analytics
          gtmId={process.env.NEXT_PUBLIC_GTM_ID}
          gtagId={process.env.NEXT_PUBLIC_GA_ID}
          clarityId={process.env.NEXT_PUBLIC_CLARITY_ID}
          googleAdsId={process.env.NEXT_PUBLIC_GOOGLE_ADS_ID}
        />
      </body>
    </html>
  )
}
