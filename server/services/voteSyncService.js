const movieModel = require('../models').movie;
const rateModel = require('../models').user_movie;

module.exports = {
    updateRates() {
        movieModel.findAll()
        .then(movies => {
            movies.forEach(movieResult => {
                rateModel.findAll({where:{movie_id : movieResult.id}})
                .then(rates => {
                    movieResult.update({voteAmount : rates.length});
                })
            });
        })
        .catch(err => {
            console.error(err);
        })
    }
}