const express = require('express');

const app = express();

app.disable('x-powered-by');

const port = process.env.port || 7182;

// Register middlewares
app.use(express.json());

// Start the server
app.listen(port, () => console.log(`Server listening on port ${port}`));