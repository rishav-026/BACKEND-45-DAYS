const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = 8000;

// Middleware
app.use(express.json());

// ======================
// MongoDB Connection
// ======================

mongoose
  .connect("mongodb://127.0.0.1:27017/user-app")
  .then(() => {
    console.log("✅ MongoDB Connected");
  })
  .catch((err) => {
    console.log("❌ MongoDB Error:", err);
  });

// ======================
// Schema
// ======================

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },

    lastName: {
      type: String,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    age: {
      type: Number,
    },

    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
    },
  },
  {
    timestamps: true,
  }
);

// ======================
// Model
// ======================

const User = mongoose.model("User", userSchema);

// ======================
// Routes
// ======================

// Home Route
app.get("/", (req, res) => {
  res.send("Welcome to MongoDB CRUD API 🚀");
});

// Create User
app.post("/users", async (req, res) => {
  try {
    const user = await User.create(req.body);

    return res.status(201).json({
      status: "success",
      data: user,
    });
  } catch (err) {
    return res.status(400).json({
      status: "failed",
      message: err.message,
    });
  }
});

// Get All Users
app.get("/users", async (req, res) => {
  try {
    const users = await User.find({});

    return res.json({
      totalUsers: users.length,
      data: users,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
});

// Get Single User
app.get("/users/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        message: "User Not Found",
      });
    }

    return res.json(user);
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
});

// Update User
app.patch("/users/:id", async (req, res) => {
  try {
    const updatedUser =
      await User.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
          runValidators: true,
        }
      );

    if (!updatedUser) {
      return res.status(404).json({
        message: "User Not Found",
      });
    }

    return res.json({
      status: "success",
      data: updatedUser,
    });
  } catch (err) {
    return res.status(400).json({
      message: err.message,
    });
  }
});

// Delete User
app.delete("/users/:id", async (req, res) => {
  try {
    const deletedUser =
      await User.findByIdAndDelete(req.params.id);

    if (!deletedUser) {
      return res.status(404).json({message: "User Not Found"});
    }

    return res.json({status: "success",message: "User Deleted Successfully",});
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
});

// ======================
// Server
// ======================

app.listen(PORT, () => {
  console.log(
    `🚀 Server Running on Port ${PORT}`
  );
});