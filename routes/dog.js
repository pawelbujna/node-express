var _ = require('lodash')
var Dog = require('../models/dog.js');

module.exports = function (app) {
    _dogs = [];

    // Create
    app.post('/dog', function (req, res) {
        var newDog = new Dog(req.body);
        newDog.save(function (err) {
            if (err) {
                res.json({info: 'error during Dog create', error: err});
            }
            res.json({info: 'Dog created succesfully'});
        });
    });

    // Read
    app.get('/dog', function (req, res) {
        Dog.find(function (err, dogs) {
            if (err) {
                res.josn({info: 'error durinf find Dogs', error: err});
            }
            res.json({info: 'Dogs finded succesfully', data: dogs});
        });
    });

    app.get('/dog/:id', function (res, req) {
        Dog.findById(req.params.id, function(err, dog) {
            if (err) {
                res.json({info: 'error during finding Dog', error: err})
            }

            if (dog) {
                res.json({info: 'Dog founded succesfully', data: dog})
            } else {
                res.json({info: 'Dog not found'})
            }
        });
    });

    // Update
    app.put('/dog/:id', function (req, res) {
        Dog.findById(req.params.id, function(err, dog) {
            if (err) {
                res.json({info: 'error during finding Dog', error: err})
            }

            if (dog) {
                _.merge(dog, req.body);
                Dog.save(function(err){
                    if (err) {
                        res.json({info: 'erro during Dog update', error: err})
                    }
                    res.json({info: 'Dog updated succesfully'})
                })
            } else {
                res.json({info: 'Dog not found'})
            }
        });
    });

    // Delete
    app.delete('/dog/:id', function (req, res) {
        Dog.findByIdAndRemove(req.params.id, function (err) {
            if (err) {
                res.json({info: 'error during deleting Dog', error: err})
            }
                res.json({info: 'Dog deleted succesfully'})
        })
    })
};