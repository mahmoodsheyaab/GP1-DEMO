import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Label } from '@/app/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select';
import { Upload, Droplets, Send } from 'lucide-react';
import { toast } from 'sonner';
import { Doctor, Report } from '@/app/utils/mockData';
import { useAuth } from '@/app/contexts/AuthContext';

export const FluidQuantificationPage: React.FC = () => {
  const { user } = useAuth();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [selectedDoctor, setSelectedDoctor] = useState<string>('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [fluidData, setFluidData] = useState<{ percentage: number; volume: number } | null>(null);

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
      setFluidData(null);
    }
  };

  const simulateFluidAnalysis = (): Promise<{ percentage: number; volume: number }> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const percentage = 15 + Math.random() * 35; // 15-50%
        const volume = 0.05 + Math.random() * 0.15; // 0.05-0.20 mm³
        resolve({
          percentage: Math.round(percentage * 10) / 10,
          volume: Math.round(volume * 1000) / 1000
        });
      }, 2500);
    });
  };

  const handleAnalyze = async () => {
    if (!selectedFile) {
      toast.error('Please upload an OCT image first');
      return;
    }

    setIsAnalyzing(true);
    try {
      const result = await simulateFluidAnalysis();
      setFluidData(result);
      toast.success('Fluid quantification complete!');
    } catch (error) {
      toast.error('Analysis failed. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleSendToDoctor = () => {
    if (!selectedDoctor) {
      toast.error('Please select a doctor');
      return;
    }

    if (!fluidData) {
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
      diagnosis: 'DME',
      confidence: 95,
      date: new Date().toISOString(),
      status: 'pending',
      type: 'fluid',
      fluidPercentage: fluidData.percentage
    };

    reports.push(newReport);
    localStorage.setItem('reports', JSON.stringify(reports));

    toast.success(`Fluid analysis sent to ${doctor.name}`);
    
    // Reset form
    setSelectedFile(null);
    setPreviewUrl('');
    setSelectedDoctor('');
    setFluidData(null);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl mb-2">Fluid Quantification</h2>
        <p className="text-gray-600">Specialized tool for DME patients to predict CME fluid percentage</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Upload Section */}
        <Card>
          <CardHeader>
            <CardTitle>Upload OCT Image</CardTitle>
            <CardDescription>Select an OCT scan for fluid quantification analysis</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-500 transition-colors">
              <input
                type="file"
                id="fluid-upload"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
              <Label htmlFor="fluid-upload" className="cursor-pointer">
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
                  <Droplets className="h-4 w-4 mr-2" />
                  {isAnalyzing ? 'Analyzing Fluid...' : 'Quantify Fluid'}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Results Section */}
        <Card>
          <CardHeader>
            <CardTitle>Fluid Analysis Results</CardTitle>
            <CardDescription>CME fluid quantification metrics</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {fluidData ? (
              <>
                <div className="space-y-6">
                  {/* Fluid Percentage */}
                  <div className="bg-blue-50 rounded-lg p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                        <Droplets className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">CME Fluid Percentage</p>
                        <p className="text-3xl">{fluidData.percentage}%</p>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className="bg-blue-600 h-3 rounded-full transition-all"
                        style={{ width: `${fluidData.percentage}%` }}
                      />
                    </div>
                  </div>

                  {/* Additional Metrics */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="text-sm text-gray-600 mb-1">Estimated Volume</p>
                      <p className="text-xl">{fluidData.volume} mm³</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="text-sm text-gray-600 mb-1">Severity</p>
                      <p className="text-xl">
                        {fluidData.percentage < 25 ? 'Mild' : fluidData.percentage < 40 ? 'Moderate' : 'Severe'}
                      </p>
                    </div>
                  </div>

                  {/* Clinical Indicators */}
                  <div className="border rounded-lg p-4 space-y-2">
                    <h4 className="font-medium mb-2">Clinical Indicators</h4>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Macular Thickness:</span>
                        <span>Increased</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Intraretinal Cysts:</span>
                        <span>Present</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Subretinal Fluid:</span>
                        <span>{fluidData.percentage > 30 ? 'Present' : 'Minimal'}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="doctor-select-fluid">Send Results to Doctor</Label>
                  <Select value={selectedDoctor} onValueChange={setSelectedDoctor}>
                    <SelectTrigger id="doctor-select-fluid">
                      <SelectValue placeholder="Choose a doctor" />
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

                <Button onClick={handleSendToDoctor} className="w-full">
                  <Send className="h-4 w-4 mr-2" />
                  Send Results to Doctor
                </Button>
              </>
            ) : (
              <div className="text-center py-12">
                <Droplets className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                <p className="text-gray-500">Upload and analyze an image to see fluid metrics</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
