import mongoose from "mongoose";

export interface IPrakritiKnowledge {
  question: string;
  answer: string;
  category: string;
  keywords: string[];
  createdAt?: Date;
}

const PrakritiKnowledgeSchema = new mongoose.Schema<IPrakritiKnowledge>({
  question: { type: String, required: true, index: true },
  answer: { type: String, required: true },
  category: { type: String, required: true, index: true },
  keywords: [{ type: String, index: true }],
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.PrakritiKnowledge ||
  mongoose.model<IPrakritiKnowledge>("PrakritiKnowledge", PrakritiKnowledgeSchema);
