"use client"

import { useState, useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import { Upload, FileText, CheckCircle2, XCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function VerifyDocumentPage() {
  const [file, setFile] = useState<File | null>(null)
  const [qrCode, setQrCode] = useState("")
  const [verificationResult, setVerificationResult] = useState<{
    verified: boolean
    signatures: Array<{
      signer: string
      timestamp: string
      valid: boolean
    }>
  } | null>(null)

  const { toast } = useToast()

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        const selectedFile = acceptedFiles[0]
        setFile(selectedFile)

        toast({
          title: "Document uploaded",
          description: `${selectedFile.name} has been uploaded successfully.`,
        })
      }
    },
    [toast],
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
    },
    maxFiles: 1,
  })

  const handleVerifyDocument = () => {
    // Simulate document verification
    setTimeout(() => {
      const mockVerification = {
        verified: true,
        signatures: [
          {
            signer: "8xyt45...j29dk",
            timestamp: new Date().toISOString(),
            valid: true,
          },
          {
            signer: "3mnp78...k12lp",
            timestamp: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
            valid: true,
          },
        ],
      }

      setVerificationResult(mockVerification)

      toast({
        title: "Verification complete",
        description: mockVerification.verified ? "Document signatures are valid." : "Document verification failed.",
      })
    }, 1500)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Verify Document</h1>
        <p className="text-muted-foreground mt-2">Upload a document to verify its signatures on the blockchain</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardContent className="pt-6">
            <h3 className="text-lg font-medium mb-4">Upload Document</h3>
            <div
              {...getRootProps()}
              className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
                isDragActive ? "border-primary bg-primary/5" : "border-muted-foreground/20"
              }`}
            >
              <input {...getInputProps()} />
              <div className="flex flex-col items-center gap-2">
                <Upload className="h-8 w-8 text-muted-foreground" />
                {isDragActive ? (
                  <p>Drop the document here...</p>
                ) : (
                  <>
                    <p className="font-medium">Drag and drop your document here</p>
                    <p className="text-xs text-muted-foreground">or click to browse files</p>
                  </>
                )}
              </div>
            </div>

            {file && (
              <div className="flex items-center gap-4 mt-4 p-3 bg-muted rounded-md">
                <FileText className="h-5 w-5 text-primary" />
                <div className="flex-1 truncate">
                  <p className="text-sm font-medium">{file.name}</p>
                  <p className="text-xs text-muted-foreground">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <h3 className="text-lg font-medium mb-4">QR Code Verification</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="qr-code" className="text-sm font-medium">
                  Enter QR Code
                </label>
                <Input
                  id="qr-code"
                  placeholder="Enter the QR code from the document"
                  value={qrCode}
                  onChange={(e) => setQrCode(e.target.value)}
                />
              </div>
              <Button onClick={handleVerifyDocument} disabled={!file && !qrCode} className="w-full">
                Scan Document
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {verificationResult && (
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium">Verification Results</h3>
              <Badge variant={verificationResult.verified ? "success" : "destructive"}>
                {verificationResult.verified ? "Valid" : "Invalid"}
              </Badge>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium mb-2">Signatures</h4>
                <div className="space-y-3">
                  {verificationResult.signatures.map((sig, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 bg-muted rounded-md">
                      {sig.valid ? (
                        <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                      ) : (
                        <XCircle className="h-5 w-5 text-red-500 mt-0.5" />
                      )}
                      <div className="flex-1">
                        <p className="text-sm font-medium">Signer: {sig.signer}</p>
                        <p className="text-xs text-muted-foreground">
                          Signed on: {new Date(sig.timestamp).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

