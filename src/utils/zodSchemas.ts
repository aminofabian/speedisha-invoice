import { z } from "zod";

// Color scheme validation
export const colorSchemeSchema = z.object({
  primary: z.string().regex(/^#[0-9A-Fa-f]{6}$/, "Invalid hex color code"),
  secondary: z.string().regex(/^#[0-9A-Fa-f]{6}$/, "Invalid hex color code"),
  accent: z.string().regex(/^#[0-9A-Fa-f]{6}$/, "Invalid hex color code"),
});

// Main onboarding form schema
export const onboardingFormSchema = z.object({
  businessName: z.string().min(2, "Business name must be at least 2 characters"),
  ownerName: z.string().min(2, "Owner name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().regex(/^\+?[\d\s-]{10,}$/, "Invalid phone number"),
  address: z.string().min(5, "Address must be at least 5 characters"),
  city: z.string().min(2, "City must be at least 2 characters"),
  state: z.string().min(2, "State must be at least 2 characters"),
  zipCode: z.string().regex(/^\d{5}(-\d{4})?$/, "Invalid ZIP code"),
  website: z.string().url("Invalid website URL").optional(),
  logo: z.instanceof(File).optional(),
  logoPreview: z.string().optional(),
  colorScheme: colorSchemeSchema,
  customColors: z.boolean(),
});

// Type inference
export type OnboardingFormData = z.infer<typeof onboardingFormSchema>;