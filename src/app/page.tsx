import Footer from '@/components/ui/Footer';
import dynamic from 'next/dynamic';

const Header = dynamic(() => import('../components/ui/Header'));
const ProductList = dynamic(() => import('../components/ui/ProductList'));

export default function Page() {
    return (
        <>
            <Header />
            <div className={'pageContainer'}>
                <ProductList />
            </div>
            <Footer />
        </>
    );
}
