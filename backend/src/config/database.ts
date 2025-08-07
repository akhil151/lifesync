import { Pool } from 'pg';
import mongoose from 'mongoose';
import { createClient } from 'redis';
import { logger } from '@/utils/logger';

// PostgreSQL connection
let pgPool: Pool;

export const connectPostgreSQL = async (): Promise<Pool> => {
  try {
    pgPool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
      max: 20,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 2000,
    });

    // Test the connection
    const client = await pgPool.connect();
    await client.query('SELECT NOW()');
    client.release();

    logger.info('✅ PostgreSQL connected successfully');
    return pgPool;
  } catch (error) {
    logger.error('❌ PostgreSQL connection failed:', error);
    throw error;
  }
};

// MongoDB connection
export const connectMongoDB = async (): Promise<typeof mongoose> => {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/digital_legacy_docs';
    
    await mongoose.connect(mongoUri, {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });

    logger.info('✅ MongoDB connected successfully');
    return mongoose;
  } catch (error) {
    logger.error('❌ MongoDB connection failed:', error);
    throw error;
  }
};

// Redis connection
let redisClient: ReturnType<typeof createClient>;

export const connectRedis = async () => {
  try {
    redisClient = createClient({
      url: process.env.REDIS_URL || 'redis://localhost:6379',
      password: process.env.REDIS_PASSWORD,
    });

    redisClient.on('error', (err) => {
      logger.error('Redis Client Error:', err);
    });

    redisClient.on('connect', () => {
      logger.info('✅ Redis connected successfully');
    });

    await redisClient.connect();
    return redisClient;
  } catch (error) {
    logger.error('❌ Redis connection failed:', error);
    throw error;
  }
};

// Initialize all database connections
export const connectDatabases = async () => {
  try {
    await Promise.all([
      connectPostgreSQL(),
      connectMongoDB(),
      connectRedis()
    ]);
    
    logger.info('🎉 All databases connected successfully');
  } catch (error) {
    logger.error('💥 Database connection failed:', error);
    throw error;
  }
};

// Export database instances
export const getPostgreSQLPool = (): Pool => {
  if (!pgPool) {
    throw new Error('PostgreSQL pool not initialized. Call connectPostgreSQL first.');
  }
  return pgPool;
};

export const getRedisClient = () => {
  if (!redisClient) {
    throw new Error('Redis client not initialized. Call connectRedis first.');
  }
  return redisClient;
};

// Graceful shutdown
export const closeDatabaseConnections = async () => {
  try {
    if (pgPool) {
      await pgPool.end();
      logger.info('PostgreSQL connection closed');
    }
    
    if (mongoose.connection.readyState === 1) {
      await mongoose.connection.close();
      logger.info('MongoDB connection closed');
    }
    
    if (redisClient) {
      await redisClient.quit();
      logger.info('Redis connection closed');
    }
  } catch (error) {
    logger.error('Error closing database connections:', error);
  }
};
