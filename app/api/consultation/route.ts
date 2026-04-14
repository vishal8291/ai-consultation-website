// app/api/consultation/route.ts (UPDATED - PRODUCTION READY)
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Consultation from "@/models/Consultation";

export async function POST(req: Request) {
  try {
    const { name, business, contact, message } = await req.json();

    // Client-side validation
    if (!name || !business || !contact || !message) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    if (name.length > 100 || business.length > 200 || contact.length > 100 || message.length > 5000) {
      return NextResponse.json(
        { error: "Field length exceeded" },
        { status: 400 }
      );
    }

    // Connect to DB
    await connectDB();

    // Create consultation with validation
    const consultation = await Consultation.create({
      name: name.trim(),
      business: business.trim(),
      contact: contact.trim(),
      message: message.trim(),
    });

    console.log(`✅ New consultation created: ${consultation._id} - ${name}`);

    // Return clean response for frontend
    return NextResponse.json(
      { 
        success: true, 
        id: consultation._id,
        message: "Consultation request submitted successfully! We'll contact you within 24 hours."
      }, 
      { status: 201 }
    );

  } catch (err: any) {
    console.error("❌ Consultation API ERROR:", err);
    
    // Handle Mongoose validation errors
    if (err.name === 'ValidationError') {
      return NextResponse.json(
        { error: "Invalid data provided. Please check your input." },
        { status: 400 }
      );
    }

    // Handle duplicate key errors
    if (err.code === 11000) {
      return NextResponse.json(
        { error: "Consultation already exists" },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: "Server error. Please try again later." },
      { status: 500 }
    );
  }
}
