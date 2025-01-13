export interface User {
  id: string;
  name: string;
  username: string;
  password: string;
}

export interface Doctor extends User {
  position: string;
  department: string;
}

export interface Patient extends User {
  assignedDoctor: string;
  medicalHistory: {
    conditions: string[];
    medications: string[];
  };
}

export interface AuthState {
  user: (Doctor | Patient | null);
  userType: 'doctor' | 'patient' | null;
  isAuthenticated: boolean;
}