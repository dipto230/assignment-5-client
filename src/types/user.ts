export type Appointment = {
  id: string;
  date?: string;
  status?: string;
};

export type LegalDocument = {
  id: string;
  title?: string;
  status?: string;
};

export type ConsultationNote = {
  id: string;
  note?: string;
};

export type ClientProfile = {
  occupation?: string;
  companyName?: string;
};

export type Client = {
  contactNumber?: string;
  address?: string;

  appointments?: Appointment[];
  legalDocuments?: LegalDocument[];
  consultationNotes?: ConsultationNote[];
  profile?: ClientProfile;
};

export type User = {
  id?: string;
  name?: string;
  email?: string;
  role?: "ADMIN" | "SUPER_ADMIN" | "LAWYER" | "USER";
  image?: string;

  client?: Client;
};