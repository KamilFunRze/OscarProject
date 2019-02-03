const express = require('express');
const path = require('path');


module.exports = (app) => {
  let movieRoutes = require('./movieRoutes');
  let loginRoutes = require('./loginRoutes');
  let rateRoutes = require('./rateRoutes');
  
  app.use('/api/movies',movieRoutes);
  app.use('/api/rates',rateRoutes);
  app.use('/api/login',loginRoutes);
  

  app.use(express.static(path.join(__dirname + '/../../OscarProject/dist/OscarProject')));
  
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/../../OscarProject/dist/OscarProject/index.html'));
  });
  app.get('/login*', (req, res) => {
    res.sendFile(path.join(__dirname, '/../../OscarProject/dist/OscarProject/index.html'));
  });
  app.get('/users*', (req, res) => {
    res.sendFile(path.join(__dirname, '/../../OscarProject/dist/OscarProject/index.html'));
  });
  app.get('/rates*', (req, res) => {
    res.sendFile(path.join(__dirname, '/../../OscarProject/dist/OscarProject/index.html'));
  });
  app.get('/myRates*', (req, res) => {
    res.sendFile(path.join(__dirname, '/../../OscarProject/dist/OscarProject/index.html'));
  });
  app.get('/movies*', (req, res) => {
    res.sendFile(path.join(__dirname, '/../../OscarProject/dist/OscarProject/index.html'));
  });





}
