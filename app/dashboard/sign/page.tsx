"use client"

import { useState, useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { useGateway } from "@civic/solana-gateway-react"
import { Upload, FileText, AlertCircle } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function SignDocumentPage() {
  const [file, setFile] = useState<File | null>(null)
  const [documentHash, setDocumentHash] = useState<string | null>(null)
  const { toast } = useToast()
  const { gatewayToken } = useGateway()
  const [gatewayStatus, setGatewayStatus] = useState(gatewayToken ? gatewayToken.state : "INACTIVE");

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        const selectedFile = acceptedFiles[0]
        setFile(selectedFile)

        // Simulate document hash generation
        const mockHash = Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join("")
        setDocumentHash(mockHash)

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

  const handleSignDocument = () => {
    toast({
      title: "Signing initiated",
      description: "Please confirm the transaction in your wallet.",
    })
  }

  const isVerified = gatewayStatus === "ACTIVE"

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Sign Document</h1>
        <p className="text-muted-foreground mt-2">Upload a document to sign it using your blockchain wallet</p>
      </div>

      {!isVerified && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Verification Required</AlertTitle>
          <AlertDescription>
            You need to complete the verification process before signing documents. Please go to your profile to
            complete the verification.
          </AlertDescription>
        </Alert>
      )}

      <Card>
        <CardContent className="pt-6">
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-colors ${
              isDragActive ? "border-primary bg-primary/5" : "border-muted-foreground/20"
            }`}
          >
            <input {...getInputProps()} />
            <div className="flex flex-col items-center gap-2">
              <Upload className="h-10 w-10 text-muted-foreground" />
              {isDragActive ? (
                <p>Drop the document here...</p>
              ) : (
                <>
                  <p className="font-medium">Drag and drop your document here</p>
                  <p className="text-sm text-muted-foreground">or click to browse files</p>
                  <p className="text-xs text-muted-foreground mt-2">Supports PDF files up to 10MB</p>
                </>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {file && (
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-md bg-primary/10">
                <FileText className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1 space-y-1">
                <p className="font-medium">{file.name}</p>
                <p className="text-sm text-muted-foreground">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
              </div>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div>
                      <Button onClick={handleSignDocument} disabled={!isVerified}>
                        Sign Document
                      </Button>
                    </div>
                  </TooltipTrigger>
                  {!isVerified && (
                    <TooltipContent>
                      <p>Complete verification to sign documents</p>
                    </TooltipContent>
                  )}
                </Tooltip>
              </TooltipProvider>
            </div>

            {documentHash && (
              <div className="mt-4 p-3 bg-muted rounded-md">
                <p className="text-xs font-medium">Document Hash</p>
                <p className="text-xs font-mono break-all mt-1">{documentHash}</p>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}

