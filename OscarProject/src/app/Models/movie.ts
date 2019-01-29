export class Movie {
    id:number;
    title:string;
    description:string;
    premiereDate:Date;
    _premiereDate:string;
    voteAmount:number;
  
    constructor(id : number, title:string, description:string, premiereDate:Date, _premiereDate:string, voteAmount:number) {
      this.id = id;
      this.title = title;
      this.description = description;
      this.premiereDate = premiereDate;
      this._premiereDate = _premiereDate;
      this.voteAmount = voteAmount;
    }
  }
