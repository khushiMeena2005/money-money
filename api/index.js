const express = require('express');
const cors = require('cors');
require('dotenv').config();
const Transaction = require('./models/Transaction');
const { default: mongoose } = require('mongoose');
const app = express();



app.use(cors());
app.use(express.json());
app.get('/api/test',(req, res)=>{
   res.json({body:'test ok bro '});
});




app.post("/api/transaction", async (req, res) => {
  try {
    console.log("Connecting to MongoDB database...");
    await mongoose.connect(process.env.MONGO_URL);

    console.log("MongoDB database connected successfully!");

    // Check if all required fields are present in the request body
    if (
      !req.body.name ||
      !req.body.dateTime ||
      !req.body.price ||
      !req.body.category
    ) {
      res.status(400).send("Missing required fields");
      return;
    }

    // Create a new transaction with the data from the request body
    const {name, dateTime,price,category} = req.body;
    const transaction = await Transaction.create({
      name,
       dateTime,
       price,
       category,
    });

    res.json(transaction);
  } catch (error) {
    console.error("Error connecting to MongoDB database:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/api/transaction", async (req, res) => {
  await mongoose.connect(process.env.MONGO_URL);
  const transactions = await Transaction.find();
  res.json(transactions);
});


app.delete("/api/delete/:id", async(req,res)=>{
     await mongoose.connect(process.env.MONGO_URL);
  const id = req.params.id;
  console.log(id);
  const data=await Transaction.deleteOne({_id:id})
  res.send({success:true, message:"data deleted successfully", data:data});
})




app.listen({port:4040});

