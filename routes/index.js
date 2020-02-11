const {Router} = require('express');
const multer = require('multer');
const csv = require('csvtojson');

const router = Router();

const fileFilter = (req, file, cb) => {
  if(file.mimetype === "application/vnd.ms-excel"){
    cb(null, true);
  }
  else{
    cb(null, false);
  }
};

router.post('/fileupload',  multer({fileFilter: fileFilter}).single("filedata"), async (req, res) => {
  try {
    if (typeof req.file === "undefined") {
      res.status(500).json({ message: 'Only csv files are allowed.' });
    }

    const csvToJson = await csv().fromString(req.file.buffer.toString());
    console.log(csvToJson);
  } catch (e) {
    res.status(500).json({ message: 'Something went wrong, try again' });
  }
});

module.exports = router;