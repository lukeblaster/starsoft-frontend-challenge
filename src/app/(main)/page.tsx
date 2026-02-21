import Container from '@/components/ui/Container';
import ProductList from '@/components/ui/ProductList';


export default function Page() {
    return (
        <Container display="flex" direction="column" gap={0}>
            <ProductList />
        </Container>
    );
}
