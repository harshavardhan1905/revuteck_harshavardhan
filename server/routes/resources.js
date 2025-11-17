const express = require("express");
const multer = require("multer");
const Resource = require("../models/Resource");
const router = express.Router();

// MULTER STORAGE
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/resources/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage });

// UPLOAD RESOURCE
router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    const { title } = req.body;

    const newFile = await 
    Resource.create({
      title,
      filePath: req.file.path,
      fileName: req.file.filename
    });

    res.json({ message: "File uploaded successfully", file: newFile });

  } catch (err) {
    res.status(500).json({ message: "Server error", err });
  }
});

// GET ALL RESOURCES
router.get("/", async (req, res) => {
  const resources = await Resource.find();
  res.json({ resources });
});

// DELETE FILE
router.delete("/:id", async (req, res) => {
  try {
    const resItem = await Resource.findById(req.params.id);
    if (!resItem) return res.status(404).json({ message: "Resource not found" });

    const fs = require("fs");
    fs.unlinkSync(resItem.filePath);

    await resItem.deleteOne();
    res.json({ message: "Resource deleted successfully" });

  } catch (err) {
    res.status(500).json(err.message);
  }
});

// EDIT TITLE
router.put("/:id", async (req, res) => {
  try {
    const updated = await Resource.findByIdAndUpdate(
      req.params.id,
      { title: req.body.title },
      { new: true }
    );

    res.json({ message: "Updated successfully", updated });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
