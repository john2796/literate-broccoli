const server = require("express").Router()
const db = require("../../common/helpers")
const validateSubjects = require("../../validation/subjects")

// @desc   Helper to return all subjects
returnSubjects = async (req, res, studentId) => {
  if (!studentId) {
    return res
      .status(400)
      .json({ message: "Please make sure you are passing params studentId" })
  }
  try {
    let subjects = await db.findAllBy("subjects", { student_id: studentId })
    res.json(subjects)
  } catch ({ message }) {
    res.status(500).json({ message })
  }
}

// @route    http://localhost:5000/api/subjects
// @desc     get all subject
// @Access   Public
server.get("/:studentId", async (req, res) => {
  const { studentId } = req.params
  returnSubjects(req, res, studentId)
})

// @route    http://localhost:5000/api/subjects
// @desc    Post a new subject
// @Access   Public
server.post("/:studentId", async (req, res) => {
  const { studentId } = req.params
  const { message, isValid } = validateSubjects(req.body)
  if (!studentId) {
    return res.status(400).json({ message: "Missing studentId" })
  }
  if (!isValid) {
    return res.status(400).json({ message })
  }
  try {
    // returns the id of subject that we just added
    const [id] = await db.insert("subjects", {
      ...req.body,
      student_id: studentId
    })

    // Update Student SubjectCount and ScoreAverage
    const sbCount = await db.findAllBy("subjects", { student_id: studentId })
    const getAvr =
      sbCount.map(item => item.subject_score).reduce((a, b) => a + b) /
      sbCount.length
    console.log("getAvr", getAvr)

    await db.update(
      "students",
      { id: studentId },
      { subject_count: sbCount.length, score_average: getAvr }
    )

    if (id) {
      returnSubjects(req, res, studentId)
    } else {
      res.status(404).json({
        message: "There was an issue adding subject with that StudentId."
      })
    }
  } catch ({ message }) {
    res.status(500).json({ message })
  }
})

// @route    http://localhost:5000/api/subjects/:id
// @desc     Delete
// @Access   Public
server.delete("/:studentId/:id", async (req, res) => {
  const { studentId, id } = req.params
  try {
    const success = await db.remove("subjects", id)
    if (success) {
      returnSubjects(req, res, studentId)
    } else {
      res.status(404).json({
        message: "There was an issue deleting the subject at that ID."
      })
    }
  } catch ({ message }) {
    res.status(500).json({ message })
  }
})
// @route    http://localhost:5000/api/:id
// @desc     Update
// @Access   Public
server.put("/:studentId/:id", async (req, res) => {
  const { id, studentId } = req.params
  try {
    const exists = await db.findBy("subjects", { id })
    if (!exists) {
      return res.status(404).json({ message: "subject not found" })
    }

    await db.update("subjects", id, { ...req.body })
    returnSubjects(req, res, studentId)
  } catch ({ message }) {
    res.status(500).json({ message })
  }
})
module.exports = server
