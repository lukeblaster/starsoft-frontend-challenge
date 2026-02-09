import logo from '@/public/images/logo.png'
import { ShoppingBag01FreeIcons } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import Image from 'next/image'
import Link from 'next/link'
import styles from './styles.module.scss'

export default function Header() {
    return (
        <header>
            <div className={styles.headerContainer}>
                <div className={styles.headerLogo}>
                    <Link href="/">
                        <Image src={logo} alt="Logo" width={100} height={40} loading='eager' />
                    </Link>
                </div>
                <div className={styles.cartContainer}>
                    <Link href="/checkout">
                        <HugeiconsIcon icon={ShoppingBag01FreeIcons} className={styles.cartContainer_cartIcon} />
                    </Link>
                    <div>
                        <span className={styles.cartContainer_cartCount}>0</span>
                    </div>
                </div>
            </div>
        </header>
    )
}