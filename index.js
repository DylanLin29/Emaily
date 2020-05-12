const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send({ hi: 'there' })
});

const PORT = process.env.PORT || 5000; // The prior statement will be called if there app is running on Heroku
app.listen(PORT);