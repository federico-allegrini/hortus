import { list } from "@keystone-next/keystone/schema";
import { relationship, text } from "@keystone-next/fields";
import { cloudinaryImage } from "@keystone-next/cloudinary";
import { deleteCloudImage } from "../lib/cloudinary";
import "dotenv/config";

export const cloudinaryConfig = {
  cloudName: process.env.CLOUDINARY_CLOUD_NAME,
  apiKey: process.env.CLOUDINARY_KEY,
  apiSecret: process.env.CLOUDINARY_SECRET,
  folder: "hortus/cultivation-area",
};

export default list({
  fields: {
    image: cloudinaryImage({
      cloudinary: cloudinaryConfig,
      label: "Source",
    }),
    altText: text(),
    cultivationArea: relationship({
      ref: "CultivationArea.photos",
      ui: {
        hideCreate: true,
      },
    }),
  },
  ui: {
    listView: {
      initialColumns: ["image", "altText", "cultivationArea"],
    },
  },
  hooks: {
    afterDelete({ existingItem }) {
      deleteCloudImage(existingItem.image._meta.public_id);
    },
  },
});
