import { User } from "../models/User.model.js";

const Register = async (req, res) => {
  try {
    const { name, email, password, isDoctor , role } = req.body;

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
      role: role || (isDoctor ? "doctor" : "patient"),

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

const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if email and password are provided
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Please enter email and password" });
    }

    // Find user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Compare password
    const isPasswordValid = await user.isPasswordCorrect(password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Generate tokens
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    // Save refreshToken to DB
    user.refreshToken = refreshToken;
    await user.save();

    // Optional: Set refresh token in httpOnly cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    // Send response
    res.status(200).json({
      message: "Login successful",
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
      message: "Login controller error",
      error: error.message,
    });
  }
};




 const logout = async (req, res) => {
  try {
    // 1️⃣ Cookie se refreshToken uthao
    const refreshToken = req.cookies.refreshToken;

    // 2️⃣ Agar token nahi mila, tab bhi safe response do
    if (!refreshToken) {
      return res.status(200).json({ message: "Logged out successfully" });
    }

    // 3️⃣ DB me check karo koi user milta hai kya
    const user = await User.findOne({ refreshToken });

    // 4️⃣ User mila to uska refreshToken hata do
    if (user) {
      user.refreshToken = null;
      await user.save();
    }

    // 5️⃣ Cookie ko clear karo from browser
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
      sameSite: "Strict"
    });

    // 6️⃣ Final response
    res.status(200).json({ message: "Logged out successfully" });

  } catch (error) {
    res.status(500).json({ message: "Logout failed", error: error.message });
  }
};


export { Register, Login , logout };
