"use client"

import type React from "react"

import { useWallet } from "@solana/wallet-adapter-react"
import { useWalletModal } from "@solana/wallet-adapter-react-ui"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { FileSignature } from "lucide-react"

export function WalletGuard({ children }: { children: React.ReactNode }) {
  const { connected } = useWallet()
  const { setVisible } = useWalletModal()
  const router = useRouter()

  useEffect(() => {
    if (!connected) {
      router.push("/")
    }
  }, [connected, router])

  if (!connected) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center">
        <div className="flex flex-col items-center gap-4 text-center">
          <FileSignature className="h-12 w-12 text-primary" />
          <h1 className="text-2xl font-bold">Connect Your Wallet</h1>
          <p className="text-muted-foreground">Please connect your wallet to access the dashboard.</p>
          <Button onClick={() => setVisible(true)}>Connect Wallet</Button>
        </div>
      </div>
    )
  }

  return <>{children}</>
}

