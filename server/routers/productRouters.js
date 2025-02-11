const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

// Test route
router.get("/shoestroe", (req, res) => {
  res.json({ message: "Product routes are working" });
});

// Tüm ürünleri getir
router.get("/", async (req, res) => {
  try {
    console.log("Fetching products..."); // Debug için
    const products = await Product.find();
    console.log("Products found:", products); // Debug için
    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error); // Debug için
    res.status(500).json({ message: error.message });
  }
});

// Yeni ürün ekle (test için)
router.post("/", async (req, res) => {
  try {
    const product = new Product({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
      images: req.body.images || [],
      stock: req.body.stock || 0,
    });

    const savedProduct = await product.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// ID'ye göre ürün getir
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: "Ürün bulunamadı" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Ürün güncelle
router.put("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      product.name = req.body.name || product.name;
      product.description = req.body.description || product.description;
      product.price = req.body.price || product.price;
      product.category = req.body.category || product.category;
      product.images = req.body.images || product.images;
      product.stock = req.body.stock || product.stock;

      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } else {
      res.status(404).json({ message: "Ürün bulunamadı" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Ürün sil
router.delete("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      await product.deleteOne();
      res.json({ message: "Ürün silindi" });
    } else {
      res.status(404).json({ message: "Ürün bulunamadı" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
