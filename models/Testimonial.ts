// models/Testimonial.ts
// Client testimonials and quick "rate us" feedback. Anyone can submit one via
// the public /review page or the compact <Feedback /> widget, and it
// publishes immediately (status defaults to "approved") — no moderation
// step, by deliberate choice. Reject/Delete in /admin/testimonials remain as
// a fast takedown path if something bad goes up.
import mongoose, { Schema, models, Document } from "mongoose";

export interface ITestimonial extends Document {
  quote: string;
  author: string;
  role: string;
  sourceUrl?: string;
  rating?: number; // 1-5, optional — the <Feedback /> widget always sets it, /review does not ask for it
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
    rating: {
      type: Number,
      min: 1,
      max: 5,
    },
    status: {
      type: String,
      enum: {
        values: ["pending", "approved", "rejected"],
        message: "{VALUE} is not a valid status",
      },
      default: "approved",
    },
  },
  { timestamps: true }
);

TestimonialSchema.index({ status: 1, createdAt: -1 });

const Testimonial = models.Testimonial || mongoose.model<ITestimonial>("Testimonial", TestimonialSchema);

export default Testimonial;
