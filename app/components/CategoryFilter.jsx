'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { getCategories } from '@/lib/data_services';
import styles from './CategoryFilter.module.css';

export default function CategoryFilter() {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get('category');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    const params = new URLSearchParams(searchParams);
    
    if (category) {
      params.set('category', category);
    } else {
      params.delete('category');
    }
    
    router.push(`/?${params.toString()}`);
  };

  if (isLoading) {
    return <div className={styles.loading}>Loading categories...</div>;
  }

  return (
    <div className={styles.filterContainer}>
      <div className={styles.filterGroup}>
        <label htmlFor="category" className={styles.label}>Filter by Category:</label>
        <select
          id="category"
          value={currentCategory || ''}
          onChange={handleCategoryChange}
          className={styles.select}
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category.id} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
} 