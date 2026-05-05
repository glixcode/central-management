import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IResident extends Document {
  barangayId: Types.ObjectId;
  firstName: string;
  lastName: string;
  middleName?: string;
  dateOfBirth: Date;
  gender: string;
  address: {
    street: string;
    houseNumber: string;
  };
  isVoter: boolean;
  civilStatus: string;
  contactNumber: string;
}

const ResidentSchema: Schema = new Schema({
  barangayId: { type: Schema.Types.ObjectId, ref: 'Barangay', required: true, index: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  middleName: { type: String },
  dateOfBirth: { type: Date, required: true },
  gender: { type: String, required: true },
  address: {
    street: { type: String, required: true },
    houseNumber: { type: String, required: true },
  },
  isVoter: { type: Boolean, default: false },
  civilStatus: { type: String, required: true },
  contactNumber: { type: String, required: true },
});

export const Resident = mongoose.model<IResident>('Resident', ResidentSchema);
