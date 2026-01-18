import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { Button } from '@/app/components/ui/button';
import { Report } from '@/app/utils/mockData';
import { useAuth } from '@/app/contexts/AuthContext';
import { FileText, Calendar, User, Eye } from 'lucide-react';

interface PendingReportsPageProps {
  onSelectReport: (report: Report) => void;
}

export const PendingReportsPage: React.FC<PendingReportsPageProps> = ({ onSelectReport }) => {
  const { user } = useAuth();
  const [reports, setReports] = useState<Report[]>([]);

  useEffect(() => {
    loadReports();
  }, [user]);

  const loadReports = () => {
    const allReports: Report[] = JSON.parse(localStorage.getItem('reports') || '[]');
    const pendingReports = allReports.filter(
      r => r.doctorId === user?.id && (r.status === 'pending' || r.status === 'reviewed')
    );
    // Sort by date, oldest first (FIFO)
    pendingReports.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    setReports(pendingReports);
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'diagnosis':
        return 'AI Diagnosis';
      case 'enhancement':
        return 'Image Enhancement';
      case 'fluid':
        return 'Fluid Quantification';
      default:
        return type;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl mb-2">Pending Reports</h2>
        <p className="text-gray-600">Patient cases waiting for your review</p>
      </div>

      <div className="flex items-center gap-4 bg-blue-50 rounded-lg p-4">
        <FileText className="h-8 w-8 text-blue-600" />
        <div>
          <p className="font-medium">Total Pending: {reports.length}</p>
          <p className="text-sm text-gray-600">
            {reports.filter(r => r.status === 'pending').length} awaiting review
          </p>
        </div>
      </div>

      {reports.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <FileText className="h-16 w-16 mx-auto mb-4 text-gray-300" />
            <p className="text-gray-500 mb-2">No pending reports</p>
            <p className="text-sm text-gray-400">Patient reports will appear here for your review</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {reports.map((report) => (
            <Card key={report.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <CardTitle className="flex items-center gap-2">
                      {getTypeLabel(report.type)}
                      {report.status === 'pending' ? (
                        <Badge variant="destructive">Needs Review</Badge>
                      ) : (
                        <Badge className="bg-blue-500">Reviewed</Badge>
                      )}
                    </CardTitle>
                    <CardDescription className="flex items-center gap-4">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {formatDate(report.date)}
                      </span>
                      <span className="flex items-center gap-1">
                        <User className="h-3 w-3" />
                        {report.patientName}
                      </span>
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="grid grid-cols-3 gap-6 flex-1">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">AI Diagnosis</p>
                      <p className="font-medium">{report.diagnosis}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Confidence</p>
                      <p className="font-medium">{report.confidence}%</p>
                    </div>
                    {report.fluidPercentage !== undefined && (
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Fluid %</p>
                        <p className="font-medium">{report.fluidPercentage}%</p>
                      </div>
                    )}
                  </div>
                  <Button onClick={() => onSelectReport(report)}>
                    <Eye className="h-4 w-4 mr-2" />
                    Review Report
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
