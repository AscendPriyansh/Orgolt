import express from "express";
const { createUser } = require("../controllers/usersController");

const router = express.Router();

router.post("/users", createUser);

export default router;