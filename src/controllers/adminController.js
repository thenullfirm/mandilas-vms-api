const Administrative = require('../models/Administrative');

// Controller to handle user login
exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const admin = await Administrative.findOne({ username });
    if (!admin) {
      return res.status(401).json({ message: 'User not found' });
    }

    const passwordMatch = await admin.comparePassword(password);
    if (passwordMatch) {
      // Handle successful login, e.g., create a session
      return res.status(200).json({ message: 'Login successful' });
    } else {
      return res.status(401).json({ message: 'Invalid password' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// Create a new admin
exports.createAdmin = async (req, res) => {
  const { username, password } = req.body;

  try {
    const newAdmin = new Administrative({
      username,
      password,
    });

    const savedAdmin = await newAdmin.save();
    res.status(201).json(savedAdmin);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get all admins
exports.getAllAdmins = async (req, res) => {
  try {
    const admins = await Administrative.find();
    res.status(200).json(admins);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Update an admin by ID
exports.updateAdmin = async (req, res) => {
  const { username, password } = req.body;
  const adminId = req.params.id;

  try {
    const updatedAdmin = await Administrative.findByIdAndUpdate(adminId, { username, password }, { new: true });
    res.status(200).json(updatedAdmin);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Delete an admin by ID
exports.deleteAdmin = async (req, res) => {
  const adminId = req.params.id;

  try {
    const deletedAdmin = await Administrative.findByIdAndDelete(adminId);
    res.status(200).json(deletedAdmin);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
