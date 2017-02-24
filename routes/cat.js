var _ = require('lodash')
var Cat = require('../models/cat.js');

module.exports = function (app) {
    _cats = [];

    // Create
    app.post('/cat', function (req, res) {
        var newCat = new Cat(req.body);
        newCat.save(function (err) {
            if (err) {
                res.json({info: 'error during cat create', error: err});
            }
            res.json({info: 'cat created succesfully'});
        });
    });

    // Read
    app.get('/cat', function (req, res) {
        Cat.find(function (err, cats) {
            if (err) {
                res.josn({info: 'error durinf find cats', error: err});
            }
            res.json({info: 'cats finded succesfully', data: cats});
        });
    });

    app.get('/cat/:id', function (res, req) {
        Cat.findById(req.params.id, function(err, cat) {
            if (err) {
                res.json({info: 'error during finding cat', error: err})
            }

            if (cat) {
                res.json({info: 'cat founded succesfully', data: cat})
            } else {
                res.json({info: 'cat not found'})
            }
        });
    });

    // Update
    app.put('/cat/:id', function (req, res) {
        Cat.findById(req.params.id, function(err, cat) {
            if (err) {
                res.json({info: 'error during finding cat', error: err})
            }

            if (cat) {
                _.merge(cat, req.body);
                Cat.save(function(err){
                    if (err) {
                        res.json({info: 'erro during cat update', error: err})
                    }
                    res.json({info: 'cat updated succesfully'})
                })
            } else {
                res.json({info: 'cat not found'})
            }
        });
    });

    // Delete
    app.delete('/cat/:id', function (req, res) {
        Cat.findByIdAndRemove(req.params.id, function (err) {
            if (err) {
                res.json({info: 'error during deleting cat', error: err})
            }
                res.json({info: 'cat deleted succesfully'})
        })
    })
};