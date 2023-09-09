const Employee = require('../models/Employee');

// Create a new employee
exports.createEmployee = async (req, res) => {
  const { employeeName, employeeEmail } = req.body;

  try {
    const newEmployee = new Employee({
      employeeName,
      employeeEmail,
    });

    const savedEmployee = await newEmployee.save();
    res.status(201).json(savedEmployee);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get all employees
exports.getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json(employees);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get employee by ID
exports.getOneEmployee = async (req, res) => {
  const employeeId = req.params.id;

  try {
    const selectedEmployee = await Employee.findById(employeeId);
    res.status(200).json(selectedEmployee);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Update an employee by ID
exports.updateEmployee = async (req, res) => {
  const { employeeName, employeeEmail } = req.body;
  const employeeId = req.params.id;

  try {
    const updatedEmployee = await Employee.findByIdAndUpdate(
      employeeId,
      { employeeName, employeeEmail },
      { new: true }
    );
    res.status(200).json(updatedEmployee);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Delete an employee by ID
exports.deleteEmployee = async (req, res) => {
  const employeeId = req.params.id;

  try {
    const deletedEmployee = await Employee.findByIdAndDelete(employeeId);
    res.status(200).json(deletedEmployee);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
