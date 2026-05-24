const router=require("express").Router();

const auth=
require("../middleware/authMiddleware");

const {

createTask,
getTasks,
deleteTask,
updateStatus

}=require(
"../controllers/taskController"
);


router.post(
"/",
auth,
createTask
);


router.get(
"/",
auth,
getTasks
);


router.delete(
"/:id",
auth,
deleteTask
);


router.put(
"/:id",
auth,
updateStatus
);

module.exports=router;