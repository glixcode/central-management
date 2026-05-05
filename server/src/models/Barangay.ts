import mongoose, { Schema, Document } from 'mongoose';

export interface IBarangay extends Document {
  name: string;
  address: string;
  contactNumber: string;
}

const BarangaySchema: Schema = new Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  contactNumber: { type: String, required: true },
});

export const Barangay = mongoose.model<IBarangay>('Barangay', BarangaySchema);
