const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

const { getPendingSellers, approveSeller, rejectSeller } = require("../controllers/adminController");

// get pending seller
router.get(
    "/sellers/pending",
    authMiddleware,
    adminMiddleware,
    getPendingSellers
);

// approve seller 
router.put(
    "/sellers/:id/approve" ,
    authMiddleware,
    adminMiddleware,
    approveSeller
);

// reject seller
router.put(
    "/sellers/:id/reject" ,
    authMiddleware,
    adminMiddleware,
    rejectSeller
);
module.exports = router;