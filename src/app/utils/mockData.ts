export interface Doctor {
  id: string;
  name: string;
  specialization: string;
  email: string;
}

export interface Report {
  id: string;
  patientId: string;
  patientName: string;
  doctorId?: string;
  doctorName?: string;
  imageUrl: string;
  diagnosis: 'Drusen' | 'DME' | 'CNV' | 'Normal';
  confidence: number;
  date: string;
  status: 'pending' | 'reviewed' | 'completed';
  doctorNotes?: string;
  type: 'diagnosis' | 'enhancement' | 'fluid';
  fluidPercentage?: number;
}

export interface Message {
  id: string;
  senderId: string;
  senderName: string;
  receiverId: string;
  content: string;
  timestamp: string;
  read: boolean;
}

// Initialize mock data
export const initializeMockData = () => {
  // Initialize doctors if not exists
  if (!localStorage.getItem('doctors')) {
    const mockDoctors: Doctor[] = [
      { id: 'doc1', name: 'Dr. Mahmood', specialization: 'Retinal Specialist', email: 'mahmooddoctor@gmail.com' },
      { id: 'doc2', name: 'Dr. Mones', specialization: 'Ophthalmologist', email: 'mones@hospital.com' },
      { id: 'doc3', name: 'Dr. Amer', specialization: 'Retinal Surgeon', email: 'amer@hospital.com' },
      { id: 'doc4', name: 'Dr. Momen', specialization: 'Vitreoretinal Specialist', email: 'momen@hospital.com' },
    ];
    localStorage.setItem('doctors', JSON.stringify(mockDoctors));
  }

  // Initialize users with sample doctor if not exists
  if (!localStorage.getItem('users')) {
    const mockUsers = [
      {
        id: 'doc1',
        email: 'mahmooddoctor@gmail.com',
        password: 'doctor123',
        name: 'Dr. Mahmood',
        role: 'doctor',
        specialization: 'Retinal Specialist',
        verified: true,
        licenseDocument: 'data:image/png;base64,verified'
      },
      {
        id: 'patient1',
        email: 'mahmoodpatient@gmail.com',
        password: 'patient123',
        name: 'Sheyab',
        role: 'patient'
      },
      {
        id: 'patient2',
        email: 'omari@gmail.com',
        password: 'patient123',
        name: 'Omari',
        role: 'patient'
      },
      {
        id: 'patient3',
        email: 'bdour@gmail.com',
        password: 'patient123',
        name: 'Bdour',
        role: 'patient'
      },
      {
        id: 'patient4',
        email: 'awwadeh@gmail.com',
        password: 'patient123',
        name: 'Awwadeh',
        role: 'patient'
      }
    ];
    localStorage.setItem('users', JSON.stringify(mockUsers));
  }

  // Initialize reports if not exists
  if (!localStorage.getItem('reports')) {
    localStorage.setItem('reports', JSON.stringify([]));
  }

  // Initialize messages if not exists
  if (!localStorage.getItem('messages')) {
    localStorage.setItem('messages', JSON.stringify([]));
  }
};