'use client';

import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from '@/lib/utils';
import { FileText, Palette, Sparkles } from 'lucide-react';

export type InvoiceStyle = 'basic' | 'styled' | 'uber-styled';

interface InvoiceStyleSelectorProps {
  value: InvoiceStyle;
  onChange: (style: InvoiceStyle) => void;
}

const styles = [
  {
    id: 'basic',
    name: 'Basic',
    description: 'Clean and minimalistic layout',
    icon: FileText
  },
  {
    id: 'styled',
    name: 'Styled',
    description: 'Enhanced typography and subtle colors',
    icon: Palette
  },
  {
    id: 'uber-styled',
    name: 'Premium',
    description: 'Professional design with modern effects',
    icon: Sparkles
  }
] as const;

export function InvoiceStyleSelector({ value, onChange }: InvoiceStyleSelectorProps) {
  return (
    <Card className="p-6 bg-gradient-to-br from-background to-muted">
      <h3 className="flex items-center text-lg font-semibold mb-6 text-foreground/90">
        Invoice Style
      </h3>
      <div className="flex gap-4">
        <TooltipProvider delayDuration={200}>
          {styles.map((style) => {
            const Icon = style.icon;
            const isSelected = value === style.id;
            return (
              <Tooltip key={style.id}>
                <TooltipTrigger asChild>
                  <Button
                    variant={isSelected ? "default" : "outline"}
                    className={cn(
                      "flex-1 flex items-center gap-2 py-6 transition-all duration-200",
                      isSelected ? 
                        "bg-primary text-primary-foreground shadow-lg scale-105" : 
                        "hover:bg-accent hover:text-accent-foreground hover:scale-102",
                      "border-2",
                      isSelected && "border-primary"
                    )}
                    onClick={() => onChange(style.id as InvoiceStyle)}
                  >
                    <Icon className={cn(
                      "w-5 h-5",
                      isSelected ? "text-primary-foreground" : "text-muted-foreground"
                    )} />
                    <span className="font-medium">{style.name}</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent 
                  className="bg-popover/95 backdrop-blur-sm border-primary/10"
                  sideOffset={8}
                >
                  <p className="text-sm">{style.description}</p>
                </TooltipContent>
              </Tooltip>
            );
          })}
        </TooltipProvider>
      </div>
    </Card>
  );
}
