const express = require("express");
const ImageRouter = express.Router();


const imageModel = require("../models/images");

//CRUD
// Create
ImageRouter.post("/", (req, res) => {
    const { photo, name, description, user, views, likes } = req.body;

    imageModel.create({ photo, name, description, user, views, likes })
        .then(imageCreated => {
            // console.log(imageCreated);
            res.status(201).json({
                success: true,
                data: imageCreated,
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
ImageRouter.get("/", (req, res) => {
    const { page=1, pageSize=5} = req.query;

    imageModel.find({})
    .populate("user", {
        username: 1
    })
    .limit(Number(pageSize))
    .skip((Number(page) - 1)*Number(pageSize))
    .then(imageList => {
        // console.log(imageList);
        imageModel.count({}).then(total => {
            res.json({
                success: true,
                totalPage: Math.ceil(total/Number(pageSize)),
                data:imageList,
            });
        })
        
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            success: false,
            err,
        });
    });
});
// Get one
ImageRouter.get("/:id", (req, res) => {
    imageModel.findById(req.params.id)
    .populate("user", {
        //username: 1
        password: 0
    })
    .then(oneImage => {
        // console.log(oneImage);
        res.json({
            success: true,
            data: oneImage,
        });
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            success: false,
            err,
        });
    });
});

module.exports = ImageRouter;