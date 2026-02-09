import multer from "multer"
import path from "path" // Import this

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // This ensures the path is absolute and reachable on Windows
    cb(null, path.resolve("./public/temp")) 
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})

export const upload = multer({ 
    storage,
})