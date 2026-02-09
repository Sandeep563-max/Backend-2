import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import dotenv from "dotenv";

// This ensures that even if index.js is slow, this file has access to the keys
dotenv.config();

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET, 
});

// Just for debugging - you can remove this after it works
console.log("Cloudinary Configured with Key:", process.env.CLOUDINARY_API_KEY ? "YES" : "NO");

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null;
        
        // Upload the file to cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto",
        });
        
        // Success!
        if (fs.existsSync(localFilePath)) fs.unlinkSync(localFilePath);
        return response;

    } catch (error) {
        console.log("CLOUDINARY UPLOAD ERROR:", error.message);
        // if (fs.existsSync(localFilePath)) fs.unlinkSync(localFilePath);
        return null;
    }
};

export { uploadOnCloudinary };