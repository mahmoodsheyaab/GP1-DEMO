import React from 'react';
import { Card, CardContent } from '@/app/components/ui/card';
import { Separator } from '@/app/components/ui/separator';
import { Report } from '@/app/utils/mockData';
import { useAuth } from '@/app/contexts/AuthContext';

interface MedicalReportTemplateProps {
  report: Report;
  isEditable?: boolean;
}

export const MedicalReportTemplate: React.FC<MedicalReportTemplateProps> = ({ 
  report, 
  isEditable = false 
}) => {
  const { user } = useAuth();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric'
    });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit'
    });
  };

  return (
    <Card className="max-w-4xl mx-auto">
      <CardContent className="p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h1 className="text-2xl">OCT ANALYSIS PLATFORM</h1>
          </div>
          <h2 className="text-xl mb-1">OPTICAL COHERENCE TOMOGRAPHY</h2>
          <h3 className="text-lg">Medical Report</h3>
        </div>

        <Separator className="mb-6" />

        {/* Patient Information */}
        <div className="mb-6">
          <h3 className="text-lg mb-3 bg-gray-100 p-2 rounded">PATIENT INFORMATION</h3>
          <div className="grid grid-cols-2 gap-4 ml-4">
            <div>
              <p className="text-sm text-gray-600">Patient Name:</p>
              <p className="font-medium">{report.patientName}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Patient ID:</p>
              <p className="font-medium font-mono">{report.patientId.slice(0, 12)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Examination Date:</p>
              <p className="font-medium">{formatDate(report.date)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Examination Time:</p>
              <p className="font-medium">{formatTime(report.date)}</p>
            </div>
          </div>
        </div>

        <Separator className="mb-6" />

        {/* OCT Image */}
        <div className="mb-6">
          <h3 className="text-lg mb-3 bg-gray-100 p-2 rounded">OCT SCAN IMAGE</h3>
          <div className="ml-4">
            {report.imageUrl ? (
              <div className="rounded-lg overflow-hidden border-2 border-gray-300">
                <img src={report.imageUrl} alt="OCT Scan" className="w-full h-80 object-contain bg-black" />
              </div>
            ) : (
              <div className="rounded-lg border-2 border-gray-300 h-80 flex items-center justify-center bg-gray-50">
                <p className="text-gray-400">No image available</p>
              </div>
            )}
          </div>
        </div>

        <Separator className="mb-6" />

        {/* AI Analysis Results */}
        <div className="mb-6">
          <h3 className="text-lg mb-3 bg-gray-100 p-2 rounded">AI ANALYSIS RESULTS</h3>
          <div className="ml-4 space-y-3">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <p className="text-sm text-gray-600 mb-1">Classification:</p>
                <p className="text-xl">{report.diagnosis}</p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <p className="text-sm text-gray-600 mb-1">Confidence Score:</p>
                <p className="text-xl">{report.confidence}%</p>
              </div>
            </div>
            {report.fluidPercentage !== undefined && (
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <p className="text-sm text-gray-600 mb-1">CME Fluid Percentage:</p>
                <p className="text-xl">{report.fluidPercentage}%</p>
                <p className="text-sm text-gray-600 mt-2">
                  Severity: {report.fluidPercentage < 25 ? 'Mild' : report.fluidPercentage < 40 ? 'Moderate' : 'Severe'}
                </p>
              </div>
            )}
          </div>
        </div>

        <Separator className="mb-6" />

        {/* Clinical Diagnosis */}
        <div className="mb-6">
          <h3 className="text-lg mb-3 bg-gray-100 p-2 rounded">CLINICAL DIAGNOSIS</h3>
          <div className="ml-4">
            <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
              <p className="text-sm text-gray-600 mb-1">Final Diagnosis:</p>
              <p className="text-xl">{report.diagnosis}</p>
              {report.diagnosis === 'Drusen' && (
                <p className="text-sm text-gray-600 mt-2">
                  Drusen are yellow deposits under the retina, often associated with age-related macular degeneration (AMD).
                </p>
              )}
              {report.diagnosis === 'DME' && (
                <p className="text-sm text-gray-600 mt-2">
                  Diabetic Macular Edema - swelling in the macula caused by fluid leakage from damaged blood vessels.
                </p>
              )}
              {report.diagnosis === 'CNV' && (
                <p className="text-sm text-gray-600 mt-2">
                  Choroidal Neovascularization - abnormal blood vessel growth beneath the retina.
                </p>
              )}
              {report.diagnosis === 'Normal' && (
                <p className="text-sm text-gray-600 mt-2">
                  No significant pathological findings detected in the retinal structure.
                </p>
              )}
            </div>
          </div>
        </div>

        <Separator className="mb-6" />

        {/* Doctor's Medical Notes */}
        <div className="mb-6">
          <h3 className="text-lg mb-3 bg-gray-100 p-2 rounded">MEDICAL NOTES & RECOMMENDATIONS</h3>
          <div className="ml-4">
            <div className="bg-white p-4 rounded-lg border-2 border-gray-300 min-h-[150px]">
              {report.doctorNotes ? (
                <p className="whitespace-pre-wrap">{report.doctorNotes}</p>
              ) : (
                <p className="text-gray-400 italic">
                  {isEditable 
                    ? 'Enter your clinical observations, recommendations, and treatment plan...' 
                    : 'No medical notes available.'}
                </p>
              )}
            </div>
          </div>
        </div>

        <Separator className="mb-6" />

        {/* Doctor Information */}
        {report.doctorName && (
          <div className="mb-6">
            <h3 className="text-lg mb-3 bg-gray-100 p-2 rounded">EXAMINED BY</h3>
            <div className="ml-4">
              <p className="font-medium text-lg">{report.doctorName}</p>
              <p className="text-gray-600">Retinal Specialist</p>
              <p className="text-sm text-gray-500 mt-2">Date: {formatDate(report.date)}</p>
              {report.status === 'completed' && (
                <div className="mt-3 pt-3 border-t border-gray-200">
                  <p className="text-xs text-gray-500">Digital Signature Verified</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Report Footer */}
        <div className="mt-8 pt-6 border-t-2 border-gray-300">
          <div className="flex justify-between items-center text-xs text-gray-500">
            <p>Report ID: {report.id}</p>
            <p>Generated by OCT Analysis Platform</p>
            <p>Status: {report.status.toUpperCase()}</p>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-4 p-3 bg-gray-50 rounded text-xs text-gray-600">
          <p className="font-medium mb-1">DISCLAIMER:</p>
          <p>
            This report is generated with AI assistance and should be interpreted by a qualified ophthalmologist. 
            The AI analysis is a diagnostic aid and not a replacement for professional medical judgment. 
            Always consult with your healthcare provider for medical advice.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};