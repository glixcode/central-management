export interface User {
  id: string;
  email: string;
  role: string;
  barangayId?: string;
  profileId?: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface Barangay {
  _id: string;
  name: string;
  address: string;
  contactNumber: string;
}

export interface Resident {
  _id: string;
  barangayId: string | Barangay;
  firstName: string;
  lastName: string;
  middleName?: string;
  dateOfBirth: string;
  gender: string;
  address: {
    street: string;
    houseNumber: string;
  };
  isVoter: boolean;
  civilStatus: string;
  contactNumber: string;
}

export type RequestStatus = 'PENDING' | 'APPROVED' | 'RELEASED' | 'REJECTED';
export type DocumentType = 'BARANGAY_CLEARANCE' | 'CERTIFICATE_OF_INDIGENCY' | 'MUNICIPAL_PERMIT';

export interface DocumentRequest {
  _id: string;
  barangayId: string | Barangay;
  residentId: string | Resident;
  documentType: DocumentType;
  status: RequestStatus;
  requestDate: string;
  processedBy?: string | User;
  remarks?: string;
}
