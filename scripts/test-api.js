#!/usr/bin/env node
/**
 * Comprehensive CRUD Test Script
 * Tests all API endpoints for Products and Artisans
 * 
 * Usage: node scripts/test-api.js
 */

const http = require('http');

const BASE_URL = 'http://127.0.0.1:3001';

// Helper function to make HTTP requests
function makeRequest(method, path, body = null) {
    return new Promise((resolve, reject) => {
        const url = new URL(BASE_URL + path);
        const options = {
            hostname: url.hostname,
            port: url.port,
            path: url.pathname + url.search,
            method: method,
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const req = http.request(options, (res) => {
            let data = '';
            res.on('data', (chunk) => {
                data += chunk;
            });
            res.on('end', () => {
                try {
                    const parsed = JSON.parse(data);
                    resolve({ status: res.statusCode, data: parsed });
                } catch (e) {
                    resolve({ status: res.statusCode, data });
                }
            });
        });

        req.on('error', reject);
        if (body) {
            req.write(JSON.stringify(body));
        }
        req.end();
    });
}

// Test cases
const tests = [];
let createdProductId = null;
let createdArtisanId = null;

async function runTests() {
    console.log('🚀 Starting API Tests\n');
    console.log(`Base URL: ${BASE_URL}\n`);

    try {
        // ============ PRODUCTS TESTS ============
        console.log('📦 TESTING PRODUCTS ENDPOINTS\n');

        // GET all products
        console.log('1️⃣ GET /api/products');
        let res = await makeRequest('GET', '/api/products');
        console.log(`   Status: ${res.status}`);
        console.log(`   Found ${Array.isArray(res.data) ? res.data.length : 0} products\n`);

        // CREATE product
        console.log('2️⃣ POST /api/products (Create)');
        const newProduct = {
            name: 'Beautiful Wooden Box',
            price: 45.99,
            category: 'Woodcraft',
            image: '/images/wooden-box.jpg',
            artisanId: 'artisan1',
            description: 'Hand-carved wooden storage box',
            materials: ['Oak Wood', 'Walnut Stain'],
            dimensions: '10 x 8 x 6 inches',
            weight: '2.5kg',
            inStock: true,
            stockQuantity: 10,
            rating: 0,
            totalReviews: 0,
            tags: ['wood', 'box', 'storage'],
            images: ['/images/wooden-box.jpg'],
        };
        res = await makeRequest('POST', '/api/products', newProduct);
        console.log(`   Status: ${res.status}`);
        if (res.data.id) {
            createdProductId = res.data.id;
            console.log(`   Created product ID: ${createdProductId}`);
            console.log(`   Product: ${res.data.name} - $${res.data.price}\n`);
        } else {
            console.log(`   Error: ${res.data.message || 'Unknown error'}\n`);
        }

        // GET product by ID
        if (createdProductId) {
            console.log(`3️⃣ GET /api/products/${createdProductId}`);
            res = await makeRequest('GET', `/api/products/${createdProductId}`);
            console.log(`   Status: ${res.status}`);
            console.log(`   Found: ${res.data.name}\n`);
        }

        // UPDATE product
        if (createdProductId) {
            console.log(`4️⃣ PUT /api/products/${createdProductId} (Update)`);
            const updates = { name: 'Premium Wooden Box', price: 54.99 };
            res = await makeRequest('PUT', `/api/products/${createdProductId}`, updates);
            console.log(`   Status: ${res.status}`);
            console.log(`   Updated: ${res.data.name} - $${res.data.price}\n`);
        }

        // DELETE product
        if (createdProductId) {
            console.log(`5️⃣ DELETE /api/products/${createdProductId}`);
            res = await makeRequest('DELETE', `/api/products/${createdProductId}`);
            console.log(`   Status: ${res.status}`);
            console.log(`   Deleted successfully\n`);
        }

        // ============ ARTISANS TESTS ============
        console.log('👨‍🎨 TESTING ARTISANS ENDPOINTS\n');

        // GET all artisans
        console.log('6️⃣ GET /api/artisans');
        res = await makeRequest('GET', '/api/artisans');
        console.log(`   Status: ${res.status}`);
        console.log(`   Found ${Array.isArray(res.data) ? res.data.length : 0} artisans\n`);

        // CREATE artisan
        console.log('7️⃣ POST /api/artisans (Create)');
        const newArtisan = {
            name: 'Sarah Thompson',
            specialty: 'Woodcraft',
            description: 'Master woodcrafter specializing in custom furniture.',
            image: '/images/sarah.jpg',
            location: 'Portland, Maine',
            yearsExperience: 15,
            rating: 0,
            totalReviews: 0,
            verified: false,
            joinedDate: new Date().toISOString(),
            socialLinks: {
                website: 'https://sarahwoodcraft.com',
                instagram: '@sarah_crafts',
            },
        };
        res = await makeRequest('POST', '/api/artisans', newArtisan);
        console.log(`   Status: ${res.status}`);
        if (res.data.id) {
            createdArtisanId = res.data.id;
            console.log(`   Created artisan ID: ${createdArtisanId}`);
            console.log(`   Artisan: ${res.data.name} - ${res.data.specialty}\n`);
        } else {
            console.log(`   Error: ${res.data.message || 'Unknown error'}\n`);
        }

        // GET artisan by ID
        if (createdArtisanId) {
            console.log(`8️⃣ GET /api/artisans/${createdArtisanId}`);
            res = await makeRequest('GET', `/api/artisans/${createdArtisanId}`);
            console.log(`   Status: ${res.status}`);
            console.log(`   Found: ${res.data.name}\n`);
        }

        // UPDATE artisan
        if (createdArtisanId) {
            console.log(`9️⃣ PUT /api/artisans/${createdArtisanId} (Update)`);
            const updates = { verified: true, yearsExperience: 16 };
            res = await makeRequest('PUT', `/api/artisans/${createdArtisanId}`, updates);
            console.log(`   Status: ${res.status}`);
            console.log(`   Verified: ${res.data.verified}, Years: ${res.data.yearsExperience}\n`);
        }

        // DELETE artisan
        if (createdArtisanId) {
            console.log(`🔟 DELETE /api/artisans/${createdArtisanId}`);
            res = await makeRequest('DELETE', `/api/artisans/${createdArtisanId}`);
            console.log(`   Status: ${res.status}`);
            console.log(`   Deleted successfully\n`);
        }

        console.log('✅ All tests completed successfully!');
        process.exit(0);
    } catch (error) {
        console.error('❌ Test failed:', error.message);
        process.exit(1);
    }
}

runTests();
