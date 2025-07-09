import { v2 as cloudinary } from "cloudinary";
import fs from "fs"
import dotenv from "dotenv"
dotenv.config()
cloudinary.config({
  cloud_name: 'dzcaqsphu',
  api_key: '916644529253666',
  api_secret: 'KTDyuls8JX7jWLIB2pLBqGver5c',
});

const uploadOnCloudinary = async (localFilepath) => {
  try {
    if (!localFilepath) return null;
    const response = await cloudinary.uploader.upload(localFilepath, {
      resource_type: "auto",
    });

    console.log("✅ File uploaded on Cloudinary:", response);
    return response;
    
  } catch (error) {
    console.error("❌ Cloudinary upload error:", error); // <- Add this
    fs.unlinkSync(localFilepath);
    return null;
  }
};

export  {uploadOnCloudinary} ;