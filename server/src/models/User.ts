import mongoose, { Schema, Document, Types } from 'mongoose';
import { IUserRole } from './Roles.js';

export interface IUser extends Document {
  email: string;
  passwordHash: string;
  role: Types.ObjectId | IUserRole;
  barangayId?: Types.ObjectId; // Null for SUPER_ADMIN
  profileId?: Types.ObjectId; // Linked to Resident details if role is RESIDENT
}

const UserSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  role: { type: Schema.Types.ObjectId, ref: 'UserRole', required: true },
  barangayId: { type: Schema.Types.ObjectId, ref: 'Barangay', required: false },
  profileId: { type: Schema.Types.ObjectId, ref: 'Resident', required: false },
});

export const User = mongoose.model<IUser>('User', UserSchema);
