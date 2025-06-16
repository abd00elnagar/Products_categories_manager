'use client';

import Link from 'next/link';
import styles from './ProductCard.module.css';

export default function ProductCard({ product }) {
  if (!product) {
    return null;
  }

  return (
    <Link href={`/products/${product.id}`} className={styles.card}>
      <div className={styles.imageContainer}>
        <img
          src={product.image || '/placeholder.png'}
          alt={product.name || 'Product image'}
          className={styles.image}
        />
      </div>
      <div className={styles.content}>
        <h3 className={styles.name}>{product.name || 'Unnamed Product'}</h3>
        <p className={styles.category}>{product.category || 'Uncategorized'}</p>
      </div>
    </Link>
  );
} 
