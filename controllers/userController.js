const User = require("../models/User");

exports.getUserDetails = (req, res) => {
  const { id, name, email, phone_number, pan_number, aadhar_number, role } =
    req.user; 
  res.json({ id, name, email, phone_number, pan_number, aadhar_number, role });
};

exports.updateUserDetails = async (req, res) => {
  const { name, phone_number, pan_number, aadhar_number } = req.body;

  try {
    await User.update(
      { name, phone_number, pan_number, aadhar_number },
      { where: { id: req.user.id } }
    );
    res.json({ message: "User details updated successfully" });
  } catch (error) {
    res.status(400).json({ message: "Error updating user details", error });
  }
};
