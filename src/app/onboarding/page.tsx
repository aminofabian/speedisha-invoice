'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { ImagePlus, ArrowRight, ArrowLeft, Check } from 'lucide-react';
import Image from 'next/image';

interface FormData {
  businessName: string;
  ownerName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  logo?: File;
  logoPreview?: string;
  colorScheme: {
    primary: string;
    secondary: string;
    accent: string;
  };
  customColors: boolean;
}

const predefinedColorSchemes = [
  {
    name: 'Professional Blue',
    colors: {
      primary: '#2563eb',
      secondary: '#1e40af',
      accent: '#3b82f6',
    }
  },
  {
    name: 'Forest Green',
    colors: {
      primary: '#059669',
      secondary: '#047857',
      accent: '#10b981',
    }
  },
  {
    name: 'Royal Purple',
    colors: {
      primary: '#7c3aed',
      secondary: '#6d28d9',
      accent: '#8b5cf6',
    }
  },
  {
    name: 'Sunset Orange',
    colors: {
      primary: '#ea580c',
      secondary: '#c2410c',
      accent: '#f97316',
    }
  },
  {
    name: 'Ocean Teal',
    colors: {
      primary: '#0d9488',
      secondary: '#0f766e',
      accent: '#14b8a6',
    }
  },
  {
    name: 'Berry Red',
    colors: {
      primary: '#dc2626',
      secondary: '#b91c1c',
      accent: '#ef4444',
    }
  },
];

export default function OnboardingPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    businessName: '',
    ownerName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    colorScheme: predefinedColorSchemes[0].colors,
    customColors: false,
  });

  const updateFormData = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };
  console.log

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast({
          title: "File too large",
          description: "Please select an image under 5MB",
          variant: "destructive",
        });
        return;
      }
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          logo: file,
          logoPreview: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleColorSchemeSelect = (colors: typeof predefinedColorSchemes[0]['colors']) => {
    setFormData(prev => ({
      ...prev,
      colorScheme: colors,
      customColors: false,
    }));
  };

  const handleCustomColorChange = (colorType: keyof FormData['colorScheme'], value: string) => {
    setFormData(prev => ({
      ...prev,
      colorScheme: {
        ...prev.colorScheme,
        [colorType]: value,
      },
      customColors: true,
    }));
  };

  const handleSubmit = async () => {
    try {
      // Here you would typically send the data to your API
      console.log('Form submitted:', formData);
      toast({
        title: "Success!",
        description: "Your profile has been created.",
      });
      router.push('/dashboard');
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    }
  };

  const steps = [
    {
      title: "Business Information",
      fields: (
        <div className="space-y-6">
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="col-span-2">
              <Label htmlFor="businessName" className="text-sm font-medium">
                Business Name
              </Label>
              <Input
                id="businessName"
                value={formData.businessName}
                onChange={(e) => updateFormData('businessName', e.target.value)}
                placeholder="Enter your business name"
                className="mt-1.5"
              />
            </div>
            <div>
              <Label htmlFor="ownerName" className="text-sm font-medium">
                Owner Name
              </Label>
              <Input
                id="ownerName"
                value={formData.ownerName}
                onChange={(e) => updateFormData('ownerName', e.target.value)}
                placeholder="Enter owner's name"
                className="mt-1.5"
              />
            </div>
            <div>
              <Label htmlFor="phone" className="text-sm font-medium">
                Phone
              </Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => updateFormData('phone', e.target.value)}
                placeholder="Enter business phone"
                className="mt-1.5"
              />
            </div>
            <div className="col-span-2">
              <Label htmlFor="email" className="text-sm font-medium">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => updateFormData('email', e.target.value)}
                placeholder="Enter business email"
                className="mt-1.5"
              />
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Business Address",
      fields: (
        <div className="space-y-6">
          <div className="grid gap-6">
            <div>
              <Label htmlFor="address" className="text-sm font-medium">
                Street Address
              </Label>
              <Input
                id="address"
                value={formData.address}
                onChange={(e) => updateFormData('address', e.target.value)}
                placeholder="Enter street address"
                className="mt-1.5"
              />
            </div>
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <Label htmlFor="city" className="text-sm font-medium">
                  City
                </Label>
                <Input
                  id="city"
                  value={formData.city}
                  onChange={(e) => updateFormData('city', e.target.value)}
                  placeholder="Enter city"
                  className="mt-1.5"
                />
              </div>
              <div>
                <Label htmlFor="state" className="text-sm font-medium">
                  State
                </Label>
                <Input
                  id="state"
                  value={formData.state}
                  onChange={(e) => updateFormData('state', e.target.value)}
                  placeholder="Enter state"
                  className="mt-1.5"
                />
              </div>
              <div className="sm:col-span-2">
                <Label htmlFor="zipCode" className="text-sm font-medium">
                  ZIP Code
                </Label>
                <Input
                  id="zipCode"
                  value={formData.zipCode}
                  onChange={(e) => updateFormData('zipCode', e.target.value)}
                  placeholder="Enter ZIP code"
                  className="mt-1.5"
                />
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Brand Colors",
      fields: (
        <div className="space-y-8">
          <div>
            <h3 className="text-sm font-medium text-foreground/80 mb-4">Choose a Color Scheme</h3>
            <div className="grid grid-cols-2 gap-4">
              {predefinedColorSchemes.map((scheme) => (
                <button
                  key={scheme.name}
                  onClick={() => handleColorSchemeSelect(scheme.colors)}
                  className={`p-4 rounded-lg border transition-all hover:shadow-md ${
                    !formData.customColors && 
                    formData.colorScheme.primary === scheme.colors.primary
                      ? 'border-primary ring-2 ring-primary/20 shadow-lg shadow-primary/10'
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <div className="flex gap-2 mb-3 justify-center">
                    {Object.values(scheme.colors).map((color, index) => (
                      <div
                        key={index}
                        className="w-8 h-8 rounded-full ring-2 ring-border shadow-sm"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                  <p className="text-sm font-medium text-center">{scheme.name}</p>
                </button>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
              <div className="w-full border-t border-border"></div>
            </div>
            <div className="relative flex justify-center text-sm font-medium leading-6">
              <span className="bg-card px-4 text-muted-foreground">or customize your colors</span>
            </div>
          </div>

          <div className="space-y-4">
            {Object.entries(formData.colorScheme).map(([key, value]) => (
              <div key={key} className="flex items-center gap-3">
                <div
                  className="w-8 h-8 rounded-full ring-2 ring-border shadow-sm"
                  style={{ backgroundColor: value }}
                />
                <div className="flex-1">
                  <Label className="text-sm font-medium capitalize mb-1.5">
                    {key} Color
                  </Label>
                  <Input
                    type="text"
                    value={value}
                    onChange={(e) => 
                      handleCustomColorChange(
                        key as keyof FormData['colorScheme'],
                        e.target.value
                      )
                    }
                    placeholder="#000000"
                    className="font-mono"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      title: "Business Logo",
      fields: (
        <div className="space-y-6">
          <div className="border-2 border-dashed border-border rounded-lg p-8">
            <input
              type="file"
              id="logo"
              className="hidden"
              accept="image/*"
              onChange={handleFileChange}
            />
            <Label
              htmlFor="logo"
              className="cursor-pointer flex flex-col items-center justify-center gap-3"
            >
              {formData.logoPreview ? (
                <div className="relative w-40 h-40 rounded-xl overflow-hidden ring-2 ring-border shadow-sm">
                  <Image
                    src={formData.logoPreview}
                    alt="Logo preview"
                    fill
                    className="object-contain"
                  />
                </div>
              ) : (
                <>
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                    <ImagePlus className="w-8 h-8 text-primary" />
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-medium text-foreground">
                      Click to upload your business logo
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      SVG, PNG, JPG or GIF (max. 5MB)
                    </p>
                  </div>
                </>
              )}
            </Label>
          </div>
        </div>
      ),
    },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-background to-background/95 relative overflow-hidden">
      {/* Decorative background patterns */}
      <div className="absolute inset-0 bg-grid-slate-900/[0.04] -z-10" />
      <div className="absolute inset-0 flex items-center justify-center -z-10">
        <div className="w-[800px] h-[800px] rotate-45 bg-gradient-to-r from-primary/10 to-primary/5 rounded-full blur-3xl" />
      </div>
      
      <div className="container max-w-4xl mx-auto py-12 px-4 sm:px-6 relative">
        <div className="relative">
          {/* Wavy border effect */}
          <svg className="absolute -top-8 left-0 w-full h-4 text-primary/10" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" fill="currentColor" />
          </svg>
          
          <div className="bg-card shadow-2xl rounded-2xl backdrop-blur-sm border border-border/50 overflow-hidden">
            <div className="p-8">
              {/* Progress bar with animated gradient */}
              <div className="relative h-2 bg-border/20 rounded-full mb-8 overflow-hidden">
                <div 
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary via-primary/80 to-primary rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${((step) / steps.length) * 100}%` }}
                >
                  <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.2)_50%,transparent_75%)] bg-[length:20px_20px] animate-shimmer" />
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h1 className="text-2xl font-semibold bg-gradient-to-br from-foreground to-foreground/80 bg-clip-text text-transparent">
                    {steps[step - 1].title}
                  </h1>
                  <p className="text-muted-foreground mt-1">
                    Step {step} of {steps.length}
                  </p>
                </div>

                <motion.div
                  key={step}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="relative"
                >
                  {/* Decorative corner patterns */}
                  <div className="absolute -top-2 -left-2 w-16 h-16 bg-primary/5 rounded-br-3xl" />
                  <div className="absolute -bottom-2 -right-2 w-16 h-16 bg-primary/5 rounded-tl-3xl" />
                  
                  <div className="relative">
                    {steps[step - 1].fields}
                  </div>
                </motion.div>
              </div>

              <div className="flex justify-between mt-8 pt-6 border-t border-border/50">
                <Button
                  variant="outline"
                  onClick={() => setStep(step - 1)}
                  disabled={step === 1}
                  className="relative group overflow-hidden"
                >
                  <span className="relative z-10">Previous</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </Button>
                
                <Button
                  onClick={step === steps.length ? handleSubmit : () => setStep(step + 1)}
                  className="relative group overflow-hidden"
                >
                  <span className="relative z-10">
                    {step === steps.length ? 'Complete' : 'Next'}
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Button>
              </div>
            </div>
          </div>
          
          {/* Bottom wave decoration */}
          <svg className="absolute -bottom-8 left-0 w-full h-4 text-primary/10 rotate-180" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" fill="currentColor" />
          </svg>
        </div>
      </div>
    </main>
  );
}