const Visitor = require('../models/Visitor');
const Schedule = require('../models/Schedule');
const Employee = require('../models/Employee');
const sendEmail = require('../config/sendEmail');

// Create a new visitor
exports.createVisitor = async (req, res) => {
  const { visitorName, visitorEmail, timeOfVisit, employee } = req.body;

  try {
    const employeeData = await Employee.findById(employee);
    const { employeeName, employeeEmail } = employeeData;

    const newSchedule = new Schedule({
      timeOfVisit,
      employee,
    });

    const savedSchedule = await newSchedule.save();

    const existingVisitor = await Visitor.findOne({ visitorEmail: visitorEmail });

    if (existingVisitor) {
      const visitorWithSchedule = await Visitor.findByIdAndUpdate(
        existingVisitor._id,
        { $push: { visits: savedSchedule } },
        { new: true }
      );

      res.status(201).json(visitorWithSchedule);
    } else {
      const newVisitor = new Visitor({
        visitorName,
        visitorEmail,
      });

      const savedVisitor = await newVisitor.save();

      const visitorWithSchedule = await Visitor.findByIdAndUpdate(
        savedVisitor._id,
        { $push: { visits: savedSchedule } },
        { new: true }
      );

      sendEmail([visitorName, visitorEmail], [employeeName, employeeEmail], timeOfVisit);

      res.status(201).json(visitorWithSchedule);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get all visitors
exports.getAllVisitors = async (req, res) => {
  try {
    const visitors = await Visitor.find();
    res.status(200).json(visitors);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
