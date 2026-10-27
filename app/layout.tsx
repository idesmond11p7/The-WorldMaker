import type {Metadata} from 'next';
import { Cormorant_Garamond, Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-display',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-sans',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-mono',
});

export const metadata: Metadata = {
  title: "Lorekeeper's Observatory — Apocrypha DXD: ForeverWorlds",
  description: 'Creative worldbuilding, powerscaling, research, brainstorming, and 2D/3D visual-design workbench for the Ur-Verse and ForeverWorlds cosmology.',
  openGraph: {
    title: "Lorekeeper's Observatory — Apocrypha DXD: ForeverWorlds",
    description: 'Creative worldbuilding, powerscaling, research, brainstorming, and 2D/3D visual-design workbench for the Ur-Verse and ForeverWorlds cosmology.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Lorekeeper's Observatory — Apocrypha DXD: ForeverWorlds",
    description: 'Creative worldbuilding, powerscaling, research, brainstorming, and 2D/3D visual-design workbench for the Ur-Verse and ForeverWorlds cosmology.',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${inter.variable} ${jetbrainsMono.variable} dark`}
    >
      <body
        suppressHydrationWarning
        className="bg-[#101117] text-[#E9E1D2] font-sans antialiased selection:bg-[#9A82E8]/30 selection:text-[#E9E1D2] overflow-hidden"
      >
        {children}
      </body>
    </html>
  );
}
