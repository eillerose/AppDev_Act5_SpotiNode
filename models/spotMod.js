const db = require('../config/db');

// Function to get all songs
exports.getMusic = (callback) => {
    const query = 'SELECT * FROM music';  // Make sure the table name matches your database
    db.query(query, callback);
};

// Function to add a new song
exports.AddMusic = (musicData, callback) => {
    const query = 'INSERT INTO music SET ?';  // Insert song data into the database
    db.query(query, musicData, callback);
};

// Function to get a song by ID
exports.getSongById = (musicid, callback) => {
    const query = 'SELECT * FROM music WHERE id = ?';
    db.query(query, [musicid], callback);
};

// Function to update a song by ID
exports.UpdateMusic = (musicid, updatedmusicData, callback) => {
    const query = 'UPDATE music SET ? WHERE id = ?';
    db.query(query, [updatedmusicData, musicid], callback);
};

// Function to delete a song by ID
exports.DeleteMusic = (musicid, callback) => {
    const query = 'DELETE FROM music WHERE id = ?';
    db.query(query, [musicid], callback);
};
