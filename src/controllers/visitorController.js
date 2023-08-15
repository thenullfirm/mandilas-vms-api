const Visitor = require('../models/Visitor');

// Create a new visitor
exports.createVisitor = async (req, res) => {
  const { visitorName, visitorEmail, timeOfVisit, employee } = req.body;

  try {
    const newVisitor = new Visitor({
      visitorName,
      visitorEmail,
      timeOfVisit,
      employee,
    });

    const savedVisitor = await newVisitor.save();
    res.status(201).json(savedVisitor);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get all visitors
exports.getAllVisitors = async (req, res) => {
  try {
    const visitors = await Visitor.find().populate('employee');
    res.status(200).json(visitors);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Update a visitor by ID
exports.updateVisitor = async (req, res) => {
  const { visitorName, visitorEmail, timeOfVisit, employee } = req.body;
  const visitorId = req.params.id;

  try {
    const updatedVisitor = await Visitor.findByIdAndUpdate(
      visitorId,
      { visitorName, visitorEmail, timeOfVisit, employee },
      { new: true }
    ).populate('employee');
    res.status(200).json(updatedVisitor);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Delete a visitor by ID
exports.deleteVisitor = async (req, res) => {
  const visitorId = req.params.id;

  try {
    const deletedVisitor = await Visitor.findByIdAndDelete(visitorId);
    res.status(200).json(deletedVisitor);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
