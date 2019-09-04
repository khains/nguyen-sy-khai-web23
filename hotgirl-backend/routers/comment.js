const express = require("express");
const CommentRouter = express.Router();

const commentModel = require("../models/comments");

//CRUD
// Create
CommentRouter.post("/", (req, res) => {
    const { content, user, image } = req.body;

    commentModel.create({ content, user, image })
        .then(commentCreated => {
            // console.log(commentCreated);
            res.status(201).json({
                success: true,
                data: commentCreated,
            });
        }).catch(err => {
            console.log(err);
            res.status(500).json({
                success: false,
                err,
            });
        });
});

// Get list
CommentRouter.get("/", (req, res) => {
    commentModel.find({})
    .populate("user", {
        username: 1
    })
    .populate("image")
    .then(commentList => {
        // console.log(commentList);
        res.json({
            success: true,
            data:commentList,
        });
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            success: false,
            err,
        });
    });
});
// Get one
CommentRouter.get("/:id", (req, res) => {
    commentModel.findById(req.params.id)
    .populate("user", {
        username: 1
    })
    .populate("image")
    .then(oneComment => {
        // console.log(oneComment);
        res.json({
            success: true,
            data: oneComment,
        });
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            success: false,
            err,
        });
    });
});

module.exports = CommentRouter;