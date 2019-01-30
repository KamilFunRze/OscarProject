export class Rate {
    id : number;
    score : number;
    rateComment : string;
    wantToSee : boolean;
    movieId : number;
    movie_id : number;
    userId : number;
    user_id : number;
  
    constructor(id : number, score : number, rateComment : string, wantToSee : boolean, movieId : number, 
        movie_id : number, userId : number, user_id : number ) {
      this.id = id;
      this.score = score;
      this.rateComment = rateComment;
      this.wantToSee = wantToSee;
      this.movieId = movieId;
      this.movie_id = movie_id;
      this.userId = userId;
      this.user_id = user_id;
    }
  }
