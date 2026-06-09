(async () => {
    try {
        const base = 'http://127.0.0.1:3000';
        const fetch = globalThis.fetch || (await import('node-fetch')).default;

        console.log('GET /api/products');
        let r = await fetch(base + '/api/products');
        console.log('status', r.status);
        let body = await r.text();
        console.log(body.slice(0, 1000));

        console.log('\nGET /api/artisans');
        r = await fetch(base + '/api/artisans');
        console.log('status', r.status);
        body = await r.text();
        console.log(body.slice(0, 1000));

        console.log('\nGET /api-docs');
        r = await fetch(base + '/api-docs');
        console.log('status', r.status);
        body = await r.text();
        console.log(body.slice(0, 1000));

        console.log('\nPOST /api/products (create test product)');
        const prod = { name: 'CI Test Product', price: 1.23, category: 'test', image: '', artisanId: 'artisan1', description: 'ci test', materials: [], dimensions: '', weight: '', inStock: true, stockQuantity: 1, rating: 0, totalReviews: 0, tags: [], images: [] };
        r = await fetch(base + '/api/products', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(prod) });
        console.log('status', r.status);
        body = await r.text();
        console.log(body.slice(0, 1000));

        console.log('\nGET /api/products (after create)');
        r = await fetch(base + '/api/products');
        console.log('status', r.status);
        body = await r.text();
        console.log(body.slice(0, 1000));

    } catch (e) {
        console.error('ERR', e.message || e);
    }
})();
