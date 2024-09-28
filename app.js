const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const spotroute = require('./routes/spotroute');  // Correctly import the router
const app = express();
const PORT = process.env.PORT || 3030;

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));  // Serve static files from public folder

app.use('/', spotroute);  // This applies all routes in spotroute.js, including /my-playlist

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
