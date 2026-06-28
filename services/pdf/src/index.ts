import { exec } from "child_process";
import { promisify } from "util";
import * as fs from "fs/promises";
import * as path from "path";
import {
  S3Client,
  GetObjectCommand,
  PutObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const execAsync = promisify(exec);

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

async function runPdfcpu(args: string): Promise<void> {
  const { stdout, stderr } = await execAsync(`pdfcpu ${args}`);
  if (stderr && !stderr.includes("done")) {
    throw new Error(`pdfcpu error: ${stderr}`);
  }
}

export async function merge(fileKeys: string[]): Promise<string> {
  const inputPaths = await Promise.all(fileKeys.map(downloadFromS3));
  const outputPath = path.join("/tmp", `merged_${Date.now()}.pdf`);
  
  await runPdfcpu(`merge ${outputPath} ${inputPaths.join(" ")}`);
  
  const key = `pdf/merged_${Date.now()}.pdf`;
  const url = await uploadToS3(key, outputPath);
  
  // Cleanup
  await Promise.all([...inputPaths, outputPath].map((p) => fs.unlink(p).catch(() => {})));
  
  return url;
}

export async function split(fileKey: string, pages: string): Promise<string[]> {
  const inputPath = await downloadFromS3(fileKey);
  const outputDir = path.join("/tmp", `split_${Date.now()}`);
  await fs.mkdir(outputDir, { recursive: true });
  
  await runPdfcpu(`split ${inputPath} ${outputDir} -pages ${pages}`);
  
  const files = await fs.readdir(outputDir);
  const urls: string[] = [];
  
  for (const file of files) {
    const filePath = path.join(outputDir, file);
    const key = `pdf/split_${Date.now()}_${file}`;
    const url = await uploadToS3(key, filePath);
    urls.push(url);
  }
  
  // Cleanup
  await fs.rm(outputDir, { recursive: true, force: true });
  await fs.unlink(inputPath).catch(() => {});
  
  return urls;
}

export async function compress(fileKey: string, quality: string): Promise<string> {
  const inputPath = await downloadFromS3(fileKey);
  const outputPath = path.join("/tmp", `compressed_${Date.now()}.pdf`);
  
  await runPdfcpu(`compress -q ${quality} ${inputPath} ${outputPath}`);
  
  const key = `pdf/compressed_${Date.now()}.pdf`;
  const url = await uploadToS3(key, outputPath);
  
  // Cleanup
  await Promise.all([inputPath, outputPath].map((p) => fs.unlink(p).catch(() => {})));
  
  return url;
}

export async function rotate(fileKey: string, degrees: number): Promise<string> {
  const inputPath = await downloadFromS3(fileKey);
  const outputPath = path.join("/tmp", `rotated_${Date.now()}.pdf`);
  
  await runPdfcpu(`rotate ${inputPath} ${outputPath} -deg ${degrees}`);
  
  const key = `pdf/rotated_${Date.now()}.pdf`;
  const url = await uploadToS3(key, outputPath);
  
  // Cleanup
  await Promise.all([inputPath, outputPath].map((p) => fs.unlink(p).catch(() => {})));
  
  return url;
}

export async function protect(fileKey: string, password: string): Promise<string> {
  const inputPath = await downloadFromS3(fileKey);
  const outputPath = path.join("/tmp", `protected_${Date.now()}.pdf`);
  
  await runPdfcpu(`protect ${inputPath} ${outputPath} -pwd ${password}`);
  
  const key = `pdf/protected_${Date.now()}.pdf`;
  const url = await uploadToS3(key, outputPath);
  
  // Cleanup
  await Promise.all([inputPath, outputPath].map((p) => fs.unlink(p).catch(() => {})));
  
  return url;
}

export async function unlock(fileKey: string, password: string): Promise<string> {
  const inputPath = await downloadFromS3(fileKey);
  const outputPath = path.join("/tmp", `unlocked_${Date.now()}.pdf`);
  
  await runPdfcpu(`unlock ${inputPath} ${outputPath} -pwd ${password}`);
  
  const key = `pdf/unlocked_${Date.now()}.pdf`;
  const url = await uploadToS3(key, outputPath);
  
  // Cleanup
  await Promise.all([inputPath, outputPath].map((p) => fs.unlink(p).catch(() => {})));
  
  return url;
}

export async function watermark(fileKey: string, text: string): Promise<string> {
  const inputPath = await downloadFromS3(fileKey);
  const outputPath = path.join("/tmp", `watermarked_${Date.now()}.pdf`);
  
  await runPdfcpu(`stamp ${inputPath} ${outputPath} -m "text:${text}"`);
  
  const key = `pdf/watermarked_${Date.now()}.pdf`;
  const url = await uploadToS3(key, outputPath);
  
  // Cleanup
  await Promise.all([inputPath, outputPath].map((p) => fs.unlink(p).catch(() => {})));
  
  return url;
}

export async function addPageNumbers(fileKey: string): Promise<string> {
  const inputPath = await downloadFromS3(fileKey);
  const outputPath = path.join("/tmp", `numbered_${Date.now()}.pdf`);
  
  await runPdfcpu(`stamp ${inputPath} ${outputD