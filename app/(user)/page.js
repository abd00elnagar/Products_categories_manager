import { getAllProducts, getProductsByCategory } from '@/lib/data_services';
import ProductCard from '../components/ProductCard';
import CategoryFilter from '../components/CategoryFilter';
import styles from './page.module.css';

// Mark the page as dynamic
export const dynamic = 'force-dynamic';

export default async function Home({ searchParams }) {
  try {
    const category = searchParams?.category;
    const products = category 
      ? await getProductsByCategory(category)
      : await getAllProducts();

    return (
      <main className={styles.main}>
        <div className={styles.container}>
          <CategoryFilter />
          {!products || products.length === 0 ? (
            <p className={styles.noProducts}>
              {category 
                ? `No products found in the "${category}" category.`
                : 'No products available at the moment.'}
            </p>
          ) : (
            <div className={styles.grid}>
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </main>
    );
  } catch (error) {
    console.error('Error loading products:', error);
    return (
      <main className={styles.main}>
        <div className={styles.container}>
          <CategoryFilter />
          <p className={styles.error}>
            An error occurred while loading products. Please try again later.
          </p>
        </div>
      </main>
    );
  }
}
