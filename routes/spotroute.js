const express = require('express');
const router = express.Router();
const spotler = require('../controller/spotler');
const multer = require('multer');
const path = require('path');

// Multer storage setup for handling file uploads
const storage = multer.diskStorage({
    destination: './uploads/',
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));  // Create unique filenames
    },
});

const upload = multer({ storage });

// Routes
router.get('/', spotler.getMusic);  // Get all songs
router.get('/upload', spotler.showUploadForm);  // Show upload form
router.get('/my-playlist', (req, res) => {
    res.render('playlist');  // Render the playlist.ejs view
});

// Update field names to match those used in the controller
router.post('/upload', upload.fields([{ name: 'image_cover', maxCount: 1 }, { name: 'songFile', maxCount: 1 }]), spotler.AddMusic);

router.get('/edit/:id', spotler.getSongById);  // Get song by ID for editing
router.post('/edit/:id', upload.fields([{ name: 'image_cover', maxCount: 1 }, { name: 'songFile', maxCount: 1 }]), spotler.UpdateMusic);  // Update song
router.post('/delete/:id', spotler.DeleteMusic);  // Delete song

module.exports = router;
