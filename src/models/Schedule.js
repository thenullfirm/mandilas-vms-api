const mongoose = require('mongoose');
const Employee = require('./Employee');

const scheduleSchema = new mongoose.Schema({
  timeOfVisit: {
    type: Date,
    required: true,
  },
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee',
  },
});

const Schedule = mongoose.model('Schedule', scheduleSchema);

module.exports = Schedule;
