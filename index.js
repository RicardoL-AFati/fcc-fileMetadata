const express = require('express');
const cors = require('cors');
const path = require('path');
/* package for handling multipart/form-data 
(POST req encoding format for sending files) */
const multer = require('multer');

const app = express();
// creating instance of multer with no options
const upload = multer();
// enabling cors and serving static assets
app.use(cors({ optionsSuccessStatus: 200 }));
app.use(express.static('build'));
// POST ROUTE
app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
  // specifying size type based on uploaded file size - for returned JSON prop
  const sizeType = req.file.size / 1024 / 1024 < 1 ? 'size in bytes' : 'size in MB';
  // file size is in bytes. If conversion to MB is > 1 - show MB - else show bytes size
  // returned JSON shows - file name, type, size
  res.send({
    name: req.file.originalname,
    type: req.file.mimetype,
    [sizeType]: sizeType === 'size in bytes' ? req.file.size : req.file.size / 1024 / 1024,
  });
});
// GET ROUTE
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
});
// PORT is either prod server or localhost port
const PORT = process.env.PORT || 5000;
app.listen(PORT);
