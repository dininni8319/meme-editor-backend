import express, { Request, Response } from 'express';
import cors from 'cors'
import upload from './middlewares/file-upload';
import path from 'path'
import fs from 'fs'

const app = express();
const port = 8000;
app.use(cors())
const uploadPath = path.join(__dirname, 'uploads')
app.use("/uploads", express.static(uploadPath))

app.get('/videos', (req: Request, res: Response) => {
  fs.readdir(uploadPath, (err: NodeJS.ErrnoException | null, files: string[]) => {
    if (err) {
      return res.status(500).json({messega: "Error reading the upload directory"})
    } else {
      const videoFiles = files.filter((file: string) => file.endsWith('.mp4'))
      res.status(200).json(videoFiles)
    }
})
  
})
// Upload a video
app.post('/upload', upload.single('file'), (req: Request, res: Response) => {
  // Check if file is present
  if (!req.file) {
    res.status(400).json({ message: 'Please upload a file!' });
    return;
  }
  res.json({ message: 'Video uploaded successfully!' });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});