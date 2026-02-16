import { Schema, model } from "mongoose";

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    mainImage: {
      type: String,
      required: true,
    },

    images: {
      type: [String],
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
      enum: ["luxury", "sports", "casual", "smart", "vintage"],
    },

    // ✅ Main Price (Required)
    price: {
      type: Number,
      required: true,
      min: 0,
    },

    // ✅ Discounted Price (Optional)
    discountedPrice: {
      type: Number,
      min: 0,
      validate: {
        validator: function (value) {
          // Allow empty
          if (!value) return true;

          // Discounted price must be less than original price
          return value < this.price;
        },
        message: "Discounted price must be less than original price",
      },
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

// ✅ Virtual: Final price to show customer
productSchema.virtual("finalPrice").get(function () {
  return this.discountedPrice || this.price;
});

// ✅ Virtual: Check if product is discounted
productSchema.virtual("isDiscounted").get(function () {
  return !!this.discountedPrice;
});

export default model("Product", productSchema);
