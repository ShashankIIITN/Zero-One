const ConnectToDatabase = require('./dbconnect');
const express = require('express')
var cors = require('cors')




ConnectToDatabase();
const app = express()
const port = 4000

app.use(cors())
app.use(express.json());

app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));
app.use('/api/tabs', require('./routes/tabdata'));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})