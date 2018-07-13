const express = require('express');
const config = require('../config/database');
const Video = require('../models/video');

const router = express.Router(); 

router.get('/videos', function(req, res){
    console.log('Get request for all videos');
    Video.find({})
    .exec(function(err, videos){
        if(err){
            console.log('Error retrieving videos');
        }
        else{
            res.json(videos)
        }
    })
});



router.post('/video', function(req, res){
    console.log('Posting a video to db');
    var newVideo = new Video;

    newVideo.title = req.body.title;
    newVideo.url = req.body.url;
    newVideo.description = req.body.description;
    newVideo.save(function(err, insertedVideo){
        if(err){
            console.log('Error saving video');
        }
        else{
            res.json(insertedVideo)
        }
    })
});

// Get a video
router.get('/video/:id', function(req, res){
    var id = req.params.id;
    console.log('Get request for single video');
    Video.findById(id)
    .exec(function(err, video){
        if(err){
            console.log('Error retrieving video');
        }
        else{
            res.json(video)
        }
    })
});


// Update a video
router.put('/video/:id', function (req, res){
    var id = req.params.id;
    console.log('Update a video');
    Video.findByIdAndUpdate(id,
    {
        $set: {
            title: req.body.title,
            url: req.body.url,
            description: req.body.description
        }
    },
    {
        new: true
    },
    function(err, updatedVideo){
        if(err){
            res.send("Error updating video");
        }
        else{
            res.json(updatedVideo);
        }
    }
    );
});


router.delete('/video/:id', function(req, res){
    console.log('Deleting a video');
    Video.findByIdAndRemove(req.params.id, function(err, deletedVideo){
        if(err){
            res
            .status(404)
            .send("Error deleting video", err);
        }
        else{
            res
            .status(204)
            .json(deletedVideo);
        }
    });
});




module.exports = router;