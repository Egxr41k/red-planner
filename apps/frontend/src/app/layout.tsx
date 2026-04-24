import type { Metadata } from "next";
import {Noto_Sans} from 'next/font/google'
import "./globals.scss";
import {Toaster} from "sonner"
import { SITE_NAME } from "@/constants/seo.constants";
import { Providers } from "./providers";

const zen = Noto_Sans({
	subsets: ['cyrillic', 'latin'],
	weight: ['300', '400', '500', '600', '700'],
	display: 'swap',
	variable: '--font-zen',
	style: ['normal']
})
export const metadata: Metadata = {
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`
  } ,
  description: 'Best one for planning from Oleksandr [https://github.com/lexandr10]',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${zen.variable} antialiased`}
      >
        <Providers>
          {children}
          <Toaster
						theme='dark'
						position='bottom-right'
						duration={1500}
					/>
        </Providers>
      </body>
    </html>
  );
}
