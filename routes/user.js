var express = require('express');
var router = express.Router();
var md5 = require('md5');

var Users = require('../models/user');

router.route('/')
    .post(function (req, res) {
        var verifyEmail = Boolean;

        Users.findOne({ email: req.body.email }, function (err, doc) {
            if (err)
                res.send(err);

            if (doc == null) {
                var today = new Date();
                var users = new Users();
                users.name = req.body.name;
                users.email = req.body.email;
                users.password = md5(req.body.password);
                users.created = today;


                users.save(function (err, doc) {
                    if (err)
                        res.send(err);

                    res.json(doc);
                });
            }
            else {
                res.json({ 'error': 'Email já existe' });
            }
        })

    })

    .get(function (req, res) {
        Users.find(function (err, doc) {
            if (err)
                res.send(err)
            res.json(doc);
        });
    })

    .put(function (req, res) {
        Users.findByIdAndUpdate(req.body._id, {
            $set: { email: req.body.email, name: req.body.name }
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

router.route('/changepassword')
    .put(function (req, res) {
        Users.findByIdAndUpdate(req.body._id, {
            $set: { password: md5(req.body.password) }
        }, {
                safe: true,
                new: true,
            }, function (err, doc) {
                if (err)
                    res.send(err);             
               
                res.json(doc);
            });
    });

router.route('/login')
    .post(function (req, res) {
        Users.findOne({ email: req.body.email, password: md5(req.body.password) }, function (err, doc) {
            if (err)
                res.send(err);
            else
                res.json(doc);
        });
    });

router.route('/perfil/:_id')
    .get(function (req, res) {
        Users.findOne({ _id: req.params._id }, function (err, doc) {
            if (err)
                res.send(err);
            else
                res.json(doc);
        });
    });
module.exports = router;