import mainStyles from '@/components/ui/ProductCard/styles.module.scss';
import Card from '../Card';
import Container from '../Container';
import skeletonStyles from './styles.module.scss';

interface ProductCardSkeletonProps {
  useCartLayout?: boolean;
}

export default function ProductCardSkeleton({
  useCartLayout = false,
}: ProductCardSkeletonProps) {
  return (
    <Card
      className={`${mainStyles.container} ${useCartLayout ? mainStyles['container--cart'] : ''}`}
    >
      <div
        className={`${mainStyles.imageContainer} ${useCartLayout ? mainStyles['imageContainer--cart'] : ''}`}
      >
        <div className={skeletonStyles.skeleton__image} />
      </div>
      <Container
        display="flex"
        direction="column"
        gap={12}
        className={`${mainStyles.content} ${useCartLayout ? mainStyles['content--cart'] : ''}`}
      >
        <Container
          gap={useCartLayout ? 0 : 4}
          display="flex"
          direction="column"
          className={`${mainStyles.content_information}`}
        >
          <div className={skeletonStyles.skeleton__title} />
          <div className={skeletonStyles.skeleton__description} />
          <div className={skeletonStyles.skeleton__description} />
        </Container>
        <Container display="flex" direction="row" alignItems="center" gap={8} className={mainStyles.content_amount}>
          <div className={skeletonStyles.skeleton__icon} />
          <div className={skeletonStyles.skeleton__price} />
        </Container>
        {!useCartLayout && <div className={skeletonStyles.skeleton__button} />}
        {useCartLayout && (
          <div className={mainStyles['content--cart_actions']}>
            <div className={skeletonStyles.skeleton__quantity} />
            <div className={skeletonStyles.skeleton__removeButton} />
          </div>
        )}
      </Container>
    </Card>
  );
}
