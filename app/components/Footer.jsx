'use client';

import Link from 'next/link';
import styles from './Footer.module.css';
import { FaWhatsapp } from 'react-icons/fa';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function Footer() {
  const { data: session } = useSession();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push('/');
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.column}>
            <h3>Unateed</h3>
            <p>Your trusted partner in quality products and services.</p>
          </div>

          <div className={styles.column}>
            <h4>Navigation</h4>
            <ul>
              <li><Link href="/">Home</Link></li>
              <li><Link href="/dashboard">Dashboard</Link></li>
              {session && (
                <li>
                  <button onClick={handleSignOut} className={styles.logoutButton}>
                    Logout
                  </button>
                </li>
              )}
            </ul>
          </div>

          <div className={styles.column}>
            <h4>Contact Us</h4>
            <ul>
              <li>Email: unateedcompany@gmail.com</li>
              <li className={styles.flexItem}>
                <div className={styles.socialLinks}>
                  <a
                    href="https://wa.me/201096063893"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="WhatsApp 1"
                  >
                    <FaWhatsapp className={styles.socialIcon} />
                  </a>
                </div>
                <a href="tel:+201096063893">+20 109 6063 893</a>
              </li>

              <br />
              <hr />
              <br />
              <li className={styles.flexItem}>
                <div className={styles.socialLinks}>
                  <a
                    href="https://wa.me/201119058723"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="WhatsApp 2"
                  >
                    <FaWhatsapp className={styles.socialIcon} />
                  </a>
                </div>
                <a href="tel:+201119058723">+20 111 9058 723</a>
              </li>
            </ul>
          </div>

        </div>

        <div className={styles.bottom}>
          <p>&copy; {new Date().getFullYear()} Unateed. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
} 