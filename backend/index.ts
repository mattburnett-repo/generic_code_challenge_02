
require('dotenv').config()

// '.js' and not '.ts' because we run the server from the 'dist' directory, after TSC emits the files.
const app = require('./server.js')
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
})

module.exports = app;