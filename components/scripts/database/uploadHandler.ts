import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { ReturnField } from './interface';

const pathToUploadFolder = path.join(process.cwd(), '..', 'media', 'whimsydecor');

export async function handleImageUpload(file: File, Path: string): Promise<ReturnField> {
  if (file === undefined) {
    return { status: 0, title: "No File", desc: "Please select a file to upload.", data: null };
  }

  // Validate file type
  const validFileTypes = ['image/jpeg', 'image/png'];
  if (!validFileTypes.includes(file.type)) {
    return { status: 0, title: `Invalid File Type: ${file.type}`, desc: "Only JPEG and PNG files are allowed.", data: null };
  }

  // Generate a unique file name and set the file path
  const [folder, id] = Path.split('/');
  const fileName = `${Date.now()}_${file.name}`;
  const uploadDir = path.join(pathToUploadFolder, 'uploads', folder, id);
  const fullPath = path.join(uploadDir, fileName);
  const filePath = path.join(folder, id, fileName); // Full path to save the file

  // Ensure the upload directory exists
  try {
    fs.mkdirSync(uploadDir, { recursive: true });
  } catch (err) {
    return { status: 0, title: "Directory Creation Failed", desc: "Could not create upload directory.", data: null };
  }

  // Handle file upload
  try {
    const fileData = await file.arrayBuffer();
    
    // Compress the image using Sharp
    await sharp(Buffer.from(fileData))
      .resize(2000) // Resize to a width of 800px, adjust as needed
      .toFormat(file.type === 'image/jpeg' ? 'jpeg' : 'png', { quality: 80 }) // Compress to JPEG or PNG with quality
      .toFile(fullPath);

    return { status: 1, title: "Upload Successful", desc: "File has been uploaded successfully.", data: filePath.replaceAll('\\', '/') };
  } catch (error) {
    return { status: 0, title: "Upload Failed", desc: "An error occurred during the file upload.", data: null };
  }
}

export function deleteFile(filePath : string) {
  try {
    let fullPath = path.join (pathToUploadFolder, 'uploads');
    let filePathArray = filePath.split('/');
    filePathArray.forEach(pathItem => {
      fullPath = path.join(fullPath, pathItem)
    })
    
    // Check if the file exists
    if (!fs.existsSync(fullPath)) {
      return { status: 2, title: "File Not Found", desc: `The specified file does not exist. path: ${fullPath}`, data: null };
    }

    // Delete the file
    fs.unlinkSync(fullPath);

    return { status: 1, title: "Deletion Successful", desc: "File has been deleted successfully.", data: null };
  } catch (error) {
    console.error('Error deleting file:', error);
    return { status: 0, title: "Deletion Failed", desc: "An error occurred while trying to delete the file.", data: null };
  }
}