import multer from 'multer'
import path from 'path'

const uploadDir = path.join('/Users/salvatoredininni/Documents/GitHub/meme-editor-backend/src/', 'uploads')

// Create a directory to store uploaded videos

const storage = multer.diskStorage({
  destination: function (
    req: Request, 
    file: unknown, 
    cb: (error: Error | null, destination: string) => void
    ) {
    cb(null, uploadDir)
  },
  filename: function (
    req: Request, 
    file: unknown
    , 
    cb: (error: Error | null, destination: string) => void
    ) {
    cb(null, Date.now() + '-' + file.originalname)
  }
})

const upload = multer({ storage: storage })

export default upload