import mongoose, { Schema } from "mongoose";

export interface IService {
    name: string;
    description: string;
    fee: number;
    isActive: boolean;
}

const ServiceSchema = new Schema<IService>(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        description: {
            type: String,
            default: ""
        },
        fee: {
            type: Number,
            required: true,
            default: 0
        },
        isActive: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model<IService>('Service', ServiceSchema)