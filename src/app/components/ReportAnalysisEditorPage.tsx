import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Textarea } from '@/app/components/ui/textarea';
import { Label } from '@/app/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/tabs';
import { Report } from '@/app/utils/mockData';
import { MedicalReportTemplate } from '@/app/components/MedicalReportTemplate';
import { ArrowLeft, CheckCircle, Save, FileText } from 'lucide-react';
import { toast } from 'sonner';

interface ReportAnalysisEditorPageProps {
  report: Report;
  onBack: () => void;
}

export const ReportAnalysisEditorPage: React.FC<ReportAnalysisEditorPageProps> = ({ report, onBack }) => {
  const [editedReport, setEditedReport] = useState<Report>(report);
  const [isSaving, setIsSaving] = useState(false);

  const handleDiagnosisChange = (diagnosis: 'Drusen' | 'DME' | 'CNV' | 'Normal') => {
    setEditedReport({ ...editedReport, diagnosis });
  };

  const handleNotesChange = (notes: string) => {
    setEditedReport({ ...editedReport, doctorNotes: notes });
  };

  const handleSaveReview = () => {
    if (!editedReport.doctorNotes?.trim()) {
      toast.error('Please add medical notes before saving');
      return;
    }

    setIsSaving(true);

    // Update report in localStorage
    const allReports: Report[] = JSON.parse(localStorage.getItem('reports') || '[]');
    const reportIndex = allReports.findIndex(r => r.id === report.id);
    
    if (reportIndex !== -1) {
      allReports[reportIndex] = {
        ...editedReport,
        status: 'reviewed'
      };
      localStorage.setItem('reports', JSON.stringify(allReports));
      toast.success('Report saved successfully');
      setTimeout(() => {
        setIsSaving(false);
        onBack();
      }, 500);
    }
  };

  const handleFinalizeReport = () => {
    if (!editedReport.doctorNotes?.trim()) {
      toast.error('Please add medical notes before finalizing');
      return;
    }

    setIsSaving(true);

    // Update report status to completed
    const allReports: Report[] = JSON.parse(localStorage.getItem('reports') || '[]');
    const reportIndex = allReports.findIndex(r => r.id === report.id);
    
    if (reportIndex !== -1) {
      allReports[reportIndex] = {
        ...editedReport,
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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Pending Reports
        </Button>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleSaveReview} disabled={isSaving}>
            <Save className="h-4 w-4 mr-2" />
            Save Review
          </Button>
          <Button onClick={handleFinalizeReport} disabled={isSaving}>
            <CheckCircle className="h-4 w-4 mr-2" />
            Finalize & Send to Patient
          </Button>
        </div>
      </div>

      <Tabs defaultValue="editor" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="editor">Edit Report</TabsTrigger>
          <TabsTrigger value="preview">Preview Report</TabsTrigger>
        </TabsList>

        <TabsContent value="editor" className="space-y-6">
          {/* Editor Interface */}
          <Card>
            <CardHeader>
              <CardTitle>Report Editor</CardTitle>
              <CardDescription>Edit diagnosis and add clinical notes</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Patient Info */}
              <div className="bg-blue-50 rounded-lg p-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Patient:</p>
                    <p className="font-medium">{report.patientName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Date:</p>
                    <p className="font-medium">{new Date(report.date).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>

              {/* OCT Image */}
              <div>
                <Label>OCT Scan Image</Label>
                <div className="mt-2 rounded-lg overflow-hidden border">
                  <img src={editedReport.imageUrl} alt="OCT Scan" className="w-full h-80 object-cover" />
                </div>
              </div>

              {/* AI Analysis */}
              <div>
                <Label>AI Analysis Results (Reference)</Label>
                <div className="mt-2 grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600">AI Classification:</p>
                    <p className="text-lg">{report.diagnosis}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600">Confidence:</p>
                    <p className="text-lg">{report.confidence}%</p>
                  </div>
                </div>
                {report.fluidPercentage !== undefined && (
                  <div className="mt-2 bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600">CME Fluid Percentage:</p>
                    <p className="text-lg">{report.fluidPercentage}%</p>
                  </div>
                )}
              </div>

              {/* Editable Diagnosis */}
              <div>
                <Label>Clinical Diagnosis (Editable)</Label>
                <div className="mt-2 grid grid-cols-2 gap-3">
                  {(['Drusen', 'DME', 'CNV', 'Normal'] as const).map((diagnosis) => (
                    <Button
                      key={diagnosis}
                      variant={editedReport.diagnosis === diagnosis ? 'default' : 'outline'}
                      onClick={() => handleDiagnosisChange(diagnosis)}
                      className="w-full"
                    >
                      {diagnosis}
                    </Button>
                  ))}
                </div>
                {editedReport.diagnosis !== report.diagnosis && (
                  <div className="mt-2 bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                    <p className="text-sm text-yellow-800">
                      ⚠️ Diagnosis modified from AI suggestion ({report.diagnosis} → {editedReport.diagnosis})
                    </p>
                  </div>
                )}
              </div>

              {/* Medical Notes */}
              <div>
                <Label htmlFor="medical-notes">Medical Notes & Recommendations *</Label>
                <Textarea
                  id="medical-notes"
                  placeholder="Enter your clinical observations, findings, recommendations, and treatment plan...

Example:
- Clinical Findings: [Describe what you observe in the OCT scan]
- Pathology Assessment: [Your professional assessment]
- Recommendations: [Treatment plan and follow-up]
- Additional Notes: [Any other relevant information]"
                  value={editedReport.doctorNotes || ''}
                  onChange={(e) => handleNotesChange(e.target.value)}
                  rows={15}
                  className="resize-none font-mono text-sm"
                />
                <p className="text-xs text-gray-500 mt-2">
                  {editedReport.doctorNotes?.length || 0} characters
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="preview">
          {/* Report Preview */}
          <div className="bg-white p-6 rounded-lg border-2 border-gray-300">
            <div className="mb-4 flex items-center gap-2 text-sm text-gray-600">
              <FileText className="h-4 w-4" />
              <p>This is how the report will appear to the patient</p>
            </div>
            <MedicalReportTemplate report={editedReport} isEditable={false} />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
