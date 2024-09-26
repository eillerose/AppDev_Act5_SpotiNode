const spotMod = require('../models/spotMod');

exports.getSongs = (req, res) => {
    spotMod.getSongs((err, results) => {
        if (err) {
            console.error('Error fetching songs: ', err);
            return res.status(500).send('Error fetching songs');
        }

        res.render('index', { 
            song: 'Audio Player Example', 
            tracks: results 
        });
    });
};


exports.showUploadForm = (req, res) => {
    res.render('upload');
};

// Add a new song
exports.AddMusic = (req, res) => {
    const musicData = {
        song: req.body.song,
        artist: req.body.artist,
        img_path: req.files['image_cover'][0].path,  
        file_path: req.files['songFile'][0].path 
    };

    spotMod.AddMusic(musicData, (err, result) => {
        if (err) {
            console.error('Error adding song: ', err);
            return res.status(500).send('Error adding song');
        }
        res.redirect('/'); 
    });
};


exports.getSongById = (req, res) => {
    const musicid = req.params.id;

    spotMod.getSongById(musicid, (err, result) => {
        if (err) {
            console.error('Error fetching song by ID: ', err);
            return res.status(500).send('Error fetching song by ID');
        }
        res.render('editForm', { song: result[0] });
    });
};


exports.UpdateMusic = (req, res) => {
    const musicid = req.params.id;
    const updatedmusicData = {
        song: req.body.song,
        artist: req.body.artist,
        img_path: req.body.img_path, 
        file_path: req.file ? req.file.path : req.body.file_path 
    };

    spotMod.UpdateMusic(musicid, updatedmusicData, (err, result) => {
        if (err) {
            console.error('Error updating song: ', err);
            return res.status(500).send('Error updating song');
        }
        res.redirect('/');
    });
};


exports.DeleteMusic = (req, res) => {
    const musicid = req.params.id;

    spotMod.DeleteMusic(musicid, (err, result) => {
        if (err) {
            console.error('Error deleting song: ', err);
            return res.status(500).send('Error deleting song');
        }
        res.redirect('/');
    });
};
