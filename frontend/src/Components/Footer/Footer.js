import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.socialIcons}>
          <button type="button" className={styles.socialButton}>
            <i className="fab fa-facebook-f"></i>
          </button>
          <button type="button" className={styles.socialButton}>
            <i className="fab fa-youtube"></i>
          </button>
          <button type="button" className={styles.socialButton}>
            <i className="fab fa-instagram"></i>
          </button>
          <button type="button" className={styles.socialButton}>
            <i className="fab fa-twitter"></i>
          </button>
        </div>
        <div className={styles.copyright}>
          © 2020 Copyright:
          <a className={styles.link} href="https://mdbootstrap.com/"> MDBootstrap.com</a>
        </div>
      </div>
    </footer>
  );
}
