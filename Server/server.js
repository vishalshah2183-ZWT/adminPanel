const express = require('express')
const app = express()
const cors = require('cors')
const dotenv = require("dotenv").config();
const port = process.env.PORT 

app.use(express.json());
app.use(cors())
app.use("/products",require("./routes/productRoutes"))
app.listen(port,()=>console.log(`Server is Running on Port:${port   }`));