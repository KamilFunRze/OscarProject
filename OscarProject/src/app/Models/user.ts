export class User {
    id : number;
    login : string;
    password : string;
    email : string;
    firstname : string;
    lastname : string;
  
    constructor(id : number, login : string, password : string, email : string, firstname : string, lastname : string ) {
      this.id = id;
      this.login = login;
      this.password = password;
      this.email = email;
      this.firstname = firstname;
      this.lastname = lastname;
    }
  }
