'use client';

import { useState } from 'react';
import { deleteCategory } from '@/lib/data_services';
import styles from './categories.module.css';

export default function DeleteConfirmation({ categoryId, categoryName }) {
  const [isConfirming, setIsConfirming] = useState(false);

  const handleDelete = async () => {
    try {
      await deleteCategory(categoryId);
      setIsConfirming(false);
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  return (
    <div>
      {!isConfirming ? (
        <button 
          onClick={() => setIsConfirming(true)} 
          className={styles.deleteButton}
        >
          Delete
        </button>
      ) : (
        <div className={styles.confirmationDialog}>
          <p>Are you sure you want to delete "{categoryName}"?</p>
          <div className={styles.confirmationButtons}>
            <button 
              onClick={handleDelete} 
              className={styles.confirmButton}
            >
              Yes, Delete
            </button>
            <button 
              onClick={() => setIsConfirming(false)} 
              className={styles.cancelButton}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
} 