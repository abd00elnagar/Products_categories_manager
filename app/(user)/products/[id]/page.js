import { getProductById } from '@/lib/data_services';
import styles from './page.module.css';

export default async function ProductPage({ params }) {
  const productId = params.id;
  const product = await getProductById(productId);

  if (!product) {
    return (
      <div className={styles.notFound}>
        <h1>Product not found</h1>
      </div>
    );
  }

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div className={styles.product}>
          <div className={styles.imageContainer}>
            <img
              src={product.image || '/placeholder.png'}
              alt={product.name}
              className={styles.image}
            />
          </div>
          <div className={styles.details}>
            <h1 className={styles.name}>{product.name}</h1>
            <p className={styles.category}>Category: {product.category}</p>
            {product.description && (
              <div className={styles.description}>
                <h2>Description</h2>
                <p>{product.description}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
} 