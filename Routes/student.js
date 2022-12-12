const studentsArr = require("../InitialData")
const express = require("express");
const Student = require("../models/student_schema")
const bodyparser = require("body-parser")
const { body, validationResult } = require("express-validator")
const router = express.Router();

router.use(bodyparser.json());

router.get("/student", async (req, res) => {
    try {
        let students = await Student.find()
        if (students.length) {
            res.json(students)
        } else {
            students = await Student.create(studentsArr)
            console.log(students);
            res.json(students)
        }
    } catch (e) {
        res.json({
            status: e.message
        })
    }
})

router.get("/student/:id", async (req, res) => {
    try {
        const id = req.params.id
        const student = await Student.findOne({ id: id })
        if (student) {
            res.json(student)
        } else {
            res.status(404).json({
                message: "Invalid id"
            })
        }
    } catch (e) {
        res.json({
            status: e.message
        })
        console.log(e);
    }
})


router.post("/student",
    body("name").isAlpha(),
    body("currentClass").isNumeric(),
    body("division").isAlpha(), async (req, res) => {
        const { name, currentClass, division } = req.body
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({ status: "Invalid input" })
            }
            process.env.student_id = parseInt(process.env.student_id) + 1
            let id = process.env.student_id
            const student = await Student.create({
                id: id,
                name: name,
                currentClass: currentClass,
                division: division
            })

            res.json({
                id: id ,
                name: name,
                currentClass: currentClass,
                division: division
            })
        } catch (e) {
            res.json({
                message: e.message
            })
        }
    })


router.put("/student/:id",
    body("name").isAlpha(),
    body("currentClass").isNumeric(),
    body("division").isAlpha(), async (req, res) => {
        const { name, currentClass, division } = req.body
        const id = req.params.id
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({ status: "Invalid input" })
            }
            const IsthereAnId = await Student.findOne({ id: id })

            if (IsthereAnId) {
                const student = await Student.updateOne({ id: id }, req.body)
                res.json({
                    status: "updated"
                })
            } else {
                res.json({
                    status: "invalid id"
                })
            }


        } catch (e) {
            res.json({
                message: e.message
            })
        }
    })


router.delete("/student/:id", async (req, res) => {
    try {
        const id = req.params.id
        const IsthereAnId = await Student.findOne({ id: id })
        if (IsthereAnId) {
            await Student.deleteOne({ id: id })
            res.json({
                status: "deleted"
            })
        } else {
            res.json({
                status: "invalid id"
            })
        }

    } catch (e) {
        res.json({
            message: e.message
        })
    }
})





module.exports = router