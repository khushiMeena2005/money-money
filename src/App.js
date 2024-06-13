import "./App.css";
import { useEffect, useState } from 'react';
import KhataBook from "./KhataBook";
import axios from "axios";

import "./index.css";

axios.defaults.baseURL= process.env.REACT_APP_API_URL

function App() {

const [name , setName]= useState('');
const [price , setPrice]= useState('');
const [dateTime , setDateTime]= useState('');
const [transactions , setTransactions]= useState('');
const [category,setCategory]=useState('Income');

useEffect(()=>{
  getTransactions().then(setTransactions);

},[]);

  async function getTransactions() {
  const url = (process.env.REACT_APP_API_URL + "/transaction");
    const response = await fetch(url,{
      method:"GET",
    });
    return await response.json();
  }
  
 async function handleDelete(id){
    const data = axios.delete("/delete/"+id)

    if(data.success){
      getTransactions();
      alert(data.message);
    }
   
  // alert("Deleted successfully");
  
window.location.reload();
  }

 
function addNewTransactions(e){
  e.preventDefault();
  const url= process.env.REACT_APP_API_URL + '/transaction';
  console.log(url);
 //console.log('date time is',dateTime)
  //const price= name.split(" ")[0];
     fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        price,
        name,
        dateTime,
        category,
      }),
    }).then((response) => {
      response.json().then((json) => {
        setName("");
        setPrice("");
        setDateTime('');
        setCategory('');
        console.log("result", json);
      });
    });
 // alert("added successfully");
  
window.location.reload();
  }  

  let balance=0;
  let kharcha=0;
  let aayapaisa=0;
  for(const transaction of transactions){
    if(transaction.category ==='Income'){
       balance = balance + transaction.price;
       aayapaisa = aayapaisa+ transaction.price;
    }
    else{
      kharcha = kharcha + transaction.price;
       balance = balance - transaction.price;
    }
  }
 // balance = balance.toFixed(2);
 

  return (
    <main className="container">
  
      <h1>Money Tracker</h1>

       <div className="diary"> 
   
        <h2 className="spendings">Expenses: ₹
         {kharcha}
      </h2>
       <h2 className="income">Income : ₹
         {aayapaisa}
      </h2>
       </div>
    
    { /*}  
      <form onSubmit={addNewTransactions} id='form'>
    
      <select onChange={e => setCategory(e.target.value)}>
       <option value="Income">Income</option>
      <option value="Expenses">Expenses</option>
       </select>
          <input type="text" value={price}
          onChange={e=>setPrice(e.target.value)}
          placeholder={"price"} />
            <input type="text" value={name}
          onChange={e=>setName(e.target.value)}
          placeholder={"discription"} />
         <input value={dateTime}
          onChange={e=>setDateTime(e.target.value)} 
           type="date" /> 
      
      <button type='submit' >Add</button>
     
      </form>
 
  */}
      
       <form onSubmit={addNewTransactions} id='form' className="horizontalForm">
  <div className="form-row">
    <label htmlFor="category">Category:</label>
    <select id="category" onChange={e => setCategory(e.target.value)}>
      <option value="Income">Income</option>
      <option value="Expenses">Expenses</option>
    </select>
  </div>
  <div className="form-row">
    <label htmlFor="price">Price:</label>
    <input type="text" id="price" value={price} onChange={e => setPrice(e.target.value)} placeholder="Price" />
  </div>
  <div className="form-row">
    <label htmlFor="name">Description:</label>
    <input type="text" id="name" value={name} onChange={e => setName(e.target.value)} placeholder="Description" />
  </div>
  <div className="form-row">
    <label htmlFor="dateTime">Date:</label>
    <input type="date" id="dateTime" value={dateTime} onChange={e => setDateTime(e.target.value)} />
  </div>
  <button type="submit">Add</button>
</form>



        <KhataBook transactions={transactions} setTransactions={setTransactions} onDeleteClick={handleDelete} /> 
    
       <h2 className="diary balance"> Total Balance: ₹
         {balance}
      </h2>
     
      
    </main>
  );
}

export default App;
/*
  */