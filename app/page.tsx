import { Button } from "@/components/ui/button"
import { ArrowRight, FileCheck, FileSignature, ShieldCheck } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import Header from "@/components/header"

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      {/* Hero Section */}
      <section className="flex-1 flex flex-col items-center justify-center px-4 py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center gap-4 text-center">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
              Secure, Blockchain-Powered Document Signing
            </h1>
            <p className="max-w-[700px] text-muted-foreground md:text-xl">
              Sign documents with cryptographic security, verify authenticity instantly, and maintain an immutable
              record of all your important agreements.
            </p>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link href="/dashboard">
                <Button size="lg" className="gap-1.5">
                  Get Started <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="#how-it-works">
                <Button size="lg" variant="outline">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="bg-muted py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center gap-4 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">How It Works</h2>
            <p className="max-w-[700px] text-muted-foreground md:text-xl">
              Our platform makes document signing secure and simple with blockchain technology
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="flex flex-col items-center text-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 mb-4">
                <FileSignature className="h-10 w-10 text-primary" />
              </div>
              <h3 className="text-xl font-bold">1. Upload Document</h3>
              <p className="text-muted-foreground mt-2">
                Securely upload your document to our platform. We support PDF, DOC, and other common formats.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 mb-4">
                <FileCheck className="h-10 w-10 text-primary" />
              </div>
              <h3 className="text-xl font-bold">2. On-Chain Signing</h3>
              <p className="text-muted-foreground mt-2">
                Sign your document using your blockchain wallet. The signature is cryptographically secure and
                tamper-proof.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 mb-4">
                <ShieldCheck className="h-10 w-10 text-primary" />
              </div>
              <h3 className="text-xl font-bold">3. Immutable Verification</h3>
              <p className="text-muted-foreground mt-2">
                Your signed document is stored on the blockchain, creating an immutable record that can be verified
                anytime.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Civic Integration Section */}
      <section className="py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Enhanced Security with Civic Pass
              </h2>
              <p className="mt-4 text-muted-foreground md:text-xl">
                Our platform integrates with Civic Pass to provide robust KYC verification, ensuring that only verified
                individuals can sign documents.
              </p>
              <ul className="mt-6 space-y-3">
                <li className="flex items-center gap-2">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10">
                    <ShieldCheck className="h-3 w-3 text-primary" />
                  </div>
                  <span>Identity verification through Civic Pass</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10">
                    <ShieldCheck className="h-3 w-3 text-primary" />
                  </div>
                  <span>CAPTCHA validation to prevent bot attacks</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10">
                    <ShieldCheck className="h-3 w-3 text-primary" />
                  </div>
                  <span>Government ID verification for high-security documents</span>
                </li>
              </ul>
            </div>
            <div className="flex justify-center">
              <div className="relative h-[300px] w-[300px] md:h-[400px] md:w-[400px]">
                <Image
                  src="/placeholder.svg?height=400&width=400"
                  alt="Civic Pass Integration"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-muted py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center gap-4 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Ready to Get Started?</h2>
            <p className="max-w-[700px] text-muted-foreground md:text-xl">
              Join thousands of users who trust our platform for secure document signing.
            </p>
            <Link href="/dashboard">
              <Button size="lg" className="mt-4">
                Connect Wallet & Sign Now
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-6 md:py-8">
        <div className="container flex flex-col items-center justify-center gap-4 px-4 md:px-6 md:flex-row">
          <p className="text-center text-sm text-muted-foreground md:text-left">
            &copy; {new Date().getFullYear()} DocumentSigner. All rights reserved.
          </p>
          <nav className="flex gap-4 sm:gap-6">
            <Link href="#" className="text-sm text-muted-foreground hover:underline underline-offset-4">
              Terms
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:underline underline-offset-4">
              Privacy
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:underline underline-offset-4">
              Contact
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  )
}

