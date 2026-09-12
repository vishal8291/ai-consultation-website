// models/Testimonial.ts
// Client testimonials, moderated before publishing. Anyone can submit one via
// the public form, but it lands as "pending" — nothing appears on the live
// site until an admin approves it. This replaces the earlier hand-edited
// lib/testimonialsData.ts array with a real, self-serve intake system while
// keeping the same editorial control an agency this size actually needs.
import mongoose, { Schema, models, Document } from "mongoose";

export interface ITestimonial extends Document {
  quote: string;
  author: string;
  role: string;
  sourceUrl?: string;
  status: "pending" | "approved" | "rejected";
  createdAt: Date;
  updatedAt: Date;
}

const TestimonialSchema = new Schema(
  {
    quote: {
      type: String,
      required: [true, "Quote is required"],
      trim: true,
      maxlength: [800, "Quote cannot exceed 800 characters"],
    },
    author: {
      type: String,
      required: [true, "Your name is required"],
      trim: true,
      maxlength: [100, "Name cannot exceed 100 characters"],
    },
    role: {
      type: String,
      required: [true, "Your role / company is required"],
      trim: true,
      maxlength: [150, "Role cannot exceed 150 characters"],
    },
    sourceUrl: {
      type: String,
      trim: true,
      maxlength: [300, "URL cannot exceed 300 characters"],
    },
    status: {
      type: String,
      enum: {
        values: ["pending", "approved", "rejected"],
        message: "{VALUE} is not a valid status",
      },
      default: "pending",
    },
  },
  { timestamps: true }
);

TestimonialSchema.index({ status: 1, createdAt: -1 });

const Testimonial = models.Testimonial || mongoose.model<ITestimonial>("Testimonial", TestimonialSchema);

export default Testimonial;
