const server = require("express").Router();
const db = require("../../common/helpers");
const validateStudents = require("../../validation/students");

// @desc   Helper to return all students
returnStudents = async (req, res) => {
  try {
    let students = await db.get("students").orderBy("id", "asc");
    res.json(students);
  } catch ({ message }) {
    res.status(500).json({ message });
  }
};

// @route    http://localhost:5000/api/students
// @desc     get all student
// @Access   Public
server.get("/", async (req, res) => {
  returnStudents(req, res);
});

// @route    http://localhost:5000/api/students/:id
// @desc     Get single student by id
// @Access   Public
server.get("/:id", async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res
      .status(400)
      .json({ message: "Please make sure you are passing params id" });
  }
  try {
    const student = await db.findBy("students", { id });
    if (student) {
      res.status(200).json(student);
    } else {
      res.status(404).json({ message: "student not found" });
    }
  } catch ({ message }) {
    res.status(500).json({ message });
  }
});

// @route    http://localhost:5000/api/students
// @desc    Post a new student
// @Access   Public
server.post("/", async (req, res) => {
  const { message, isValid } = validateStudents(req.body);
  if (!isValid) {
    return res.status(400).json({ message });
  }
  try {
    // returns the id of student that we just added
    const [id] = await db.insert("students", { ...req.body });
    if (id) {
      returnStudents(req, res);
    } else {
      res
        .status(404)
        .json({ message: "There was an issue adding student with that ID." });
    }
  } catch ({ message }) {
    res.status(500).json({ message });
  }
});

// @route    http://localhost:5000/api/students/:id
// @desc     Delete
// @Access   Public
server.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const exists = await db.findBy("students", { id });
    if (!exists) {
      return res.status(404).json({ message: "student not found" });
    }

    await db.remove("students", id);
    returnStudents(req, res);
  } catch ({ message }) {
    res.status(500).json({ message });
  }
});
// @route    http://localhost:5000/api/:id
// @desc     Update
// @Access   Public
server.put("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const exists = await db.findBy("students", { id });
    if (!exists) {
      return res.status(404).json({ message: "student not found" });
    }

    await db.update("students", { id }, { ...req.body });
    returnStudents(req, res);
  } catch ({ message }) {
    res.status(500).json({ message });
  }
});
module.exports = server;
