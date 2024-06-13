const mongoose = require('mongoose');
const {Schema , model}=mongoose;

const TransactionSchema = new Schema(
 {  
    name:{
      type:String , 
      required:true,
    },
    price:{
       type:Number,
       required:true,
    },
    dateTime:{
       type:Date,
       required:true,
    },
    category:{
      type:String,
      required:true,
    },
 }
);


const TransactionModel = model('Transaction',TransactionSchema);

module.exports= TransactionModel;