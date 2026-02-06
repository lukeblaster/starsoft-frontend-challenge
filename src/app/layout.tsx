import React from 'react'
import type { Metadata } from 'next'
import './styles/global.scss'

export const metadata: Metadata = {
    title: 'Starsoft Frontend Challenge',
    description: 'Starsoft Frontend Challenge',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    )
}