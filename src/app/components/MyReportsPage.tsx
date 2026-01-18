import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { Button } from '@/app/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/app/components/ui/dialog';
import { Report } from '@/app/utils/mockData';
import { MedicalReportTemplate } from '@/app/components/MedicalReportTemplate';
import { useAuth } from '@/app/contexts/AuthContext';
import { FileText, Calendar, User, CheckCircle, Clock, Eye, FileImage } from 'lucide-react';

export const MyReportsPage: React.FC = () => {
  const { user } = useAuth();
  const [reports, setReports] = useState<Report[]>([]);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    loadReports();
  }, [user]);

  const loadReports = () => {
    const allReports: Report[] = JSON.parse(localStorage.getItem('reports') || '[]');
    const myReports = allReports.filter(r => r.patientId === user?.id);
    // Sort by date, newest first
    myReports.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    setReports(myReports);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-500">Completed</Badge>;
      case 'reviewed':
        return <Badge className="bg-blue-500">Reviewed</Badge>;
      case 'pending':
        return <Badge variant="secondary">Pending Review</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
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

  const openReportDialog = (report: Report) => {
    setSelectedReport(report);
    setIsDialogOpen(true);
  };

  const closeReportDialog = () => {
    setSelectedReport(null);
    setIsDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl mb-2">My Reports</h2>
        <p className="text-gray-600">View all your reports reviewed and finalized by doctors</p>
      </div>

      <div className="flex items-center gap-4 bg-blue-50 rounded-lg p-4">
        <FileText className="h-8 w-8 text-blue-600" />
        <div>
          <p className="font-medium">Total Reports: {reports.length}</p>
          <p className="text-sm text-gray-600">
            {reports.filter(r => r.status === 'completed').length} completed, 
            {' '}{reports.filter(r => r.status === 'pending').length} pending review
          </p>
        </div>
      </div>

      {reports.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <FileText className="h-16 w-16 mx-auto mb-4 text-gray-300" />
            <p className="text-gray-500 mb-2">No reports yet</p>
            <p className="text-sm text-gray-400">Your medical reports will appear here after analysis</p>
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
                      {getStatusBadge(report.status)}
                    </CardTitle>
                    <CardDescription className="flex items-center gap-4">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {formatDate(report.date)}
                      </span>
                      {report.doctorName && (
                        <span className="flex items-center gap-1">
                          <User className="h-3 w-3" />
                          {report.doctorName}
                        </span>
                      )}
                    </CardDescription>
                  </div>
                  {report.status === 'pending' ? (
                    <Clock className="h-5 w-5 text-gray-400" />
                  ) : (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  {/* Image Preview */}
                  <div className="space-y-2">
                    <p className="text-sm text-gray-600">OCT Image</p>
                    {report.imageUrl ? (
                      <div className="rounded-lg overflow-hidden border">
                        <img src={report.imageUrl} alt="OCT Scan" className="w-full h-32 object-cover" />
                      </div>
                    ) : (
                      <div className="rounded-lg border bg-gray-50 h-32 flex items-center justify-center">
                        <FileImage className="h-8 w-8 text-gray-300" />
                      </div>
                    )}
                  </div>

                  {/* Diagnosis Info */}
                  <div className="space-y-2">
                    <p className="text-sm text-gray-600">Diagnosis</p>
                    <div className="bg-gray-50 rounded-lg p-3 space-y-2">
                      <div>
                        <p className="text-sm text-gray-600">Classification</p>
                        <p className="font-medium">{report.diagnosis}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Confidence</p>
                        <p className="font-medium">{report.confidence}%</p>
                      </div>
                      {report.fluidPercentage !== undefined && (
                        <div>
                          <p className="text-sm text-gray-600">Fluid Percentage</p>
                          <p className="font-medium">{report.fluidPercentage}%</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Doctor's Notes */}
                  <div className="space-y-2">
                    <p className="text-sm text-gray-600">Doctor's Notes</p>
                    <div className="bg-gray-50 rounded-lg p-3 min-h-[8rem]">
                      {report.doctorNotes ? (
                        <p className="text-sm">{report.doctorNotes}</p>
                      ) : (
                        <p className="text-sm text-gray-400 italic">
                          {report.status === 'pending' 
                            ? 'Waiting for doctor review...' 
                            : 'No notes provided'}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
                <div className="mt-4">
                  <Button
                    className="bg-blue-500 text-white"
                    onClick={() => openReportDialog(report)}
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    View Full Report
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Medical Report</DialogTitle>
          </DialogHeader>
          {selectedReport && (
            <div className="mt-4">
              <MedicalReportTemplate report={selectedReport} />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};