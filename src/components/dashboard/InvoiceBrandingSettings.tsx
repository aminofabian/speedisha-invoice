'use client';

import React from 'react';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Upload, Trash2 } from 'lucide-react';
import Image from 'next/image';

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
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
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
    <Card className="p-6 space-y-6">
      <h3 className="text-lg font-semibold mb-4">Company Branding</h3>
      
      {/* Company Name */}
      <div className="space-y-2">
        <Label htmlFor="companyName">Company Name</Label>
        <Input
          id="companyName"
          value={companyName}
          onChange={(e) => onCompanyNameChange(e.target.value)}
          placeholder="Your Company Name"
        />
      </div>

      {/* Logo Upload */}
      <div className="space-y-2">
        <Label>Company Logo</Label>
        <div className="flex items-center gap-4">
          {logo ? (
            <div className="relative w-32 h-32 border rounded-lg overflow-hidden">
              <Image
                src={logo}
                alt="Company logo"
                fill
                className="object-contain"
              />
              <Button
                variant="destructive"
                size="icon"
                className="absolute top-2 right-2"
                onClick={onLogoRemove}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <div className="w-32 h-32 border-2 border-dashed rounded-lg flex items-center justify-center">
              <label className="cursor-pointer text-center p-4">
                <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                <span className="text-sm text-gray-500">Upload Logo</span>
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </label>
            </div>
          )}
        </div>
        <p className="text-sm text-muted-foreground">
          Recommended: 400x400px, Max 5MB
        </p>
      </div>

      {/* Color Scheme */}
      <div className="space-y-4">
        <Label>Color Scheme</Label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="primaryColor" className="text-sm">Primary Color</Label>
            <div className="flex gap-2">
              <Input
                id="primaryColor"
                type="color"
                value={colorScheme.primary}
                onChange={(e) => onColorChange('primary', e.target.value)}
                className="w-12 h-12 p-1 cursor-pointer"
              />
              <Input
                type="text"
                value={colorScheme.primary}
                onChange={(e) => onColorChange('primary', e.target.value)}
                className="font-mono"
                placeholder="#000000"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="secondaryColor" className="text-sm">Secondary Color</Label>
            <div className="flex gap-2">
              <Input
                id="secondaryColor"
                type="color"
                value={colorScheme.secondary}
                onChange={(e) => onColorChange('secondary', e.target.value)}
                className="w-12 h-12 p-1 cursor-pointer"
              />
              <Input
                type="text"
                value={colorScheme.secondary}
                onChange={(e) => onColorChange('secondary', e.target.value)}
                className="font-mono"
                placeholder="#000000"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="accentColor" className="text-sm">Accent Color</Label>
            <div className="flex gap-2">
              <Input
                id="accentColor"
                type="color"
                value={colorScheme.accent}
                onChange={(e) => onColorChange('accent', e.target.value)}
                className="w-12 h-12 p-1 cursor-pointer"
              />
              <Input
                type="text"
                value={colorScheme.accent}
                onChange={(e) => onColorChange('accent', e.target.value)}
                className="font-mono"
                placeholder="#000000"
              />
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
