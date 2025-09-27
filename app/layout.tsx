import type { Metadata } from 'next';
import { Providers } from './providers';
import { ThemeProvider } from './components/ThemeProvider';
import './globals.css';

export const metadata: Metadata = {
  title: 'BlockVideo - Decentralized Video Creation',
  description: 'Decentralized & Automated Video Creation for Creators',
  openGraph: {
    title: 'BlockVideo',
    description: 'Decentralized & Automated Video Creation for Creators',
    images: ['/og-image.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          <Providers>
            {children}
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
