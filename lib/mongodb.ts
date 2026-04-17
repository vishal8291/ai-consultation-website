// lib/mongodb.ts (FIXED - TypeScript Compatible)
import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI || "";

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable");
}

let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

export async function connectDB(): Promise<typeof mongoose> {
  // If already connected, return connection
  if (cached.conn) {
    return cached.conn;
  }

  // If pending connection promise, wait for it
  if (cached.promise) {
    cached.conn = await cached.promise;
    return cached.conn;
  }

  // If mongoose is already connected
  if (mongoose.connection.readyState >= 1) {
    cached.conn = mongoose.connections[0];
    return cached.conn;
  }

  // Create new connection promise
  cached.promise = mongoose.connect(MONGODB_URI, {
    dbName: "consultationDB",
    // ✅ REMOVED: bufferMaxEntries (not valid in ConnectOptions)
    // ✅ FIXED: bufferCommands works fine
    bufferCommands: false,
  }).then((mongooseInstance) => {
    console.log("✅ MongoDB connected successfully");
    return mongooseInstance;
  }).catch((err) => {
    console.error("❌ MongoDB connection error:", err);
    throw err;
  });

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}
