# Artisan Platform - Complete Setup & Deployment Guide

## 🚀 Quick Start

### Prerequisites
- Node.js v22+ installed
- MongoDB Atlas account (free tier available)
- npm or yarn package manager

### 1. Installation

```bash
# Install dependencies
npm install

# Dependencies installed:
# - Next.js 15.4.4 - React framework
# - MongoDB & Mongoose - Database ODM
# - Swagger UI - API documentation
# - Tailwind CSS - Styling
```

### 2. Environment Setup

Create `.env.local` file in project root:

```env
MONGODB_URI=mongodb+srv://username:password@cluster-name.mongodb.net/artisan-db?retryWrites=true&w=majority
```

Get your connection string from [MongoDB Atlas Dashboard](https://cloud.mongodb.com):
1. Click **Connect** on your cluster
2. Select **Drivers** → Node.js
3. Copy the connection string
4. Replace `username`, `password`, and cluster name

### 3. Seed Initial Data

Populate MongoDB with sample products and artisans:

```bash
node scripts/seed.js
```

Expected output:
```
🔗 Connecting to MongoDB...
✓ Connected to MongoDB

📋 Seeding artisans...
✓ Created 2 artisans

📦 Seeding products...
✓ Created 2 products

✅ Seeding complete!
   - Artisans: 2
   - Products: 2
```

### 4. Run Development Server

```bash
npm run dev
```

Server will start at:
- Local: `http://localhost:3001` (or 3000 if available)
- Network: `http://172.31.240.1:3001`

## 📚 API Documentation

### Base URL (Development)
```
http://localhost:3001
```

### Swagger UI
View interactive API docs at:
```
http://localhost:3001/api-docs
```

## 🔌 API Endpoints

### Products

#### List All Products
```bash
GET /api/products
```
Response: `200 OK` - Array of products

#### Get Product by ID
```bash
GET /api/products/{id}
```
Response: `200 OK` or `404 Not Found`

#### Create Product
```bash
POST /api/products
Content-Type: application/json

{
  "name": "Product Name",
  "price": 99.99,
  "category": "Category",
  "image": "/path/to/image.jpg",
  "artisanId": "artisan1",
  "description": "Product description",
  "materials": ["Material1", "Material2"],
  "dimensions": "10x10x10 inches",
  "weight": "1kg",
  "inStock": true,
  "stockQuantity": 5,
  "tags": ["tag1", "tag2"],
  "images": ["/path1.jpg", "/path2.jpg"]
}
```
Response: `201 Created`

#### Update Product
```bash
PUT /api/products/{id}
Content-Type: application/json

{
  "name": "Updated Name",
  "price": 79.99,
  "inStock": false
}
```
Response: `200 OK` or `404 Not Found`

#### Delete Product
```bash
DELETE /api/products/{id}
```
Response: `204 No Content` or `404 Not Found`

### Artisans

#### List All Artisans
```bash
GET /api/artisans
```
Response: `200 OK` - Array of artisans

#### Get Artisan by ID
```bash
GET /api/artisans/{id}
```
Response: `200 OK` or `404 Not Found`

#### Create Artisan
```bash
POST /api/artisans
Content-Type: application/json

{
  "name": "Artisan Name",
  "specialty": "Jewelry",
  "description": "Artisan bio",
  "image": "/path/to/image.jpg",
  "location": "City, State",
  "yearsExperience": 10,
  "verified": false,
  "socialLinks": {
    "website": "https://example.com",
    "instagram": "@handle",
    "facebook": "/page"
  }
}
```
Response: `201 Created`

#### Update Artisan
```bash
PUT /api/artisans/{id}
Content-Type: application/json

{
  "verified": true,
  "rating": 4.8
}
```
Response: `200 OK` or `404 Not Found`

#### Delete Artisan
```bash
DELETE /api/artisans/{id}
```
Response: `204 No Content` or `404 Not Found`

## 🧪 Testing

### Manual Testing

Test all CRUD operations:
```bash
# Start server first
npm run dev

# In another terminal
node scripts/test-api.js
```

### Example cURL Requests

```bash
# Create product
curl -X POST http://localhost:3001/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "name":"Silver Ring",
    "price":49.99,
    "category":"Jewelry",
    "image":"/ring.jpg",
    "artisanId":"artisan1",
    "description":"Elegant silver ring",
    "materials":["Silver"],
    "inStock":true,
    "stockQuantity":3,
    "tags":["ring","jewelry"]
  }'

# Get all products
curl http://localhost:3001/api/products

# Update product
curl -X PUT http://localhost:3001/api/products/prod1 \
  -H "Content-Type: application/json" \
  -d '{"price":59.99}'

# Delete product
curl -X DELETE http://localhost:3001/api/products/prod1
```

## 🚢 Deployment to Render

### Step 1: Prepare GitHub Repository

```bash
# Initialize git (if not already)
git init

# Create .gitignore
echo "node_modules
.env
.env.local
.next
.vercel
.DS_Store" > .gitignore

# Commit code
git add .
git commit -m "Initial commit: MongoDB integration"
git push origin main
```

### Step 2: Create Render Service

1. Go to [render.com](https://render.com)
2. Click **New +** → **Web Service**
3. Connect your GitHub repository
4. Configure:
   - **Name**: artisan-platform
   - **Environment**: Node
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`

### Step 3: Add Environment Variables

In Render dashboard:
1. Go to **Environment**
2. Add variable:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster-name.mongodb.net/artisan-db?retryWrites=true&w=majority
   ```

### Step 4: Deploy

1. Click **Deploy**
2. Wait for build completion
3. Your app will be live at: `https://artisan-platform.onrender.com`

### Step 5: Access on Deployed Site

- Homepage: `https://artisan-platform.onrender.com`
- API Docs: `https://artisan-platform.onrender.com/api-docs`
- Products: `https://artisan-platform.onrender.com/api/products`

## 📊 Database Structure

### Products Collection
```javascript
{
  _id: ObjectId,
  id: String (unique),
  name: String,
  price: Number,
  category: String,
  image: String,
  artisanId: String,
  description: String,
  materials: [String],
  dimensions: String,
  weight: String,
  inStock: Boolean,
  stockQuantity: Number,
  rating: Number,
  totalReviews: Number,
  tags: [String],
  images: [String],
  createdAt: String
}
```

### Artisans Collection
```javascript
{
  _id: ObjectId,
  id: String (unique),
  name: String,
  specialty: String,
  description: String,
  image: String,
  location: String,
  yearsExperience: Number,
  rating: Number,
  totalReviews: Number,
  verified: Boolean,
  joinedDate: String,
  socialLinks: {
    website: String,
    instagram: String,
    facebook: String
  }
}
```

## 🛠️ Project Structure

```
group-5/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── products/
│   │   │   │   ├── route.ts (GET /POST)
│   │   │   │   └── [id]/
│   │   │   │       └── route.ts (GET /PUT /DELETE)
│   │   │   ├── artisans/
│   │   │   │   ├── route.ts
│   │   │   │   └── [id]/
│   │   │   │       └── route.ts
│   │   │   └── api-docs/
│   │   │       └── page.tsx
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   ├── contexts/
│   ├── lib/
│   │   ├── mongodb.ts (MongoDB connection)
│   │   ├── models.ts (Mongoose schemas)
│   │   ├── api-data.ts (MongoDB CRUD operations)
│   │   ├── openapi.ts (Swagger spec)
│   │   └── data.ts (TypeScript types)
│   └── types/
├── scripts/
│   ├── seed.js (Initialize database)
│   └── test-api.js (Test all endpoints)
├── .env.local (MongoDB connection string)
├── package.json
├── tsconfig.json
└── README.md
```

## ✅ Verification Checklist

- [x] MongoDB Atlas connection configured
- [x] `.env.local` created with connection string
- [x] Dependencies installed
- [x] Database seeded with sample data
- [x] Dev server running locally
- [x] API endpoints tested
- [x] Swagger UI accessible
- [x] Error handling implemented (400, 404, 500)
- [x] Build passes successfully
- [x] Ready for Render deployment

## 🐛 Troubleshooting

### "Cannot find module" errors
```bash
rm -rf node_modules .next
npm install
npm run dev
```

### MongoDB connection timeout
- Check `.env.local` MONGODB_URI is correct
- Ensure MongoDB Atlas IP whitelist includes your IP
- Visit https://cloud.mongodb.com/v2 to manage IP settings

### Port 3000 already in use
Server automatically uses next available port (e.g., 3001)

### Build fails on Render
- Check build logs: Click on deployment in Render dashboard
- Ensure all environment variables are set
- Verify Node version is compatible

## 📞 Support

For issues or questions:
1. Check Render build logs
2. Review MongoDB Atlas connection settings
3. Run `npm run build` locally to identify issues early

---

**Last Updated**: 2026-06-09
**Framework**: Next.js 15.4.4
**Database**: MongoDB Atlas
**Deployment**: Render.com