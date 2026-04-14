// models/Consultation.ts (UPDATED - PRODUCTION READY)
import mongoose, { Schema, models, Document } from "mongoose";

export interface IConsultation extends Document {
  name: string;
  business: string;
  contact: string;
  message: string;
  status: "new" | "contacted" | "closed";
  createdAt: Date;
  updatedAt: Date;
}

const ConsultationSchema = new Schema(
  {
    name: { 
      type: String, 
      required: [true, "Name is required"],
      trim: true,
      maxlength: [100, "Name cannot exceed 100 characters"]
    },
    business: { 
      type: String, 
      required: [true, "Business name is required"],
      trim: true,
      maxlength: [200, "Business name cannot exceed 200 characters"]
    },
    contact: { 
      type: String, 
      required: [true, "Contact info is required"],
      trim: true,
      maxlength: [100, "Contact cannot exceed 100 characters"]
    },
    message: { 
      type: String, 
      required: [true, "Message is required"],
      trim: true,
      maxlength: [5000, "Message cannot exceed 5000 characters"]
    },
    status: {
      type: String,
      enum: {
        values: ["new", "contacted", "closed"],
        message: "{VALUE} is not a valid status"
      },
      default: "new"
    }
  },
  { 
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Index for faster queries
ConsultationSchema.index({ status: 1, createdAt: -1 });
ConsultationSchema.index({ name: "text", business: "text", contact: "text" });

const Consultation = models.Consultation || mongoose.model<IConsultation>("Consultation", ConsultationSchema);

export default Consultation;
