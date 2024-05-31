const express = require('express')
const app = express()
const cors = require('cors')
const dotenv = require("dotenv").config();
const port = process.env.PORT 
/* require('../Server/models/ProductModel')
require('../Server/models/Users') */

/* const corsOpts = {
    origin: '*',
  
    methods: [
      'GET',
      'POST',
      'PUT',
      'DELETE'
    ],
  
    allowedHeaders: [
      'Content-Type',
    ],
  };

app.use(cors(corsOpts)) */
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended:false}))
app.use("/uploads", express.static("uploads"));



app.use("/products",require("./routes/productRoutes"))
app.use("/users",require("./routes/userRoutes"))
app.use("/login",require("./routes/loginRoutes"))



app.listen(port,()=>console.log(`Server is Running on Port:${port}`));