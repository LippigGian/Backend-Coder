import {Router} from "express";
import Students from "../dao/dbManagers/students.manager.js";
import Courses from "../dao/dbManagers/courses.manager.js";

const router = Router();
const studentsManager = new Students();
const coursesManager = new Courses();

//Tendremos 2 vistas, una para estudiantes y otra para cursos.

router.get("/students-view", async (req, res)=>{
    try {
        const students = await studentsManager.getAll();
        res.render("students", {students})
    } catch (error) {
        console.log(error.message);
    }
});

router.get("/courses-view", async (req, res)=>{
    try {
        const courses = await coursesManager.getAll();
        res.render("courses", {courses})
    } catch (error) {
        console.log(error.message);
    }
});

export default router;
