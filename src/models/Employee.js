const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  employeeName: {
    type: String,
    required: true,
  },
  employeeEmail: {
    type: String,
    required: true,
    unique: true,
  },
});

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;
