const express = require('express');
const groceriesRoute = require('./routes/groceries');
const marketRoute = require('./routes/markets');

const app = express();
const PORT = 3001;

//  MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded());
app.use((req, res, next) => {
    console.log(`${req.method}: ${req.url}`);
    next();
  }
);

app.use("/api/v1/groceries", groceriesRoute);
app.use("/api/v1/market", marketRoute);


app.listen(PORT, () => console.log(`Express Server started and running on port: ${PORT}`));

