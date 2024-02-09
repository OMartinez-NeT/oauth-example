
const handler = require('./functions/auth-callback');
const express = require('express');
const app = express();


app.get('/callback', (req, res) => {
    res.send('Hello World');
})

app.listen(3000, () => {
    console.log('Server is running on port 3000');
})