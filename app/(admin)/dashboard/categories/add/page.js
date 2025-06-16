import { createCategory } from '@/lib/data_services';
import { redirect } from 'next/navigation';
import styles from './add.module.css';

export default function AddCategoryPage() {
  const handleAddCategory = async (formData) => {
    "use server";
    const name = formData.get('name');
    await createCategory(name);
    redirect('/dashboard/categories');
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Add New Category</h1>
      <form action={handleAddCategory} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="name" className={styles.label}>Category Name</label>
          <input type="text" id="name" name="name" required className={styles.input} />
        </div>
        <button type="submit" className={styles.submitButton}>
          Add Category
        </button>
      </form>
    </div>
  );
} 