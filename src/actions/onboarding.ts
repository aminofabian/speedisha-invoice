'use server'

import { auth, signIn } from '@/utils/auth';
import { db } from "@/lib/db";
import { uploadToS3 } from "@/lib/s3";
import { onboardingFormSchema } from "@/utils/zodSchemas";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createBusinessProfile(formData: FormData) {
    try {
        const session = await auth();
        if (!session?.user?.id) {
            throw new Error("Unauthorized");
        }

        // Get file from form data
        const logo = formData.get("logo") as File;
        let logoUrl: string | undefined;

        // Upload logo to S3 if provided
        if (logo && logo.size > 0) {
            const key = `business-logos/${session.user.id}/${logo.name}`;
            logoUrl = await uploadToS3(logo, key);
        }

        // Parse and validate form data
        const rawFormData = {
            businessName: formData.get("businessName"),
            ownerName: formData.get("ownerName"),
            email: formData.get("email"),
            phone: formData.get("phone"),
            address: formData.get("address"),
            city: formData.get("city"),
            state: formData.get("state"),
            zipCode: formData.get("zipCode"),
            website: formData.get("website"),
            colorScheme: JSON.parse(formData.get("colorScheme") as string),
        };

        const validatedData = onboardingFormSchema.parse(rawFormData);

        // Create business profile in database
        await db.business.create({
            data: {
                userId: session.user.id,
                name: validatedData.businessName,
                ownerName: validatedData.ownerName,
                email: validatedData.email,
                phone: validatedData.phone,
                address: validatedData.address,
                city: validatedData.city,
                state: validatedData.state,
                zipCode: validatedData.zipCode,
                website: validatedData.website,
                logo: logoUrl,
                colorScheme: validatedData.colorScheme
            }
        });

        // Update user's onboarding status
        await db.user.update({
            where: { id: session.user.id },
            data: { hasOnboarded: true }
        });

        revalidatePath('/dashboard');
        redirect('/dashboard');
    } catch (error) {
        console.error("Error in createBusinessProfile:", error);
        throw new Error(error instanceof Error ? error.message : "Failed to create business profile");
    }
}