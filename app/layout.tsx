import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { WalletProviderWrapper } from "@/components/wallet-provider"
import { GatewayProvider } from "@civic/solana-gateway-react";
import { Toaster } from "@/components/ui/toaster"
import './globals.css'
import { clusterApiUrl, Connection, PublicKey } from "@solana/web3.js"
import { useWallet } from "@solana/wallet-adapter-react"
import { useEffect } from "react"

const inter = Inter({ subsets: ["latin"] })

// export const metadata: Metadata = {
//   title: "DocumentSigner - Blockchain Document Signing",
//   description: "Secure, blockchain-powered document signing platform",
//     generator: 'v0.dev'
// }

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {

  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <WalletProviderWrapper>     
              {children}
              <Toaster />
          </WalletProviderWrapper>
        </ThemeProvider>
      </body>
    </html>
  )
}



