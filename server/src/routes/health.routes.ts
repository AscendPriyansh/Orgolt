import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
    res.status(200).json({ status: "OMG! The server is healthy and running!" });
});

export default router;