import styles from './page.module.css';

// Placeholder data for a seller - in a real application, this would come from a database
const seller = {
  id: 'artisan-1',
  name: 'Artisan Name 1',
  story: 'A passionate artisan with over 20 years of experience in crafting beautiful, one-of-a-kind jewelry pieces. Inspired by nature, each piece tells a unique story.',
  specialty: 'Jewelry',
  items: [
    { id: 'item-1', name: 'Silver Necklace', image: '/placeholder.svg' },
    { id: 'item-2', name: 'Gemstone Earrings', image: '/placeholder.svg' },
    { id: 'item-3', name: 'Handcrafted Bracelet', image: '/placeholder.svg' },
  ],
};

export default function SellerProfilePage() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.sellerName}>{seller.name}</h1>
        <p className={styles.sellerSpecialty}>{seller.specialty}</p>
      </header>

      <main className={styles.mainContent}>
        <section className={styles.storySection}>
          <h2 className={styles.sectionHeading}>My Story</h2>
          <p className={styles.storyText}>{seller.story}</p>
        </section>

        <section className={styles.itemsSection}>
          <h2 className={styles.sectionHeading}>My Handcrafted Items</h2>
          <div className={styles.itemsGrid}>
            {seller.items.map((item) => (
              <div key={item.id} className={styles.itemCard}>
                {/* In a real app, you would use Next.js Image component here */}
                <img src={item.image} alt={item.name} className={styles.itemImage} />
                <h3 className={styles.itemName}>{item.name}</h3>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
