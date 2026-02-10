import { Schema, model } from "mongoose";

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    mainImage: {
      type: String, // URL or file path
      required: true,
    },

    images: {
      type: [String], // array of image URLs
      validate: {
        validator: function (arr) {
          return arr.length <= 5;
        },
        message: "You can upload up to 5 additional images only",
      },
      default: [],
    },

    description: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
      enum: [
        "luxury",
        "sports",
        "casual",
        "smart",
        "vintage",
      ], // you can change these anytime
    },
  },
  {
    timestamps: true,
  }
);

export default model("Product", productSchema);
