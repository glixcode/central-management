import mongoose, { Schema, Document, Types } from 'mongoose';

export type RequestStatus = 'PENDING' | 'APPROVED' | 'RELEASED' | 'REJECTED';
export type DocumentType = 'BARANGAY_CLEARANCE' | 'CERTIFICATE_OF_INDIGENCY' | 'MUNICIPAL_PERMIT';

export interface IRequest extends Document {
  barangayId: Types.ObjectId;
  residentId: Types.ObjectId;
  documentType: DocumentType;
  status: RequestStatus;
  requestDate: Date;
  processedBy?: Types.ObjectId;
  remarks?: string;
}

const RequestSchema: Schema = new Schema({
  barangayId: { type: Schema.Types.ObjectId, ref: 'Barangay', required: true, index: true },
  residentId: { type: Schema.Types.ObjectId, ref: 'Resident', required: true },
  documentType: { 
    type: String, 
    enum: ['BARANGAY_CLEARANCE', 'CERTIFICATE_OF_INDIGENCY', 'MUNICIPAL_PERMIT'], 
    required: true 
  },
  status: { 
    type: String, 
    enum: ['PENDING', 'APPROVED', 'RELEASED', 'REJECTED'], 
    default: 'PENDING' 
  },
  requestDate: { type: Date, default: Date.now },
  processedBy: { type: Schema.Types.ObjectId, ref: 'User' },
  remarks: { type: String }
});

export const Request = mongoose.model<IRequest>('Request', RequestSchema);
