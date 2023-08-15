const mongoose = require('mongoose');
const Employee = require('./Employee.js');

const visitorSchema = new mongoose.Schema({
  visitorName: {
    type: String,
    required: true,
  },
  visitorEmail: {
    type: String,
    required: true,
    unique: true,
  },
  timeOfVisit: {
    type: Date,
    required: true,
  },
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee',
  },
});

const Visitor = mongoose.model('Visitor', visitorSchema);

module.exports = Visitor;
