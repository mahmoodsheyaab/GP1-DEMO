import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { useAuth } from '@/app/contexts/AuthContext';
import { PendingReportsPage } from './PendingReportsPage';
import { ReportAnalysisEditorPage } from './ReportAnalysisEditorPage';
import { MessagingPage } from './MessagingPage';
import { DoctorEnhancementPage } from './DoctorEnhancementPage';
import { Report } from '@/app/utils/mockData';
import { FileText, MessageCircle, LogOut, Stethoscope, AlertCircle, Sparkles } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/app/components/ui/alert';

type Page = 'pending' | 'enhancement' | 'messages';

export const DoctorDashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const [currentPage, setCurrentPage] = useState<Page>('pending');
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);

  const handleSelectReport = (report: Report) => {
    setSelectedReport(report);
  };

  const handleBackToPending = () => {
    setSelectedReport(null);
  };

  const renderPage = () => {
    // If a report is selected, show the analysis page
    if (selectedReport) {
      return <ReportAnalysisEditorPage report={selectedReport} onBack={handleBackToPending} />;
    }

    // Otherwise show the selected page
    switch (currentPage) {
      case 'pending':
        return <PendingReportsPage onSelectReport={handleSelectReport} />;
      case 'enhancement':
        return <DoctorEnhancementPage />;
      case 'messages':
        return <MessagingPage />;
      default:
        return <PendingReportsPage onSelectReport={handleSelectReport} />;
    }
  };

  // Check if doctor is verified
  const isVerified = user?.verified !== false;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl">OCT Analysis Platform</h1>
            <p className="text-sm text-gray-600">Welcome, {user?.name}</p>
          </div>
          <Button variant="outline" onClick={logout}>
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Verification Alert */}
        {!isVerified && (
          <Alert className="mb-6 bg-yellow-50 border-yellow-300">
            <AlertCircle className="h-4 w-4 text-yellow-600" />
            <AlertTitle className="text-yellow-800">Account Pending Verification</AlertTitle>
            <AlertDescription className="text-yellow-700">
              Your medical license is currently under review. You will be able to access patient reports once your account is verified by our administrators.
              This typically takes 24-48 hours.
            </AlertDescription>
          </Alert>
        )}

        <div className="grid md:grid-cols-4 gap-6">
          {/* Sidebar Navigation */}
          <div className="space-y-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Doctor Portal</CardTitle>
              </CardHeader>
              <CardContent className="space-y-1">
                <Button
                  variant={currentPage === 'pending' && !selectedReport ? 'default' : 'ghost'}
                  className="w-full justify-start"
                  onClick={() => {
                    setCurrentPage('pending');
                    setSelectedReport(null);
                  }}
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Pending Reports
                </Button>
                <Button
                  variant={currentPage === 'enhancement' && !selectedReport ? 'default' : 'ghost'}
                  className="w-full justify-start"
                  onClick={() => {
                    setCurrentPage('enhancement');
                    setSelectedReport(null);
                  }}
                >
                  <Sparkles className="h-4 w-4 mr-2" />
                  Enhancement
                </Button>
                <Button
                  variant={currentPage === 'messages' && !selectedReport ? 'default' : 'ghost'}
                  className="w-full justify-start"
                  onClick={() => {
                    setCurrentPage('messages');
                    setSelectedReport(null);
                  }}
                >
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Messages
                </Button>
              </CardContent>
            </Card>

            {/* Info Card */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Doctor Info</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                    <Stethoscope className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="font-medium">{user?.name}</p>
                    {user?.specialization && (
                      <p className="text-xs text-gray-600">{user.specialization}</p>
                    )}
                  </div>
                </div>
                <div>
                  <p className="text-gray-600">Email</p>
                  <p className="text-xs">{user?.email}</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="md:col-span-3">
            {renderPage()}
          </div>
        </div>
      </div>
    </div>
  );
};