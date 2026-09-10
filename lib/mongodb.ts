// lib/mongodb.ts - Enterprise Resilient Connection Pool Manager
import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI || "";

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable in .env.local");
}

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

let cached: MongooseCache = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

export async function connectDB(): Promise<typeof mongoose> {
  // If connection is already alive, return immediately
  if (cached.conn && mongoose.connection.readyState === 1) {
    return cached.conn;
  }

  // If a connection attempt is currently in progress, wait for it
  if (cached.promise) {
    cached.conn = await cached.promise;
    return cached.conn;
  }

  // Production-grade connection pool and timeout configuration
  const opts: mongoose.ConnectOptions = {
    // IMPORTANT: this deliberately overrides whatever database name appears in
    // the path of MONGODB_URI. All eleven projects share one Atlas cluster, and
    // the URI in the Vercel environment still ends in "/paperbag" (an unrelated
    // project), so without this pin the app would read and write the wrong
    // database. Any standalone script that connects with the raw URI must pass
    // dbName: "consultationDB" too, or it will silently target paperbag.
    dbName: "consultationDB",
    bufferCommands: false,
    maxPoolSize: 10,              // Keep up to 10 socket connections in pool
    minPoolSize: 2,               // Maintain at least 2 active socket connections
    serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of hanging indefinitely
    socketTimeoutMS: 45000,       // Close idle sockets after 45s
    connectTimeoutMS: 10000,      // Connection timeout 10s
    heartbeatFrequencyMS: 10000,  // Periodic server health ping
  };

  cached.promise = mongoose
    .connect(MONGODB_URI, opts)
    .then((mongooseInstance) => {
      console.log("✅ MongoDB Connection Pool established successfully");
      return mongooseInstance;
    })
    .catch((err) => {
      console.error("❌ MongoDB connection pool error:", err.message);
      cached.promise = null;
      throw err;
    });

  // Attach event listeners once
  if (!mongoose.connection.listeners("error").length) {
    mongoose.connection.on("error", (err) => {
      console.error("⚠️ MongoDB connection error event:", err);
      cached.conn = null;
    });

    mongoose.connection.on("disconnected", () => {
      console.warn("⚠️ MongoDB disconnected. Attempting automatic reconnection on next query.");
      cached.conn = null;
      cached.promise = null;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}
