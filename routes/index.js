const {Router} = require('express');
const multer = require('multer');
const Order = require('../models/Order');
const fs = require('fs');

const router = Router();

const fileFilter = (req, file, cb) => {
  if(file.mimetype === "application/vnd.ms-excel"){
    cb(null, true);
  }
  else{
    cb(null, false);
  }
};

const validateEmail = (email) => /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9_.-]+[,.][a-zA-Z0-9_.-]+$/.test(email);
const validateDate = (date) => {
  const dt = date.replace(/[.:]/g, ' ').split(' ');
  const d = new Date(dt[2], dt[1], dt[0], dt[3], dt[4], dt[5]);
  const datestring = ("0" + d.getDate()).slice(-2) + "." + ("0"+(d.getMonth())).slice(-2) + "." +
    d.getFullYear() + " " + ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2) + ":" + ("0" + d.getSeconds()).slice(-2);
  return datestring === date
};
const validateValue = (value) => isFinite(value*1) && value*1 > 0;
const validateCurrency = (currency) => typeof currency === "string";
const validateStatus = (status) => status === 'approved' ? true : status === 'pending' ? true : status === 'rejected';

const monthName = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

router.post('/fileupload', multer({fileFilter: fileFilter}).single("filedata"), async (req, res) => {
  try {
    if (typeof req.file === "undefined") {
      res.status(500).json({ message: 'Only csv files are allowed.' });
    }

    let arr1 = req.file.buffer.toString().split('\n').map((item) => item.replace('\r','').split('; '));

    const arr2 = [];
    for (let i = 1, len = arr1.length; i < len; i++) {
      const obj = {};
      for (let j = 0, len0 = arr1[0].length; j < len0; j++) {
        obj[arr1[0][j]] = arr1[i][j]
      }
      arr2.push(obj)
    }

    arr1 = arr2.filter((item) => validateEmail(item['user_email']) && validateDate(item['date']) && validateValue(item['value']) && validateCurrency(item['currency']) && validateStatus(item['status']));

    if (arr1.length === 0) {
      res.status(500).json({ message: 'Data is not valid' });
    } else if (arr1.length < arr2.length) {
      res.status(500).json({ message: 'Not all data is valid' });
    } else {
      for (let i = 0, len = arr1.length; i < len; i++) {
        const { user_email, date, value, currency, status } = arr2[i];

        const dt = date.replace(/[.:]/g, ' ').split(' ');
        const d = new Date(dt[2], dt[1], dt[0], dt[3], dt[4], dt[5]);

        const existing = await Order.findOne({ user_email, date: d, value: value*1, currency, status });
        if (!existing) {
          const order = new Order({ user_email, date: d, value: value*1, currency, status });
          await order.save();
        }
      }
      res.status(200).json({ message: 'Success' });
    }
  } catch (e) {
    res.status(500).json({ message: 'Something went wrong, try again' });
  }
});

router.get('/getorderslist', async (req, res) => {
  try {
    const {page, limit, sortBy} = req.query;

    const orders = await Order.paginate({}, { page: page*1, limit: limit*1, sort: sortBy });
    res.json(orders);
  } catch (e) {
    res.status(500).json({ message: 'Something went wrong, try again' });
  }
});

router.get('/getreport', async (req, res) => {
  try {
    const writeStream = fs.createWriteStream('report.csv');
    writeStream.write(`user_email  |  date  | amount\n`);

    const existing = await Order.find({ status: 'approved' });
    if (existing) {
      const arr = [];
      let index;
      existing.forEach((existingItem) => {
        index = -1;
        const obj = {user_email: existingItem['user_email'], date: monthName[existingItem['date'].getMonth()-1] + ' ' + existingItem['date'].getFullYear(), value: existingItem['value'], currency: existingItem['currency']};
        for (let i = 0, len = arr.length; i < len; i++) {
          if (arr[i]['user_email'] === obj.user_email && arr[i]['date'] === obj.date && arr[i]['currency'] === obj.currency) {
            index = i
          }
        }

        if (index !== -1) {
          arr[index]['value'] = Math.round((arr[index]['value'] + obj.value) *100) / 100
        } else {
          arr.push(obj)
        }
      });

      for (let i = 0, len = arr.length; i < len; i++) {
        const { user_email, date, value } = arr[i];

        writeStream.write(`${user_email}  |  ${date} | ${value}\n`);
      }

      return res.status(200).json({ message: 'Success' });
    }
    res.status(200).json({ message: 'No data' });
  } catch (e) {
    res.status(500).json({ message: 'Something went wrong, try again' });
  }
});

module.exports = router;