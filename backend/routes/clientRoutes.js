const express = require("express");
const router = express.Router();
const clientController = require("../controllers/clientController");
const upload = require("../middleware/upload");
const cropImage = require("../utils/imageCropper");
const fs = require("fs");
const path = require("path");

router.get("/", clientController.getAllClients);

router.post("/", upload.single("image"), async (req, res) => {
  try {
    if (!req.file)
      return res.status(400).json({ message: "Image is required" });

    const croppedBuffer = await cropImage(req.file.buffer);
    const imageName = `client-${Date.now()}.jpg`;
    const imagePath = path.join(__dirname, "..", "uploads", imageName);
    fs.writeFileSync(imagePath, croppedBuffer);

    const client = await clientController.createClient({
      name: req.body.name,
      designation: req.body.designation,
      description: req.body.description,
      imageUrl: `/uploads/${imageName}`,
    });

    res.status(201).json(client);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
