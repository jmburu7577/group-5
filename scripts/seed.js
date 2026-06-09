/**
 * MongoDB Seed Script
 * Populates the database with sample products and artisans
 * 
 * Usage: node scripts/seed.js
 */

const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: '.env.local' });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    console.error('❌ MONGODB_URI not found in .env.local');
    process.exit(1);
}

// Define schemas inline
const productSchema = new mongoose.Schema(
    {
        id: { type: String, required: true, unique: true },
        name: { type: String, required: true },
        price: { type: Number, required: true },
        category: { type: String, required: true },
        image: { type: String, default: '' },
        artisanId: { type: String, required: true },
        description: { type: String, required: true },
        materials: [String],
        dimensions: String,
        weight: String,
        inStock: { type: Boolean, default: true },
        stockQuantity: { type: Number, default: 0 },
        rating: { type: Number, default: 0 },
        totalReviews: { type: Number, default: 0 },
        tags: [String],
        images: [String],
        createdAt: { type: String, default: () => new Date().toISOString() },
    },
    { timestamps: false }
);

const artisanSchema = new mongoose.Schema(
    {
        id: { type: String, required: true, unique: true },
        name: { type: String, required: true },
        specialty: { type: String, required: true },
        description: { type: String, required: true },
        image: { type: String, default: '' },
        location: String,
        yearsExperience: Number,
        rating: { type: Number, default: 0 },
        totalReviews: { type: Number, default: 0 },
        verified: { type: Boolean, default: false },
        joinedDate: { type: String, default: () => new Date().toISOString() },
        socialLinks: {
            website: String,
            instagram: String,
            facebook: String,
        },
    },
    { timestamps: false }
);

const Product = mongoose.model('Product', productSchema);
const Artisan = mongoose.model('Artisan', artisanSchema);

// Load data from JSON files
const artisansDataPath = path.join(__dirname, '../data/artisans.json');
const productsDataPath = path.join(__dirname, '../data/products.json');

const sampleArtisans = JSON.parse(fs.readFileSync(artisansDataPath, 'utf8'));
const sampleProducts = JSON.parse(fs.readFileSync(productsDataPath, 'utf8'));

async function seedDatabase() {
  try {
    console.log('🔗 Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('✓ Connected to MongoDB');

    console.log('\n📋 Seeding artisans...');
    // Try to clear existing artisans, but continue if permission is denied
    try {
      await Artisan.deleteMany({});
      console.log('  ✓ Cleared existing artisans');
    } catch (deleteError) {
      console.log('  ⚠️  Could not clear existing artisans (permission issue), skipping delete');
    }
    
    // Try insertMany first
    try {
      const createdArtisans = await Artisan.insertMany(sampleArtisans, { ordered: false });
      console.log(`✓ Inserted ${createdArtisans.length} artisans`);
    } catch (insertError) {
      // If insert fails (duplicates or permission issue), try upsert, if that fails, just log and continue
      console.log('  ⚠️  Could not insert artisans, trying upsert...');
      try {
        const artisanUpserts = sampleArtisans.map(artisan => 
          Artisan.updateOne(
            { id: artisan.id },
            { $set: artisan },
            { upsert: true }
          )
        );
        await Promise.all(artisanUpserts);
        console.log(`✓ Upserted ${sampleArtisans.length} artisans`);
      } catch (upsertError) {
        console.log('  ⚠️  Could not upsert artisans either, checking existing data...');
      }
    }

    console.log('\n📦 Seeding products...');
    // Try to clear existing products, but continue if permission is denied
    try {
      await Product.deleteMany({});
      console.log('  ✓ Cleared existing products');
    } catch (deleteError) {
      console.log('  ⚠️  Could not clear existing products (permission issue), skipping delete');
    }
    
    // Try insertMany first
    try {
      const createdProducts = await Product.insertMany(sampleProducts, { ordered: false });
      console.log(`✓ Inserted ${createdProducts.length} products`);
    } catch (insertError) {
      // If insert fails (duplicates or permission issue), try upsert, if that fails, just log and continue
      console.log('  ⚠️  Could not insert products, trying upsert...');
      try {
        const productUpserts = sampleProducts.map(product => 
          Product.updateOne(
            { id: product.id },
            { $set: product },
            { upsert: true }
          )
        );
        await Promise.all(productUpserts);
        console.log(`✓ Upserted ${sampleProducts.length} products`);
      } catch (upsertError) {
        console.log('  ⚠️  Could not upsert products either, checking existing data...');
      }
    }

    console.log('\n✅ Seeding process complete!');
    console.log(`   - Attempted to seed ${sampleArtisans.length} artisans`);
    console.log(`   - Attempted to seed ${sampleProducts.length} products`);

    console.log('\n🧪 Verification:');
    let artisansCount = 0;
    let productsCount = 0;
    try {
      artisansCount = await Artisan.countDocuments();
      productsCount = await Product.countDocuments();
      console.log(`   - Total artisans in DB: ${artisansCount}`);
      console.log(`   - Total products in DB: ${productsCount}`);
    } catch (findError) {
      console.log('  ⚠️  Could not verify data in DB (permission issue)');
      console.log(`   - Using local data: ${sampleArtisans.length} artisans, ${sampleProducts.length} products`);
    }

    await mongoose.disconnect();
    console.log('\n✓ Disconnected from MongoDB');
  } catch (error) {
    console.error('❌ Seed script failed:', error.message);
    process.exit(1);
  }
}

seedDatabase();
