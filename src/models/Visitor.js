const mongoose = require('mongoose');
const Schedule = require('./Schedule');

const visitorSchema = new mongoose.Schema({
  visitorName: {
    type: String,
    required: true,
  },
  visitorEmail: {
    type: String,
    required: true,
  },
  visits: [Schedule.schema],
});

const Visitor = mongoose.model('Visitor', visitorSchema);

module.exports = Visitor;
