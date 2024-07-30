const express = require('express');
const cors = require("cors");
const productRouter = require("../api/routes/products");
const app = express();
const PORT = 8080;

app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use("/api/products", productRouter);

app.listen(PORT, ()=>{
    console.log(`server listening on port ${PORT}...`)
});