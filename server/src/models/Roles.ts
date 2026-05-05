import mongoose, { Schema, Document } from 'mongoose';

export interface IUserRole extends Document {
    roleName: string;
}

const UserRoleSchema: Schema = new Schema({
    roleName: { type: String, required: true },
});

export const UserRole = mongoose.model<IUserRole>('UserRole', UserRoleSchema);
