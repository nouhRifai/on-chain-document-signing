"use client"

import { Button } from "@/components/ui/button"
import { useWallet } from "@solana/wallet-adapter-react"
import { useWalletModal } from "@solana/wallet-adapter-react-ui"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import Link from "next/link"
import { FileSignature } from "lucide-react"

export default function Header() {
  const { connected } = useWallet()
  const { setVisible } = useWalletModal()
  const router = useRouter()

  // Redirect to dashboard if wallet is connected
  useEffect(() => {
    if (connected) {
      router.push("/dashboard")
    }
  }, [connected, router])

  const handleConnectWallet = () => {
    setVisible(true)
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold">
          <FileSignature className="h-6 w-6" />
          <span>DocumentSigner</span>
        </Link>
        <nav className="flex gap-4 sm:gap-6">
          <Link href="#how-it-works" className="text-sm font-medium hover:underline underline-offset-4">
            How It Works
          </Link>
          <Link href="#" className="text-sm font-medium hover:underline underline-offset-4">
            Features
          </Link>
          <Link href="#" className="text-sm font-medium hover:underline underline-offset-4">
            Pricing
          </Link>
        </nav>
        <Button onClick={handleConnectWallet}>{connected ? "Dashboard" : "Connect Wallet"}</Button>
      </div>
    </header>
  )
}

