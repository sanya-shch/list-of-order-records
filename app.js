const express = require('express');
const config = require('config');
const cors = require('cors');

const app = express();
app.use(cors());

app.use('/', require('./routes'));

const PORT = config.get('port') || 5000;

(async function(){
  try {
    app.listen(PORT, () => console.log('App has been started...'));
  } catch (e) {
    console.log('Server Error', e.message);
    process.exit(1);
  }
})();