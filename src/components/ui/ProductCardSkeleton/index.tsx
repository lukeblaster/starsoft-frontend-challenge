import mainStyles from '@/components/ui/ProductCard/styles.module.scss';
import skeletonStyles from './styles.module.scss';

interface ProductCardSkeletonProps {
  useCartLayout?: boolean;
}

export default function ProductCardSkeleton({
  useCartLayout = false,
}: ProductCardSkeletonProps) {
  return (
    <div
      className={`${mainStyles.container} ${useCartLayout ? mainStyles['container--cart'] : ''}`}
    >
      <div
        className={`${mainStyles.imageContainer} ${useCartLayout ? mainStyles['imageContainer--cart'] : ''}`}
      >
        <div className={skeletonStyles.skeleton__image} />
      </div>
      <div
        className={`${mainStyles.contentContainer} ${useCartLayout ? mainStyles['contentContainer--cart'] : ''}`}
      >
        <div
          className={`${mainStyles.contentContainer_info} ${useCartLayout ? mainStyles['contentContainer--cart_info'] : ''}`}
        >
          <div className={skeletonStyles.skeleton__title} />
          <div className={skeletonStyles.skeleton__description} />
        </div>
        <div className={mainStyles.contentContainer_priceContainer}>
          <div className={skeletonStyles.skeleton__icon} />
          <div className={skeletonStyles.skeleton__price} />
        </div>
        {!useCartLayout && <div className={skeletonStyles.skeleton__button} />}
        {useCartLayout && (
          <div className={mainStyles['contentContainer--cart_actions']}>
            <div className={skeletonStyles.skeleton__quantity} />
            <div className={skeletonStyles.skeleton__removeButton} />
          </div>
        )}
      </div>
    </div>
  );
}
