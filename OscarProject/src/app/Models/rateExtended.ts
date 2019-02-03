import { Movie } from './movie';
import { User } from './user';
import { Rate } from './rate';

export class RateExtended extends Rate {
    
    movie : Movie;
    user : User;
  
    constructor(id : number, score : number, rateComment : string, wantToSee : boolean, movieId : number, 
        movie_id : number, userId : number, user_id : number, movie : Movie, user : User) {
      super(id,score,rateComment,wantToSee,movieId,movie_id,userId,user_id)
      this.movie = movie;
      this.user = user;
    }
  }
