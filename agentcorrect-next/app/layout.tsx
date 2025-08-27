import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

// Using system monospace fonts instead of local font file
const jetbrains = {
  variable: '--font-jetbrains',
  className: '',
}

export const metadata: Metadata = {
  title: 'AgentCorrect - Catch disasters in your agent traces',
  description: 'Deterministic, offline checks that block duplicate charges, dangerous SQL, and infra wipes—before they hit prod.',
  keywords: 'agent safety, AI safety, deterministic checks, offline security, payment idempotency, SQL safety',
  authors: [{ name: 'AgentCorrect' }],
  openGraph: {
    title: 'AgentCorrect - Catch disasters in your agent traces',
    description: 'Deterministic, offline checks that block duplicate charges, dangerous SQL, and infra wipes—before they hit prod.',
    type: 'website',
    url: 'https://agentcorrect.com',
    images: ['/og-image.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AgentCorrect - Catch disasters in your agent traces',
    description: 'Deterministic, offline checks that block duplicate charges, dangerous SQL, and infra wipes.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  viewport: 'width=device-width, initial-scale=1',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrains.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Product',
              name: 'AgentCorrect',
              description: 'Deterministic, offline agent disaster detector',
              brand: {
                '@type': 'Brand',
                name: 'AgentCorrect',
              },
              offers: {
                '@type': 'AggregateOffer',
                priceCurrency: 'USD',
                lowPrice: '0',
                highPrice: '999',
                offerCount: '3',
              },
            }),
          }}
        />
      </head>
      <body className="font-sans antialiased bg-neutral-50 text-neutral-900">
        <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-neutral-900 text-white px-4 py-2 rounded-lg">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  )
}