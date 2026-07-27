import { randomUUID } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const UPLOADS_DIRECTORY = path.join(process.cwd(), "public", "uploads");

export const uploadImageToStorage = async (file: File): Promise<string> => {
  const buffer = Buffer.from(await file.arrayBuffer());
  const extension = path.extname(file.name) || ".jpg";
  const fileName = `${randomUUID()}${extension}`;

  await mkdir(UPLOADS_DIRECTORY, { recursive: true });
  await writeFile(path.join(UPLOADS_DIRECTORY, fileName), buffer);

  return `/uploads/${fileName}`;
};
