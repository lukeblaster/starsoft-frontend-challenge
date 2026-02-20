'use client';
import { ArrowLeft02FreeIcons } from '@hugeicons/core-free-icons/index';
import { HugeiconsIcon } from '@hugeicons/react';
import { useRouter } from 'next/navigation';
import styles from './styles.module.scss';

export function BackButton() {
  const router = useRouter();

  function handleBack() {
    router.back();
  }

  return (
    <div role='button' className={styles.backButton} onClick={handleBack}>
      <HugeiconsIcon aria-label='Voltar' icon={ArrowLeft02FreeIcons} className={styles.backButton_icon} />
    </div>
  );
}
