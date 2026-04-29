export type OnboardingStep = 
  | 'personal-data'
  | 'documents'
  | 'contract'
  | 'payment-method'
  | 'verification';

export type ContractorStatus = 
  | 'invited'
  | 'in-progress'
  | 'pending-review'
  | 'corrections-needed'
  | 'pending-verification'
  | 'approved'
  | 'rejected';

export interface PersonalData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country: string;
  address: string;
  dateOfBirth: string;
  taxId: string;
}

export interface Document {
  id: string;
  type: 'id-front' | 'id-back' | 'proof-of-address' | 'tax-document';
  name: string;
  url: string;
  uploadedAt: Date;
  status: 'pending' | 'approved' | 'rejected';
  rejectionReason?: string;
}

export interface PaymentMethod {
  type: 'bank-transfer' | 'paypal' | 'wise';
  bankName?: string;
  accountNumber?: string;
  routingNumber?: string;
  swiftCode?: string;
  email?: string;
  currency: string;
}

export interface Contractor {
  id: string;
  personalData: PersonalData;
  documents: Document[];
  contractSigned: boolean;
  contractSignedAt?: Date;
  paymentMethod?: PaymentMethod;
  currentStep: OnboardingStep;
  status: ContractorStatus;
  invitedAt: Date;
  lastUpdatedAt: Date;
  completedSteps: OnboardingStep[];
  operatorNotes?: string;
  assignedOperator?: string;
}

export interface Notification {
  id: string;
  contractorId: string;
  type: 'status-change' | 'correction-request' | 'approval' | 'rejection';
  title: string;
  message: string;
  createdAt: Date;
  read: boolean;
}

export interface Operator {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'reviewer';
}
