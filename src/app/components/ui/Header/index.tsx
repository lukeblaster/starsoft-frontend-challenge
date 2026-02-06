import Image from 'next/image'
import logo from '@/public/images/logo.png'
import styles from './styles.module.scss'
import { HugeiconsIcon } from '@hugeicons/react'
import { ShoppingBag01FreeIcons } from '@hugeicons/core-free-icons'

export default function Header() {
    return (
        <header>
            <div className={styles.headerContainer}>
                <div className={styles.headerLogo}>
                    <Image src={logo} alt="Logo" width={100} height={40} />
                </div>
                <div className={styles.cartContainer}>
                    <HugeiconsIcon icon={ShoppingBag01FreeIcons} className={styles.cartContainer_cartIcon} />
                    <span className={styles.cartContainer_cartCount}>0</span>
                </div>
            </div>
        </header>
    )
}