import { v2 as cloudinary } from "cloudinary";
import "dotenv/config";

function initialize() {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
    secure: true,
  });
}

export function deleteCloudImage(publicId) {
  initialize();
  cloudinary.uploader.destroy(publicId, (error, result) =>
    console.log(error, result)
  );
}
