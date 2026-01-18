import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Textarea } from '@/app/components/ui/textarea';
import { Label } from '@/app/components/ui/label';
import { Badge } from '@/app/components/ui/badge';
import { Report } from '@/app/utils/mockData';
import { ArrowLeft, CheckCircle, FileText, Calendar, User, Droplets } from 'lucide-react';
import { toast } from 'sonner';

interface ReportAnalysisPageProps {
  report: Report;
  onBack: () => void;
}

export const ReportAnalysisPage: React.FC<ReportAnalysisPageProps> = ({ report, onBack }) => {
  const [doctorNotes, setDoctorNotes] = useState(report.doctorNotes || '');
  const [confirmedDiagnosis, setConfirmedDiagnosis] = useState(report.diagnosis);
  const [isSaving, setIsSaving] = useState(false);

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

  const handleSaveReview = () => {
    setIsSaving(true);

    // Update report in localStorage
    const allReports: Report[] = JSON.parse(localStorage.getItem('reports') || '[]');
    const reportIndex = allReports.findIndex(r => r.id === report.id);
    
    if (reportIndex !== -1) {
      allReports[reportIndex] = {
        ...allReports[reportIndex],
        doctorNotes,
        diagnosis: confirmedDiagnosis,
        status: 'reviewed'
      };
      localStorage.setItem('reports', JSON.stringify(allReports));
      toast.success('Report reviewed successfully');
      setTimeout(() => {
        setIsSaving(false);
        onBack();
      }, 500);
    }
  };

  const handleFinalizeReport = () => {
    if (!doctorNotes.trim()) {
      toast.error('Please add medical notes before finalizing');
      return;
    }

    setIsSaving(true);

    // Update report status to completed
    const allReports: Report[] = JSON.parse(localStorage.getItem('reports') || '[]');
    const reportIndex = allReports.findIndex(r => r.id === report.id);
    
    if (reportIndex !== -1) {
      allReports[reportIndex] = {
        ...allReports[reportIndex],
        doctorNotes,
        diagnosis: confirmedDiagnosis,
        status: 'completed'
      };
      localStorage.setItem('reports', JSON.stringify(allReports));
      toast.success('Report finalized and sent to patient');
      setTimeout(() => {
        setIsSaving(false);
        onBack();
      }, 500);
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

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Pending Reports
        </Button>
      </div>

      <div>
        <h2 className="text-2xl mb-2">Report Analysis</h2>
        <p className="text-gray-600">Review patient image and AI results, add notes and confirm diagnosis</p>
      </div>

      {/* Patient & Report Info */}
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                {getTypeLabel(report.type)}
                <Badge variant="secondary">{report.status}</Badge>
              </CardTitle>
              <CardDescription className="flex items-center gap-4 mt-2">
                <span className="flex items-center gap-1">
                  <User className="h-3 w-3" />
                  Patient: {report.patientName}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {formatDate(report.date)}
                </span>
              </CardDescription>
            </div>
            <FileText className="h-6 w-6 text-gray-400" />
          </div>
        </CardHeader>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Left Column - Image & AI Results */}
        <div className="space-y-6">
          {/* OCT Image */}
          <Card>
            <CardHeader>
              <CardTitle>OCT Image</CardTitle>
            </CardHeader>
            <CardContent>
              {report.imageUrl ? (
                <div className="rounded-lg overflow-hidden border">
                  <img src={report.imageUrl} alt="OCT Scan" className="w-full h-80 object-cover" />
                </div>
              ) : (
                <div className="rounded-lg border bg-gray-50 h-80 flex items-center justify-center">
                  <FileText className="h-16 w-16 text-gray-300" />
                </div>
              )}
            </CardContent>
          </Card>

          {/* AI Analysis Results */}
          <Card>
            <CardHeader>
              <CardTitle>AI Analysis Results</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-blue-50 rounded-lg p-4">
                <p className="text-sm text-gray-600 mb-1">AI Classification</p>
                <p className="text-2xl">{report.diagnosis}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600 mb-1">Confidence Score</p>
                  <p className="text-xl">{report.confidence}%</p>
                </div>
                {report.fluidPercentage !== undefined && (
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-600 mb-1 flex items-center gap-1">
                      <Droplets className="h-3 w-3" />
                      Fluid Percentage
                    </p>
                    <p className="text-xl">{report.fluidPercentage}%</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Doctor's Input */}
        <div className="space-y-6">
          {/* Confirm Diagnosis */}
          <Card>
            <CardHeader>
              <CardTitle>Confirm Diagnosis</CardTitle>
              <CardDescription>Review and confirm or modify the AI diagnosis</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Diagnosis Classification</Label>
                <div className="grid grid-cols-2 gap-2">
                  {['Drusen', 'DME', 'CNV', 'Normal'].map((diagnosis) => (
                    <Button
                      key={diagnosis}
                      variant={confirmedDiagnosis === diagnosis ? 'default' : 'outline'}
                      onClick={() => setConfirmedDiagnosis(diagnosis as any)}
                      className="w-full"
                    >
                      {diagnosis}
                    </Button>
                  ))}
                </div>
              </div>
              
              {confirmedDiagnosis !== report.diagnosis && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                  <p className="text-sm text-yellow-800">
                    ⚠️ Diagnosis modified from AI suggestion
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Medical Notes */}
          <Card>
            <CardHeader>
              <CardTitle>Medical Notes</CardTitle>
              <CardDescription>Add your clinical observations and recommendations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="doctor-notes">Clinical Notes *</Label>
                <Textarea
                  id="doctor-notes"
                  placeholder="Enter your clinical observations, recommendations, and treatment plan..."
                  value={doctorNotes}
                  onChange={(e) => setDoctorNotes(e.target.value)}
                  rows={10}
                  className="resize-none"
                />
                <p className="text-xs text-gray-500">
                  {doctorNotes.length} characters
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button 
              variant="outline" 
              className="flex-1"
              onClick={handleSaveReview}
              disabled={isSaving}
            >
              Save Review
            </Button>
            <Button 
              className="flex-1"
              onClick={handleFinalizeReport}
              disabled={isSaving}
            >
              <CheckCircle className="h-4 w-4 mr-2" />
              Finalize & Send to Patient
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
