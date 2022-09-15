const express = require('express');
const port = 3000;
const app = express();
const routes = require('./routes');

app.use(express.json());
app.use(routes);

app.listen(port, () => {

    console.log(` http://localhost:${port}`);
})

