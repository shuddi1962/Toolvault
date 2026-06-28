import * as sharp from "sharp";
import * as fs from "fs/promises";
import * as path from "path";
import {
  S3Client,
  GetObjectCommand,
  PutObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3 = new S3Client({
  region: process.env.AWS_REGION || "us-east-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
  },
});

const BUCKET = process.env.AWS_S3_BUCKET || "toolvault-files";

async function downloadFromS3(key: string): Promise<string> {
  const command = new GetObjectCommand({ Bucket: BUCKET, Key: key });
  const response = await s3.send(command);
  const body = await response.Body?.transformToByteArray();
  
  const tempPath = path.join("/tmp", path.basename(key));
  await fs.writeFile(tempPath, body);
  return tempPath;
}

async function uploadToS3(key: string, filePath: string): Promise<string> {
  const fileContent = await fs.readFile(filePath);
  const command = new PutObjectCommand({
    Bucket: BUCKET,
    Key: key,
    Body: fileContent,
  });
  await s3.send(command);
  
  const urlCommand = new GetObjectCommand({ Bucket: BUCKET, Key: key });
  return getSignedUrl(s3, urlCommand, { expiresIn: 3600 });
}

export async function compressImage(
  fileKey: string,
  quality: number = 80
): Promise<string> {
  const inputPath = await downloadFromS3(fileKey);
  const outputPath = path.join("/tmp", `compressed_${Date.now()}.webp`);
  
  await sharp(inputPath)
    .webp({ quality })
    .toFile(outputPath);
  
  const key = `images/compressed_${Date.now()}.webp`;
  const url = await uploadToS3(key, outputPath);
  
  // Cleanup
  await Promise.all([inputPath, outputPath].map((p) => fs.unlink(p).catch(() => {})));
  
  return url;
}

export async function resizeImage(
  fileKey: string,
  width: number,
  height: number
): Promise<string> {
  const inputPath = await downloadFromS3(fileKey);
  const outputPath = path.join("/tmp", `resized_${Date.now()}.webp`);
  
  await sharp(inputPath)
    .resize(width, height, { fit: "inside" })
    .toFile(outputPath);
  
  const key = `images/resized_${Date.now()}.webp`;
  const url = await uploadToS3(key, outputPath);
  
  // Cleanup
  await Promise.all([inputPath, outputPath].map((p) => fs.unlink(p).catch(() => {})));
  
  return url;
}

export async function convertFormat(
  fileKey: string,
  format: string
): Promise<string> {
  const inputPath = await downloadFromS3(fileKey);
  const outputPath = path.join("/tmp", `converted_${Date.now()}.${format}`);
  
  await sharp(inputPath)
    .toFormat(format as keyof sharp.FormatEnum)
    .toFile(outputPath);
  
  const key = `images/converted_${Date.now()}.${format}`;
  const url = await uploadToS3(key, outputPath);
  
  // Cleanup
  await Promise.all([inputPath, outputPath].map((p) => fs.unlink(p).catch(() => {})));
  
  return url;
}

export async function addWatermark(
  fileKey: string,
  watermarkText: string
): Promise<string> {
  const inputPath = await downloadFromS3(fileKey);
  const outputPath = path.join("/tmp", `watermarked_${Date.now()}.png`);
  
  const watermarkBuffer = Buffer.from(
    `<svg width="200" height="50">
      <text x="10" y="30" font-size="20" fill="rgba(255,255,255,0.5)">${watermarkText}</text>
    </svg>`
  );
  
  await sharp(inputPath)
    .composite([
      {
        input: watermarkBuffer,
        gravity: "southeast",
      },
    ])
    .toFile(outputPath);
  
  const key = `images/watermarked_${Date.now()}.png`;
  const url = await uploadToS3(key, outputPath);
  
  // Cleanup
  await Promise.all([inputPath, outputPath].map((p) => fs.unlink(p).catch(() => {})));
  
  return url;
}

export async function generateQRCode(text: string): Promise<string> {
  const outputPath = path.join("/tmp", `qr_${Date.now()}.png`);
  
  // Using sharp to create a simple QR code placeholder
  // In production, use qrcode npm package
  const svgBuffer = Buffer.from(`
    <svg width="200" height="200">
      <rect width="200" height="200" fill="white"/>
      <text x="50" y="100" font-size="14" text-anchor="middle" fill="black">QR: ${text.substring(0, 20)}</text>
    </svg>
  `);
  
  await sharp(svgBuffer).png().toFile(outputPath);
  
  const key = `images/qr_${Date.now()}.png`;
  const url = await uploadToS3(key, outputPath);
  
  // Cleanup
  await fs.unlink(outputPath).catch(() => {});
  
  return url;
}
