const app = require('express');
const router = app.Router();

const moviesController = require('../controllers').moviesController;


router.get('/', moviesController.getAllMovies);

router.get('/:movieId', moviesController.getMovie);

router.post('/', moviesController.addMovie);

router.put('/:movieId', moviesController.updateMovie);



module.exports = router;