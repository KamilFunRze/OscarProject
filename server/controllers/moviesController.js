const movie = require('../models').movie;
const rate = require('../models').user_movie;

module.exports = {
    getMovie(req, res) {
        movie
            .findOne({
                where: {
                    id: req.params.movieId
                }
            })
            .then(movieResult => {
                if (movieResult)
                {
                    res.status(200).json(movieResult);
                }
                else
                {
                    res.status(404).json({
                        "userMessage": "Not found",
                        "internalMessage" : "Not found",
                        "errorCode" : "404"
                    })
                }

            }).catch(err => {
                res.status(500).json({
                    "userMessage": "Server error",
                    "internalMessage" : "Server error",
                    "errorCode" : "500"
                })
            });

    },

    getAllMovies(req,res) {
        movie.findAll().then(movieResult => {
            res.status(200).json(movieResult);
        }).catch(err => {
            res.status(500).json({
                "userMessage": "Server error",
                "internalMessage" : "Server error",
                "errorCode" : "500"
            })
        });
    },

    getLatestMovies(req,res) {
        movie.findAll({order: [['createdAt', 'DESC']], limit: 5}).then(movieResult => {
            res.status(200).json(movieResult);
        }).catch(err => {
            res.status(500).json({
                "userMessage": "Server error",
                "internalMessage" : "Server error",
                "errorCode" : "500"
            })
        });
    },

    addMovie(req,res) {
        
        if (req.body.title == null || req.body.title == '')
        {
            res.status(400).json({
                "userMessage": "Title is empty",
                "internalMessage" : "Mandatory field not valid",
                "errorCode" : "400"
            })
        }
        else
        {
            movie.create({
                "title": req.body.title,
                "description": req.body.description,
                "premiereDate": req.body.premiereDate,
                "voteAmount": 0
            }).then(movieResult => {
                res.status(201).json(movieResult);
            }).catch(err => {
                res.status(500).json({
                    "userMessage": "Server error",
                    "internalMessage" : "Server error",
                    "errorCode" : "500"
                })
            });
        }
    },

    updateMovie(req,res) {
        if (req.body.title == null || req.body.title == '')
        {
            res.status(400).json({
                "userMessage": "Title is empty",
                "internalMessage" : "Mandatory field not valid",
                "errorCode" : "400"
            })
        }
        else
        {
            movie.findOne({
                where:{
                    id:req.params.movieId
                }
            })
            .then(movieResult => {
                movieResult.update({
                    "title": req.body.title,
                    "description": req.body.description,
                    "premiereDate": req.body.premiereDate
                }).then(movieResultAfterUpdate => {
                    res.status(200).json(movieResultAfterUpdate);
                }).catch(err => {
                    res.status(500).json({
                        "userMessage": "Server error",
                        "internalMessage" : "Server error",
                        "errorCode" : "500"
                    })
                });
            })
            
        }
    },




    //Rates

    getMyRates(req,res) {
        if (!req.cookies.authLogin)
        {
            res.status(400).json({
                "userMessage": "No info about user",
                "internalMessage" : "WhoAreYou",
                "errorCode" : "400"
            })
                
        }
        else
        {
            rate.findAll({where:{user_id:req.cookies.authLogin},order : [createdAt]})
            .then(rateResult => {
                res.json(rateResult);
            }).catch(err => {
                res.status(500).json({
                    "userMessage": "Server error",
                    "internalMessage" : "Server error",
                    "errorCode" : "500"
                })
            });
        }
        
        
    },

    getMyRatesForMovie(req,res) {
        if (!req.cookies.authLogin)
        {
            res.status(500).json({
                "userMessage": "No info about user",
                "internalMessage" : "WhoAreYou",
                "errorCode" : "500"
            })
                
        }
        else
        {
            rate.findAll({where:{user_id :req.cookies.authLogin,
                                movie_id : req.params.movieId},order : [createdAt]})
            .then(rateResult => {
                res.json(rateResult);
            }).catch(err => {
                res.status(500).json({
                    "userMessage": "Server error",
                    "internalMessage" : "Server error",
                    "errorCode" : "500"
                })
            });
        }
        
        
    },

    getOneRate(req,res) {
        rate.findOne({where:{id:req.params.rateId}})
            .then(rateResult => {
                res.json(rateResult);
            }).catch(err => {
                res.status(500).json({
                    "userMessage": "Server error",
                    "internalMessage" : "Server error",
                    "errorCode" : "500"
                })
            }); 
    },

    getOneMovieRates(req,res) {
        rate.findAll({where:{movie_id:req.params.movieId},order : [createdAt]})
            .then(rateResult => {
                res.json(rateResult);
            }).catch(err => {
                res.status(500).json({
                    "userMessage": "Server error",
                    "internalMessage" : "Server error",
                    "errorCode" : "500"
                })
            }); 
    },

    getOneUserRates(req,res) {
        rate.findAll({where:{user_id:req.params.userId},order : [createdAt]})
            .then(rateResult => {
                res.json(rateResult);
            }).catch(err => {
                res.status(500).json({
                    "userMessage": "Server error",
                    "internalMessage" : "Server error",
                    "errorCode" : "500"
                })
            }); 
    },

    addRate(req,res) {
        if ((req.body.score == null 
            && req.body.wantToSee == null 
            && req.body.rateComment == null) 
            || req.body.movieId == null || req.cookies.authLogin == null)
        {
            res.status(400).json({
                "userMessage": "Rate is empty or invalid",
                "internalMessage" : "Mandatory fields not present",
                "errorCode" : "400"
            })
        }
        else
        {
            movie.findOne({where : {id: req.body.movieId }})
                .then(movieResult => {
                    if (!movieResult) {
                        res.status(400).json({
                            "userMessage": "Movie is invalid",
                            "internalMessage" : "Mandatory field is invalid",
                            "errorCode" : "400"
                        });
                    }
                    else {
                        rate.create({
                            "score": req.body.score,
                            "wantToSee": req.body.wantToSee,
                            "rateComment": req.body.rateComment,
                            "user_id" : req.cookies.authLogin,
                            "movie_id" : req.body.movieId 
            
                        }).then(movieResult => {
                            res.status(201).json(movieResult);
                        }).catch(err => {
                            res.status(500).json({
                                "userMessage": "Server error",
                                "internalMessage" : err,
                                "errorCode" : "500"
                            })
                        });
                    }
                    
                })
        }
    },

    updateRate(req,res) {
        if (req.body.score == null 
            && req.body.wantToSee == null 
            && req.body.rateComment == null) 
            {
                res.status(400).json({
                    "userMessage": "Rate is empty or invalid",
                    "internalMessage" : "Mandatory fields not present",
                    "errorCode" : "400"
                })
            }
            else
            {
                rate.findOne({
                    where:{
                        id:req.params.rateId
                    }
                })
                .then(rateResult => {
                    if (req.cookies.authLogin != rateResult.dataValues.user_id)
                    {
                        res.status(401).json({
                            "userMessage": "Not logged in",
                            "internalMessage" : "Unauthorized",
                            "errorCode" : "401"
                            });
                    }
                    else
                    {
                        rateResult.update({
                            "score": req.body.score,
                            "wantToSee": req.body.wantToSee,
                            "rateComment": req.body.rateComment
                    }).then(rateResultAfterUpdate => {
                        res.status(200).json(rateResultAfterUpdate);
                    }).catch(err => {
                        res.status(500).json({
                            "userMessage": "Server error",
                            "internalMessage" : "Server error",
                            "errorCode" : "500"
                        })
                    });
                    }
                })
                
            }
        },


        deleteRate(req,res) {

            rate.destroy({where:{id:req.params.rateId,user_id: req.cookies.authLogin}})
                    .then((deletedAmount)=>{
                        if (!deletedAmount)
                        {
                            res.status(404).json({
                                "userMessage": "Not found",
                                "internalMessage" : "Not found",
                                "errorCode" : "404"
                            })
                        }
                        else
                        {
                            res.status(200).json({
                                "userMessage": "Succesfully deleted",
                                "internalMessage" : "Succesfully deleted",
                                "errorCode" : "200"
                            })
                        }
                        
                    })
                    .catch(err => {
                        res.status(500).json({
                            "userMessage": "Server error",
                            "internalMessage" : "Server error",
                            "errorCode" : "500"
                        })
                    });
                    
        }




};
