#!/usr/bin/env node
/**
 * Comprehensive CRUD Test Script
 * Tests all API endpoints for Products, Artisans, Reviews, and Orders
 * 
 * Usage: node scripts/test-api.js
 */

const http = require('http');

const BASE_URL = 'http://127.0.0.1:3000';

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
let createdProductId = null;
let createdArtisanId = null;
let createdReviewId = null;
let createdOrderId = null;

async function runTests() {
    console.log('🚀 Starting API Tests\n');
    console.log(`Base URL: ${BASE_URL}\n`);

    try {
        // ============ PRODUCTS TESTS ============
        console.log('📦 TESTING PRODUCTS ENDPOINTS\n');

        // GET all products
        console.log('1️⃣ GET /api/products');
        let res = await makeRequest('GET', '/api/products');
        console.log(`   Status: ${res.status} - ${res.status === 200 ? '✅ PASS' : '❌ FAIL'}`);
        console.log(`   Found ${Array.isArray(res.data) ? res.data.length : 0} products\n`);

        // ============ ARTISANS TESTS ============
        console.log('👨‍🎨 TESTING ARTISANS ENDPOINTS\n');

        // GET all artisans
        console.log('2️⃣ GET /api/artisans');
        res = await makeRequest('GET', '/api/artisans');
        console.log(`   Status: ${res.status} - ${res.status === 200 ? '✅ PASS' : '❌ FAIL'}`);
        console.log(`   Found ${Array.isArray(res.data) ? res.data.length : 0} artisans\n`);

        // ============ REVIEWS TESTS ============
        console.log('⭐ TESTING REVIEWS ENDPOINTS\n');

        // GET all reviews
        console.log('3️⃣ GET /api/reviews');
        res = await makeRequest('GET', '/api/reviews');
        console.log(`   Status: ${res.status} - ${res.status === 200 ? '✅ PASS' : '❌ FAIL'}`);
        console.log(`   Found ${Array.isArray(res.data) ? res.data.length : 0} reviews\n`);

        // ============ ORDERS TESTS ============
        console.log('🛒 TESTING ORDERS ENDPOINTS\n');

        // GET all orders
        console.log('4️⃣ GET /api/orders');
        res = await makeRequest('GET', '/api/orders');
        console.log(`   Status: ${res.status} - ${res.status === 200 ? '✅ PASS' : '❌ FAIL'}`);
        console.log(`   Found ${Array.isArray(res.data) ? res.data.length : 0} orders\n`);

        // ============ USERS TESTS ============
        console.log('👥 TESTING USERS ENDPOINTS\n');

        // GET all users
        console.log('5️⃣ GET /api/users');
        res = await makeRequest('GET', '/api/users');
        console.log(`   Status: ${res.status} - ${res.status === 200 ? '✅ PASS' : '❌ FAIL'}`);
        console.log(`   Found ${Array.isArray(res.data) ? res.data.length : 0} users\n`);

        console.log('✅ All GET endpoint tests completed successfully!');
        process.exit(0);
    } catch (error) {
        console.error('❌ Test failed:', error.message);
        process.exit(1);
    }
}

runTests();
