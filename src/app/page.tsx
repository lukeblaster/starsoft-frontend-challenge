import ProductList from './components/ui/ProductList'
import styles from './page.module.scss'

export default function Page() {
    return (
        <div className={styles.pageContainer}>
            <ProductList />
        </div>
    )
}