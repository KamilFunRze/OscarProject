const app = require('express');
const router = app.Router();

const moviesController = require('../controllers').moviesController;


 router.get('/myRates', moviesController.getMyRates);

 router.get('/myRates/:movieId', moviesController.getMyRatesForMovie);

 router.get('/:rateId', moviesController.getOneRate);

 router.get('/movie/:movieId', moviesController.getOneMovieRates);

 router.get('/user/:userId', moviesController.getOneUserRates);

 router.post('/', moviesController.addRate);

 router.put('/:rateId', moviesController.updateRate);

 router.delete('/:rateId', moviesController.deleteRate);



module.exports = router;