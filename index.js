const express = require('express');
const bodyParser = require('body-parser');
const pokedexRouter = require('./api/src/routers/router');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use('/', pokedexRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})