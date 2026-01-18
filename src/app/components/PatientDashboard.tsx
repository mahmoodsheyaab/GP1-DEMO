import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { useAuth } from '@/app/contexts/AuthContext';
import { AIDiagnosisPage } from './AIDiagnosisPage';
import { ImageEnhancementPage } from './ImageEnhancementPage';
import { FluidQuantificationPage } from './FluidQuantificationPage';
import { MyReportsPage } from './MyReportsPage';
import { MessagingPage } from './MessagingPage';
import { OverviewPage } from './OverviewPage';
import { Activity, Sparkles, Droplet, FileText, MessageCircle, LogOut, BookOpen } from 'lucide-react';

type Page = 'overview' | 'diagnosis' | 'enhancement' | 'fluid' | 'reports' | 'messages';

export const PatientDashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const [currentPage, setCurrentPage] = useState<Page>('overview');

  const renderPage = () => {
    switch (currentPage) {
      case 'overview':
        return <OverviewPage />;
      case 'diagnosis':
        return <AIDiagnosisPage />;
      case 'enhancement':
        return <ImageEnhancementPage />;
      case 'fluid':
        return <FluidQuantificationPage />;
      case 'reports':
        return <MyReportsPage />;
      case 'messages':
        return <MessagingPage />;
      default:
        return <OverviewPage />;
    }
  };

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
        <div className="grid md:grid-cols-4 gap-6">
          {/* Sidebar Navigation */}
          <div className="space-y-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Patient Portal</CardTitle>
              </CardHeader>
              <CardContent className="space-y-1">
                <Button
                  variant={currentPage === 'overview' ? 'default' : 'ghost'}
                  className="w-full justify-start"
                  onClick={() => setCurrentPage('overview')}
                >
                  <BookOpen className="h-4 w-4 mr-2" />
                  Overview
                </Button>
                <Button
                  variant={currentPage === 'diagnosis' ? 'default' : 'ghost'}
                  className="w-full justify-start"
                  onClick={() => setCurrentPage('diagnosis')}
                >
                  <Activity className="h-4 w-4 mr-2" />
                  AI Diagnosis
                </Button>
                <Button
                  variant={currentPage === 'enhancement' ? 'default' : 'ghost'}
                  className="w-full justify-start"
                  onClick={() => setCurrentPage('enhancement')}
                >
                  <Sparkles className="h-4 w-4 mr-2" />
                  Image Enhancement
                </Button>
                <Button
                  variant={currentPage === 'fluid' ? 'default' : 'ghost'}
                  className="w-full justify-start"
                  onClick={() => setCurrentPage('fluid')}
                >
                  <Droplet className="h-4 w-4 mr-2" />
                  Fluid Quantification
                </Button>
                <Button
                  variant={currentPage === 'reports' ? 'default' : 'ghost'}
                  className="w-full justify-start"
                  onClick={() => setCurrentPage('reports')}
                >
                  <FileText className="h-4 w-4 mr-2" />
                  My Reports
                </Button>
                <Button
                  variant={currentPage === 'messages' ? 'default' : 'ghost'}
                  className="w-full justify-start"
                  onClick={() => setCurrentPage('messages')}
                >
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Messages
                </Button>
              </CardContent>
            </Card>

            {/* Info Card */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Quick Info</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div>
                  <p className="text-gray-600">Patient ID</p>
                  <p className="font-mono text-xs">{user?.id.slice(0, 8)}</p>
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