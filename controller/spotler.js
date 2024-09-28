const spotMod = require('../models/spotMod');

// Fetch and display all songs
exports.getMusic = (req, res) => {
    spotMod.getMusic((err, results) => {
        if (err) {
            console.error('Error fetching songs:', err);
            return res.status(500).send('Error fetching songs');
        }
        res.render('index', { 
            song: 'Audio Player Example', 
            tracks: results 
        });
    });
};

// Add a new song
exports.AddMusic = (req, res) => {
    // Check if files exist
    if (!req.files || !req.files['image_cover'] || !req.files['songFile']) {
        return res.status(400).send('Song file and cover image are required');
    }

    const musicData = {
        song: req.body.song,
        artist: req.body.artist,
        img_path: req.files['image_cover'][0].path,  // Correctly reference the image cover path
        file_path: req.files['songFile'][0].path     // Correctly reference the song file path
    };

    spotMod.AddMusic(musicData, (err, result) => {
        if (err) {
            console.error('Error adding song:', err);
            return res.status(500).send('Error adding song');
        }
        res.redirect('/');  // Redirect after successful upload
    });
};

// Show the upload form
exports.showUploadForm = (req, res) => {
    res.render('upload');
};

// Add a new song
exports.AddMusic = (req, res) => {
    // Check for uploaded files
    if (!req.files || !req.files['image_cover'] || !req.files['songFile']) {
        return res.status(400).send('Song file and cover image are required');
    }

    const musicData = {
        song: req.body.song,
        artist: req.body.artist,
        img_path: req.files['image_cover'][0].path,  // Correctly reference the image cover path
        file_path: req.files['songFile'][0].path     // Correctly reference the song file path
    };

    spotMod.AddMusic(musicData, (err, result) => {
        if (err) {
            console.error('Error adding song:', err);
            return res.status(500).send('Error adding song');
        }
        res.redirect('/');  // Redirect after successful upload
    });
};

// Get a song by ID and show in the form
exports.getSongById = (req, res) => {
    const musicid = req.params.id;

    spotMod.getSongById(musicid, (err, result) => {
        if (err) {
            console.error('Error fetching song by ID:', err);
            return res.status(500).send('Error fetching song by ID');
        }
        res.render('editForm', { song: result[0] });
    });
};

// Update song details
exports.UpdateMusic = (req, res) => {
    const musicid = req.params.id;

    const updatedmusicData = {
        song: req.body.song,
        artist: req.body.artist,
        img_path: req.body.img_path,  // Use existing image path if not uploading new
        file_path: req.files && req.files['songFile'] ? req.files['songFile'][0].path : req.body.file_path  // If no new song file, use existing
    };

    spotMod.UpdateMusic(musicid, updatedmusicData, (err, result) => {
        if (err) {
            console.error('Error updating song:', err);
            return res.status(500).send('Error updating song');
        }
        res.redirect('/');  // Redirect after successful update
    });
};

// Delete a song by ID
exports.DeleteMusic = (req, res) => {
    const musicid = req.params.id;

    spotMod.DeleteMusic(musicid, (err, result) => {
        if (err) {
            console.error('Error deleting song:', err);
            return res.status(500).send('Error deleting song');
        }
        res.redirect('/');  // Redirect after successful delete
    });
};
