'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import styles from './HomeNavBar.module.css';

export default function HomeNavBar() {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'authenticated' && pathname === '/login') {
      router.replace('/dashboard');
    }
  }, [status, pathname, router]);

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push('/');
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.navContent}>
        <div className={styles.leftSection}>
          <img src="/logo.png" alt="Unateed Logo" className={styles.logoImage} />
          <h3>UNATEED</h3>
        </div>
        
        <div className={styles.rightSection}>
          <Link 
            href="/" 
            className={`${styles.navLink} ${pathname === '/' ? styles.active : ''}`}
          >
            Products
          </Link>
        </div>
      </div>
    </nav>
  );
}
