import mongoose, { Schema, models, Document } from "mongoose";

export interface IPayment extends Document {
  tierName: string;
  amount: number;
  currency: string;
  razorpayOrderId: string;
  razorpayPaymentId: string;
  createdAt: Date;
}

const PaymentSchema = new Schema(
  {
    tierName: { type: String, required: true, trim: true, maxlength: 100 },
    amount: { type: Number, required: true },
    currency: { type: String, required: true, enum: ["INR", "USD"] },
    razorpayOrderId: { type: String, required: true, unique: true },
    razorpayPaymentId: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

const Payment = models.Payment || mongoose.model<IPayment>("Payment", PaymentSchema);

export default Payment;
