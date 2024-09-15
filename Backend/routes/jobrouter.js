import express from 'express'
import {getalljobs,postjob,getmyJobs,updatejob,deletejob,getsinglejob} from '../controllers/jobcontroller.js'
import {isAuthorized} from '../middlewares/auth.js'
const router = express.Router();

router.get("/getalljobs",getalljobs);
router.post("/post",isAuthorized,postjob);
router.get("/getmyJobs",isAuthorized,getmyJobs)
router.put("/updatejob/:id",isAuthorized,updatejob)
router.delete("/deletejob/:id",isAuthorized,deletejob)
router.get("/:id",isAuthorized,getsinglejob)

export default router;