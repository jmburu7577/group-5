import mongoose, { Connection } from 'mongoose';

let mongoConnection: Connection | null = null;

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    throw new Error(
        'Please define the MONGODB_URI environment variable inside .env.local'
    );
}

export async function connectToDatabase(): Promise<Connection> {
    if (mongoConnection) {
        return mongoConnection;
    }

    try {
        const mongooseConnection = await mongoose.connect(MONGODB_URI, {
            bufferCommands: false,
        });

        mongoConnection = mongooseConnection.connection;
        console.log('MongoDB connected successfully');
        return mongoConnection;
    } catch (error) {
        console.error('MongoDB connection error:', error);
        throw error;
    }
}

export async function disconnectFromDatabase(): Promise<void> {
    if (mongoConnection) {
        await mongoose.disconnect();
        mongoConnection = null;
    }
}

export function getMongoConnection(): Connection | null {
    return mongoConnection;
}
