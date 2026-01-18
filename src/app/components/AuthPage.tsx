import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select';
import { useAuth } from '@/app/contexts/AuthContext';
import { Eye, Stethoscope } from 'lucide-react';
import { toast } from 'sonner';

export const AuthPage: React.FC = () => {
  const { login, register } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Register form state
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerName, setRegisterName] = useState('');
  const [registerRole, setRegisterRole] = useState<'patient' | 'doctor'>('patient');
  const [registerSpecialization, setRegisterSpecialization] = useState('');
  const [licenseDocument, setLicenseDocument] = useState<string>('');
  const [licenseFileName, setLicenseFileName] = useState<string>('');

  const handleLicenseUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setLicenseFileName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        setLicenseDocument(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const success = await login(loginEmail, loginPassword);

    if (success) {
      toast.success('Login successful!');
    } else {
      toast.error('Invalid email or password');
    }

    setIsLoading(false);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (registerRole === 'doctor' && !registerSpecialization) {
      toast.error('Please enter your specialization');
      setIsLoading(false);
      return;
    }

    if (registerRole === 'doctor' && !licenseDocument) {
      toast.error('Please upload your medical license document');
      setIsLoading(false);
      return;
    }

    const success = await register(
      registerEmail,
      registerPassword,
      registerName,
      registerRole,
      registerRole === 'doctor' ? registerSpecialization : undefined,
      registerRole === 'doctor' ? licenseDocument : undefined
    );

    if (success) {
      if (registerRole === 'doctor') {
        toast.success('Registration successful! Your account is pending verification.');
      } else {
        toast.success('Registration successful!');
      }
    } else {
      toast.error('Email already exists');
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mb-2">
            <Eye className="h-6 w-6 text-white" />
          </div>
          <CardTitle>OCT Analysis Platform</CardTitle>
          <CardDescription>Secure access for patients and doctors</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="register">Register</TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="login-email">Email</Label>
                  <Input
                    id="login-email"
                    type="email"
                    placeholder="Enter your email"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="login-password">Password</Label>
                  <Input
                    id="login-password"
                    type="password"
                    placeholder="Enter your password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? 'Logging in...' : 'Login'}
                </Button>
                <div className="text-sm text-gray-600 space-y-1 mt-4">
                  <p className="font-medium">Demo accounts:</p>
                  <p>Patient: mahmoodpatient@gmail.com / patient123 (Sheyab)</p>
                  <p>Doctor: mahmooddoctor@gmail.com / doctor123 (Dr. Mahmood)</p>
                  <p className="text-xs text-gray-500 mt-2">Other patients: omari@gmail.com, bdour@gmail.com, awwadeh@gmail.com</p>
                </div>
              </form>
            </TabsContent>

            <TabsContent value="register">
              <form onSubmit={handleRegister} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="register-role">Register as</Label>
                  <Select value={registerRole} onValueChange={(value: 'patient' | 'doctor') => setRegisterRole(value)}>
                    <SelectTrigger id="register-role">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="patient">
                        <div className="flex items-center gap-2">
                          <Eye className="h-4 w-4" />
                          Patient
                        </div>
                      </SelectItem>
                      <SelectItem value="doctor">
                        <div className="flex items-center gap-2">
                          <Stethoscope className="h-4 w-4" />
                          Doctor
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="register-name">Full Name</Label>
                  <Input
                    id="register-name"
                    placeholder="Enter your full name"
                    value={registerName}
                    onChange={(e) => setRegisterName(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="register-email">Email</Label>
                  <Input
                    id="register-email"
                    type="email"
                    placeholder="Enter your email"
                    value={registerEmail}
                    onChange={(e) => setRegisterEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="register-password">Password</Label>
                  <Input
                    id="register-password"
                    type="password"
                    placeholder="Create a password"
                    value={registerPassword}
                    onChange={(e) => setRegisterPassword(e.target.value)}
                    required
                  />
                </div>
                {registerRole === 'doctor' && (
                  <div className="space-y-2">
                    <Label htmlFor="register-specialization">Specialization</Label>
                    <Input
                      id="register-specialization"
                      placeholder="e.g., Retinal Specialist"
                      value={registerSpecialization}
                      onChange={(e) => setRegisterSpecialization(e.target.value)}
                      required
                    />
                  </div>
                )}
                {registerRole === 'doctor' && (
                  <div className="space-y-2">
                    <Label htmlFor="register-license">Medical License Document *</Label>
                    <Input
                      id="register-license"
                      type="file"
                      accept="image/*,.pdf"
                      onChange={handleLicenseUpload}
                      required
                    />
                    {licenseFileName && (
                      <p className="text-sm text-green-600">✓ Uploaded: {licenseFileName}</p>
                    )}
                    <p className="text-xs text-gray-500">
                      Upload your medical license, certificate, or professional ID for verification
                    </p>
                  </div>
                )}
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? 'Registering...' : 'Register'}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};