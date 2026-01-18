import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Label } from '@/app/components/ui/label';
import { Slider } from '@/app/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/tabs';
import { Upload, Sparkles, Download, RotateCcw, ZoomIn, Contrast, SlidersHorizontal } from 'lucide-react';
import { toast } from 'sonner';

export const DoctorEnhancementPage: React.FC = () => {
  const [originalImage, setOriginalImage] = useState<string>('');
  const [enhancedImage, setEnhancedImage] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [brightness, setBrightness] = useState([100]);
  const [contrast, setContrast] = useState([100]);
  const [sharpness, setSharpness] = useState([100]);
  const [denoise, setDenoise] = useState([50]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        toast.error('Please upload an image file');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setOriginalImage(reader.result as string);
        setEnhancedImage('');
        toast.success('Image uploaded successfully');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEnhance = () => {
    if (!originalImage) {
      toast.error('Please upload an image first');
      return;
    }

    setIsProcessing(true);
    
    // Simulate AI enhancement processing
    setTimeout(() => {
      setEnhancedImage(originalImage);
      setIsProcessing(false);
      toast.success('Image enhanced successfully using AI Super-Resolution');
    }, 2000);
  };

  const handleReset = () => {
    setBrightness([100]);
    setContrast([100]);
    setSharpness([100]);
    setDenoise([50]);
    setEnhancedImage('');
  };

  const handleDownload = () => {
    if (!enhancedImage) {
      toast.error('No enhanced image to download');
      return;
    }
    
    const link = document.createElement('a');
    link.href = enhancedImage;
    link.download = `enhanced-oct-${Date.now()}.png`;
    link.click();
    toast.success('Enhanced image downloaded');
  };

  const getImageStyle = () => ({
    filter: `brightness(${brightness[0]}%) contrast(${contrast[0]}%) saturate(${sharpness[0]}%)`,
  });

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl mb-2">OCT Image Enhancement</h2>
        <p className="text-gray-600">
          Enhance low-quality OCT images using AI super-resolution and advanced image processing
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Upload & Controls */}
        <Card>
          <CardHeader>
            <CardTitle>Upload & Settings</CardTitle>
            <CardDescription>Upload an OCT image and adjust enhancement parameters</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Upload Area */}
            <div>
              <Label>Upload OCT Image</Label>
              <div className="mt-2 border-2 border-dashed rounded-lg p-8 text-center hover:border-blue-400 transition-colors cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="oct-upload"
                />
                <label htmlFor="oct-upload" className="cursor-pointer">
                  <Upload className="h-12 w-12 mx-auto mb-3 text-gray-400" />
                  <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
                  <p className="text-xs text-gray-400 mt-1">PNG, JPG, DICOM up to 10MB</p>
                </label>
              </div>
            </div>

            {/* Enhancement Controls */}
            {originalImage && (
              <>
                <div className="space-y-4">
                  <h3 className="font-medium flex items-center gap-2">
                    <SlidersHorizontal className="h-4 w-4" />
                    Enhancement Parameters
                  </h3>
                  
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-2">
                        <Label>Brightness</Label>
                        <span className="text-sm text-gray-600">{brightness[0]}%</span>
                      </div>
                      <Slider
                        value={brightness}
                        onValueChange={setBrightness}
                        min={50}
                        max={150}
                        step={1}
                      />
                    </div>

                    <div>
                      <div className="flex justify-between mb-2">
                        <Label>Contrast</Label>
                        <span className="text-sm text-gray-600">{contrast[0]}%</span>
                      </div>
                      <Slider
                        value={contrast}
                        onValueChange={setContrast}
                        min={50}
                        max={150}
                        step={1}
                      />
                    </div>

                    <div>
                      <div className="flex justify-between mb-2">
                        <Label>Sharpness</Label>
                        <span className="text-sm text-gray-600">{sharpness[0]}%</span>
                      </div>
                      <Slider
                        value={sharpness}
                        onValueChange={setSharpness}
                        min={50}
                        max={150}
                        step={1}
                      />
                    </div>

                    <div>
                      <div className="flex justify-between mb-2">
                        <Label>Denoise Level</Label>
                        <span className="text-sm text-gray-600">{denoise[0]}%</span>
                      </div>
                      <Slider
                        value={denoise}
                        onValueChange={setDenoise}
                        min={0}
                        max={100}
                        step={1}
                      />
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <Button 
                    onClick={handleEnhance} 
                    disabled={isProcessing}
                    className="flex-1"
                  >
                    {isProcessing ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                        Enhancing...
                      </>
                    ) : (
                      <>
                        <Sparkles className="h-4 w-4 mr-2" />
                        Enhance Image
                      </>
                    )}
                  </Button>
                  <Button variant="outline" onClick={handleReset}>
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Reset
                  </Button>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Preview */}
        <Card>
          <CardHeader>
            <CardTitle>Preview</CardTitle>
            <CardDescription>Compare original and enhanced images</CardDescription>
          </CardHeader>
          <CardContent>
            {!originalImage ? (
              <div className="bg-gray-50 rounded-lg p-12 text-center">
                <ZoomIn className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                <p className="text-gray-400">No image uploaded</p>
              </div>
            ) : (
              <Tabs defaultValue="original" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="original">Original</TabsTrigger>
                  <TabsTrigger value="enhanced" disabled={!enhancedImage}>
                    Enhanced {enhancedImage && '✓'}
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="original" className="mt-4">
                  <div className="rounded-lg overflow-hidden border bg-black">
                    <img 
                      src={originalImage} 
                      alt="Original OCT" 
                      className="w-full h-96 object-contain"
                    />
                  </div>
                  <p className="text-sm text-gray-600 mt-2">Original Image</p>
                </TabsContent>
                
                <TabsContent value="enhanced" className="mt-4">
                  {enhancedImage && (
                    <>
                      <div className="rounded-lg overflow-hidden border bg-black">
                        <img 
                          src={enhancedImage} 
                          alt="Enhanced OCT" 
                          className="w-full h-96 object-contain"
                          style={getImageStyle()}
                        />
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <p className="text-sm text-gray-600">Enhanced with AI Super-Resolution</p>
                        <Button size="sm" onClick={handleDownload}>
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </Button>
                      </div>
                    </>
                  )}
                </TabsContent>
              </Tabs>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Information Card */}
      <Card className="bg-blue-50 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-900">
            <Sparkles className="h-5 w-5" />
            AI Enhancement Features
          </CardTitle>
        </CardHeader>
        <CardContent className="text-blue-800">
          <ul className="space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <span className="text-blue-600">•</span>
              <span><strong>Super-Resolution:</strong> Upscale low-quality images while preserving critical details</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600">•</span>
              <span><strong>Adaptive Denoising:</strong> Remove noise while maintaining retinal layer boundaries</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600">•</span>
              <span><strong>Contrast Enhancement:</strong> Improve visibility of pathological features</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600">•</span>
              <span><strong>Edge Preservation:</strong> Sharpen important structures without introducing artifacts</span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};
