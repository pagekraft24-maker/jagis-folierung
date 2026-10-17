const path = require('path');
module.exports = {
  content: [path.join(__dirname, '../*.html'), path.join(__dirname, 'build.mjs'), path.join(__dirname, '../assets/js/main.js')],
  theme: { extend: {} },
  plugins: [],
};
