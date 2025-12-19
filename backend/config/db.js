/**
 * DATABASE CONNECTION - db.js
 * 
 * Responsibility: Establish and manage MongoDB connection using Mongoose
 * 
 * Architecture:
 * - This is part of the infrastructure/config layer
 * - Handles connection lifecycle (connect, error handling, graceful shutdown)
 * - Uses environment variables for security (MongoDB URI)
 * 
 * Why environment variables?
 * - Keeps sensitive credentials out of code
 * - Allows different configs for dev/production
 * - Follows security best practices
 */

import mongoose from 'mongoose';

/**
 * Connect to MongoDB database
 * Uses mongoose.connect() with connection options for reliability
 * 
 * @returns {Promise<void>} Resolves when connection is established
 */
export const connectDB = async () => {
  try {
    // Get MongoDB URI from environment variable
    // For MongoDB Atlas, use: mongodb+srv://username:password@cluster.mongodb.net/database
    // For local MongoDB, use: mongodb://localhost:27017/database
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/legalhelpbuddy';
    
    // Connection options for better reliability and MongoDB Atlas compatibility
    const options = {
      // Server Selection Timeout - how long to wait for server selection
      serverSelectionTimeoutMS: 5000, // 5 seconds
      // Socket Timeout - how long to wait for socket connection
      socketTimeoutMS: 45000, // 45 seconds
      // Connection timeout
      connectTimeoutMS: 10000, // 10 seconds
      // Retry writes for MongoDB Atlas
      retryWrites: true,
      // Write concern
      w: 'majority',
    };

    // Attempt connection
    const conn = await mongoose.connect(mongoURI, options);

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    console.log(`📊 Database: ${conn.connection.name}`);

    // Handle connection errors after initial connection
    mongoose.connection.on('error', (err) => {
      console.error('❌ MongoDB connection error:', err);
    });

    // Handle disconnection
    mongoose.connection.on('disconnected', () => {
      console.warn('⚠️ MongoDB disconnected');
    });

    // Graceful shutdown on process termination
    process.on('SIGINT', async () => {
      await mongoose.connection.close();
      console.log('MongoDB connection closed through app termination');
      process.exit(0);
    });

  } catch (error) {
    console.error('❌ Error connecting to MongoDB:', error.message);
    // Exit process if database connection fails (critical for app functionality)
    process.exit(1);
  }
};
