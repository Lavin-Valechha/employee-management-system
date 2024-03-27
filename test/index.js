const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const Employee = require('./models/employee.model.js');

const app = express()
const cors = require('cors');
app.use(cors());

// Middleware for logging incoming requests
app.use(morgan('dev'));

//middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));


app.get('/',(req,res) =>{
    res.send('this is a new port');
});

app.get('/employees', async (req,res)=>{
    try {
        const employees = await Employee.find({});
        res.status(200).json(employees);
        
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

app.get('/employees/:id', async (req,res)=>{
    try {
        const{id} = req.params;
        const employee = await Employee.findById(id);
        res.status(200).json(employee);
        
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

app.post('/employees', async (req,res)=>{
    try {
        const employee = await Employee.create(req.body);
        res.status(200).json(employee);
        
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

app.put('/employees/:id', async (req,res)=>{

    try {
        const{id} = req.params;
        const employee = await Employee.findByIdAndUpdate(id, req.body);
        
        if (!employee) {
            return res.status(404).json({message: "employee not found."});
        }
        const updatedEmployee = await Employee.findById(id);
        res.status(200).json(updatedEmployee);

        
    } catch (error) {
        res.status(500).json({message: error.message});
        
    }
});

app.delete('/employees/:id', async (req,res)=>{

    try {
        const{id} = req.params;
        const employee = await Employee.findByIdAndDelete(id);
        
        if (!employee) {
            return res.status(404).json({message: "employee not found."});
        }

        res.status(200).json({message: "Employee data deleted successfully."});

        
    } catch (error) {
        res.status(500).json({message: error.message});
        
    }
});

mongoose
  .connect(
    "mongodb+srv://mspednekar6603:MwylxC57CL9Qyl1G@backenddb.qxennl1.mongodb.net/?retryWrites=true&w=majority&appName=BackendDB"
  )
  .then(() => {
    console.log("connected to database");
    app.listen(3000, () => {
      console.log("server is running on port 3000");
    });
  })
  .catch((error) => {
    console.log("connection failed!", error);
  });

  