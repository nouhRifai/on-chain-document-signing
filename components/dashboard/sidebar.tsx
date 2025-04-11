"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { FileCheck, FileSignature, History, LogOut, Settings, User } from "lucide-react"
import { useWallet } from "@solana/wallet-adapter-react"
import { truncateAddress } from "@/lib/utils"

export function DashboardSidebar() {
  const pathname = usePathname()
  const { publicKey, disconnect } = useWallet()

  const routes = [
    {
      name: "Profile",
      path: "/dashboard",
      icon: User,
    },
    {
      name: "Sign Document",
      path: "/dashboard/sign",
      icon: FileSignature,
    },
    {
      name: "Verify Document",
      path: "/dashboard/verify",
      icon: FileCheck,
    },
    {
      name: "History",
      path: "/dashboard/history",
      icon: History,
    },
    {
      name: "Settings",
      path: "/dashboard/settings",
      icon: Settings,
    },
  ]

  return (
    <div className="flex h-screen w-64 flex-col border-r bg-muted/40">
      <div className="flex h-14 items-center border-b px-4">
        <Link href="/" className="flex items-center gap-2 font-bold">
          <FileSignature className="h-5 w-5" />
          <span>DocumentSigner</span>
        </Link>
      </div>
      <div className="flex-1 overflow-auto py-2">
        <nav className="grid gap-1 px-2">
          {routes.map((route) => (
            <Link
              key={route.path}
              href={route.path}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-muted",
                pathname === route.path ? "bg-muted" : "transparent",
              )}
            >
              <route.icon className="h-4 w-4" />
              {route.name}
            </Link>
          ))}
        </nav>
      </div>
      <div className="border-t p-4">
        <div className="flex items-center gap-2 mb-4">
          <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
            <User className="h-4 w-4" />
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-medium">Wallet</span>
            <span className="text-xs text-muted-foreground">
              {publicKey ? truncateAddress(publicKey.toString()) : "Not connected"}
            </span>
          </div>
        </div>
        <Button variant="outline" size="sm" className="w-full justify-start gap-2" onClick={() => disconnect()}>
          <LogOut className="h-4 w-4" />
          Disconnect
        </Button>
      </div>
    </div>
  )
}

