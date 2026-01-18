import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/app/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/tabs';
import { Eye, AlertCircle, Info, Activity, Droplet, Layers } from 'lucide-react';

export const OverviewPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl mb-2">OCT Analysis Overview</h2>
        <p className="text-gray-600">
          Learn about common retinal conditions detected by our AI system
        </p>
      </div>

      {/* Introduction Card */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-900">
            <Eye className="h-6 w-6" />
            Optical Coherence Tomography (OCT)
          </CardTitle>
        </CardHeader>
        <CardContent className="text-blue-800 space-y-3">
          <p>
            OCT is a non-invasive imaging technique that uses light waves to capture high-resolution, 
            cross-sectional images of the retina. This allows doctors to see each of the retina's 
            distinctive layers, helping to diagnose and monitor various eye conditions.
          </p>
          <p>
            Our AI-powered platform analyzes OCT scans to detect four main classifications:
          </p>
          <div className="grid md:grid-cols-4 gap-3 mt-4">
            <div className="bg-white rounded-lg p-3 text-center shadow-sm">
              <Layers className="h-8 w-8 mx-auto mb-2 text-yellow-600" />
              <p className="font-medium">Drusen</p>
            </div>
            <div className="bg-white rounded-lg p-3 text-center shadow-sm">
              <Droplet className="h-8 w-8 mx-auto mb-2 text-blue-600" />
              <p className="font-medium">DME</p>
            </div>
            <div className="bg-white rounded-lg p-3 text-center shadow-sm">
              <Activity className="h-8 w-8 mx-auto mb-2 text-red-600" />
              <p className="font-medium">CNV</p>
            </div>
            <div className="bg-white rounded-lg p-3 text-center shadow-sm">
              <Eye className="h-8 w-8 mx-auto mb-2 text-green-600" />
              <p className="font-medium">Normal</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Condition Details */}
      <Tabs defaultValue="drusen" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="drusen">Drusen</TabsTrigger>
          <TabsTrigger value="dme">DME</TabsTrigger>
          <TabsTrigger value="cnv">CNV</TabsTrigger>
          <TabsTrigger value="normal">Normal</TabsTrigger>
        </TabsList>

        {/* Drusen Tab */}
        <TabsContent value="drusen" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Layers className="h-5 w-5 text-yellow-600" />
                Drusen
              </CardTitle>
              <CardDescription>
                Yellow deposits beneath the retina associated with Age-Related Macular Degeneration (AMD)
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-medium mb-2">What is Drusen?</h3>
                <p className="text-gray-700">
                  Drusen are small yellow or white deposits that form beneath the retina. They are composed of 
                  extracellular material that accumulates between Bruch's membrane and the retinal pigment 
                  epithelium (RPE). Drusen are one of the earliest signs of age-related macular degeneration (AMD).
                </p>
              </div>

              <div>
                <h3 className="font-medium mb-2">Types of Drusen</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-600 mt-1">•</span>
                    <span><strong>Hard Drusen:</strong> Small, well-defined deposits that usually don't cause vision problems</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-600 mt-1">•</span>
                    <span><strong>Soft Drusen:</strong> Larger, less defined deposits that may indicate higher risk of AMD progression</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-600 mt-1">•</span>
                    <span><strong>Calcified Drusen:</strong> Hardened deposits that appear as bright white spots</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-medium mb-2">Symptoms</h3>
                <p className="text-gray-700">
                  Early drusen often cause no symptoms. As they increase in size or number, you may experience:
                </p>
                <ul className="mt-2 space-y-1 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-600">•</span>
                    <span>Blurred or reduced central vision</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-600">•</span>
                    <span>Difficulty reading or recognizing faces</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-600">•</span>
                    <span>Need for brighter light when reading</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-600">•</span>
                    <span>Straight lines appearing wavy</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-medium mb-2">Treatment & Management</h3>
                <p className="text-gray-700">
                  While there's no treatment to remove drusen, management focuses on slowing AMD progression:
                </p>
                <ul className="mt-2 space-y-1 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-600">•</span>
                    <span>AREDS vitamins (antioxidants and zinc)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-600">•</span>
                    <span>Lifestyle modifications (quit smoking, healthy diet)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-600">•</span>
                    <span>Regular monitoring with OCT scans</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-600">•</span>
                    <span>Protection from UV light</span>
                  </li>
                </ul>
              </div>

              <Alert>
                <Info className="h-4 w-4" />
                <AlertTitle>Important</AlertTitle>
                <AlertDescription>
                  Regular eye exams are crucial if you have drusen, as they can progress to more serious forms of AMD.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </TabsContent>

        {/* DME Tab */}
        <TabsContent value="dme" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Droplet className="h-5 w-5 text-blue-600" />
                Diabetic Macular Edema (DME)
              </CardTitle>
              <CardDescription>
                Swelling of the macula caused by fluid leakage from damaged blood vessels in diabetic patients
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-medium mb-2">What is DME?</h3>
                <p className="text-gray-700">
                  Diabetic Macular Edema (DME) is a complication of diabetic retinopathy where fluid accumulates 
                  in the macula, the central part of the retina responsible for sharp, detailed vision. This occurs 
                  when damaged blood vessels leak fluid and proteins into the macula, causing it to swell.
                </p>
              </div>

              <div>
                <h3 className="font-medium mb-2">Causes & Risk Factors</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span><strong>Poor Blood Sugar Control:</strong> Prolonged high blood glucose damages retinal blood vessels</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span><strong>Duration of Diabetes:</strong> Risk increases with longer disease duration</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span><strong>High Blood Pressure:</strong> Hypertension accelerates blood vessel damage</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span><strong>High Cholesterol:</strong> Lipid deposits contribute to vascular damage</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-medium mb-2">Symptoms</h3>
                <ul className="space-y-1 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600">•</span>
                    <span>Blurred or distorted central vision</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600">•</span>
                    <span>Colors appearing washed out or faded</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600">•</span>
                    <span>Difficulty reading or performing tasks requiring detailed vision</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600">•</span>
                    <span>Floaters or dark spots in vision</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-medium mb-2">Treatment Options</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span><strong>Anti-VEGF Injections:</strong> Medications injected into the eye to reduce fluid leakage (Avastin, Lucentis, Eylea)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span><strong>Steroid Injections:</strong> Reduce inflammation and swelling</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span><strong>Laser Photocoagulation:</strong> Seal leaking blood vessels</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span><strong>Blood Sugar Control:</strong> Essential for preventing progression</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-medium mb-2">CME Fluid Quantification</h3>
                <p className="text-gray-700">
                  Our platform measures Cystoid Macular Edema (CME) fluid percentage to help assess severity:
                </p>
                <div className="mt-2 grid grid-cols-3 gap-3">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                    <p className="text-sm font-medium text-green-800">Mild</p>
                    <p className="text-xs text-green-600">&lt; 25% fluid</p>
                  </div>
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                    <p className="text-sm font-medium text-yellow-800">Moderate</p>
                    <p className="text-xs text-yellow-600">25-40% fluid</p>
                  </div>
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                    <p className="text-sm font-medium text-red-800">Severe</p>
                    <p className="text-xs text-red-600">&gt; 40% fluid</p>
                  </div>
                </div>
              </div>

              <Alert className="bg-yellow-50 border-yellow-300">
                <AlertCircle className="h-4 w-4 text-yellow-600" />
                <AlertTitle className="text-yellow-800">Critical</AlertTitle>
                <AlertDescription className="text-yellow-700">
                  DME can lead to permanent vision loss if left untreated. Early detection and treatment are essential.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </TabsContent>

        {/* CNV Tab */}
        <TabsContent value="cnv" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-red-600" />
                Choroidal Neovascularization (CNV)
              </CardTitle>
              <CardDescription>
                Abnormal blood vessel growth beneath the retina
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-medium mb-2">What is CNV?</h3>
                <p className="text-gray-700">
                  Choroidal Neovascularization (CNV) is the growth of new blood vessels from the choroid (the layer 
                  beneath the retina) through Bruch's membrane into the sub-retinal space. These abnormal vessels 
                  are fragile and tend to leak fluid and blood, damaging the retina and causing vision loss.
                </p>
              </div>

              <div>
                <h3 className="font-medium mb-2">Types of CNV</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 mt-1">•</span>
                    <span><strong>Type 1 (Occult):</strong> Vessels grow beneath the RPE, less visible on imaging</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 mt-1">•</span>
                    <span><strong>Type 2 (Classic):</strong> Vessels grow above the RPE, more clearly visible</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 mt-1">•</span>
                    <span><strong>Type 3 (RAP):</strong> Retinal angiomatous proliferation, originates from retinal vessels</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-medium mb-2">Common Causes</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 mt-1">•</span>
                    <span><strong>Wet AMD:</strong> Most common cause in older adults</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 mt-1">•</span>
                    <span><strong>Myopic Degeneration:</strong> In high myopia patients</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 mt-1">•</span>
                    <span><strong>Ocular Histoplasmosis:</strong> Fungal infection scarring</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 mt-1">•</span>
                    <span><strong>Inflammatory Conditions:</strong> Various chorioretinal diseases</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-medium mb-2">Symptoms</h3>
                <ul className="space-y-1 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-red-600">•</span>
                    <span>Sudden onset of distorted vision (metamorphopsia)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600">•</span>
                    <span>Dark or blank spots in central vision (scotoma)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600">•</span>
                    <span>Rapid decrease in visual acuity</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600">•</span>
                    <span>Straight lines appearing wavy or bent (Amsler grid abnormality)</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-medium mb-2">Treatment</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 mt-1">•</span>
                    <span><strong>Anti-VEGF Therapy:</strong> First-line treatment to stop vessel growth (Lucentis, Eylea, Avastin)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 mt-1">•</span>
                    <span><strong>Photodynamic Therapy (PDT):</strong> Light-activated drug to destroy abnormal vessels</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 mt-1">•</span>
                    <span><strong>Thermal Laser:</strong> For specific cases away from the fovea</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 mt-1">•</span>
                    <span><strong>Combination Therapy:</strong> Multiple treatments for better outcomes</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-medium mb-2">Prognosis</h3>
                <p className="text-gray-700">
                  Early treatment with anti-VEGF injections can stabilize or improve vision in many cases. Without 
                  treatment, CNV typically leads to significant vision loss within months. Regular monitoring and 
                  prompt treatment of recurrences are essential for maintaining vision.
                </p>
              </div>

              <Alert className="bg-red-50 border-red-300">
                <AlertCircle className="h-4 w-4 text-red-600" />
                <AlertTitle className="text-red-800">Emergency</AlertTitle>
                <AlertDescription className="text-red-700">
                  CNV requires urgent treatment. If you experience sudden vision changes, contact your ophthalmologist immediately.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Normal Tab */}
        <TabsContent value="normal" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5 text-green-600" />
                Normal Retina
              </CardTitle>
              <CardDescription>
                Healthy retinal structure with no pathological findings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-medium mb-2">What is a Normal OCT?</h3>
                <p className="text-gray-700">
                  A normal OCT scan shows well-defined retinal layers with no signs of fluid accumulation, 
                  thickening, thinning, or abnormal deposits. The retinal pigment epithelium (RPE) appears as 
                  a distinct bright line, and the foveal depression is clearly visible in the center of the macula.
                </p>
              </div>

              <div>
                <h3 className="font-medium mb-2">Normal Retinal Layers (from inner to outer)</h3>
                <ul className="space-y-1 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">•</span>
                    <span>Internal Limiting Membrane (ILM)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">•</span>
                    <span>Nerve Fiber Layer (NFL)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">•</span>
                    <span>Ganglion Cell Layer (GCL)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">•</span>
                    <span>Inner Plexiform Layer (IPL)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">•</span>
                    <span>Inner Nuclear Layer (INL)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">•</span>
                    <span>Outer Plexiform Layer (OPL)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">•</span>
                    <span>Outer Nuclear Layer (ONL)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">•</span>
                    <span>External Limiting Membrane (ELM)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">•</span>
                    <span>Photoreceptor Inner/Outer Segments (IS/OS)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">•</span>
                    <span>Retinal Pigment Epithelium (RPE)</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-medium mb-2">Maintaining Healthy Vision</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">•</span>
                    <span><strong>Regular Eye Exams:</strong> Annual comprehensive eye exams, especially after age 40</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">•</span>
                    <span><strong>Healthy Diet:</strong> Leafy greens, fish rich in omega-3, and colorful fruits/vegetables</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">•</span>
                    <span><strong>UV Protection:</strong> Wear sunglasses that block 100% of UV rays</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">•</span>
                    <span><strong>No Smoking:</strong> Smoking significantly increases risk of AMD and other eye diseases</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">•</span>
                    <span><strong>Control Chronic Conditions:</strong> Manage diabetes and hypertension</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">•</span>
                    <span><strong>Screen Time Management:</strong> Take regular breaks and use proper lighting</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-medium mb-2">When to Seek Care</h3>
                <p className="text-gray-700 mb-2">
                  Even with normal OCT results, contact your eye doctor if you experience:
                </p>
                <ul className="space-y-1 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">•</span>
                    <span>Sudden vision changes or loss</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">•</span>
                    <span>Flashes of light or new floaters</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">•</span>
                    <span>Eye pain or discomfort</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">•</span>
                    <span>Double vision or visual distortions</span>
                  </li>
                </ul>
              </div>

              <Alert className="bg-green-50 border-green-300">
                <Info className="h-4 w-4 text-green-600" />
                <AlertTitle className="text-green-800">Congratulations!</AlertTitle>
                <AlertDescription className="text-green-700">
                  A normal OCT result indicates healthy retinal structure. Continue with regular eye exams to maintain your eye health.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
