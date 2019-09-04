const express = require("express");
const ApiRouter = express.Router();

const commentRouter = require("./comment");
const imageRouter = require("./image");
const userRouter = require("./user");

ApiRouter.get("/", (req, res) => {
    res.send("Hotgirl API!!!");
});

ApiRouter.use("/comments", commentRouter);
ApiRouter.use("/users", userRouter);
ApiRouter.use("/images", imageRouter);

module.exports = ApiRouter;