'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './DashboardNavBar.module.css';

export default function DashboardNavBar() {
  const pathname = usePathname();

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <Link href="/dashboard" className={styles.logo}>
          <img src="/logo.png" alt="Unateed Admin Logo" className={styles.logoImage} />
          <h3>UNATEED</h3>
        </Link>

        <div className={styles.links}>
          <Link 
            href="/dashboard" 
            className={`${styles.navLink} ${pathname === '/dashboard' ? styles.active : ''}`}
          >
            Products
          </Link>
          <Link 
            href="/dashboard/categories" 
            className={`${styles.navLink} ${pathname === '/dashboard/categories' ? styles.active : ''}`}
          >
            Categories
          </Link>
        </div>
      </div>
    </nav>
  );
}
