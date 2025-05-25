const express = require("express");
const mongoose = require("mongoose");
const app = express();

app.use(express.json());

// MongoDB Connection
const {
  MONGO_USER,
  MONGO_PASS,
  MONGO_HOST = "localhost",
  MONGO_DB = "calculator"
} = process.env;

const mongoURI = `mongodb://${MONGO_USER}:${MONGO_PASS}@${MONGO_HOST}:27017/${MONGO_DB}`;

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });

// Schema
const calculationSchema = new mongoose.Schema({
  operation: String,
  parameters: Object,
  result: Number,
  timestamp: { type: Date, default: Date.now }
});

const Calculation = mongoose.model("Calculation", calculationSchema);

// Calculator Functions
const add = (n1, n2) => n1 + n2;
const sub = (n1, n2) => n1 - n2;
const multiply = (n1, n2) => n1 * n2;
const divide = (n1, n2) => {
  if (n2 === 0) throw new Error("Cannot divide by zero");
  return n1 / n2;
};
const sqrt = (n1) => Math.sqrt(n1);
const exp = (n1) => Math.exp(n1);
const mod = (n1, n2) => n1 % n2;

// Routes

app.get("/add", async (req, res) => {
  try {
    const n1 = parseFloat(req.query.n1);
    const n2 = parseFloat(req.query.n2);
    if (isNaN(n1) || isNaN(n2)) throw new Error("Invalid input");

    const result = add(n1, n2);
    const calculation = new Calculation({ operation: "add", parameters: { n1, n2 }, result });
    await calculation.save();

    res.status(200).json({ statuscode: 200, data: result });
  } catch (error) {
    res.status(500).json({ statuscode: 500, msg: error.toString() });
  }
});

app.get("/sub", async (req, res) => {
  try {
    const n1 = parseFloat(req.query.n1);
    const n2 = parseFloat(req.query.n2);
    if (isNaN(n1) || isNaN(n2)) throw new Error("Invalid input");

    const result = sub(n1, n2);
    const calculation = new Calculation({ operation: "sub", parameters: { n1, n2 }, result });
    await calculation.save();

    res.status(200).json({ statuscode: 200, data: result });
  } catch (error) {
    res.status(500).json({ statuscode: 500, msg: error.toString() });
  }
});

app.get("/multiply", async (req, res) => {
  try {
    const n1 = parseFloat(req.query.n1);
    const n2 = parseFloat(req.query.n2);
    if (isNaN(n1) || isNaN(n2)) throw new Error("Invalid input");

    const result = multiply(n1, n2);
    const calculation = new Calculation({ operation: "multiply", parameters: { n1, n2 }, result });
    await calculation.save();

    res.status(200).json({ statuscode: 200, data: result });
  } catch (error) {
    res.status(500).json({ statuscode: 500, msg: error.toString() });
  }
});

app.get("/divide", async (req, res) => {
  try {
    const n1 = parseFloat(req.query.n1);
    const n2 = parseFloat(req.query.n2);
    if (isNaN(n1) || isNaN(n2)) throw new Error("Invalid input");

    const result = divide(n1, n2);
    const calculation = new Calculation({ operation: "divide", parameters: { n1, n2 }, result });
    await calculation.save();

    res.status(200).json({ statuscode: 200, data: result });
  } catch (error) {
    res.status(500).json({ statuscode: 500, msg: error.toString() });
  }
});

app.get("/sqrt", async (req, res) => {
  try {
    const n1 = parseFloat(req.query.n1);
    if (isNaN(n1)) throw new Error("Invalid input");

    const result = sqrt(n1);
    const calculation = new Calculation({ operation: "sqrt", parameters: { n1 }, result });
    await calculation.save();

    res.status(200).json({ statuscode: 200, data: result });
  } catch (error) {
    res.status(500).json({ statuscode: 500, msg: error.toString() });
  }
});

app.get("/exp", async (req, res) => {
  try {
    const n1 = parseFloat(req.query.n1);
    if (isNaN(n1)) throw new Error("Invalid input");

    const result = exp(n1);
    const calculation = new Calculation({ operation: "exp", parameters: { n1 }, result });
    await calculation.save();

    res.status(200).json({ statuscode: 200, data: result });
  } catch (error) {
    res.status(500).json({ statuscode: 500, msg: error.toString() });
  }
});

app.get("/mod", async (req, res) => {
  try {
    const n1 = parseFloat(req.query.n1);
    const n2 = parseFloat(req.query.n2);
    if (isNaN(n1) || isNaN(n2)) throw new Error("Invalid input");

    const result = mod(n1, n2);
    const calculation = new Calculation({ operation: "mod", parameters: { n1, n2 }, result });
    await calculation.save();

    res.status(200).json({ statuscode: 200, data: result });
  } catch (error) {
    res.status(500).json({ statuscode: 500, msg: error.toString() });
  }
});

// History Endpoints

app.get("/history", async (req, res) => {
  try {
    const calculations = await Calculation.find().sort({ timestamp: -1 }).limit(100);
    res.status(200).json({ statuscode: 200, data: calculations });
  } catch (error) {
    res.status(500).json({ statuscode: 500, msg: error.toString() });
  }
});

app.get("/history/:id", async (req, res) => {
  try {
    const calculation = await Calculation.findById(req.params.id);
    if (!calculation) {
      return res.status(404).json({ statuscode: 404, msg: "Calculation not found" });
    }
    res.status(200).json({ statuscode: 200, data: calculation });
  } catch (error) {
    res.status(500).json({ statuscode: 500, msg: error.toString() });
  }
});

app.delete("/history/:id", async (req, res) => {
  try {
    const calculation = await Calculation.findByIdAndDelete(req.params.id);
    if (!calculation) {
      return res.status(404).json({ statuscode: 404, msg: "Calculation not found" });
    }
    res.status(200).json({ statuscode: 200, data: "Calculation deleted" });
  } catch (error) {
    res.status(500).json({ statuscode: 500, msg: error.toString() });
  }
});

// Root Endpoint

app.get("/", (req, res) => {
  res.json({
    service: "Calculator Microservice with MongoDB",
    endpoints: {
      calculation: "/add, /sub, /divide, /multiply, /sqrt, /exp, /mod",
      database: "/history, /history/:id"
    },
    usage: "/add?n1=5&n2=3, /sqrt?n1=9"
  });
});

// Start Server

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
