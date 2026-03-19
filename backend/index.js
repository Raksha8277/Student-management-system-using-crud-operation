const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(cors({
  origin: "*"
}));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend is running successfully");
});

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log("MongoDB Error:", err));

const Student = require('./models/Student');

app.post('/create', async (req, res) => {
  try {
    console.log("REQUEST BODY:", req.body); // debug

    const result = await Student.create(req.body);
    res.json(result);
  } catch (err) {
    console.error("CREATE ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});

app.get('/students', async (req, res) => {
  try {
    const result = await Student.find();
    res.json(result);
  } catch (err) {
    console.error("GET ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});

app.put('/update/:id', async (req, res) => {
  try {
    const result = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(result);
  } catch (err) {
    console.error("UPDATE ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});

app.delete('/delete/:id', async (req, res) => {
  try {
    const result = await Student.findByIdAndDelete(req.params.id);
    res.json(result);
  } catch (err) {
    console.error("DELETE ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});