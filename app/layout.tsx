import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.kimlongcaterings.com'),
  title: {
    default: 'Kim Long Catering | A Taste Heritage from 1982 in Johor',
    template: '%s | Kim Long Catering'
  },
  description: 'Kim Long Catering provides premium buffet catering services in Senai, Johor, Malaysia since 1982. We accompany you through every momentous milestone of life. Serving JB, Skudai, and Kulai.',
  keywords: ['jb catering', 'johor catering', '新山自由餐', '新山伙食', 'johor caterer', 'skudai catering', 'kulai catering', '伙食承包马来西亚', 'catering services Johor', 'buffet catering Malaysia', 'Kim Long Catering', '金龙自助餐', 'event catering', 'wedding catering Johor'],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Kim Long Catering | A Taste Heritage from 1982 in Johor',
    description: 'Kim Long Catering provides premium buffet catering services in Senai, Johor, Malaysia since 1982.',
    url: 'https://www.kimlongcaterings.com',
    siteName: 'Kim Long Catering',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Kim Long Catering - Premium Buffet in Johor',
      },
    ],
    locale: 'en_MY',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kim Long Catering | Premium Catering in Johor',
    description: 'Premium buffet catering services in Senai, Johor, Malaysia since 1982.',
    images: ['/og-image.jpg'],
  },
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/images/logo.jpg',
        type: 'image/jpeg',
      }
    ],
    apple: '/images/logo.jpg',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FoodEstablishment",
    "name": "Kim Long Catering",
    "image": "https://www.kimlongcaterings.com/og-image.jpg",
    "description": "Kim Long Catering provides premium buffet catering services in JB, Skudai, Kulai and Johor. 柔佛新山领先的伙食承包马来西亚服务商，提供顶级新山自由餐与新山伙食。",
    "url": "https://www.kimlongcaterings.com",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Senai",
      "addressRegion": "Johor",
      "addressCountry": "MY"
    },
    "areaServed": ["Johor Bahru", "Skudai", "Kulai", "Senai", "Johor"],
    "servesCuisine": "Buffet Catering, Asian, Western",
    "foundingDate": "1982"
  };

  return (
    <html lang="en" className="bg-background">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
