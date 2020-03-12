export class Contact {

    constructor(email: string, fullName: string, subject: string, message: string){
        this.email= email;
        this.fullName = fullName;
        this.subject = subject;
        this.message = message;
    }

    email: string;
    fullName: string;
    subject: string;
    message: string;
   

}
