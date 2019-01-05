module.exports = (app) => {
  let movieRoutes = require('./movieRoutes');
  let loginRoutes = require('./loginRoutes');
  let rateRoutes = require('./rateRoutes');
  
  app.use('/api/movies',movieRoutes);
  app.use('/api/rates',rateRoutes);
  app.use('/api/login',loginRoutes);
  
  


}
