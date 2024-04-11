import "./globals.css"

import type { Metadata } from "next"
import { Inter } from "next/font/google"
import React from "react"

import ChakraProvider from "@/app/_providers/ChakraProvider"
import TRPCProvider from "@/app/_providers/TRPCProvider"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })

export const metadata: Metadata = {
    title: "Create Next App",
    description: "Generated by create next app",
}

export default function RootLayout({
    children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <TRPCProvider>
                    <ChakraProvider>
                        { children }
                    </ChakraProvider>
                </TRPCProvider>
            </body>
        </html>
    )
}
