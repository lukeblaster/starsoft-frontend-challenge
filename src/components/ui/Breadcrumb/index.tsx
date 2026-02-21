import { ArrowRight01FreeIcons } from '@hugeicons/core-free-icons/index';
import { HugeiconsIcon } from '@hugeicons/react';
import Link from 'next/link';
import styles from './styles.module.scss';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav className={styles.breadcrumb} aria-label="Breadcrumb">
      <ol className={styles.breadcrumb_list}>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={item.label} className={styles.breadcrumb_item}>
              {isLast ? (
                <span className={styles.breadcrumb_current} aria-current="page">
                  {item.label}
                </span>
              ) : (
                <>
                  <Link href={item.href || '#'} className={styles.breadcrumb_link}>
                    {item.label}
                  </Link>
                  <HugeiconsIcon
                    icon={ArrowRight01FreeIcons}
                    className={styles.breadcrumb_separator}
                    size={16}
                  />
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
