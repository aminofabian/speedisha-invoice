import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const s3Client = new S3Client({
    region: process.env.AWS_REGION!,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    },
});

export async function uploadToS3(file: File, key: string) {
    try {
        const buffer = Buffer.from(await file.arrayBuffer());
        const command = new PutObjectCommand({
            Bucket: process.env.AWS_S3_BUCKET_NAME!,
            Key: key,
            Body: buffer,
            ContentType: file.type,
        });

        await s3Client.send(command);
        return `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
    } catch (error) {
        console.error("Error uploading to S3:", error);
        throw new Error("Failed to upload file");
    }
}