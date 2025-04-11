"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useGateway } from "@civic/solana-gateway-react"
import { useEffect, useState } from "react"

export default function ProfilePage() {
  const { requestGatewayToken, gatewayToken } = useGateway()
  const [captchaExpiry, setCaptchaExpiry] = useState<Date | null>(null)
  const [uniquenessExpiry, setUniquenessExpiry] = useState<Date | null>(null)
  const [idExpiry, setIdExpiry] = useState<Date | null>(null)
  const [gatewayStatus, setGatewayStatus] = useState("INACTIVE")
  useEffect(()=>{
    if (gatewayToken) {
      setGatewayStatus(gatewayToken.state);
      setUniquenessExpiry(gatewayToken.expiryTime ? new Date(gatewayToken.expiryTime) : new Date());
    } 
  },[])
  useEffect(()=>{
    console.log("gatewayStatus", gatewayStatus);
     
  },[gatewayStatus])
  
  
  // // Simulate expiry times for demo purposes
  // useEffect(() => {
    
  //   // CAPTCHA expires in 24 hours
  //   const captchaDate = new Date()
  //   captchaDate.setHours(captchaDate.getHours() + 24)
  //   setCaptchaExpiry(captchaDate)

  //   // ID verification expires in 30 days
  //   const idDate = new Date()
  //   idDate.setDate(idDate.getDate() + 30)
  //   setIdExpiry(idDate)
  // }, [])

  const formatTimeRemaining = (expiryDate: Date | null) => {
    if (!expiryDate) return "Unknown"

    const now = new Date()
    const diff = (expiryDate.getTime()*1000) - now.getTime()

    if (diff <= 0) return "Expired"

    const hours = Math.floor(diff / (1000 * 60 * 60))
    const days = Math.floor(hours / 24)

    if (days > 0) {
      return `${days} day${days !== 1 ? "s" : ""} remaining`
    }

    return `${hours} hour${hours !== 1 ? "s" : ""} remaining`
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Identity Verification Status</h1>
        <p className="text-muted-foreground mt-2">
          Complete both verifications to sign documents. Verifications powered by Civic Pass solutions.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-1">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Uniqueness Validation</CardTitle>
            <CardDescription>Basic uniqueness verification for document signing {"(1 Wallet for 1 User)"}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <Badge variant={(gatewayToken && gatewayStatus === "ACTIVE") ? "success" : "destructive"}>
                {(gatewayToken && gatewayStatus === "ACTIVE") ? "Verified" : "Unverified"}
              </Badge>
              <span className="text-sm text-muted-foreground">{formatTimeRemaining(uniquenessExpiry)}</span>
            </div>
            {(requestGatewayToken && gatewayStatus!=="ACTIVE") && (
              <button
                onClick={requestGatewayToken}
                className="mt-4 w-full rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground"
              >
                Verify Now
              </button>
            )}
          </CardContent>
        </Card>

        {/* <Card>
          <CardHeader className="pb-3">
            <CardTitle>Government ID Verification</CardTitle>
            <CardDescription>Enhanced security for sensitive documents</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <Badge variant="destructive">Unverified</Badge>
              <span className="text-sm text-muted-foreground">{formatTimeRemaining(idExpiry)}</span>
            </div>
            <button className="mt-4 w-full rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground">
              Complete Verification
            </button>
          </CardContent>
        </Card> */}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Verification Benefits</CardTitle>
          <CardDescription>Why verification is important for document signing</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 list-disc pl-5">
            <li>Prevents unauthorized access to document signing</li>
            <li>Ensures compliance with regulatory requirements</li>
            <li>Enhances the legal validity of signed documents</li>
            <li>Protects against identity theft and fraud</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}

