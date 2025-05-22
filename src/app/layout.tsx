import React from 'react';
import Providers from './providers';

export const metadata = {
  title: "OPDA Chatbot",
  description: "Ask the OPDA Chatbot anything!",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.jpg" type="image/jpeg" />
      </head>
      <body>
        <Providers>
        {children}
        </Providers>
      </body>
    </html>
  )
}