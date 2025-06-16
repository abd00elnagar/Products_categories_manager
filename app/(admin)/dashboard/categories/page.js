import { getCategories, deleteCategory } from '@/lib/data_services';
import Link from 'next/link';
import styles from './categories.module.css';
import DeleteConfirmation from './DeleteConfirmation';

export default async function CategoriesPage() {
  const categories = await getCategories();

  const handleDelete = async (formData) => {
    "use server";
    const id = formData.get('id');
    if (id) {
      try {
        await deleteCategory(parseInt(id));
      } catch (error) {
        console.error('Error deleting category:', error);
      }
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Manage Categories</h1>
      <Link href="/dashboard/categories/add" className={styles.addButton}>
        Add New Category
      </Link>
      <div className={styles.categoryList}>
        {categories.length === 0 ? (
          <p className={styles.emptyMessage}>No categories found.</p>
        ) : (
          categories.map((category) => (
            <div key={category.id} className={styles.categoryCard}>
              <p className={styles.categoryName}>{category.name}</p>
              <DeleteConfirmation categoryId={category.id} categoryName={category.name} />
            </div>
          ))
        )}
      </div>
    </div>
  );
}
 