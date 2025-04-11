"use client"

import type React from "react"

import { GatewayProvider } from "@civic/solana-gateway-react"
import { useWallet } from "@solana/wallet-adapter-react"
import { clusterApiUrl } from "@solana/web3.js"

// This is a mock gateway token for demo purposes
const GATEWAY_TOKEN_ADDRESS = "gatbGT5Pi4fz2GrVy7pZMshyZ5aMJAKTBMJVJaTsKZb"

export function CivicGatewayProvider({ children }: { children: React.ReactNode }) {
  const { publicKey } = useWallet()

  return (
    <GatewayProvider
      wallet={publicKey}
      gatekeeperNetwork={GATEWAY_TOKEN_ADDRESS}
      clusterUrl={clusterApiUrl("devnet")}
      options={{ autoShowModal: false }}
    >
      {children}
    </GatewayProvider>
  )
}

