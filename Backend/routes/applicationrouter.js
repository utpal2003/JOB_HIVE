import express from 'express'
import {
        EmployeerGetallAplication,
        jobseekerGetallAplication,
        jobseekerdeleteapplication,
        postApplication
}
        from '../controllers/applicationcontroller.js'
import { isAuthorized } from '../middlewares/auth.js'

const router = express.Router();

router.get("/jobseeker/getall", isAuthorized, jobseekerGetallAplication);
router.get("/employer/getall", isAuthorized, EmployeerGetallAplication);
router.post("/postApplication", isAuthorized, postApplication)
router.delete("/delete/:id", isAuthorized, jobseekerdeleteapplication);

export default router;