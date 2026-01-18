import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select';
import { Upload, FileImage, Brain } from 'lucide-react';
import { toast } from 'sonner';
import { Doctor, Report } from '@/app/utils/mockData';
import { useAuth } from '@/app/contexts/AuthContext';

export const AIDiagnosisPage: React.FC = () => {
  const { user } = useAuth();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [selectedDoctor, setSelectedDoctor] = useState<string>('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [diagnosis, setDiagnosis] = useState<{ type: string; confidence: number } | null>(null);

  const doctors: Doctor[] = JSON.parse(localStorage.getItem('doctors') || '[]');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
      setDiagnosis(null);
    }
  };

  const simulateAIAnalysis = (): Promise<{ type: 'Drusen' | 'DME' | 'CNV' | 'Normal'; confidence: number }> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const diagnoses: Array<'Drusen' | 'DME' | 'CNV' | 'Normal'> = ['Drusen', 'DME', 'CNV', 'Normal'];
        const randomDiagnosis = diagnoses[Math.floor(Math.random() * diagnoses.length)];
        const confidence = 85 + Math.random() * 14; // 85-99%
        resolve({ type: randomDiagnosis, confidence: Math.round(confidence) });
      }, 2000);
    });
  };

  const handleAnalyze = async () => {
    if (!selectedFile) {
      toast.error('Please upload an OCT image first');
      return;
    }

    setIsAnalyzing(true);
    try {
      const result = await simulateAIAnalysis();
      setDiagnosis(result);
      toast.success('AI analysis complete!');
    } catch (error) {
      toast.error('Analysis failed. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleForwardToDoctor = () => {
    if (!selectedDoctor) {
      toast.error('Please select a doctor');
      return;
    }

    if (!diagnosis) {
      toast.error('Please analyze the image first');
      return;
    }

    const doctor = doctors.find(d => d.id === selectedDoctor);
    if (!doctor) return;

    // Create new report
    const reports: Report[] = JSON.parse(localStorage.getItem('reports') || '[]');
    const newReport: Report = {
      id: `report-${Date.now()}`,
      patientId: user!.id,
      patientName: user!.name,
      doctorId: doctor.id,
      doctorName: doctor.name,
      imageUrl: previewUrl,
      diagnosis: diagnosis.type as 'Drusen' | 'DME' | 'CNV' | 'Normal',
      confidence: diagnosis.confidence,
      date: new Date().toISOString(),
      status: 'pending',
      type: 'diagnosis'
    };

    reports.push(newReport);
    localStorage.setItem('reports', JSON.stringify(reports));

    toast.success(`Report forwarded to ${doctor.name}`);
    
    // Reset form
    setSelectedFile(null);
    setPreviewUrl('');
    setSelectedDoctor('');
    setDiagnosis(null);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl mb-2">AI Diagnosis Module</h2>
        <p className="text-gray-600">Upload OCT images for automatic AI classification</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Upload Section */}
        <Card>
          <CardHeader>
            <CardTitle>Upload OCT Image</CardTitle>
            <CardDescription>Select an OCT scan for AI analysis</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-500 transition-colors">
              <input
                type="file"
                id="oct-upload"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
              <Label htmlFor="oct-upload" className="cursor-pointer">
                <Upload className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                <p className="text-sm text-gray-600">
                  {selectedFile ? selectedFile.name : 'Click to upload or drag and drop'}
                </p>
                <p className="text-xs text-gray-500 mt-2">PNG, JPG up to 10MB</p>
              </Label>
            </div>

            {previewUrl && (
              <div className="space-y-4">
                <div className="rounded-lg overflow-hidden border">
                  <img src={previewUrl} alt="OCT Preview" className="w-full h-64 object-cover" />
                </div>
                <Button onClick={handleAnalyze} className="w-full" disabled={isAnalyzing}>
                  <Brain className="h-4 w-4 mr-2" />
                  {isAnalyzing ? 'Analyzing...' : 'Analyze with AI'}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Results Section */}
        <Card>
          <CardHeader>
            <CardTitle>Analysis Results</CardTitle>
            <CardDescription>AI classification and confidence score</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {diagnosis ? (
              <>
                <div className="bg-blue-50 rounded-lg p-6 space-y-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Diagnosis</p>
                    <p className="text-2xl">{diagnosis.type}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Confidence Score</p>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${diagnosis.confidence}%` }}
                        />
                      </div>
                      <span className="text-sm">{diagnosis.confidence}%</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="doctor-select">Select Doctor</Label>
                  <Select value={selectedDoctor} onValueChange={setSelectedDoctor}>
                    <SelectTrigger id="doctor-select">
                      <SelectValue placeholder="Choose a doctor to forward report" />
                    </SelectTrigger>
                    <SelectContent>
                      {doctors.map((doctor) => (
                        <SelectItem key={doctor.id} value={doctor.id}>
                          <div>
                            <p>{doctor.name}</p>
                            <p className="text-xs text-gray-500">{doctor.specialization}</p>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Button onClick={handleForwardToDoctor} className="w-full">
                  Forward to Doctor
                </Button>
              </>
            ) : (
              <div className="text-center py-12">
                <FileImage className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                <p className="text-gray-500">Upload and analyze an image to see results</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
