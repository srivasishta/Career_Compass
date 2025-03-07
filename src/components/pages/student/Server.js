const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = 5002; // ✅ Using port 5002 as requested

// Middleware
app.use(express.json());
app.use(cors());

// ✅ MongoDB Connection
mongoose.connect("mongodb://127.0.0.1:27017/mentorship_platform", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log("✅ MongoDB Connected"))
    .catch(err => console.error("❌ MongoDB connection error:", err));

// ✅ User Schema
const UserSchema = new mongoose.Schema({
    fullName: String,
    usn: String,
    email: String,
    password: String,
});

const User = mongoose.model("User", UserSchema);

// ✅ Student Schema
const studentSchema = new mongoose.Schema({
    name: String,
    usn: String,
    mobileNumber: String,
    alternateMobileNumber: String,
    email: String,
    collegeEmail: String,
    gender: String,
    dob: String,
    graduationYear: String,
    college: String,
    selectedMajors: [String],
    shortBio: String
} ,{ strict: false });

const Student = mongoose.model("Student", studentSchema);

// ✅ Register API
app.post("/api/register", async (req, res) => {
    try {
        const { fullName, usn, email, password } = req.body;

        // Check if user exists
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: "User already exists" });

        const newUser = new User({ fullName, usn, email, password });
        await newUser.save();

        res.status(201).json({ message: "Registration successful!" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});

// ✅ Student Login API
app.post("/api/student/login", async (req, res) => {
    try {
        const { usn, password } = req.body;

        // Find student by USN
        const student = await User.findOne({ usn });

        if (!student || student.password !== password) {
            return res.status(400).json({ success: false, message: "Invalid USN or Password" });
        }

        res.json({ success: true, message: "Login successful" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error", error });
    }
});

// ✅ Store Student Data API
app.post("/api/students", async (req, res) => {
    try {
        console.log("Received Data:", req.body);
        const newStudent = new Student(req.body);
        await newStudent.save();
        res.status(201).json({ message: "Student data saved successfully!" });
    } catch (error) {
        console.error("❌ Error saving student data:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// ✅ Start Server on PORT 5002
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});