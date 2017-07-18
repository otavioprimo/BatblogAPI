var express = require('express');
var router = express.Router();

var Posts = require('../models/posts');

// Posts.remove({}, function (res) {
//     console.log("removed records");
// });



router.route('/')
    .post(function (req, res) {

        var date = new Date();
        var dia = date.getDate();
        var mes = date.getMonth() + 1;
        var ano = date.getFullYear();

        fullDate = dia + '/' + mes + '/' + ano;

        var posts = new Posts();
        posts.user_id = req.body.user_id;
        posts.title = req.body.title;
        posts.content = req.body.content;
        posts.author = req.body.author;
        posts.created = fullDate;

        posts.save(function (err, doc) {
            if (err)
                res.send(err);

            res.json(doc);
        });

    })

    .get(function (req, res) {
        Posts.find(function (err, doc) {
            if (err)
                res.send(err);

            res.json(doc);
        });
    })

    .put(function (req, res) {
        Posts.findByIdAndUpdate(req.body._id, {
            $set: { title: req.body.title, author: req.body.author, content: req.body.content }
        }, {
                safe: true,
                new: true
            }, function (err, doc) {
                if (err) {
                    res.send(err);
                } else {
                    res.json(doc);
                }
            });
    });



router.route('/:post_id')
    .get(function (req, res) {
        Posts.findById(req.params.post_id, function (err, doc) {
            if (err)
                res.send(err);
            res.json(doc);
        }).select({ "comments": 1 });

    })

    .delete(function (req, res) {
        Posts.findByIdAndRemove(req.params.post_id, function (err, doc) {
            if (err)
                res.send(err);

            res.send("true");
        })
    });

router.route('/tags')
    .post(function (req, res) {
        Posts.find({ tags: req.body.tags }, function (err, doc) {
            if (err) {
                res.send(err);
            } else {
                res.json(doc);
            }

        });
    });


router.route('/comment')
    .post(function (req, res) {
        var date = new Date();
        var dia = date.getDate();
        var mes = date.getMonth() + 1;
        var ano = date.getFullYear();
        var hora = date.getHours();
        var min = date.getMinutes();

        var fullTime = dia + '/' + mes + '/' + ano + ' ' + hora + ':' + min;

        Posts.findByIdAndUpdate(req.body._id, {
            $push: { "comments": { user_id: req.body.user_id, message: req.body.message, user_name: req.body.name, created: fullDate } }
        }, {
                safe: true,
                new: true
            }, function (err, doc) {
                if (err) {
                    res.send(err);
                } else {

                    res.json(doc);
                }
            });

    });

router.route('/like')
    .post(function (req, res) {
        var date = new Date();
        var dia = date.getDate();
        var mes = date.getMonth() + 1;
        var ano = date.getFullYear();
        var hora = date.getHours();
        var min = date.getMinutes();

        var fullTime = dia + '/' + mes + '/' + ano + ' ' + hora + ':' + min;

        Posts
            .find({
                _id: req.body._id,
                'likes.user_id': req.body.user_id
            }, function (err, doc) {
                if (err)
                    res.send(err);
                else {
                    if (doc.length == 0) {
                        Posts.findByIdAndUpdate(req.body._id, {
                            $push: { "likes": { user_id: req.body.user_id, user_name: req.body.name, created: fullTime } }
                        }, {
                                safe: true,
                                new: true
                            }, function (err, doc) {
                                if (err) {
                                    res.send(err);
                                } else {
                                    res.json(doc);
                                }
                            });
                    } else {
                        res.json({ 'error': 'Você já deu like neste post' });
                    }
                }
            });
    });

router.route('/user/:user_id')
    .get(function (req, res) {
        Posts.find({ user_id: req.params.user_id }, function (err, doc) {
            if (err) {
                res.send(err);
            } else {
                res.json(doc);
            }
        });
    });


module.exports = router;
