'use client';

import React from 'react';
import { Card } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

export type InvoiceStyle = 'basic' | 'styled' | 'uber-styled';

interface InvoiceStyleSelectorProps {
  value: InvoiceStyle;
  onChange: (style: InvoiceStyle) => void;
}

export function InvoiceStyleSelector({ value, onChange }: InvoiceStyleSelectorProps) {
  return (
    <Card className="p-4">
      <h3 className="text-lg font-semibold mb-4">Invoice Style</h3>
      <RadioGroup
        value={value}
        onValueChange={(val) => onChange(val as InvoiceStyle)}
        className="grid grid-cols-1 gap-4"
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="basic" id="basic" />
          <Label htmlFor="basic" className="flex flex-col">
            <span className="font-medium">Basic</span>
            <span className="text-sm text-muted-foreground">
              Clean and minimalistic layout
            </span>
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="styled" id="styled" />
          <Label htmlFor="styled" className="flex flex-col">
            <span className="font-medium">Styled</span>
            <span className="text-sm text-muted-foreground">
              Enhanced typography and subtle colors
            </span>
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="uber-styled" id="uber-styled" />
          <Label htmlFor="uber-styled" className="flex flex-col">
            <span className="font-medium">Premium</span>
            <span className="text-sm text-muted-foreground">
              Professional design with modern effects
            </span>
          </Label>
        </div>
      </RadioGroup>
    </Card>
  );
}
