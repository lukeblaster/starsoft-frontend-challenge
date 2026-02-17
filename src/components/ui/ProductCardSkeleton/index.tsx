import mainStyles from '@/components/ui/ProductCard/styles.module.scss';
import skeletonStyles from './styles.module.scss';

interface ProductCardSkeletonProps {
  useCheckoutLayout?: boolean;
}

export default function ProductCardSkeleton({
  useCheckoutLayout = false,
}: ProductCardSkeletonProps) {
  return (
    <div
      className={`${mainStyles.container} ${useCheckoutLayout ? mainStyles['container--checkout'] : ''}`}
    >
      <div
        className={`${mainStyles.imageContainer} ${useCheckoutLayout ? mainStyles['imageContainer--checkout'] : ''}`}
      >
        <div className={skeletonStyles.skeleton__image} />
      </div>
      <div
        className={`${mainStyles.contentContainer} ${useCheckoutLayout ? mainStyles['contentContainer--checkout'] : ''}`}
      >
        <div
          className={`${mainStyles.contentContainer_info} ${useCheckoutLayout ? mainStyles['contentContainer--checkout_info'] : ''}`}
        >
          <div className={skeletonStyles.skeleton__title} />
          <div className={skeletonStyles.skeleton__description} />
        </div>
        <div className={mainStyles.contentContainer_priceContainer}>
          <div className={skeletonStyles.skeleton__icon} />
          <div className={skeletonStyles.skeleton__price} />
        </div>
        {!useCheckoutLayout && <div className={skeletonStyles.skeleton__button} />}
        {useCheckoutLayout && (
          <div className={mainStyles['contentContainer--checkout_actions']}>
            <div className={skeletonStyles.skeleton__quantity} />
            <div className={skeletonStyles.skeleton__removeButton} />
          </div>
        )}
      </div>
    </div>
  );
}
