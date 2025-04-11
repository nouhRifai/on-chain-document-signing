"use client"

import { useEffect, useState } from "react"
import { useWallet } from "@solana/wallet-adapter-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Eye, RefreshCw } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface DocumentHistory {
  id: string
  documentHash: string
  signingDate: string
  verified: boolean
  documentName: string
}

export default function HistoryPage() {
  const { publicKey } = useWallet()
  const [history, setHistory] = useState<DocumentHistory[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchHistory = async () => {
      setLoading(true)

      // Simulate API call to fetch history
      setTimeout(() => {
        // Mock data
        const mockHistory: DocumentHistory[] = [
          {
            id: "1",
            documentHash: "8f7d56a1c29b7a3f68b7d56a1c29b7a3f68b7d56a1c29b7a3f68b7d56a1c29b7a3f",
            signingDate: new Date().toISOString(),
            verified: true,
            documentName: "Contract_2023_04_15.pdf",
          },
          {
            id: "2",
            documentHash: "2a9c8f7d56a1c29b7a3f68b7d56a1c29b7a3f68b7d56a1c29b7a3f68b7d56a1c29b",
            signingDate: new Date(Date.now() - 86400000 * 2).toISOString(), // 2 days ago
            verified: true,
            documentName: "NDA_Agreement.pdf",
          },
          {
            id: "3",
            documentHash: "3f68b7d56a1c29b7a3f68b7d56a1c29b7a3f68b7d56a1c29b7a3f68b7d56a1c29b7a",
            signingDate: new Date(Date.now() - 86400000 * 5).toISOString(), // 5 days ago
            verified: false,
            documentName: "Partnership_Agreement.pdf",
          },
        ]

        setHistory(mockHistory)
        setLoading(false)
      }, 1500)
    }

    if (publicKey) {
      fetchHistory()
    }
  }, [publicKey])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Document History</h1>
        <p className="text-muted-foreground mt-2">View and manage your document signing history</p>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Recent Documents</CardTitle>
              <CardDescription>Documents you've signed or verified recently</CardDescription>
            </div>
            <Button variant="outline" size="sm" className="gap-1">
              <RefreshCw className="h-4 w-4" />
              Refresh
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : history.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No document history found</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Document</TableHead>
                  <TableHead>Signing Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {history.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">
                      <div>
                        <p>{item.documentName}</p>
                        <p className="text-xs text-muted-foreground truncate max-w-[200px]">{item.documentHash}</p>
                      </div>
                    </TableCell>
                    <TableCell>{new Date(item.signingDate).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <Badge variant={item.verified ? "success" : "destructive"}>
                        {item.verified ? "Verified" : "Unverified"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon">
                          <Eye className="h-4 w-4" />
                          <span className="sr-only">View</span>
                        </Button>
                        <Button variant="ghost" size="icon">
                          <RefreshCw className="h-4 w-4" />
                          <span className="sr-only">Re-verify</span>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

