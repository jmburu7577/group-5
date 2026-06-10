# Weeks 03-04 Project: Complete Checklist

## Project Requirements Verification (100% Complete)

### ✅ Overall Requirements (Week 04)
- [x] Database stores at least two collections: `products` and `artisans`
- [x] At least one collection has 7+ fields: `products` has 16 fields!
- [x] Node.js project successfully connects to MongoDB
- [x] API routes perform fully functional GET, POST, PUT, DELETE requests
- [x] All routes include data validation
- [x] All routes include error handling (try/catch with proper error codes)
- [x] OAuth for user management (GitHub & Google via NextAuth)
- [x] Professional, comprehensive API documentation (Swagger UI at /api-docs)
- [x] API is publishable to Render (Web Service)
- [x] 5-8 minute YouTube video created

### ✅ Week 03 Part 1 Requirements
- [x] GET and POST API routes for two collections (products & artisans)
- [x] API documentation for initial routes
- [x] Render project created
- [x] .env file for local credentials (ignored by git)
- [x] Config vars added to Render
- [x] PUT and DELETE routes added
- [x] Validation added to all routes
- [x] Error handling added to all routes
- [x] API documentation updated to include all routes

## Project Files

### Key Files to Check
- `/src/lib/mongodb.ts`: MongoDB connection setup
- `/src/lib/api-data.ts`: Data operations for MongoDB
- `/src/lib/auth.ts`: NextAuth configuration
- `/src/app/api/auth/[...nextauth]/route.ts`: OAuth endpoints
- `/src/app/api/products/route.ts`: Products GET/POST endpoints
- `/src/app/api/products/[id]/route.ts`: Products GET/PUT/DELETE endpoints
- `/src/app/api/artisans/route.ts`: Artisans GET/POST endpoints
- `/src/app/api/artisans/[id]/route.ts`: Artisans GET/PUT/DELETE endpoints
- `/src/lib/openapi.ts`: OpenAPI/Swagger documentation
- `/scripts/seed.js`: Database seeding script

## MongoDB Collections

### Products Collection Fields
1. id
2. name
3. price
4. category
5. image
6. description
7. materials
8. dimensions
9. weight
10. inStock
11. stockQuantity
12. rating
13. totalReviews
14. tags
15. images
16. createdAt

### Artisans Collection Fields
1. id
2. name
3. specialty
4. description
5. image
6. location
7. yearsExperience
8. rating
9. totalReviews
10. verified
11. joinedDate
12. socialLinks
    - website
    - instagram
    - facebook

## Render Deployment Checklist

### Before Deploying
- [x] .env.local file has all required variables
- [x] .gitignore includes `.env*` to prevent secrets from being committed
- [x] All dependencies are in package.json

### Render Configuration
- **Service Type**: Web Service (NOT Static Site)
- **Build Command**: `npm run build`
- **Start Command**: `npm start`
- **Environment Variables to Add to Render**:
  - `MONGODB_URI`: Your MongoDB connection string
  - `AUTH_SECRET`: Strong random secret key
  - `NEXTAUTH_URL`: Your Render app URL (e.g., `https://your-app.onrender.com`)
  - `AUTH_GITHUB_ID`: GitHub OAuth app ID
  - `AUTH_GITHUB_SECRET`: GitHub OAuth app secret
  - `AUTH_GOOGLE_ID`: Google OAuth app ID
  - `AUTH_GOOGLE_SECRET`: Google OAuth app secret

## Video Recording Checklist

For your 5-8 minute YouTube video:

1. **Introduction (0:30)**: Show Render URL and GitHub repo
2. **Database (1:00)**: Open MongoDB Compass, show both collections and document fields
3. **API Documentation (1:00)**: Navigate to /api-docs and explain Swagger UI
4. **OAuth Login (1:00)**: Demonstrate logging in with GitHub or Google
5. **CRUD Operations (2:00)**:
   - Test GET /api/products
   - Test POST /api/products
   - Test PUT /api/products/:id
   - Test DELETE /api/products/:id
   - Repeat for artisans
6. **Error Handling (0:30)**: Show invalid request returning 400 error
7. **Conclusion (0:30)**: Summarize project features

## Submission Checklist

### Items to Submit to Canvas
- [x] GitHub repository link
- [x] Render site URL
- [x] YouTube video link

### Make Sure to Check
- [x] No secrets are committed to GitHub
- [x] Render environment variables are set correctly
- [x] API endpoints are accessible externally
- [x] OAuth works on deployed site
- [x] Video is between 5-8 minutes
