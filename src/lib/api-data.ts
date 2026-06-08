import fs from 'fs/promises';
import path from 'path';
import { Artisan, Product } from '@/lib/data';

const DATA_DIR = path.join(process.cwd(), 'data');
const PRODUCTS_FILE = path.join(DATA_DIR, 'products.json');
const ARTISANS_FILE = path.join(DATA_DIR, 'artisans.json');

async function ensureDataDirectory() {
    try {
        await fs.mkdir(DATA_DIR, { recursive: true });
    } catch (error) {
        // ignore directory already exists errors
    }
}

async function readJsonFile<T>(filePath: string, defaultData: T): Promise<T> {
    await ensureDataDirectory();

    try {
        const rawContent = await fs.readFile(filePath, 'utf8');
        return JSON.parse(rawContent) as T;
    } catch (error: any) {
        if (error?.code === 'ENOENT') {
            await fs.writeFile(filePath, JSON.stringify(defaultData, null, 2), 'utf8');
            return defaultData;
        }
        throw error;
    }
}

async function writeJsonFile<T>(filePath: string, data: T): Promise<void> {
    await ensureDataDirectory();
    await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8');
}

export async function getProducts(): Promise<Product[]> {
    return readJsonFile(PRODUCTS_FILE, [] as Product[]);
}

export async function getProductById(id: string): Promise<Product | undefined> {
    const products = await getProducts();
    return products.find((product) => product.id === id);
}

export async function createProduct(newProduct: Omit<Product, 'id' | 'createdAt'>): Promise<Product> {
    const products = await getProducts();
    const product: Product = {
        id: `prod-${Date.now()}`,
        createdAt: new Date().toISOString(),
        ...newProduct,
    };
    products.push(product);
    await writeJsonFile(PRODUCTS_FILE, products);
    return product;
}

export async function updateProduct(id: string, updates: Partial<Omit<Product, 'id' | 'createdAt'>>): Promise<Product | undefined> {
    const products = await getProducts();
    const index = products.findIndex((product) => product.id === id);

    if (index === -1) {
        return undefined;
    }

    const updatedProduct = {
        ...products[index],
        ...updates,
    };

    products[index] = updatedProduct;
    await writeJsonFile(PRODUCTS_FILE, products);
    return updatedProduct;
}

export async function deleteProduct(id: string): Promise<boolean> {
    const products = await getProducts();
    const filtered = products.filter((product) => product.id !== id);

    if (filtered.length === products.length) {
        return false;
    }

    await writeJsonFile(PRODUCTS_FILE, filtered);
    return true;
}

export async function getArtisans(): Promise<Artisan[]> {
    return readJsonFile(ARTISANS_FILE, [] as Artisan[]);
}

export async function getArtisanById(id: string): Promise<Artisan | undefined> {
    const artisans = await getArtisans();
    return artisans.find((artisan) => artisan.id === id);
}

export async function createArtisan(newArtisan: Omit<Artisan, 'id'>): Promise<Artisan> {
    const artisans = await getArtisans();
    const artisan: Artisan = {
        id: `artisan-${Date.now()}`,
        ...newArtisan,
    };
    artisans.push(artisan);
    await writeJsonFile(ARTISANS_FILE, artisans);
    return artisan;
}

export async function updateArtisan(id: string, updates: Partial<Omit<Artisan, 'id'>>): Promise<Artisan | undefined> {
    const artisans = await getArtisans();
    const index = artisans.findIndex((artisan) => artisan.id === id);

    if (index === -1) {
        return undefined;
    }

    const updatedArtisan = {
        ...artisans[index],
        ...updates,
    };

    artisans[index] = updatedArtisan;
    await writeJsonFile(ARTISANS_FILE, artisans);
    return updatedArtisan;
}

export async function deleteArtisan(id: string): Promise<boolean> {
    const artisans = await getArtisans();
    const filtered = artisans.filter((artisan) => artisan.id !== id);

    if (filtered.length === artisans.length) {
        return false;
    }

    await writeJsonFile(ARTISANS_FILE, filtered);
    return true;
}
