import { User } from "../models/user.model.js";

const Register = async (req, res) => {
  try {
    const { name, email, password, isDoctor } = req.body;

    // Validate fields
    if (![name, email, password].every(Boolean)) {
      return res.status(400).json({
        message: "Please fill in all fields",
      });
    }

    // Check if user already exists
    const existUser = await User.findOne({ email });
    if (existUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    // Create new user (initially without refreshToken)
    const user = await User.create({
      name,
      email,
      password,
      isDoctor: isDoctor || false,
      role: isDoctor ? "doctor" : "patient", // set role dynamically
    });

    // Generate tokens
    const refreshToken = user.generateRefreshToken();
    const accessToken = user.generateAccessToken();

    // Save refreshToken to user and update in DB
    user.refreshToken = refreshToken;
    await user.save();

    // Optional: Set refreshToken in HTTP-only cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    // Send response
    res.status(201).json({
      message: "User registered successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        isDoctor: user.isDoctor,
      },
      accessToken,
    });
  } catch (error) {
    res.status(500).json({
      message: "Controller error",
      error: error.message,
    });
  }
};

export { Register };
