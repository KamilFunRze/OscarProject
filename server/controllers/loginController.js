const user = require('../models').user;
const bcrypt = require('bcryptjs');


module.exports = {

  getAllUsers(req, res) {
    user.findAll()
    .then(usersResult => {
      res.status(200).json(usersResult);
    }).catch(err => {
        res.status(500).json({
            "userMessage": "Server error",
            "internalMessage" : "Server error",
            "errorCode" : "500"
        })
    });
  },

  getUser(req, res) {
    user
    .findOne({
        where: {
            id: req.params.userId
        }
    })
    .then(userResult => {
        if (userResult)
        {
          res.status(200).json(userResult);
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

  addUser(req, res) {
    if (!req.body.login || !req.body.password || !req.body.email)
        {
            res.status(400).json({
                "userMessage": (!req.body.login ? "Login ":"") + 
                (!req.body.password ? "Password ":"") + 
                (!req.body.email ? "Email ":"") + "not present",
                "internalMessage" : "Mandatory field not valid",
                "errorCode" : "400"
            })
        }
        else
        {
          bcrypt.hash(req.body.password,10,(err,hash) => {
            if (err || !hash) 
            {
                res.status(500).json({
                  "userMessage": "Server error",
                  "internalMessage" : "Server error",
                  "errorCode" : "500"
              });
            }
            else 
            {
              user.create({
                "login": req.body.login,
                "password": hash,
                "email": req.body.email,
                "firstname": req.body.firstname,
                "lastname": req.body.lastname
            }).then(userResult => {
                res.status(201).json(userResult);
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
  

  updateUser(req, res) {
    if (!req.cookies.authLogin || req.cookies.authLogin != req.params.userId )
    {
        res.status(401).json({
          "userMessage": "Not logged in",
          "internalMessage" : "Unauthorized",
          "errorCode" : "401"
          })
    }
    else
    {
      if (!req.body.login || !req.body.password || !req.body.email)
        {
            res.status(400).json({
                "userMessage": (!req.body.login ? "Login ":"") + 
                (!req.body.password ? "password ":"") + 
                (!req.body.email ? "email ":"") + "not present",
                "internalMessage" : "Mandatory field not valid",
                "errorCode" : "400"
            })
        }
        else
        {
            user.findOne({
                where:{
                    id:req.params.userId
                }
            })
            .then(userResult => {
              bcrypt.hash(req.body.password,10,(err,hash) => {
                if (err || !hash) 
                {
                    res.status(500).json({
                      "userMessage": "Server error",
                      "internalMessage" : "Server error",
                      "errorCode" : "500"
                  });
                }
                else 
                {
                  userResult.update({
                    "login": req.body.login,
                    "password": hash,
                    "email": req.body.email,
                    "firstname": req.body.firstname,
                    "lastname": req.body.lastname
                }).then(userResult => {
                    res.status(201).json(userResult);
                }).catch(err => {
                    res.status(500).json({
                        "userMessage": "Server error",
                        "internalMessage" : err,
                        "errorCode" : "500"
                    })
                });
                }
              });
            }).catch(err => {
              res.status(500).json({
                  "userMessage": "Server error",
                  "internalMessage" : err,
                  "errorCode" : "500"
              })
          });
            
        }
    }
  },

  login(req, res) {
    if (req.cookies.authLogin) 
    {
      console.log(req.cookies);
      res.status(400)
                .json(
                  {
                    "userMessage": "Already loged in, log out first",
                    "internalMessage" : "Cookie authLogin already exist",
                    "errorCode" : "400"
                  });
    }
    else
    {
      user.findOne({
        where: {
          login: req.body.login
        }
      })
      .then(userResult => {
        if (userResult == null) 
        {
            res.status(404).json(
              {
              "userMessage": "Not found",
              "internalMessage" : "Not found",
              "errorCode" : "404"
              });
        } 
        else 
        {
          bcrypt.compare(req.body.password, userResult.dataValues.password, function (error, result) {
            if (error) {
              res.status(500).json(
                {
                "userMessage": "Server error",
                "internalMessage" : "Server error",
                "errorCode" : "500"
                });
            } else {
              if (result === true) {
                res.status(200).cookie("authLogin", userResult.dataValues.id,
                { maxAge: 1000*60*60*24*30, httpOnly: false, path: "/" })
                .json({message:"Logged in succesfully"});
              } else {
                res.status(401)                
                .json(
                  {
                  "userMessage": "Wrong password",
                  "internalMessage" : "Passwords do not match",
                  "errorCode" : "401"
                  });
              }
            }
          });
        }

      }).catch(err => {
        res.status(500).json({
            "userMessage": "Server error",
            "internalMessage" : err,
            "errorCode" : "500"
        })
    });
    }
  },

  logout(req,res) {
    if (req.cookies.authLogin)
    {
      res.status(200).clearCookie("authLogin")
      .json(
        {
        "userMessage": "Logged out succesfully",
        "internalMessage" : "Succesful logout",
        "errorCode" : "200"
        });
    }
    else{
      res.status(200)
      .json(
        {
        "userMessage": "Already logged out",
        "internalMessage" : "User was not logged in",
        "errorCode" : "200"
        });
    }
  }

}