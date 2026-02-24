
import logo from '@/public/images/logo.webp';
import Image from 'next/image';
import Link from 'next/link';
import CartCounter from '../CartCounter';
import styles from './styles.module.scss';

export default function Header() {
  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerLogo}>
        <Link href="/" aria-label='Ir para a página inicial'>
          <Image src={logo} alt="Logo" width={100} height={40} loading="eager" priority />
        </Link>
      </div>
      <CartCounter />
    </header>
  );
}
