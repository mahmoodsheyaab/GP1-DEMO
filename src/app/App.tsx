import { useEffect } from 'react';
import { AuthProvider, useAuth } from '@/app/contexts/AuthContext';
import { AuthPage } from '@/app/components/AuthPage';
import { PatientDashboard } from '@/app/components/PatientDashboard';
import { DoctorDashboard } from '@/app/components/DoctorDashboard';
import { initializeMockData } from '@/app/utils/mockData';
import { Toaster } from '@/app/components/ui/sonner';

function AppContent() {
  const { user } = useAuth();

  useEffect(() => {
    // Initialize mock data on first load
    initializeMockData();
  }, []);

  // Show auth page if not logged in
  if (!user) {
    return <AuthPage />;
  }

  // Show appropriate dashboard based on user role
  if (user.role === 'patient') {
    return <PatientDashboard />;
  }

  if (user.role === 'doctor') {
    return <DoctorDashboard />;
  }

  return null;
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
      <Toaster />
    </AuthProvider>
  );
}
