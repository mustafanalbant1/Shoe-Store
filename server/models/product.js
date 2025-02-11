const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Ürün adı zorunludur"],
    },
    description: {
      type: String,
      required: [true, "Ürün açıklaması zorunludur"],
    },
    price: {
      type: Number,
      required: [true, "Ürün fiyatı zorunludur"],
      min: 0,
    },
    category: {
      type: String,
      required: [true, "Kategori zorunludur"],
    },
    images: [
      {
        public_id: String,
        url: String,
      },
    ],
    rating: {
      type: Number,
      default: 0,
    },
    stock: {
      type: Number,
      required: true,
      default: 0,
    },
    // Yeni alanlar
    color: {
      type: String,
      required: false,
    },
    size: {
      type: Number,
      required: false,
      min: 20, // Örnek minimum ayakkabı numarası
      max: 50, // Örnek maksimum ayakkabı numarası
    },
    brand: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
