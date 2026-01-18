import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Label } from '@/app/components/ui/label';
import { Upload, Sparkles, ImageIcon } from 'lucide-react';
import { toast } from 'sonner';

export const ImageEnhancementPage: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [beforeUrl, setBeforeUrl] = useState<string>('');
  const [afterUrl, setAfterUrl] = useState<string>('');
  const [isEnhancing, setIsEnhancing] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setBeforeUrl(reader.result as string);
        setAfterUrl(''); // Reset after image
      };
      reader.readAsDataURL(file);
    }
  };

  const simulateEnhancement = (): Promise<string> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // In a real app, this would call the super-resolution API
        // For demo, we'll use a slight filter effect
        resolve(beforeUrl);
      }, 3000);
    });
  };

  const handleEnhance = async () => {
    if (!selectedFile || !beforeUrl) {
      toast.error('Please upload an image first');
      return;
    }

    setIsEnhancing(true);
    try {
      const enhanced = await simulateEnhancement();
      setAfterUrl(enhanced);
      toast.success('Image enhanced successfully!');
    } catch (error) {
      toast.error('Enhancement failed. Please try again.');
    } finally {
      setIsEnhancing(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl mb-2">Image Enhancement</h2>
        <p className="text-gray-600">Enhance low-quality or blurry OCT images using AI super-resolution</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Upload Low-Quality Image</CardTitle>
          <CardDescription>Select a blurry or low-resolution OCT image to enhance</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-500 transition-colors">
            <input
              type="file"
              id="enhancement-upload"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
            <Label htmlFor="enhancement-upload" className="cursor-pointer">
              <Upload className="h-12 w-12 mx-auto mb-4 text-gray-400" />
              <p className="text-sm text-gray-600">
                {selectedFile ? selectedFile.name : 'Click to upload or drag and drop'}
              </p>
              <p className="text-xs text-gray-500 mt-2">PNG, JPG up to 10MB</p>
            </Label>
          </div>

          {beforeUrl && (
            <>
              <Button onClick={handleEnhance} className="w-full" disabled={isEnhancing}>
                <Sparkles className="h-4 w-4 mr-2" />
                {isEnhancing ? 'Enhancing with AI...' : 'Enhance Image'}
              </Button>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Before */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">Before</h3>
                    <span className="text-xs text-gray-500">Original</span>
                  </div>
                  <div className="rounded-lg overflow-hidden border bg-gray-50">
                    <img src={beforeUrl} alt="Original OCT" className="w-full h-80 object-cover" />
                  </div>
                </div>

                {/* After */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">After</h3>
                    <span className="text-xs text-gray-500">Enhanced</span>
                  </div>
                  <div className="rounded-lg overflow-hidden border bg-gray-50">
                    {afterUrl ? (
                      <div className="relative">
                        <img src={afterUrl} alt="Enhanced OCT" className="w-full h-80 object-cover brightness-105 contrast-105" />
                        <div className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                          Enhanced
                        </div>
                      </div>
                    ) : (
                      <div className="h-80 flex items-center justify-center">
                        <div className="text-center">
                          <ImageIcon className="h-12 w-12 mx-auto mb-2 text-gray-300" />
                          <p className="text-sm text-gray-500">Enhanced image will appear here</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {afterUrl && (
                <div className="bg-blue-50 rounded-lg p-4">
                  <h4 className="font-medium mb-2">Enhancement Details</h4>
                  <div className="space-y-1 text-sm text-gray-700">
                    <p>• Resolution increased by 2x</p>
                    <p>• Noise reduction applied</p>
                    <p>• Edge enhancement enabled</p>
                    <p>• Contrast optimization completed</p>
                  </div>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
