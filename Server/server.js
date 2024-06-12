const express = require('express')
const app = express()
const cors = require('cors')
const dotenv = require("dotenv").config();
const port = process.env.PORT 
/* require('../Server/models/ProductModel')
require('../Server/models/Users') */

/* const corsOpts = {
    origin:  ['http://localhost:'],
  
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



app.use("/products",cors(),require("./routes/productRoutes"))
app.use("/users",cors(),require("./routes/userRoutes"))
app.use("/login",cors(),require("./routes/loginRoutes"))
app.use("/roles",cors(),require("./routes/rolesRoutes"))
app.use("/modules",cors(),require("./routes/modulesRoutes"))
app.use("/accessDetails",cors(),require("./routes/accessRoutes"))

app.listen(port,()=>console.log(`Server is Running on Port:${port}`));