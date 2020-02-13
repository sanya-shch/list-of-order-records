const express = require('express');
const config = require('config');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());

app.use(express.json({ extended: false }));

app.use('/', require('./routes'));

const PORT = config.get('port') || 5000;

(async function(){
  try {
    await mongoose.connect(config.get('mongoUri'), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    });
    app.listen(PORT, () => console.log('App has been started...'));
  } catch (e) {
    console.log('Server Error', e.message);
    process.exit(1);
  }
})();