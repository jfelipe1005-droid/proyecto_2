const express = require("express");
const router = express.Router();
const { createClient } = require("../controllers/clientController");
const { createPurchase } = require("../controllers/purchaseController");

router.post("/client", createClient);
router.post("/purchase", createPurchase);

module.exports = router;
