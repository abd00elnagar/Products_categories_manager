'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { getAllProducts, deleteProduct } from '@/lib/data_services';
import styles from './dashboard.module.css';

export default function Dashboard() {
  const [products, setProducts] = useState([]);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    if (!session) {
      router.push('/login');
      return;
    }
    fetchProducts();
  }, [session]);

  const fetchProducts = async () => {
    try {
      const data = await getAllProducts();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleDelete = async (productId) => {
    setProductToDelete(productId);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteProduct(productToDelete);
      setProducts(products.filter(p => p.id !== productToDelete));
      setShowDeleteConfirm(false);
      setProductToDelete(null);
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const cancelDelete = () => {
    setShowDeleteConfirm(false);
    setProductToDelete(null);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Product Dashboard</h1>
        <button 
          className={styles.addButton}
          onClick={() => router.push('/dashboard/add')}
        >
          Add Product
        </button>
      </div>

      <div className={styles.productGrid}>
        {products.map((product) => (
          <div key={product.id} className={styles.productCard}>
            <img 
              src={product.image} 
              alt={product.name} 
              className={styles.productImage}
            />
            <div className={styles.productInfo}>
              <h3>{product.name}</h3>
              <p className={styles.category}>{product.category}</p>
              <div className={styles.actions}>
                <button 
                  className={styles.updateButton}
                  onClick={() => router.push(`/dashboard/edit/${product.id}`)}
                >
                  Update
                </button>
                <button 
                  className={styles.deleteButton}
                  onClick={() => handleDelete(product.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showDeleteConfirm && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h2>Confirm Delete</h2>
            <p>Are you sure you want to delete this product?</p>
            <div className={styles.modalActions}>
              <button 
                className={styles.confirmButton}
                onClick={confirmDelete}
              >
                Yes, Delete
              </button>
              <button 
                className={styles.cancelButton}
                onClick={cancelDelete}
              >
                No, Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
