const express = require("express");
const router = express.Router();
const projectController = require("../controllers/projectController");
const upload = require("../middleware/upload");
const cropImage = require("../utils/imageCropper");
const fs = require("fs");
const path = require("path");

router.get("/", projectController.getAllProjects);

router.post("/", upload.single("image"), async (req, res) => {
  try {
    if (!req.file)
      return res.status(400).json({ message: "Image is required" });

    const croppedBuffer = await cropImage(req.file.buffer);
    const imageName = `project-${Date.now()}.jpg`;
    const imagePath = path.join(__dirname, "..", "uploads", imageName);
    fs.writeFileSync(imagePath, croppedBuffer);

    const project = await projectController.createProject({
      name: req.body.name,
      description: req.body.description,
      imageUrl: `/uploads/${imageName}`,
    });

    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
