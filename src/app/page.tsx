import styles from './page.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <nav className={styles.navbar}>
          <h1 className={styles.title}>Handcrafted Haven</h1>
          <ul className={styles.navList}>
            <li><a href="#" className={styles.navLink}>Home</a></li>
            <li><a href="#" className={styles.navLink}>Shop</a></li>
            <li><a href="#" className={styles.navLink}>About Us</a></li>
            <li><a href="#" className={styles.navLink}>Contact</a></li>
          </ul>
        </nav>
      </header>

      <main className={styles.mainContent}>
        <section className={styles.heroSection}>
          <h2 className={styles.heroHeading}>Discover Unique Handcrafted Treasures</h2>
          <p className={styles.heroSubheading}>Connecting talented creators with potential customers who appreciate the beauty and quality of handmade products.</p>
          <button className={styles.exploreButton}>Explore Products</button>
        </section>

        <section className={styles.featuredArtisans}>
          <h3 className={styles.sectionHeading}>Featured Artisans</h3>
          <div className={styles.artisanGrid}>
            <div className={styles.artisanCard}>
              <h4 className={styles.artisanName}>Artisan Name 1</h4>
              <p className={styles.artisanSpecialty}>Specialty: Jewelry</p>
            </div>
            <div className={styles.artisanCard}>
              <h4 className={styles.artisanName}>Artisan Name 2</h4>
              <p className={styles.artisanSpecialty}>Specialty: Pottery</p>
            </div>
            <div className={styles.artisanCard}>
              <h4 className={styles.artisanName}>Artisan Name 3</h4>
              <p className={styles.artisanSpecialty}>Specialty: Textiles</p>
            </div>
          </div>
        </section>

        <section className={styles.aboutSection}>
          <h3 className={styles.sectionHeading}>About Handcrafted Haven</h3>
          <p className={styles.aboutText}>Handcrafted Haven is an innovative web application that aims to provide a platform for artisans and crafters to showcase and sell their unique handcrafted items. It serves as a virtual marketplace, connecting talented creators with potential customers who appreciate the beauty and quality of handmade products. The application focuses on fostering a sense of community, supporting local artisans, and promoting sustainable consumption.</p>
        </section>

        <section className={styles.categoriesSection}>
          <h3 className={styles.sectionHeading}>Shop by Category</h3>
          <div className={styles.categoryGrid}>
            <div className={styles.categoryCard}>Jewelry</div>
            <div className={styles.categoryCard}>Pottery</div>
            <div className={styles.categoryCard}>Textiles</div>
            <div className={styles.categoryCard}>Woodwork</div>
            <div className={styles.categoryCard}>Painting</div>
            <div className={styles.categoryCard}>Sculpture</div>
          </div>
        </section>

        <section className={styles.howItWorksSection}>
          <h3 className={styles.sectionHeading}>How It Works</h3>
          <div className={styles.stepsGrid}>
            <div className={styles.stepCard}>
              <h4>1. Discover</h4>
              <p>Browse through a wide array of unique handcrafted items.</p>
            </div>
            <div className={styles.stepCard}>
              <h4>2. Connect</h4>
              <p>Engage with talented artisans and learn their stories.</p>
            </div>
            <div className={styles.stepCard}>
              <h4>3. Acquire</h4>
              <p>Purchase beautiful handmade products directly from creators.</p>
            </div>
          </div>
        </section>

        <section className={styles.testimonialsSection}>
          <h3 className={styles.sectionHeading}>What Our Customers Say</h3>
          <div className={styles.testimonialGrid}>
            <div className={styles.testimonialCard}>
              <p>"I found the most beautiful custom necklace here! The artisan was a pleasure to work with."</p>
              <p className={styles.testimonialAuthor}>- Happy Customer 1</p>
            </div>
            <div className={styles.testimonialCard}>
              <p>"Handcrafted Haven is my go-to for unique gifts. Always impressed with the quality!"</p>
              <p className={styles.testimonialAuthor}>- Happy Customer 2</p>
            </div>
          </div>
        </section>

        <section className={styles.ctaSection}>
          <h3 className={styles.sectionHeading}>Are You an Artisan?</h3>
          <p className={styles.ctaText}>Join our growing community of talented creators and showcase your unique handcrafted items to a wider audience.</p>
          <button className={styles.ctaButton}>Become a Seller</button>
        </section>

        <section className={styles.latestProductsSection}>
          <h3 className={styles.sectionHeading}>Latest Products</h3>
          <div className={styles.productGrid}>
            <div className={styles.productCard}>Product 1</div>
            <div className={styles.productCard}>Product 2</div>
            <div className={styles.productCard}>Product 3</div>
            <div className={styles.productCard}>Product 4</div>
          </div>
        </section>

        <section className={styles.communitySection}>
          <h3 className={styles.sectionHeading}>Fostering Community</h3>
          <p className={styles.communityText}>Handcrafted Haven is more than just a marketplace; it's a vibrant community where artisans and craft enthusiasts connect, share, and grow together. We believe in supporting local talent and promoting sustainable consumption.</p>
        </section>

      </main>

      <footer className={styles.footer}>
        <p>&copy; 2023 Handcrafted Haven. All rights reserved.</p>
      </footer>
    </div>
  )
}