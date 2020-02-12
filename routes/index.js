const {Router} = require('express');
const multer = require('multer');
const Order = require('../models/Order');

const router = Router();

const fileFilter = (req, file, cb) => {
  if(file.mimetype === "application/vnd.ms-excel"){
    cb(null, true);
  }
  else{
    cb(null, false);
  }
};

router.post('/fileupload', multer({fileFilter: fileFilter}).single("filedata"), async (req, res) => {
  try {
    if (typeof req.file === "undefined") {
      res.status(500).json({ message: 'Only csv files are allowed.' });
    }

    const arr1 = req.file.buffer.toString().split('\n').map((item) => item.replace('\r','').split('; '));
    console.log(arr1);

    const arr2 = [];
    for (let i = 1, len = arr1.length; i < len; i++) {
      const obj = {};
      for (let j = 0, len0 = arr1[0].length; j < len0; j++) {
        obj[arr1[0][j]] = isFinite(arr1[i][j]) ? arr1[i][j]*1 : arr1[i][j]
      }
      arr2.push(obj)
    }
    console.log(arr2);

    for (let i = 0, len = arr2.length; i < len; i++) {
      const { user_email, date, value, currency, status } = arr2[i];
      const existing = await Order.findOne({ user_email, date, value, currency, status });
      if (!existing) {
        const order = new Order({ user_email, date, value, currency, status });
        await order.save();
      }
    }

  } catch (e) {
    res.status(500).json({ message: 'Something went wrong, try again' });
  }
});

module.exports = router;