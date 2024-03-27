const mongoose = require("mongoose");

const EmployeeSchema = mongoose.Schema(
    {
        name:{
            type: String,
            required: [true, "please enter the employee name"],

        },

        email:{
            type: String,
            required: true,
        },

        phone:{
            type: Number,
            required: true,

        },

        address:{
            type: String,
            required: true,

        },

        position:{
            type: String,
            required: true,

        },

        department:{
            type: String,
            required: true,

        },

        startDate:{
            type: Date,
            required: true,
        },
    },

    {
        timestamps: true,
    }
    
);

const Employee = mongoose.model("Employee", EmployeeSchema);

module.exports = Employee;