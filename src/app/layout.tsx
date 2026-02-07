import type { Metadata } from 'next'
import React from 'react'
import './styles/global.scss'

import Header from './components/ui/Header'

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
            <head>
                <link rel="stylesheet" href="https://cdn.hugeicons.com/font/hgi-stroke-rounded.css" />
            </head>
            <body>
                {children}
            </body>
        </html>
    )
}