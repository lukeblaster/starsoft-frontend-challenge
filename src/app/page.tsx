import Footer from '../components/ui/Footer'
import Header from '../components/ui/Header'
import ProductList from '../components/ui/ProductList'
import styles from './page.module.scss'

export default function Page() {
    return (
        <>
            <Header />
            <div className={styles.pageContainer}>
                <ProductList />
            </div>
            <Footer />
        </>
    )
}