"use client"
import type React from "react"
import { DashboardSidebar } from "@/components/dashboard/sidebar"
import { WalletGuard } from "@/components/wallet-guard"
import { GatewayProvider } from "@civic/solana-gateway-react"
import { clusterApiUrl, Connection, PublicKey } from "@solana/web3.js"
import { useEffect } from "react"
import { useWallet } from "@solana/wallet-adapter-react"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
    const {publicKey, signTransaction, signMessage, connected} = useWallet()
    const newSolanaWalletAdapter = {publicKey, signTransaction, signMessage, connected}
    useEffect(()=>{
      console.log("publicKey", publicKey);
    },[])
  return (
    <WalletGuard>
      <GatewayProvider
        connection={new Connection(clusterApiUrl("devnet"), "confirmed")}
        cluster="devnet"
        wallet={newSolanaWalletAdapter}
        gatekeeperNetwork={new PublicKey("uniqobk8oGh4XBLMqM68K8M2zNu3CdYX7q5go7whQiv")}
        //@ts-ignore
        options={{ autoShowModal: true, logLevel: "debug" }}
      >
        <div className="flex min-h-screen flex-col md:flex-row">
          <DashboardSidebar />
          <main className="flex-1 p-6 md:p-8">{children}</main>
        </div>
      </GatewayProvider>
    </WalletGuard>
  )
}

