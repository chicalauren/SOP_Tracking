import mongoose, { Document } from "mongoose";

export interface ISOP extends Document {
  title: string;
  content: string;
  priority: "low" | "medium" | "high";
  status: "draft" | "published" | "archived" | "completed";
  createdAt: Date;
  updatedAt: Date;
  createdBy?: string;
  updatedBy?: string;
}

const sopSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  priority: {
    type: String,
    enum: ["low", "medium", "high"],
    default: "medium",
  },
  status: {
    type: String,
    enum: ["draft", "published", "archived", "completed"],
    default: "draft",
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  createdBy: { type: String },
  updatedBy: { type: String },
});

sopSchema.pre("save", function (next) {
  this.updatedAt = new Date();
  next();
});

export const SOP = mongoose.model<ISOP>("SOP", sopSchema);
