const express = require("express");
const UserRouter = express.Router();

const userModel = require("../models/users");

//CRUD
// Create
UserRouter.post("/", (req, res) => {
    const { username, email, password, avatar } = req.body;

    userModel.create({ username, email, password, avatar })
        .then(userCreated => {
            // console.log(userCreated);
            res.status(201).json({
                success: true,
                data: userCreated,
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
UserRouter.get("/", (req, res) => {
    userModel.find({})
    .then(userList => {
        // console.log(users);
        res.json({
            success: true,
            data: userList,
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
UserRouter.get("/:id", (req, res) => {
    userModel.findById(req.params.id)
    .then(oneUser => {
        // console.log(oneUser);
        res.json({
            success: true,
            data: oneUser,
        });
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            success: false,
            err,
        });
    });
});

// Update

// Delete


module.exports = UserRouter;