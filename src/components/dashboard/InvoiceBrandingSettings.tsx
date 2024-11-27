'use client';

import React from 'react';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Upload, Trash2, Building2, Palette } from 'lucide-react';
import Image from 'next/image';
import { Separator } from '@/components/ui/separator';

interface ColorScheme {
  primary: string;
  secondary: string;
  accent: string;
}

interface InvoiceBrandingSettingsProps {
  logo: string | null;
  onLogoUpload: (file: File) => void;
  onLogoRemove: () => void;
  colorScheme: ColorScheme;
  onColorChange: (key: keyof ColorScheme, value: string) => void;
  companyName: string;
  onCompanyNameChange: (name: string) => void;
}

export function InvoiceBrandingSettings({
  logo,
  onLogoUpload,
  onLogoRemove,
  colorScheme,
  onColorChange,
  companyName,
  onCompanyNameChange,
}: InvoiceBrandingSettingsProps) {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("File too large. Please select an image under 5MB.");
        return;
      }
      if (!file.type.startsWith('image/')) {
        alert("Please upload an image file.");
        return;
      }
      onLogoUpload(file);
    }
  };

  return (
    <Card className="p-6 bg-gradient-to-br from-background to-muted">
      <div className="flex items-center gap-2 mb-6">
        <Building2 className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-semibold text-foreground/90">Company Branding</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Column - Company Info */}
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="companyName" className="text-sm font-medium">
              Company Name
            </Label>
            <Input
              id="companyName"
              value={companyName}
              onChange={(e) => onCompanyNameChange(e.target.value)}
              placeholder="Your Company Name"
              className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
            />
          </div>

          <div className="space-y-3">
            <Label className="text-sm font-medium">Company Logo</Label>
            <div className="flex items-start gap-4">
              {logo ? (
                <div className="relative w-40 h-40 rounded-xl overflow-hidden bg-background shadow-lg transition-all duration-200 hover:shadow-xl">
                  <Image
                    src={logo}
                    alt="Company logo"
                    fill
                    className="object-contain p-2"
                  />
                  <Button
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 right-2 opacity-0 hover:opacity-100 transition-opacity duration-200"
                    onClick={onLogoRemove}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <div className="w-40 h-40 border-2 border-dashed rounded-xl flex items-center justify-center bg-muted/50 hover:bg-muted transition-colors duration-200">
                  <label className="cursor-pointer text-center p-4">
                    <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Upload Logo</span>
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleFileChange}
                    />
                  </label>
                </div>
              )}
              <div className="flex-1">
                <p className="text-sm text-muted-foreground mb-2">
                  Logo Guidelines:
                </p>
                <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                  <li>Recommended size: 400x400px</li>
                  <li>Maximum file size: 5MB</li>
                  <li>Supported formats: PNG, JPG</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Color Scheme */}
        <div className="space-y-6">
          <div className="flex items-center gap-2 mb-4">
            <Palette className="h-4 w-4 text-primary" />
            <Label className="text-sm font-medium">Color Scheme</Label>
          </div>
          
          <div className="space-y-4">
            {Object.entries(colorScheme).map(([key, value]) => (
              <div key={key} className="space-y-2">
                <Label htmlFor={`${key}Color`} className="text-sm capitalize">
                  {key} Color
                </Label>
                <div className="flex gap-3 items-center">
                  <div className="relative">
                    <Input
                      id={`${key}Color`}
                      type="color"
                      value={value}
                      onChange={(e) => onColorChange(key as keyof ColorScheme, e.target.value)}
                      className="w-14 h-14 p-1 cursor-pointer rounded-lg border-2 focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                  <Input
                    type="text"
                    value={value.toUpperCase()}
                    onChange={(e) => onColorChange(key as keyof ColorScheme, e.target.value)}
                    className="font-mono flex-1 uppercase focus:ring-2 focus:ring-primary/20"
                    placeholder="#000000"
                  />
                  <div 
                    className="w-14 h-14 rounded-lg border-2"
                    style={{ backgroundColor: value }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}
